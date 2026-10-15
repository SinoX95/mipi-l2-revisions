// ===================== RÉVISIONS MIPI L2 — application =====================
// Site statique (HTML/CSS/JS sans build) servi par Firebase Hosting.
// - Navigation par hash (#/revision/uml/uml-c2/exercices) : rechargement et bouton
//   « retour » du navigateur conservent la page.
// - Progression stockée dans localStorage (aucun service Firebase côté données).
'use strict';

// ============================================================================
// Utilitaires DOM
// ============================================================================
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'style') el.setAttribute('style', v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, String(v));
    }
  }
  for (const c of children.flat()) {
    if (c === undefined || c === null || c === false) continue;
    el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  return el;
}

// Mini-markup sûr : `code` et **gras** (aucun HTML interprété).
function rich(text) {
  const frag = document.createDocumentFragment();
  String(text).split(/(`[^`]+`|\*\*[^*]+\*\*)/).forEach(part => {
    if (!part) return;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) frag.appendChild(h('code', null, part.slice(1, -1)));
    else if (part.startsWith('**') && part.endsWith('**') && part.length > 3) frag.appendChild(h('strong', null, part.slice(2, -2)));
    else frag.appendChild(document.createTextNode(part));
  });
  return frag;
}

function looksLikeCode(s) {
  return /[;{}]\s*$|^\s*(int|char|float|void|public|class|#include|printf|scanf|for|while)\b/m.test(s) && s.includes('\n');
}

// Texte long (corrigés, solutions) : les blocs de code / schémas ASCII gardent leur
// mise en forme (défilement horizontal interne), la prose revient à la ligne.
const BOX_CHARS = /[─│├└┌┐┘┴┬△◆◇▷▶]/;
function isCodeLine(l) {
  if (BOX_CHARS.test(l)) return true;
  if (/^\s*[-•]\s/.test(l)) return false;
  return /[;{}]\s*$/.test(l) || /^\s{2,}\S/.test(l) ||
    /^\s*(\/\/|#include|#define|public |private |protected |abstract |class |interface |for ?\(|while ?\(|if ?\(|else|return |int |char |float |void |double |long |typedef |Iterator<|ArrayList<|System\.)/.test(l);
}
function longText(text, extraClass, attrs) {
  const box = h('div', Object.assign({ class: 'longtext' + (extraClass ? ' ' + extraClass : '') }, attrs || {}));
  String(text).split(/\n\s*\n/).forEach(block => {
    const lines = block.split('\n');
    const codeLines = lines.filter(isCodeLine).length;
    const code = BOX_CHARS.test(block) || codeLines >= Math.ceil(lines.length / 2);
    box.appendChild(h(code ? 'pre' : 'p', { class: code ? 'part-code' : 'part-prose', tabindex: code ? 0 : undefined }, block));
  });
  return box;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

function progressBar(value, total, cls) {
  const p = pct(value, total);
  return h('div', { class: 'progress' + (cls ? ' ' + cls : ''), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': total, 'aria-valuenow': value, 'aria-label': `${value} sur ${total}` },
    h('span', { style: `width:${p}%` }));
}

let toastTimer = null;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

const ICONS = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cours: '<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h11"/>',
  annales: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
  revision: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  partiels: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
};
function icon(name) {
  const span = document.createElement('span');
  span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  return span.firstChild;
}

// ============================================================================
// Données dérivées
// ============================================================================
const MATIERES = DATA;
const findMatiere = id => MATIERES.find(m => m.id === id);
const findChapter = (m, cid) => (m && m.revision || []).find(c => c.id === cid);
const exKey = (chapId, ex) => chapId + '::' + ex.title;
const chapterQcm = (m, cid) => m.qcm.map((q, idx) => ({ q, idx })).filter(x => x.q.chap === cid);
const flatDocs = m => m.sections.flatMap(s => s.docs.map(d => Object.assign({ group: s.label }, d)));
const isApprofondissement = ex => /approfondissement/i.test(ex.title);

// ============================================================================
// Persistance (localStorage, protégée)
// ============================================================================
const Store = (() => {
  const KEY = 'mipi-revisions:v1';
  const fresh = () => ({ v: 1, fiches: {}, ex: {}, quiz: {}, partiel: {}, last: null });
  let data = fresh();
  let available = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === 1) {
        for (const k of ['fiches', 'ex', 'quiz', 'partiel']) {
          if (parsed[k] && typeof parsed[k] === 'object' && !Array.isArray(parsed[k])) data[k] = parsed[k];
        }
        if (parsed.last && typeof parsed.last === 'object') data.last = parsed.last;
      }
    }
  } catch (e) {
    available = false;
  }
  let warned = false;
  function save() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
      available = true;
    } catch (e) {
      available = false;
      if (!warned) { warned = true; toast("Ta progression ne peut pas être enregistrée (stockage du navigateur indisponible)."); }
    }
  }
  return {
    get data() { return data; },
    save,
    get available() { return available; },
    reset() { data = fresh(); save(); },
  };
})();

const Progress = {
  ficheDone: cid => !!Store.data.fiches[cid],
  setFiche(cid, done) { if (done) Store.data.fiches[cid] = Date.now(); else delete Store.data.fiches[cid]; Store.save(); },
  ex: key => Store.data.ex[key] || {},
  setEx(key, patch) {
    const cur = Object.assign({}, Store.data.ex[key], patch);
    Object.keys(cur).forEach(k => { if (cur[k] === undefined || cur[k] === '') delete cur[k]; });
    if (Object.keys(cur).length) Store.data.ex[key] = cur; else delete Store.data.ex[key];
    Store.save();
  },
  chapterStats(m, c) {
    let ok = 0, review = 0;
    c.exercises.forEach(ex => { const s = Progress.ex(exKey(c.id, ex)).s; if (s === 'ok') ok++; else if (s === 'review') review++; });
    return { ok, review, total: c.exercises.length };
  },
  quiz: key => Store.data.quiz[key] || {},
  matiereStats(m) {
    const chapters = m.revision;
    const fiches = chapters.filter(c => Progress.ficheDone(c.id)).length;
    let ok = 0, total = 0;
    chapters.forEach(c => { const s = Progress.chapterStats(m, c); ok += s.ok; total += s.total; });
    const best = Progress.quiz(m.id).best;
    return { fiches, chapters: chapters.length, ok, total, best };
  },
};

// ============================================================================
// Routage
// ============================================================================
const ROUTES = [
  { id: 'home', label: 'Accueil', href: '#/', icon: 'home' },
  { id: 'cours', label: 'Cours', href: '#/cours', icon: 'cours' },
  { id: 'annales', label: 'Annales', href: '#/annales', icon: 'annales' },
  { id: 'revision', label: 'Révision', href: '#/revision', icon: 'revision' },
  { id: 'partiels', label: 'Partiels blancs', short: 'Partiels', href: '#/partiels', icon: 'partiels' },
];

const pageOuter = document.getElementById('page');
const page = document.getElementById('pageInner');
let cleanups = [];
function onCleanup(fn) { cleanups.push(fn); }
function runCleanups() { cleanups.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } }); cleanups = []; }

function parseHash() {
  const raw = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
  return raw.split('/').filter(Boolean);
}

function renderNav(section) {
  const top = document.getElementById('navLinks');
  const bottom = document.getElementById('tabbar');
  top.innerHTML = '';
  bottom.innerHTML = '';
  ROUTES.forEach(r => {
    const current = r.id === section ? 'page' : undefined;
    top.appendChild(h('a', { class: 'navlink', href: r.href, 'aria-current': current }, r.label));
    bottom.appendChild(h('a', { href: r.href, 'aria-current': current, 'aria-label': r.label }, icon(r.icon), h('span', null, r.short || r.label)));
  });
}

function setTitle(t) { document.title = t ? `${t} · Révisions MIPI L2` : 'Révisions MIPI L2'; }

function route() {
  runCleanups();
  const parts = parseHash();
  const section = parts[0] || 'home';
  const known = ROUTES.some(r => r.id === section) || section === 'quiz';
  renderNav(section === 'quiz' ? 'revision' : (known ? section : 'home'));
  pageOuter.classList.remove('flush');
  page.innerHTML = '';
  page.classList.remove('view-enter');
  void page.offsetWidth;            // relance l'animation d'entrée
  page.classList.add('view-enter');

  try {
    if (section === 'home') viewHome();
    else if (section === 'cours') viewCours(parts[1], parts[2]);
    else if (section === 'annales') viewAnnales(parts[1]);
    else if (section === 'revision') {
      if (parts[2]) viewChapter(parts[1], parts[2], parts[3]);
      else viewRevision(parts[1]);
    }
    else if (section === 'quiz') viewQuizPage(parts[1]);
    else if (section === 'partiels') {
      if (parts[2] === 'session') viewPartielSession(parts[1]);
      else viewPartiels(parts[1]);
    }
    else viewNotFound();
  } catch (err) {
    console.error(err);
    page.innerHTML = '';
    page.appendChild(h('div', { class: 'empty' },
      h('h2', null, 'Une erreur est survenue'),
      h('p', null, "Cette page n'a pas pu s'afficher. Reviens à l'accueil et réessaie."),
      h('a', { class: 'btn', href: '#/' }, "Retour à l'accueil")));
  }
  pageOuter.scrollTop = 0;
}

function viewNotFound(msg) {
  setTitle('Page introuvable');
  page.appendChild(h('div', { class: 'empty' },
    h('h1', null, 'Page introuvable'),
    h('p', null, msg || "Ce lien ne correspond à aucune page du site."),
    h('a', { class: 'btn', href: '#/' }, "Retour à l'accueil")));
}

function matiereTabs(base, currentId, suffix) {
  return h('nav', { class: 'tabs', 'aria-label': 'Matières' },
    MATIERES.map(m => h('a', { class: 'tab', href: `${base}/${m.id}${suffix || ''}`, 'aria-current': m.id === currentId ? 'page' : undefined },
      h('span', { class: 'dot', style: `background:${m.color}` }),
      h('span', { class: 'name-long' }, m.name), h('span', { class: 'name-short', 'aria-hidden': 'true' }, m.short))));
}

// ============================================================================
// Accueil
// ============================================================================
function viewHome() {
  setTitle('');
  const hour = new Date().getHours();
  const greet = hour < 5 ? 'Bonsoir' : hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
  page.appendChild(h('section', null,
    h('p', { class: 'eyebrow' }, `${greet}, Sino`),
    h('h1', null, 'Prêt·e à réviser ?'),
    h('p', { class: 'lead' }, 'Fiches de révision, exercices par chapitre, QCM, annales corrigées et partiels blancs pour les trois matières du semestre.'),
    h('div', { class: 'row' },
      h('a', { class: 'btn pill', href: '#/revision' }, 'Réviser un chapitre'),
      h('a', { class: 'btn secondary pill', href: '#/partiels' }, 'Faire un partiel blanc'))));

  const last = Store.data.last;
  const lm = last && findMatiere(last.m);
  const lc = lm && findChapter(lm, last.c);
  if (lc) {
    page.appendChild(h('div', { class: 'section-title' }, 'Reprendre'));
    page.appendChild(h('a', { class: 'card', href: `#/revision/${lm.id}/${lc.id}/${last.tab || 'fiche'}` },
      h('div', { class: 'row', style: 'justify-content:space-between' },
        h('div', null, h('div', { class: 'muted small' }, lm.name), h('div', { style: 'font-weight:700' }, lc.title)),
        h('span', { class: 'badge accent' }, 'Continuer →'))));
  }

  page.appendChild(h('div', { class: 'section-title' }, 'Tes matières'));
  const grid = h('div', { class: 'card-grid' });
  MATIERES.forEach(m => {
    const s = Progress.matiereStats(m);
    grid.appendChild(h('a', { class: 'card matiere-card', href: `#/revision/${m.id}` },
      h('div', { class: 'top' }, h('span', { class: 'badge' }, m.code), h('span', { class: 'dot', style: `background:${m.color}` })),
      h('h3', null, m.name),
      h('div', { class: 'stat-line' }, h('span', null, 'Fiches révisées'), h('b', null, `${s.fiches} / ${s.chapters}`)),
      progressBar(s.fiches, s.chapters, 'ok'),
      h('div', { class: 'stat-line' }, h('span', null, 'Exercices réussis'), h('b', null, `${s.ok} / ${s.total}`)),
      progressBar(s.ok, s.total),
      h('div', { class: 'stat-line' }, h('span', null, 'Meilleur QCM (matière)'), h('b', null, s.best ? `${s.best.score} / ${s.best.total}` : '—'))));
  });
  page.appendChild(grid);

  page.appendChild(h('div', { class: 'section-title' }, 'Accès rapide'));
  page.appendChild(h('div', { class: 'card-grid' },
    h('a', { class: 'card', href: '#/cours' }, h('div', { class: 'muted small' }, 'Consulter'), h('div', { style: 'font-weight:700' }, 'Tous les cours en PDF')),
    h('a', { class: 'card', href: '#/annales' }, h('div', { class: 'muted small' }, "S'entraîner"), h('div', { style: 'font-weight:700' }, 'Annales et corrections')),
    h('a', { class: 'card', href: '#/partiels' }, h('div', { class: 'muted small' }, 'Se tester'), h('div', { style: 'font-weight:700' }, 'Partiel blanc (minuteur optionnel)'))));

  if (!Store.available) {
    page.appendChild(h('p', { class: 'notice warn', style: 'margin-top:24px' }, "Le stockage du navigateur est indisponible (navigation privée ?) : ta progression ne sera pas conservée après fermeture de l'onglet."));
  }
}

