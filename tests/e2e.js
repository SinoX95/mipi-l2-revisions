// Tests navigateur (Playwright) : voir README, section Tests
// Suite de tests de bout en bout (Playwright / Chromium) — Révisions MIPI L2
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
const results = [];
let current = '';
function check(cond, msg) { results.push({ ok: !!cond, msg: `[${current}] ${msg}` }); if (!cond) console.log('  ✗', current, '—', msg); }

async function newPage(browser, width, height = 820, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: width < 800, isMobile: width < 800, ...opts });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', e => page.errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') page.errors.push('console: ' + m.text()); });
  page.on('requestfailed', r => { const f = (r.failure() || {}).errorText || ''; if (!/ERR_ABORTED/.test(f)) page.errors.push('requestfailed: ' + r.url() + ' ' + f); });
  return { ctx, page };
}

async function layoutAudit(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const over = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('[hidden]')) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) { const s = getComputedStyle(p).overflowX; if (s === 'auto' || s === 'scroll' || s === 'hidden') { clipped = true; break; } p = p.parentElement; }
      if (!clipped && (r.right > vw + 1 || r.left < -1)) over.push(`${el.tagName}.${el.className}`.slice(0, 60));
    });
    const small = [];
    document.querySelectorAll('button, a.btn, .navlink, .tab, .doc-link, .tabbar a, .step, .option').forEach(el => {
      if (el.closest('[hidden]')) return;
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.height < 36 || r.width < 36)) small.push(`${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 20)}(${Math.round(r.width)}x${Math.round(r.height)})`);
    });
    const page = document.getElementById('page');
    return { scrollW: document.documentElement.scrollWidth, vw, over: [...new Set(over)].slice(0, 5), small: small.slice(0, 5), pageScrollW: page.scrollWidth, pageW: page.clientWidth };
  });
}

const qcmAnswer = (page, correct) => page.evaluate(({ correct }) => {
  // renvoie, pour la question affichée, les index d'options (dans l'ordre affiché) à cliquer
  const title = document.querySelector('#q-title').textContent;
  for (const m of DATA) {
    const q = m.qcm.find(x => x.q === title);
    if (!q) continue;
    const good = Array.isArray(q.correct) ? q.correct : [q.correct];
    const shown = [...document.querySelectorAll('.option')].map(b => b.querySelector('span:last-child').textContent);
    const goodTexts = good.map(i => q.options[i]);
    if (correct) return shown.map((t, i) => goodTexts.includes(t) ? i : -1).filter(i => i >= 0);
    const bad = shown.findIndex(t => !goodTexts.includes(t));
    return [bad];
  }
  return [];
}, { correct });