// ============================================================================
// Cours (PDF)
// ============================================================================
const mobileQuery = window.matchMedia('(max-width: 760px)');

function viewCours(mid, docIdx) {
  setTitle('Cours');
  const m = mid ? findMatiere(mid) : null;
  if (mid && !m) return viewNotFound('Matière introuvable.');

  const rerender = () => route();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', rerender);
    onCleanup(() => mobileQuery.removeEventListener('change', rerender));
  } else if (mobileQuery.addListener) {            // Safari < 14
    mobileQuery.addListener(rerender);
    onCleanup(() => mobileQuery.removeListener(rerender));
  }

  if (mobileQuery.matches) return viewCoursMobile(m);

  pageOuter.classList.add('flush');
  const docs = m ? flatDocs(m) : [];
  const current = m && docIdx !== undefined ? docs[Number(docIdx)] : null;
  if (m && docIdx !== undefined && !current) toast('Document introuvable.');

  const sidebar = h('nav', { class: 'doc-sidebar', 'aria-label': 'Documents de cours' });
  MATIERES.forEach(mat => {
    const open = m ? mat.id === m.id : mat === MATIERES[0];
    const bodyId = 'docs-' + mat.id;
    const body = h('div', { class: 'acc-body', id: bodyId, hidden: !open });
    let i = 0;
    mat.sections.forEach(sec => {
      body.appendChild(h('div', { class: 'doc-group-label' }, sec.label));
      sec.docs.forEach(d => {
        const idx = i++;
        const isCur = current && mat.id === m.id && idx === Number(docIdx);
        body.appendChild(h('a', { class: 'doc-link', href: `#/cours/${mat.id}/${idx}`, 'aria-current': isCur ? 'page' : undefined }, d.title));
      });
    });
    const head = h('button', { class: 'acc-head', 'aria-expanded': String(open), 'aria-controls': bodyId },
      h('span', { class: 'row', style: 'gap:10px' }, h('span', { class: 'dot', style: `background:${mat.color}` }), mat.name),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, '▶'));
    head.addEventListener('click', () => {
      const exp = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!exp));
      body.hidden = exp;
    });
    sidebar.appendChild(h('div', null, head, body));
  });

  const viewer = h('section', { class: 'viewer' });
  if (current) {
    setTitle(current.title);
    viewer.appendChild(h('div', { class: 'viewer-bar' },
      h('div', { class: 'title' }, current.title),
      h('a', { class: 'btn secondary', href: current.file, target: '_blank', rel: 'noopener' }, 'Ouvrir dans un onglet ↗')));
    viewer.appendChild(h('div', { class: 'viewer-frame' }, h('iframe', { src: current.file, title: current.title })));
  } else {
    viewer.appendChild(h('div', { class: 'empty', style: 'margin:auto' },
      h('h2', null, 'Choisis un document'),
      h('p', null, 'Sélectionne un cours, un TD ou une annexe dans la liste de gauche.')));
  }
  page.appendChild(h('div', { class: 'cours-layout' }, sidebar, viewer));
}

function viewCoursMobile(m) {
  page.appendChild(h('h1', null, 'Cours'));
  page.appendChild(h('p', { class: 'lead' }, "Les PDF s'ouvrent dans le lecteur de ton téléphone (nouvel onglet)."));
  const list = h('div', { class: 'doc-list' });
  MATIERES.forEach(mat => {
    const open = m ? mat.id === m.id : false;
    const bodyId = 'mdocs-' + mat.id;
    const body = h('div', { class: 'acc-body', id: bodyId, hidden: !open });
    mat.sections.forEach(sec => {
      body.appendChild(h('div', { class: 'doc-group-label' }, sec.label));
      sec.docs.forEach(d => body.appendChild(h('a', { class: 'doc-link', href: d.file, target: '_blank', rel: 'noopener' },
        h('span', null, d.title), h('span', { class: 'badge' }, 'PDF ↗'))));
    });
    const head = h('button', { class: 'acc-head', 'aria-expanded': String(open), 'aria-controls': bodyId },
      h('span', { class: 'row', style: 'gap:10px' }, h('span', { class: 'dot', style: `background:${mat.color}` }), mat.name),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, '▶'));
    head.addEventListener('click', () => {
      const exp = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!exp));
      body.hidden = exp;
    });
    list.appendChild(h('div', { class: 'acc' }, head, body));
  });
  page.appendChild(list);
}

// ============================================================================
// Annales
// ============================================================================
function toggleButton(label, labelOpen, target, cls) {
  const btn = h('button', { class: cls || 'btn secondary', 'aria-expanded': 'false', 'aria-controls': target.id }, label);
  btn.addEventListener('click', () => {
    const open = target.hidden;
    target.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? labelOpen : label;
  });
  return btn;
}

function viewAnnales(openId) {
  setTitle('Annales');
  page.appendChild(h('h1', null, 'Annales'));
  page.appendChild(h('p', { class: 'lead' }, "Sujets d'examen et corrections par matière. Aucune correction officielle n'est publiée sur Moodle : les corrigés sont rédigés par le site. Aucune annale n'existe pour le C : un sujet d'entraînement a été créé."));

  MATIERES.forEach(m => {
    const open = openId ? m.id === openId : true;
    const bodyId = 'ann-' + m.id;
    const body = h('div', { class: 'acc-body', id: bodyId, hidden: !open });
    (m.annales || []).forEach(an => {
      const corrId = 'corr-' + an.id, sujId = 'suj-' + an.id;
      const corr = longText(an.correction, 'solution', { id: corrId, hidden: true, 'aria-label': 'Correction' });
      const actions = h('div', { class: 'actions' });
      let sujetBox = null;
      if (an.sujetFile) {
        actions.appendChild(h('a', { class: 'btn secondary', href: an.sujetFile, target: '_blank', rel: 'noopener' }, 'Sujet (PDF) ↗'));
      } else if (an.sujetText) {
        sujetBox = longText(an.sujetText, '', { id: sujId, hidden: true, 'aria-label': 'Sujet' });
        actions.appendChild(toggleButton('Voir le sujet', 'Masquer le sujet', sujetBox));
      }
      actions.appendChild(toggleButton('Voir la correction', 'Masquer la correction', corr, 'btn'));
      body.appendChild(h('article', { class: 'annale' },
        h('div', { class: 'annale-head' },
          h('div', null, h('h3', null, an.title), h('p', { class: 'meta' }, an.meta)),
          h('div', { class: 'badges' },
            an.official ? h('span', { class: 'badge ok' }, 'Sujet officiel') : h('span', { class: 'badge warn' }, "Sujet d'entraînement"),
            h('span', { class: 'badge' }, 'Corrigé non officiel'))),
        actions, sujetBox, corr,
        h('p', { class: 'note' }, an.correctionNote || '')));
    });
    if (!(m.annales || []).length) body.appendChild(h('p', { class: 'muted' }, 'Aucune annale disponible.'));
    const head = h('button', { class: 'acc-head', 'aria-expanded': String(open), 'aria-controls': bodyId },
      h('span', { class: 'row', style: 'gap:10px' }, h('span', { class: 'dot', style: `background:${m.color}` }), `${m.name}`, h('span', { class: 'badge' }, String((m.annales || []).length))),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, '▶'));
    head.addEventListener('click', () => {
      const exp = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!exp));
      body.hidden = exp;
    });
    page.appendChild(h('section', { class: 'acc-card' }, head, body));
  });
}

// ============================================================================
// Révision : liste des chapitres
// ============================================================================
function viewRevision(mid) {
  const m = mid ? findMatiere(mid) : MATIERES[0];
  if (!m) return viewNotFound('Matière introuvable.');
  setTitle('Révision — ' + m.name);
  page.appendChild(h('h1', null, 'Révision par chapitre'));
  page.appendChild(h('p', { class: 'lead' }, "Chaque chapitre propose une fiche de synthèse, 10 à 12 exercices progressifs et un QCM. Choisis la matière puis le chapitre."));
  page.appendChild(matiereTabs('#/revision', m.id));

  const grid = h('div', { class: 'card-grid' });
  m.revision.forEach(c => {
    const s = Progress.chapterStats(m, c);
    const fiche = Progress.ficheDone(c.id);
    const q = Progress.quiz(m.id + ':' + c.id).best;
    grid.appendChild(h('a', { class: 'card chapter-card', href: `#/revision/${m.id}/${c.id}` },
      h('div', { class: 'ctitle' }, c.title),
      h('div', { class: 'chips' },
        fiche ? h('span', { class: 'badge ok' }, '✓ Fiche révisée') : h('span', { class: 'badge' }, 'Fiche à lire'),
        h('span', { class: 'badge' + (s.ok === s.total ? ' ok' : '') }, `${s.ok}/${s.total} exercices`),
        q ? h('span', { class: 'badge accent' }, `QCM ${q.score}/${q.total}`) : h('span', { class: 'badge' }, `QCM ${chapterQcm(m, c.id).length} questions`)),
      progressBar(s.ok, s.total)));
  });
  const qa = Progress.quiz(m.id).best;
  grid.appendChild(h('a', { class: 'card chapter-card', href: `#/quiz/${m.id}`, style: `border-color:${m.color}66` },
    h('div', { class: 'ctitle' }, '🎯 QCM de toute la matière'),
    h('div', { class: 'chips' },
      h('span', { class: 'badge' }, `${m.qcm.length} questions`),
      qa ? h('span', { class: 'badge accent' }, `Meilleur : ${qa.score}/${qa.total}`) : null),
    h('p', { class: 'muted small', style: 'margin:0' }, 'Toutes les notions mélangées, avec bilan des chapitres à revoir.')));
  page.appendChild(grid);
}