(async () => {
  const browser = await chromium.launch();

  // ---------------------------------------------------------------- 1. responsive
  const widths = [320, 375, 390, 768, 1024, 1440];
  const routes = ['#/', '#/cours', '#/cours/uml/1', '#/annales', '#/revision', '#/revision/c', '#/revision/c/c-c2/fiche',
    '#/revision/c/c-c2/exercices', '#/revision/java/java-c4/qcm', '#/quiz/uml', '#/partiels/java', '#/introuvable', '#/revision/xx/yy'];
  for (const w of widths) {
    current = `responsive ${w}px`;
    const { ctx, page } = await newPage(browser, w);
    await page.goto(BASE);
    for (const r of routes) {
      await page.goto(BASE + r);
      await page.waitForTimeout(120);
      // ouvre les blocs repliés pour mesurer aussi leur contenu
      await page.evaluate(() => document.querySelectorAll('.annale [aria-expanded="false"]').forEach(b => b.click()));
      const a = await layoutAudit(page);
      check(a.scrollW <= a.vw && a.pageScrollW <= a.pageW + 1, `${r} : pas de défilement horizontal (doc ${a.scrollW}/${a.vw}, page ${a.pageScrollW}/${a.pageW})`);
      check(a.over.length === 0, `${r} : aucun élément ne dépasse de l'écran ${a.over.join(', ')}`);
      check(a.small.length === 0, `${r} : cibles tactiles ≥ 36 px ${a.small.join(', ')}`);
      if (w <= 760) {
        check(await page.locator('#tabbar').isVisible(), `${r} : barre d'onglets mobile visible`);
        check(!(await page.locator('#navLinks').isVisible()), `${r} : liens desktop masqués`);
      } else {
        check(await page.locator('#navLinks').isVisible(), `${r} : navigation desktop visible`);
      }
      if (['#/', '#/annales', '#/revision/c/c-c2/fiche'].includes(r)) await page.screenshot({ path: `after_${w}_${r.replace(/[#/]/g, '_')}.png` });
    }
    check(page.errors.length === 0, `aucune erreur console/réseau ${page.errors.slice(0, 3).join(' | ')}`);
    await ctx.close();
  }

  // ---------------------------------------------------------------- 2. navigation & routage
  current = 'navigation';
  {
    const { ctx, page } = await newPage(browser, 1280);
    await page.goto(BASE);
    for (const [label, hash] of [['Cours', '#/cours'], ['Annales', '#/annales'], ['Révision', '#/revision'], ['Partiels blancs', '#/partiels'], ['Accueil', '#/']]) {
      await page.locator('#navLinks a', { hasText: label }).click();
      await page.waitForTimeout(80);
      check(await page.evaluate(() => location.hash) === hash, `clic « ${label} » → ${hash}`);
      check(await page.locator(`#navLinks a[aria-current="page"]`).textContent() === label, `onglet actif « ${label} »`);
    }
    await page.goto(BASE + '#/revision/uml/uml-c4/fiche');
    await page.goto(BASE + '#/annales');
    await page.goBack();
    await page.waitForTimeout(100);
    check((await page.locator('h1').textContent()).includes("cas d'utilisation"), 'bouton retour du navigateur → page précédente');
    await page.reload();
    check((await page.locator('h1').textContent()).includes("cas d'utilisation"), 'rechargement → même page');
    await page.goto(BASE + '#/nimporte');
    check(await page.locator('h1', { hasText: 'Page introuvable' }).count() === 1, 'route inconnue → page introuvable');
    await page.goto(BASE + '#/revision/uml/pas-un-chapitre');
    check(await page.locator('text=Chapitre introuvable').count() === 1, 'chapitre inconnu → message clair');
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
  }

  // ---------------------------------------------------------------- 3. cours
  current = 'cours';
  {
    const { ctx, page } = await newPage(browser, 1280);
    await page.goto(BASE + '#/cours');
    await page.locator('.doc-link', { hasText: 'CM4-5 — Axe statique' }).click();
    await page.waitForTimeout(150);
    check((await page.locator('.viewer iframe').getAttribute('src')) === 'pdfs/uml/cm45-axe-statique.pdf', 'desktop : le PDF s\'affiche dans le lecteur');
    await page.reload();
    check(await page.locator('.viewer iframe').count() === 1, 'desktop : document conservé au rechargement');
    const head = page.locator('.acc-head', { hasText: 'POO & Java' });
    await head.click();
    check(await head.getAttribute('aria-expanded') === 'true', 'accordéon Java ouvrable (aria-expanded)');
    const res = await page.request.get(BASE + 'pdfs/uml/cm45-axe-statique.pdf');
    check(res.ok() && (res.headers()['content-type'] || '').includes('pdf'), 'le fichier PDF est servi');
    await ctx.close();
    const m = await newPage(browser, 375);
    await m.page.goto(BASE + '#/cours');
    await m.page.locator('.acc-head', { hasText: 'Introduction au langage C' }).click();
    const link = m.page.locator('.doc-link', { hasText: 'CM2 — Les pointeurs' });
    check(await link.getAttribute('target') === '_blank' && (await link.getAttribute('href')) === 'pdfs/c/cm2-pointeurs.pdf', 'mobile : PDF ouvert dans le lecteur natif (nouvel onglet)');
    await m.ctx.close();
  }

  // ---------------------------------------------------------------- 4. annales
  current = 'annales';
  {
    const { ctx, page } = await newPage(browser, 390);
    await page.goto(BASE + '#/annales');
    check(await page.locator('.annale').count() === 5, '5 annales affichées');
    const first = page.locator('.annale').first();
    const btn = first.locator('button[aria-controls^="corr-"]');
    await btn.click();
    check(await first.locator('.longtext.solution').isVisible(), 'correction affichée');
    check(await btn.getAttribute('aria-expanded') === 'true', 'aria-expanded mis à jour');
    const c = page.locator('.annale', { hasText: "Sujet type — Langage C" });
    await c.locator('button[aria-controls^="suj-"]').click();
    check(await c.locator('.longtext').first().isVisible(), 'sujet maison (C) affichable');
    check(await c.locator('.badge', { hasText: "Sujet d'entraînement" }).count() === 1, 'sujet C marqué comme non officiel');
    const parts = await first.locator('.longtext.solution').evaluate(e => ({
      diagramPre: [...e.querySelectorAll('.part-code')].some(p => /[─│△]/.test(p.textContent) && getComputedStyle(p).whiteSpace === 'pre'),
      proseWraps: [...e.querySelectorAll('.part-prose')].every(p => p.scrollWidth <= p.clientWidth + 1),
      nProse: e.querySelectorAll('.part-prose').length }));
    check(parts.diagramPre, 'schémas ASCII intacts (défilement interne)');
    check(parts.nProse > 0 && parts.proseWraps, 'la prose du corrigé revient à la ligne sur mobile');
    await ctx.close();
  }

  // ---------------------------------------------------------------- 5. fiches
  current = 'fiches';
  {
    const { ctx, page } = await newPage(browser, 390);
    for (const m of ['uml', 'java', 'c']) {
      await page.goto(BASE + '#/revision/' + m);
      const n = await page.locator('.chapter-card').count();
      const chapIds = await page.evaluate(mid => DATA.find(x => x.id === mid).revision.map(c => c.id), m);
      check(n === chapIds.length + 1, `${m} : ${chapIds.length} chapitres + QCM matière`);
      for (const cid of chapIds) {
        await page.goto(BASE + `#/revision/${m}/${cid}/fiche`);
        const sections = await page.locator('.fiche-section').count();
        check(sections >= 4, `${cid} : fiche affichée (${sections} sections)`);
        check(await page.locator('.fiche-sources a').count() >= 1, `${cid} : sources liées`);
      }
    }
    await page.goto(BASE + '#/revision/c/c-c5/fiche');
    await page.locator('button', { hasText: 'Marquer comme révisée' }).click();
    await page.reload();
    check(await page.locator('button[aria-pressed="true"]', { hasText: 'Fiche révisée' }).count() === 1, 'fiche révisée conservée après rechargement');
    await page.goto(BASE + '#/revision/c');
    check(await page.locator('.chapter-card', { hasText: 'Structures' }).locator('.badge', { hasText: 'Fiche révisée' }).count() === 1, 'statut visible sur la carte chapitre');
    await page.goto(BASE + '#/');
    check((await page.locator('.matiere-card', { hasText: 'langage C' }).textContent()).includes('1 / 5'), 'progression des fiches sur l\'accueil');
    check(await page.locator('button', { hasText: 'Imprimer' }).count() === 0, '(accueil) pas de bouton imprimer hors fiche');
    await page.goto(BASE + '#/revision/c/c-c5/fiche');
    check(await page.locator('button', { hasText: 'Imprimer la fiche' }).count() === 1, 'bouton imprimer présent');
    await page.emulateMedia({ media: 'print' });
    check(!(await page.locator('#tabbar').isVisible()) && !(await page.locator('.fiche-actions').isVisible()), 'impression : navigation et boutons masqués');
    await page.emulateMedia({ media: 'screen' });
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
  }

  // ---------------------------------------------------------------- 6. exercices
  current = 'exercices';
  {
    const { ctx, page } = await newPage(browser, 375);
    await page.goto(BASE + '#/revision/c/c-c2/exercices');
    check(await page.locator('.q-card').count() === 1, 'un seul exercice affiché à la fois');
    check((await page.locator('.runner-top').textContent()).includes('Exercice 1 sur 12'), 'indicateur « Exercice 1 sur 12 »');
    check(await page.locator('.runner [role="progressbar"]').count() === 1, 'barre de progression');
    const hintBtn = page.locator('.q-card .icon-btn');
    check(await page.locator('.hint-box').isHidden(), 'indice masqué par défaut');
    await page.fill('textarea.answer', 'ma réponse 1');
    await hintBtn.click();
    check(await page.locator('.hint-box').isVisible() && await hintBtn.getAttribute('aria-expanded') === 'true', 'clic ampoule → indice affiché');
    await page.locator('.hint-box .close').click();
    check(await page.locator('.hint-box').isHidden(), 'indice refermable');
    check(await page.inputValue('textarea.answer') === 'ma réponse 1', 'réponse conservée après fermeture de l\'indice');
    const hintText = await page.locator('.hint-box p').textContent();
    await page.locator('button', { hasText: 'Voir la correction' }).click();
    const sol = await page.locator('.longtext.solution').textContent();
    check(sol.trim() !== hintText.trim(), 'indice différent de la correction');
    await page.locator('button', { hasText: "J'ai réussi" }).click();
    check(await page.locator('.step.ok').count() === 1, 'auto-évaluation enregistrée (pastille verte)');
    await page.locator('button', { hasText: 'Suivant' }).click();
    check((await page.locator('.runner-top').textContent()).includes('Exercice 2 sur 12'), 'navigation Suivant');
    check(await page.inputValue('textarea.answer') === '', 'pas de mélange : exercice 2 vierge');
    await page.fill('textarea.answer', 'réponse ex2');
    await page.locator('button', { hasText: 'Précédent' }).click();
    check(await page.inputValue('textarea.answer') === 'ma réponse 1', 'retour arrière : réponse de l\'exercice 1 conservée');
    await page.reload();
    await page.locator('.step', { hasText: /^2$/ }).click();
    check(await page.inputValue('textarea.answer') === 'réponse ex2', 'réponse conservée après rechargement');
    await page.locator('.step', { hasText: /^12$/ }).click();
    await page.locator('button', { hasText: 'Voir le bilan' }).click();
    const bilan = await page.locator('.result-hero').textContent();
    check(bilan.includes('1 / 12'), 'bilan : 1 réussi sur 12');
    check(await page.locator('.review-item').count() === 11, 'bilan : liste des 11 exercices non évalués');
    await page.goto(BASE + '#/revision/c/c-c4/exercices');
    check(await page.inputValue('textarea.answer') === '', 'autre chapitre : réponses non mélangées');
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
  }

  // ---------------------------------------------------------------- 7. QCM
  current = 'qcm';
  {
    const { ctx, page } = await newPage(browser, 390);
    await page.goto(BASE + '#/revision/uml/uml-c4/qcm');
    const total = await page.evaluate(() => DATA[0].qcm.filter(q => q.chap === 'uml-c4').length);
    check(await page.locator('.q-card').count() === 1, 'une seule question à la fois');
    check((await page.locator('.runner-top').textContent()).includes(`Question 1 sur ${total}`), `indicateur « Question 1 sur ${total} »`);
    check(await page.locator('button', { hasText: 'Valider' }).isDisabled(), 'Valider désactivé tant que rien n\'est choisi');
    await page.locator('.q-card .icon-btn').click();
    check(await page.locator('.hint-box').isVisible(), 'ampoule → indice');
    // réponse fausse à la Q1
    const wrong = await qcmAnswer(page, false);
    await page.locator('.option').nth(wrong[0]).click();
    check(await page.locator('.hint-box').isVisible(), 'choisir une réponse ne referme pas l\'indice');
    await page.locator('button', { hasText: 'Valider' }).click();
    check(await page.locator('.feedback.bad').count() === 1, 'correction pédagogique affichée (réponse incorrecte)');
    check(await page.locator('.option.correct').count() >= 1, 'bonne réponse mise en évidence');
    check(await page.locator('.option:disabled').count() === await page.locator('.option').count(), 'options verrouillées après validation');
    check(await page.locator('button', { hasText: 'Valider' }).count() === 0, 'pas de double validation possible');
    // Q2..n justes
    for (let i = 1; i < total; i++) {
      await page.locator('button', { hasText: 'Question suivante' }).click();
      if (i === 1) {
        await page.reload();
        check(await page.locator('.notice', { hasText: 'Reprise' }).count() === 1, 'reprise après rechargement en cours de QCM');
        check((await page.locator('.runner-top').textContent()).includes('Question 2'), 'position conservée');
      }
      const good = await qcmAnswer(page, true);
      for (const g of good) await page.locator('.option').nth(g).click();
      await page.locator('button', { hasText: 'Valider' }).click();
      check(await page.locator('.feedback.ok').count() === 1, `Q${i + 1} juste reconnue ${good.length > 1 ? '(réponses multiples)' : ''}`);
    }
    await page.locator('.step', { hasText: /^1$/ }).click();
    check(await page.locator('.feedback.bad').count() === 1, 'retour en arrière : la réponse et la correction de Q1 sont conservées');
    await page.locator('.step', { hasText: new RegExp('^' + total + '$') }).click();
    await page.locator('button', { hasText: 'Voir le bilan' }).click();
    const hero = await page.locator('.result-hero .big').textContent();
    check(hero.trim() === `${total - 1} / ${total}`, `score ${total - 1}/${total} (obtenu : ${hero})`);
    check(await page.locator('.review-item').count() === 1, 'bilan : la question ratée avec sa correction');
    check(await page.locator('a', { hasText: 'Relire la fiche' }).count() >= 1, 'bilan : notion à réviser liée à la fiche');
    await page.reload();
    check((await page.locator('.result-hero .big').textContent()).trim() === `${total - 1} / ${total}`, 'bilan conservé au rechargement, score non recompté');
    const st = await page.evaluate(() => JSON.parse(localStorage.getItem('mipi-revisions:v1')).quiz['uml:uml-c4']);
    check(st.attempts === 1 && st.best.score === total - 1, 'une seule tentative enregistrée (pas de double comptage)');
    // tentative 2 toute fausse → best inchangé
    await page.locator('button', { hasText: 'Recommencer le QCM' }).click();
    for (let i = 0; i < total; i++) {
      const w = await qcmAnswer(page, false);
      await page.locator('.option').nth(w[0]).click();
      await page.locator('button', { hasText: 'Valider' }).click();
      if (i < total - 1) await page.locator('button', { hasText: 'Question suivante' }).click();
    }
    await page.locator('button', { hasText: 'Voir le bilan' }).click();
    check((await page.locator('.result-hero .big').textContent()).trim() === `0 / ${total}`, 'tentative 2 : 0 point');
    const st2 = await page.evaluate(() => JSON.parse(localStorage.getItem('mipi-revisions:v1')).quiz['uml:uml-c4']);
    check(st2.attempts === 2 && st2.best.score === total - 1, 'meilleur score conservé, 2 tentatives');
    // QCM matière indépendant du QCM chapitre
    await page.goto(BASE + '#/quiz/uml');
    check((await page.locator('.runner-top').textContent()).includes('Question 1 sur 23'), 'QCM matière : 23 questions, état séparé');
    // vrai/faux non mélangé
    const vf = await page.evaluate(() => DATA.flatMap(m => m.qcm).filter(q => q.fixedOrder).every(q => q.options[0] === 'Vrai'));
    check(vf, 'questions Vrai/Faux à ordre fixe');
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
  }

  // ---------------------------------------------------------------- 8. partiels blancs
  current = 'partiels';
  {
    const { ctx, page } = await newPage(browser, 375);
    await page.goto(BASE + '#/partiels/c');
    check(!(await page.locator('#timerToggle').isChecked()), 'minuteur désactivé par défaut');
    await page.locator('button', { hasText: 'Commencer le partiel blanc' }).click();
    await page.waitForTimeout(100);
    check(await page.locator('.timer-bar').count() === 0, 'sans minuteur : pas de chrono');
    check((await page.locator('.runner-top').textContent()).includes('Exercice 1 sur 8'), '8 exercices, un par un');
    const keys = await page.evaluate(() => JSON.parse(localStorage.getItem('mipi-revisions:v1')).partiel.c.keys);
    const chaps = new Set(keys.map(k => k.split('::')[0]));
    check(chaps.size === 5, `au moins un exercice par chapitre (${chaps.size}/5)`);
    check(!keys.some(k => /approfondissement/i.test(k)), 'pas d\'exercice hors programme');
    const keys2 = await page.evaluate(() => { /* tirage suivant */ return null; });
    await page.goto(BASE + '#/partiels/c');
    check(await page.locator('text=Un partiel est en cours').count() === 1, 'partiel en cours détecté');
    await page.locator('button', { hasText: 'Abandonner' }).click();
    await page.locator('label.switch').click();
    check(await page.locator('#timerToggle').isChecked(), 'minuteur activable');
    await page.locator('button', { hasText: 'Commencer le partiel blanc' }).click();
    await page.waitForTimeout(1200);
    const t = await page.locator('.timer-bar .time').textContent();
    check(/^(59|60):\d\d$/.test(t), `chrono affiché (${t})`);
    const keysB = await page.evaluate(() => JSON.parse(localStorage.getItem('mipi-revisions:v1')).partiel.c.keys);
    check(keysB.join() !== keys.join(), 'nouveau tirage différent du précédent');
    await page.reload();
    await page.waitForTimeout(1100);
    check(/^(59|60):\d\d$/.test(await page.locator('.timer-bar .time').textContent()), 'chrono conservé au rechargement');
    // l'intervalle est nettoyé en quittant la page
    const before = await page.evaluate(() => { window.__n = 0; const o = window.setInterval; return true; });
    await page.goto(BASE + '#/');
    await page.waitForTimeout(1200);
    check(await page.locator('.timer-bar').count() === 0, 'plus de chrono hors du partiel');
    await page.goto(BASE + '#/partiels/c/session');
    await page.locator('button', { hasText: "Voir la correction" }).click();
    await page.locator('button', { hasText: "J'ai réussi" }).click();
    await page.locator('button', { hasText: 'Terminer le partiel' }).click();
    check((await page.locator('.result-hero .big').textContent()).trim() === '1 / 8', 'terminer → bilan 1/8');
    // expiration simulée
    await page.evaluate(() => { const d = JSON.parse(localStorage.getItem('mipi-revisions:v1')); d.partiel.java = { keys: d.partiel.c.keys.slice(0, 0), answers: {} }; localStorage.setItem('mipi-revisions:v1', JSON.stringify(d)); });
    await page.goto(BASE + '#/partiels/uml');
    await page.locator('label.switch').click();
    await page.locator('button', { hasText: 'Commencer le partiel blanc' }).click();
    await page.evaluate(() => { const d = JSON.parse(localStorage.getItem('mipi-revisions:v1')); d.partiel.uml.endsAt = Date.now() - 1000; localStorage.setItem('mipi-revisions:v1', JSON.stringify(d)); });
    await page.reload();
    await page.waitForTimeout(300);
    check((await page.locator('.timer-bar .time').textContent()) === '00:00' && await page.locator('.timer-bar.over').count() === 1, 'temps écoulé signalé, exercices toujours accessibles');
    await page.goto(BASE + '#/partiels/java/session');
    await page.waitForTimeout(200);
    check(await page.evaluate(() => location.hash) === '#/partiels/java', 'partiel corrompu → retour propre à la configuration');
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
  }

  // ---------------------------------------------------------------- 9. stockage indisponible / corrompu
  current = 'stockage';
  {
    const { ctx, page } = await newPage(browser, 1024);
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('SecurityError'); } });
    });
    await page.goto(BASE + '#/');
    check(await page.locator('.notice.warn', { hasText: 'stockage' }).count() === 1, 'stockage bloqué : avertissement affiché');
    await page.goto(BASE + '#/revision/java/java-c1/qcm');
    check(await page.locator('.q-card').count() === 1, 'stockage bloqué : le QCM fonctionne quand même');
    check(page.errors.length === 0, 'aucune erreur ' + page.errors.join(' | '));
    await ctx.close();
    const p2 = await newPage(browser, 1024);
    await p2.page.addInitScript(() => localStorage.setItem('mipi-revisions:v1', '{corrompu'));
    await p2.page.goto(BASE + '#/');
    check(await p2.page.locator('.matiere-card').count() === 3, 'données corrompues : le site démarre quand même');
    await p2.page.addInitScript(() => localStorage.setItem('mipi-revisions:v1', JSON.stringify({ v: 1, quiz: { uml: { run: { order: [999], opt: {}, sel: {}, val: {} } } } })));
    await p2.page.goto(BASE + '#/quiz/uml');
    check((await p2.page.locator('.runner-top').textContent()).includes('Question 1 sur 23'), 'tentative invalide ignorée proprement');
    check(p2.page.errors.length === 0, 'aucune erreur ' + p2.page.errors.join(' | '));
    await p2.ctx.close();
  }

  await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} vérifications réussies`);
  if (failed.length) { console.log('ÉCHECS :'); failed.forEach(f => console.log(' -', f.msg)); process.exit(1); }
})().catch(e => { console.error(e); process.exit(2); });