// ============================================================================
// Révision : page chapitre (Fiche / Exercices / QCM)
// ============================================================================
function viewChapter(mid, cid, tab) {
  const m = findMatiere(mid);
  const c = findChapter(m, cid);
  if (!m || !c) return viewNotFound('Chapitre introuvable.');
  const tabs = ['fiche', 'exercices', 'qcm'];
  if (!tabs.includes(tab)) tab = 'fiche';
  Store.data.last = { m: m.id, c: c.id, tab };
  Store.save();
  setTitle(c.title);

  const base = `#/revision/${m.id}/${c.id}`;
  const qs = chapterQcm(m, c.id);
  page.appendChild(h('a', { class: 'back-link', href: `#/revision/${m.id}` }, '← ' + m.name));
  page.appendChild(h('div', { class: 'chapter-head' }, h('div', null, h('p', { class: 'eyebrow' }, m.name), h('h1', null, c.title))));
  page.appendChild(h('nav', { class: 'tabs', 'aria-label': 'Contenu du chapitre' },
    h('a', { class: 'tab', href: base + '/fiche', 'aria-current': tab === 'fiche' ? 'page' : undefined }, 'Fiche', Progress.ficheDone(c.id) ? h('span', { class: 'count' }, '✓') : null),
    h('a', { class: 'tab', href: base + '/exercices', 'aria-current': tab === 'exercices' ? 'page' : undefined }, 'Exercices', h('span', { class: 'count' }, String(c.exercises.length))),
    h('a', { class: 'tab', href: base + '/qcm', 'aria-current': tab === 'qcm' ? 'page' : undefined }, 'QCM', h('span', { class: 'count' }, String(qs.length)))));

  const area = h('div');
  page.appendChild(area);
  if (tab === 'fiche') renderFiche(area, m, c);
  else if (tab === 'exercices') {
    const items = c.exercises.map(ex => ({ key: exKey(c.id, ex), ex }));
    ExerciseRunner(area, {
      items,
      get: key => Progress.ex(key),
      set: (key, patch) => Progress.setEx(key, patch),
      ficheHref: base + '/fiche',
      resetLabel: 'Effacer mes réponses de ce chapitre',
    });
  } else {
    if (!qs.length) area.appendChild(h('div', { class: 'empty' }, h('p', null, "Pas encore de QCM pour ce chapitre.")));
    else QuizRunner(area, { m, key: m.id + ':' + c.id, questions: qs, backHref: base + '/fiche' });
  }
}

function renderFiche(area, m, c) {
  const f = (typeof FICHES !== 'undefined') ? FICHES[c.id] : null;
  if (!f) {
    area.appendChild(h('div', { class: 'empty' }, h('h2', null, 'Fiche non disponible'), h('p', null, "La fiche de ce chapitre n'a pas encore été rédigée.")));
    return;
  }
  const wrap = h('article', { class: 'fiche' });
  wrap.appendChild(h('div', { class: 'notice fiche-sources' },
    h('strong', null, 'Sources : '),
    h('ul', null, f.sources.map(s => h('li', null, h('a', { href: s.file, target: '_blank', rel: 'noopener' }, s.label)))),
    f.note ? h('p', { style: 'margin:8px 0 0' }, f.note) : null));
  const icons = { def: '📘', key: '🔑', method: '🧭', code: '💻', pitfall: '⚠️', exam: '🎯' };
  f.sections.forEach(sec => {
    const box = h('section', { class: 'fiche-section ' + (sec.kind || '') },
      h('h3', null, h('span', { 'aria-hidden': 'true' }, icons[sec.kind] || '•'), sec.title));
    if (sec.items) box.appendChild(h('ul', null, sec.items.map(it => h('li', null, rich(it)))));
    if (sec.code) box.appendChild(h('pre', { class: 'block', tabindex: 0 }, sec.code));
    wrap.appendChild(box);
  });

  const done = Progress.ficheDone(c.id);
  const markBtn = h('button', { class: 'btn ' + (done ? 'ok' : ''), 'aria-pressed': String(done) }, done ? '✓ Fiche révisée' : 'Marquer comme révisée');
  markBtn.addEventListener('click', () => {
    const now = !Progress.ficheDone(c.id);
    Progress.setFiche(c.id, now);
    markBtn.setAttribute('aria-pressed', String(now));
    markBtn.className = 'btn ' + (now ? 'ok' : '');
    markBtn.textContent = now ? '✓ Fiche révisée' : 'Marquer comme révisée';
    toast(now ? 'Fiche marquée comme révisée.' : 'Marque retirée.');
  });
  wrap.appendChild(h('div', { class: 'fiche-actions no-print' },
    markBtn,
    h('button', { class: 'btn secondary', onclick: () => window.print() }, 'Imprimer la fiche'),
    h('a', { class: 'btn ghost', href: `#/revision/${m.id}/${c.id}/exercices` }, "Passer aux exercices →")));
  area.appendChild(wrap);
}

// ============================================================================
// Moteur d'exercices (questions ouvertes) — une question à la fois
// ============================================================================
// opts.items : [{ key, ex, label? }]
// opts.get(key) -> { a: réponse, s: 'ok'|'review', shown: bool }
// opts.set(key, patch)
function ExerciseRunner(root, opts) {
  const items = opts.items;
  let idx = 0;
  // reprendre au premier exercice non auto-évalué
  const firstTodo = items.findIndex(it => !opts.get(it.key).s);
  if (firstTodo > 0) idx = firstTodo;
  let showSummary = false;
  // une seule sauvegarde différée à la fois : vidée avant tout changement d'écran
  let pendingSave = null, pendingTimer = null;
  function flushPending() {
    clearTimeout(pendingTimer);
    pendingTimer = null;
    const fn = pendingSave;
    pendingSave = null;
    if (fn) fn();
  }
  onCleanup(flushPending);

  function status(it) { return opts.get(it.key).s; }

  function render() {
    flushPending();
    root.innerHTML = '';
    const wrap = h('div', { class: 'runner' });
    root.appendChild(wrap);
    if (showSummary) return renderSummary(wrap);

    const it = items[idx];
    const ex = it.ex;
    const st = opts.get(it.key);
    const done = items.filter(x => status(x)).length;

    const top = h('div', { class: 'runner-top' },
      h('span', null, `Exercice ${idx + 1} sur ${items.length}`),
      h('span', null, `${done} auto-évalué${done > 1 ? 's' : ''}`));
    if (opts.finishLabel) {
      top.appendChild(h('button', { class: 'btn ghost', style: 'min-height:36px', onclick: () => { showSummary = true; render(); } }, opts.finishLabel));
    }
    wrap.appendChild(top);
    wrap.appendChild(progressBar(idx + 1, items.length));

    const card = h('section', { class: 'q-card', 'aria-labelledby': 'ex-title' });
    const hintId = 'hint-' + idx;
    const head = h('div', { class: 'q-head' },
      h('div', null,
        it.label ? h('div', { class: 'muted small' }, it.label) : null,
        h('h2', { class: 'q-title', id: 'ex-title' }, ex.title)));
    let hintBox = null;
    if (ex.hint) {
      hintBox = h('div', { class: 'hint-box', id: hintId, hidden: true, role: 'note' },
        h('span', { 'aria-hidden': 'true' }, '💡'), h('p', null, ex.hint));
      const hintBtn = h('button', { class: 'icon-btn', 'aria-expanded': 'false', 'aria-controls': hintId, title: "Afficher l'indice", 'aria-label': "Afficher l'indice" }, '💡');
      const closeBtn = h('button', { class: 'close', 'aria-label': "Fermer l'indice" }, '×');
      const setHint = open => {
        hintBox.hidden = !open;
        hintBtn.setAttribute('aria-expanded', String(open));
        hintBtn.setAttribute('aria-label', open ? "Masquer l'indice" : "Afficher l'indice");
      };
      hintBtn.addEventListener('click', () => setHint(hintBox.hidden));
      closeBtn.addEventListener('click', () => { setHint(false); hintBtn.focus(); });
      hintBox.appendChild(closeBtn);
      head.appendChild(hintBtn);
    }
    card.appendChild(head);
    card.appendChild(h('p', { class: 'statement' + (looksLikeCode(ex.statement) ? ' code-like' : '') }, ex.statement));
    if (hintBox) card.appendChild(hintBox);

    const taId = 'answer-' + idx;
    const ta = h('textarea', { class: 'answer', id: taId, spellcheck: 'false', placeholder: 'Écris ta réponse ou ton code ici avant de regarder la correction…' });
    ta.value = st.a || '';
    const savedFlag = h('div', { class: 'saved-flag', 'aria-live': 'polite' }, st.a ? 'Réponse enregistrée' : '');
    ta.addEventListener('input', () => {
      clearTimeout(pendingTimer);
      savedFlag.textContent = '…';
      pendingSave = () => { opts.set(it.key, { a: ta.value }); savedFlag.textContent = 'Réponse enregistrée'; };
      pendingTimer = setTimeout(flushPending, 350);
    });
    card.appendChild(h('label', { class: 'field', for: taId }, 'Ta réponse (brouillon enregistré automatiquement)'));
    card.appendChild(ta);
    card.appendChild(savedFlag);

    const solId = 'sol-' + idx;
    const sol = longText(ex.solution, 'solution', { id: solId, hidden: !st.shown, 'aria-label': 'Correction' });
    const evalRow = h('div', { class: 'self-eval', hidden: !st.shown },
      h('span', { class: 'muted small' }, 'Ta réponse était-elle juste ?'));
    const okBtn = h('button', { class: 'btn ok', 'aria-pressed': String(st.s === 'ok') }, "✓ J'ai réussi");
    const revBtn = h('button', { class: 'btn warn', 'aria-pressed': String(st.s === 'review') }, '↻ À revoir');
    const setEval = v => {
      const cur = opts.get(it.key).s;
      const next = cur === v ? undefined : v;
      opts.set(it.key, { s: next });
      okBtn.setAttribute('aria-pressed', String(next === 'ok'));
      revBtn.setAttribute('aria-pressed', String(next === 'review'));
      renderSteps();
    };
    okBtn.addEventListener('click', () => setEval('ok'));
    revBtn.addEventListener('click', () => setEval('review'));
    evalRow.append(okBtn, revBtn);

    const showBtn = h('button', { class: 'btn secondary', 'aria-expanded': String(!!st.shown), 'aria-controls': solId }, st.shown ? 'Masquer la correction' : 'Voir la correction');
    showBtn.addEventListener('click', () => {
      const open = sol.hidden;
      sol.hidden = !open;
      evalRow.hidden = false;
      showBtn.setAttribute('aria-expanded', String(open));
      showBtn.textContent = open ? 'Masquer la correction' : 'Voir la correction';
      if (open) {
        if (ta.value !== (opts.get(it.key).a || '')) opts.set(it.key, { a: ta.value });
        opts.set(it.key, { shown: true });
      }
    });
    card.appendChild(h('div', { class: 'row' }, showBtn));
    card.appendChild(sol);
    card.appendChild(evalRow);

    const prev = h('button', { class: 'btn ghost', disabled: idx === 0 }, '← Précédent');
    prev.addEventListener('click', () => go(idx - 1));
    const last = idx === items.length - 1;
    const next = h('button', { class: 'btn' }, last ? 'Voir le bilan' : 'Suivant →');
    next.addEventListener('click', () => { if (last) { showSummary = true; render(); } else go(idx + 1); });
    card.appendChild(h('div', { class: 'nav-row' }, prev, next));

    const steps = h('div', { class: 'steps', role: 'list', 'aria-label': 'Aller à un exercice' });
    function renderSteps() {
      steps.innerHTML = '';
      items.forEach((x, i) => {
        const s = status(x);
        steps.appendChild(h('button', {
          class: 'step' + (i === idx ? ' current' : '') + (s === 'ok' ? ' ok' : s === 'review' ? ' review' : ''),
          role: 'listitem', 'aria-label': `Exercice ${i + 1}${s === 'ok' ? ', réussi' : s === 'review' ? ', à revoir' : ''}`,
          'aria-current': i === idx ? 'step' : undefined, onclick: () => go(i),
        }, String(i + 1)));
      });
    }
    renderSteps();
    card.appendChild(steps);
    wrap.appendChild(card);
  }

  function go(i) {
    idx = Math.max(0, Math.min(items.length - 1, i));
    showSummary = false;
    render();
    const top = root.getBoundingClientRect().top;
    if (top < 0) root.scrollIntoView({ block: 'start' });
  }

  function renderSummary(wrap) {
    const ok = items.filter(x => status(x) === 'ok');
    const review = items.filter(x => status(x) === 'review');
    const todo = items.filter(x => !status(x));
    if (opts.onFinish) opts.onFinish({ ok: ok.length, review: review.length, todo: todo.length });
    wrap.appendChild(h('section', { class: 'q-card' },
      h('div', { class: 'result-hero' },
        h('div', { class: 'big' }, `${ok.length} / ${items.length}`),
        h('p', { class: 'muted' }, 'exercices réussis (auto-évaluation)')),
      h('div', { class: 'row', style: 'justify-content:center' },
        h('span', { class: 'badge ok' }, `${ok.length} réussi${ok.length > 1 ? 's' : ''}`),
        h('span', { class: 'badge warn' }, `${review.length} à revoir`),
        h('span', { class: 'badge' }, `${todo.length} non évalué${todo.length > 1 ? 's' : ''}`))));

    const list = (title, arr) => {
      if (!arr.length) return;
      wrap.appendChild(h('div', { class: 'section-title' }, title));
      const s = h('div', { class: 'stack' });
      arr.forEach(x => {
        const i = items.indexOf(x);
        s.appendChild(h('div', { class: 'review-item row', style: 'justify-content:space-between' },
          h('div', null, x.label ? h('div', { class: 'muted small' }, x.label) : null, h('strong', null, `${i + 1}. ${x.ex.title}`)),
          h('button', { class: 'btn secondary', onclick: () => go(i) }, 'Reprendre')));
      });
      wrap.appendChild(s);
    };
    list('À revoir', review);
    list('Pas encore auto-évalués', todo);

    const actions = h('div', { class: 'nav-row' });
    if (opts.ficheHref) actions.appendChild(h('a', { class: 'btn secondary', href: opts.ficheHref }, 'Relire la fiche'));
    if (opts.extraActions) opts.extraActions.forEach(a => actions.appendChild(a));
    const reset = h('button', { class: 'btn ghost' }, opts.resetLabel || 'Recommencer');
    let armed = false;
    reset.addEventListener('click', () => {
      if (!armed) { armed = true; reset.textContent = 'Confirmer : tout effacer ?'; reset.classList.add('warn'); return; }
      pendingSave = null;
      items.forEach(x => opts.set(x.key, { a: undefined, s: undefined, shown: undefined }));
      idx = 0; showSummary = false; render();
      toast('Réponses effacées.');
    });
    if (!opts.hideReset) actions.appendChild(reset);
    wrap.appendChild(actions);
  }

  render();
  return { showSummary() { showSummary = true; render(); } };
}

// ============================================================================
// Moteur de QCM — une question à la fois, validation explicite, reprise
// ============================================================================
function isMulti(q) { return Array.isArray(q.correct); }
function correctSet(q) { return isMulti(q) ? q.correct.slice().sort() : [q.correct]; }
function sameSet(a, b) { const x = a.slice().sort(), y = b.slice().sort(); return x.length === y.length && x.every((v, i) => v === y[i]); }

function QuizRunner(root, opts) {
  const { m, key, questions } = opts;
  const store = () => { if (!Store.data.quiz[key]) Store.data.quiz[key] = {}; return Store.data.quiz[key]; };

  function newRun() {
    const order = shuffle(questions.map(x => x.idx));
    const opt = {};
    order.forEach(qi => {
      const q = m.qcm[qi];
      opt[qi] = q.fixedOrder ? q.options.map((_, i) => i) : shuffle(q.options.map((_, i) => i));
    });
    return { order, opt, sel: {}, val: {}, idx: 0, started: Date.now() };
  }
  function validRun(run) {
    if (!run || !Array.isArray(run.order) || !run.order.length) return false;
    const allowed = new Set(questions.map(x => x.idx));
    return run.order.length === allowed.size && run.order.every(qi => allowed.has(qi) && m.qcm[qi] && run.opt && Array.isArray(run.opt[qi]) && run.opt[qi].length === m.qcm[qi].options.length);
  }

  let run = store().run;
  let resumed = false;
  const hintOpen = {};          // état de l'ampoule par question (non persisté)
  let focusOption = null;       // option à re-focaliser après un re-rendu
  if (validRun(run)) resumed = Object.keys(run.val || {}).length > 0;
  else { run = null; }
  let view = run ? 'question' : (store().lastResult ? 'result' : 'question');
  if (!run && view === 'question') { run = newRun(); store().run = run; Store.save(); }

  const save = () => { store().run = run; Store.save(); };

  function render() {
    root.innerHTML = '';
    const wrap = h('div', { class: 'runner' });
    root.appendChild(wrap);
    if (view === 'result') return renderResult(wrap);

    const qi = run.order[run.idx];
    const q = m.qcm[qi];
    const multi = isMulti(q);
    const validated = !!run.val[qi];
    const sel = run.sel[qi] || [];
    const answered = Object.keys(run.val).length;

    if (resumed && run.idx === firstUnvalidated()) {
      const restart = h('button', { class: 'btn ghost', onclick: () => { run = newRun(); resumed = false; save(); render(); } }, 'Recommencer à zéro');
      wrap.appendChild(h('div', { class: 'notice row', style: 'justify-content:space-between;margin-bottom:14px' },
        h('span', null, `Reprise de ta tentative en cours (${answered} question${answered > 1 ? 's' : ''} déjà validée${answered > 1 ? 's' : ''}).`), restart));
    }

    wrap.appendChild(h('div', { class: 'runner-top' },
      h('span', null, `Question ${run.idx + 1} sur ${run.order.length}`),
      h('span', null, `Score : ${scoreOf().score} / ${answered}`)));
    wrap.appendChild(progressBar(run.idx + 1, run.order.length));

    const card = h('section', { class: 'q-card', 'aria-labelledby': 'q-title' });
    const hintId = 'qhint-' + qi;
    const hintBox = h('div', { class: 'hint-box', id: hintId, hidden: true, role: 'note' }, h('span', { 'aria-hidden': 'true' }, '💡'), h('p', null, q.hint || "Pas d'indice pour cette question."));
    const hintBtn = h('button', { class: 'icon-btn', 'aria-expanded': 'false', 'aria-controls': hintId, title: "Afficher l'indice", 'aria-label': "Afficher l'indice" }, '💡');
    const closeBtn = h('button', { class: 'close', 'aria-label': "Fermer l'indice" }, '×');
    const setHint = open => { hintOpen[qi] = open; hintBox.hidden = !open; hintBtn.setAttribute('aria-expanded', String(open)); hintBtn.setAttribute('aria-label', open ? "Masquer l'indice" : "Afficher l'indice"); };
    if (hintOpen[qi]) setHint(true);
    hintBtn.addEventListener('click', () => setHint(hintBox.hidden));
    closeBtn.addEventListener('click', () => { setHint(false); hintBtn.focus(); });
    hintBox.appendChild(closeBtn);

    card.appendChild(h('div', { class: 'q-head' }, h('h2', { class: 'q-title', id: 'q-title' }, q.q), hintBtn));
    const typeLabel = q.fixedOrder && q.options.length === 2 ? 'Vrai ou faux' : multi ? 'Plusieurs réponses possibles' : 'Une seule réponse';
    card.appendChild(h('p', { class: 'q-type' }, typeLabel));
    card.appendChild(hintBox);

    const group = h('div', { role: multi ? 'group' : 'radiogroup', 'aria-labelledby': 'q-title' });
    const good = correctSet(q);
    run.opt[qi].forEach(oi => {
      const checked = sel.includes(oi);
      let cls = 'option' + (multi ? ' multi' : '');
      let mark = checked ? '✓' : '';
      if (validated) {
        if (good.includes(oi)) { cls += ' correct'; mark = '✓'; }
        else if (checked) { cls += ' incorrect'; mark = '✕'; }
      }
      const b = h('button', { class: cls, role: multi ? 'checkbox' : 'radio', 'aria-checked': String(checked), disabled: validated, 'data-oi': oi },
        h('span', { class: 'mark', 'aria-hidden': 'true' }, mark), h('span', null, q.options[oi]));
      b.addEventListener('click', () => {
        if (run.val[qi]) return;
        let s = (run.sel[qi] || []).slice();
        if (multi) s = s.includes(oi) ? s.filter(x => x !== oi) : s.concat(oi);
        else s = [oi];
        run.sel[qi] = s;
        save();
        focusOption = oi;
        render();
      });
      group.appendChild(b);
    });
    card.appendChild(group);

    if (validated) {
      const right = sameSet(sel, good);
      card.appendChild(h('div', { class: 'notice feedback ' + (right ? 'ok' : 'bad'), role: 'status' },
        h('strong', null, right ? '✓ Bonne réponse' : '✕ Réponse incorrecte'),
        !right ? h('div', null, 'Bonne réponse : ', good.map(i => q.options[i]).join(' ; ')) : null,
        h('div', { style: 'margin-top:6px' }, q.explain)));
    }

    const prev = h('button', { class: 'btn ghost', disabled: run.idx === 0 }, '← Précédent');
    prev.addEventListener('click', () => { run.idx--; save(); render(); });
    const lastQ = run.idx === run.order.length - 1;
    let main;
    if (!validated) {
      main = h('button', { class: 'btn', disabled: sel.length === 0 }, 'Valider');
      main.addEventListener('click', () => {
        if (run.val[qi] || !(run.sel[qi] || []).length) return;   // pas de double validation
        run.val[qi] = true;
        save();
        render();
      });
    } else if (lastQ && Object.keys(run.val).length === run.order.length) {
      main = h('button', { class: 'btn' }, 'Voir le bilan');
      main.addEventListener('click', finish);
    } else if (lastQ) {
      main = h('button', { class: 'btn' }, 'Questions non validées →');
      main.addEventListener('click', () => { run.idx = firstUnvalidated(); save(); render(); });
    } else {
      main = h('button', { class: 'btn' }, 'Question suivante →');
      main.addEventListener('click', () => { run.idx++; save(); render(); });
    }
    card.appendChild(h('div', { class: 'nav-row' }, prev, main));

    const steps = h('div', { class: 'steps', role: 'list', 'aria-label': 'Aller à une question' });
    run.order.forEach((qj, i) => {
      let cls = 'step' + (i === run.idx ? ' current' : '');
      let state = '';
      if (run.val[qj]) {
        const r = sameSet(run.sel[qj] || [], correctSet(m.qcm[qj]));
        cls += r ? ' ok' : ' bad';
        state = r ? ', juste' : ', faux';
      }
      steps.appendChild(h('button', { class: cls, role: 'listitem', 'aria-label': `Question ${i + 1}${state}`, 'aria-current': i === run.idx ? 'step' : undefined,
        onclick: () => { run.idx = i; save(); render(); } }, String(i + 1)));
    });
    card.appendChild(steps);
    wrap.appendChild(card);
    if (validated) resumed = false;
    if (focusOption !== null) {
      const el = group.querySelector(`[data-oi="${focusOption}"]`);
      focusOption = null;
      if (el) el.focus({ preventScroll: true });
    }
  }

  function firstUnvalidated() {
    const i = run.order.findIndex(qi => !run.val[qi]);
    return i === -1 ? run.order.length - 1 : i;
  }

  function scoreOf() {
    let score = 0;
    const wrong = [];
    run.order.forEach(qi => {
      if (!run.val[qi]) return;
      const q = m.qcm[qi];
      if (sameSet(run.sel[qi] || [], correctSet(q))) score++;
      else wrong.push({ qi, sel: run.sel[qi] || [] });
    });
    return { score, wrong };
  }

  function finish() {
    if (!run || run.finished) return;          // garde contre le double comptage
    run.finished = true;
    const { score, wrong } = scoreOf();
    const total = run.order.length;
    const st = store();
    const result = { score, total, date: Date.now(), wrong };
    st.last = { score, total, date: result.date };
    if (!st.best || score / total > st.best.score / st.best.total) st.best = { score, total, date: result.date };
    st.attempts = (st.attempts || 0) + 1;
    st.lastResult = result;
    delete st.run;
    Store.save();
    run = null;
    view = 'result';
    render();
    pageOuter.scrollTop = 0;
  }

  function renderResult(wrap) {
    const res = store().lastResult;
    if (!res) { view = 'question'; run = newRun(); save(); return render(); }
    const p = pct(res.score, res.total);
    const msg = p >= 80 ? 'Très solide.' : p >= 50 ? 'Pas mal : quelques notions à consolider.' : 'Relis les fiches indiquées puis retente le QCM.';
    wrap.appendChild(h('section', { class: 'q-card' },
      h('div', { class: 'result-hero' },
        h('div', { class: 'big' }, `${res.score} / ${res.total}`),
        h('p', { class: 'muted' }, `${p} % de bonnes réponses — ${msg}`),
        store().best ? h('p', { class: 'small muted', style: 'margin:0' }, `Meilleur score : ${store().best.score} / ${store().best.total} · ${store().attempts || 1} tentative(s)`) : null)));

    const wrong = (res.wrong || []).filter(w => m.qcm[w.qi]);
    if (wrong.length) {
      const chapIds = [...new Set(wrong.map(w => m.qcm[w.qi].chap))];
      wrap.appendChild(h('div', { class: 'section-title' }, 'Notions à réviser'));
      wrap.appendChild(h('div', { class: 'stack' }, chapIds.map(cid => {
        const c = findChapter(m, cid);
        const n = wrong.filter(w => m.qcm[w.qi].chap === cid).length;
        return c ? h('a', { class: 'card row', style: 'justify-content:space-between', href: `#/revision/${m.id}/${c.id}/fiche` },
          h('span', null, h('strong', null, c.title), h('span', { class: 'muted small' }, ` — ${n} erreur${n > 1 ? 's' : ''}`)),
          h('span', { class: 'badge accent' }, 'Relire la fiche →')) : null;
      })));
      wrap.appendChild(h('div', { class: 'section-title' }, `Corrections (${wrong.length} erreur${wrong.length > 1 ? 's' : ''})`));
      wrap.appendChild(h('div', { class: 'stack' }, wrong.map(w => {
        const q = m.qcm[w.qi];
        return h('div', { class: 'review-item' },
          h('p', null, h('strong', null, q.q)),
          h('p', { class: 'small', style: 'color:#fbb4b4' }, 'Ta réponse : ', w.sel.length ? w.sel.map(i => q.options[i]).join(' ; ') : '—'),
          h('p', { class: 'small', style: 'color:#a7f0c2' }, 'Bonne réponse : ', correctSet(q).map(i => q.options[i]).join(' ; ')),
          h('p', { class: 'small muted' }, q.explain));
      })));
    } else {
      wrap.appendChild(h('p', { class: 'notice ok', style: 'margin-top:16px' }, 'Aucune erreur : bravo !'));
    }
    const again = h('button', { class: 'btn' }, 'Recommencer le QCM');
    again.addEventListener('click', () => { run = newRun(); view = 'question'; resumed = false; save(); render(); pageOuter.scrollTop = 0; });
    wrap.appendChild(h('div', { class: 'nav-row' }, again, opts.backHref ? h('a', { class: 'btn secondary', href: opts.backHref }, opts.backLabel || 'Retour') : null));
  }

  render();
}

function viewQuizPage(mid) {
  const m = findMatiere(mid);
  if (!m) return viewNotFound('Matière introuvable.');
  setTitle('QCM — ' + m.name);
  page.appendChild(h('a', { class: 'back-link', href: `#/revision/${m.id}` }, '← ' + m.name));
  page.appendChild(h('h1', null, 'QCM — ' + m.name));
  page.appendChild(h('p', { class: 'lead' }, `${m.qcm.length} questions mélangées sur tous les chapitres. Valide chaque réponse pour voir la correction ; le bilan indique les fiches à relire.`));
  const area = h('div');
  page.appendChild(area);
  QuizRunner(area, { m, key: m.id, questions: m.qcm.map((q, idx) => ({ q, idx })), backHref: `#/revision/${m.id}`, backLabel: 'Retour aux chapitres' });
}

// ============================================================================
// Partiels blancs
// ============================================================================
const PARTIEL_SIZE = 8;
const PARTIEL_MINUTES = 60;

function buildPartiel(m) {
  // au moins un exercice par chapitre, puis complément aléatoire ; hors approfondissements
  const byChap = m.revision.map(c => shuffle(c.exercises.filter(ex => !isApprofondissement(ex)).map(ex => exKey(c.id, ex))));
  const picked = [];
  shuffle(byChap).forEach(list => { if (list.length && picked.length < PARTIEL_SIZE) picked.push(list.shift()); });
  const rest = shuffle(byChap.flat());
  while (picked.length < PARTIEL_SIZE && rest.length) picked.push(rest.shift());
  return shuffle(picked);
}

function resolveKey(m, key) {
  const sep = key.indexOf('::');
  const c = findChapter(m, key.slice(0, sep));
  const ex = c && c.exercises.find(e => e.title === key.slice(sep + 2));
  return ex ? { key, ex, label: c.title } : null;
}

function viewPartiels(mid) {
  const m = mid ? findMatiere(mid) : MATIERES[0];
  if (!m) return viewNotFound('Matière introuvable.');
  setTitle('Partiels blancs');
  page.appendChild(h('h1', null, 'Partiels blancs'));
  page.appendChild(h('p', { class: 'lead' }, `${PARTIEL_SIZE} exercices tirés au hasard dans les chapitres (au moins un par chapitre), différents à chaque partiel. Le minuteur de ${PARTIEL_MINUTES} minutes est optionnel.`));
  page.appendChild(matiereTabs('#/partiels', m.id));

  const att = Store.data.partiel[m.id];
  const card = h('section', { class: 'card', style: 'max-width:560px' });
  card.appendChild(h('h2', null, 'Partiel blanc — ' + m.name));

  if (att && !att.finished && Array.isArray(att.keys)) {
    const done = att.keys.filter(k => (att.answers[k] || {}).s).length;
    card.appendChild(h('p', { class: 'notice' }, `Un partiel est en cours : ${done} / ${att.keys.length} exercices auto-évalués${att.endsAt ? ', minuteur activé' : ''}.`));
    card.appendChild(h('div', { class: 'row', style: 'margin-top:14px' },
      h('a', { class: 'btn', href: `#/partiels/${m.id}/session` }, 'Reprendre le partiel'),
      h('button', { class: 'btn ghost', onclick: () => { delete Store.data.partiel[m.id]; Store.save(); route(); } }, 'Abandonner')));
  } else {
    if (att && att.finished && att.result) {
      card.appendChild(h('p', { class: 'notice ok' }, `Dernier partiel : ${att.result.ok} / ${att.keys.length} exercices réussis.`));
    }
    const cb = h('input', { type: 'checkbox', id: 'timerToggle' });
    card.appendChild(h('label', { class: 'switch', for: 'timerToggle' }, cb, h('span', { class: 'track', 'aria-hidden': 'true' }),
      h('span', null, h('strong', null, `Minuteur de ${PARTIEL_MINUTES} minutes`), h('br'), h('span', { class: 'muted small' }, 'Désactivé par défaut. Le temps continue même si tu recharges la page.'))));
    const start = h('button', { class: 'btn', style: 'margin-top:12px' }, 'Commencer le partiel blanc');
    start.addEventListener('click', () => {
      const keys = buildPartiel(m);
      Store.data.partiel[m.id] = {
        keys, answers: {}, startedAt: Date.now(),
        endsAt: cb.checked ? Date.now() + PARTIEL_MINUTES * 60000 : null, finished: false,
      };
      Store.save();
      location.hash = `#/partiels/${m.id}/session`;
    });
    card.appendChild(start);
  }
  page.appendChild(card);
}

function viewPartielSession(mid) {
  const m = findMatiere(mid);
  if (!m) return viewNotFound('Matière introuvable.');
  const att = Store.data.partiel[m.id];
  if (!att || !Array.isArray(att.keys)) { location.replace(`#/partiels/${m.id}`); return; }
  const items = att.keys.map(k => resolveKey(m, k)).filter(Boolean);
  if (!items.length) { delete Store.data.partiel[m.id]; Store.save(); location.replace(`#/partiels/${m.id}`); return; }
  setTitle('Partiel blanc — ' + m.name);

  page.appendChild(h('a', { class: 'back-link', href: `#/partiels/${m.id}` }, '← Partiels blancs'));
  page.appendChild(h('h1', null, 'Partiel blanc — ' + m.name));

  if (att.endsAt && !att.finished) {
    const bar = h('div', { class: 'timer-bar', role: 'timer', 'aria-live': 'off' },
      h('span', { class: 'small muted' }, 'Temps restant'), h('span', { class: 'time' }, '--:--'));
    const time = bar.querySelector('.time');
    let warned = att.endsAt - Date.now() <= 0;
    const tick = () => {
      const left = Math.max(0, Math.round((att.endsAt - Date.now()) / 1000));
      time.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
      bar.classList.toggle('low', left > 0 && left <= 300);
      bar.classList.toggle('over', left === 0);
      if (left === 0 && !warned) { warned = true; toast('Temps écoulé ! Termine ta réponse puis consulte le bilan.'); }
    };
    tick();
    const iv = setInterval(tick, 1000);
    onCleanup(() => clearInterval(iv));          // aucun minuteur ne survit à un changement de page
    page.appendChild(bar);
  }

  const area = h('div');
  page.appendChild(area);
  const finishBtn = h('button', { class: 'btn secondary' }, 'Nouveau partiel');
  finishBtn.addEventListener('click', () => { delete Store.data.partiel[m.id]; Store.save(); location.hash = `#/partiels/${m.id}`; });
  const runner = ExerciseRunner(area, {
    items,
    get: key => att.answers[key] || {},
    set: (key, patch) => {
      const cur = Object.assign({}, att.answers[key], patch);
      Object.keys(cur).forEach(k => { if (cur[k] === undefined || cur[k] === '') delete cur[k]; });
      att.answers[key] = cur;
      Store.save();
    },
    onFinish: r => { if (!att.finished) { att.finished = true; att.result = r; att.finishedAt = Date.now(); Store.save(); } },
    extraActions: [finishBtn],
    hideReset: true,
    finishLabel: att.finished ? null : 'Terminer le partiel',
  });
  if (att.finished) runner.showSummary();
}

// ============================================================================
// Démarrage
// ============================================================================
// Garde-fou : si le navigateur a mélangé des fichiers de deux versions du site
// (cache), on recharge une fois en contournant le cache plutôt que d'afficher une page cassée.
function dataLooksCurrent() {
  try {
    return typeof DATA !== 'undefined' && typeof FICHES !== 'undefined' &&
      DATA.every(m => Array.isArray(m.revision) && m.revision.length && Array.isArray(m.qcm) && m.qcm.every(q => q.chap && q.hint));
  } catch (e) { return false; }
}
if (!dataLooksCurrent()) {
  let tried = false;
  try { tried = sessionStorage.getItem('mipi-reload') === '1'; sessionStorage.setItem('mipi-reload', '1'); } catch (e) { tried = true; }
  if (!tried) {
    const u = new URL(location.href);
    u.searchParams.set('r', Date.now());
    location.replace(u.toString());
  } else {
    document.getElementById('pageInner').appendChild(h('div', { class: 'empty' },
      h('h1', null, 'Mise à jour du site'),
      h('p', null, 'Une ancienne version est restée en cache. Recharge la page avec Ctrl + F5 (ou vide le cache du navigateur).')));
  }
} else {
  try { sessionStorage.removeItem('mipi-reload'); } catch (e) { /* ignore */ }
  window.addEventListener('hashchange', route);
  route();
}
