// Vérification des données : node tests/check_data.js (depuis la racine du projet)
// Vérifie les ressources et la cohérence des données
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'public');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir + '/data.js', 'utf8') + fs.readFileSync(dir + '/fiches.js', 'utf8') + '\nthis.D=DATA;this.F=FICHES;', ctx);
const D = ctx.D, F = ctx.F;
let errors = 0, files = new Set();
const err = m => { errors++; console.log('ERR', m); };
for (const m of D) {
  m.sections.forEach(s => s.docs.forEach(d => files.add(d.file)));
  (m.annales || []).forEach(a => { if (a.sujetFile) files.add(a.sujetFile); if (!a.correction) err('annale sans correction ' + a.id); if (!a.sujetFile && !a.sujetText) err('annale sans sujet ' + a.id); });
  for (const c of m.revision) {
    const f = F[c.id];
    if (!f) { err('fiche manquante ' + c.id); continue; }
    f.sources.forEach(s => files.add(s.file));
    if (!f.sections.length) err('fiche vide ' + c.id);
    f.sections.forEach(s => { if (!s.items && !s.code) err('section vide ' + c.id + ' ' + s.title); (s.items || []).forEach(i => { if ((i.match(/`/g) || []).length % 2) err('backtick impair ' + c.id + ': ' + i.slice(0, 50)); if ((i.match(/\*\*/g) || []).length % 2) err('gras impair ' + c.id + ': ' + i.slice(0, 50)); }); });
  }
  m.qcm.forEach((q, i) => {
    if (!m.revision.find(c => c.id === q.chap)) err('qcm chap inconnu ' + m.id + ' ' + i);
    if (new Set(q.options).size !== q.options.length) err('options dupliquées ' + q.q);
  });
  const qs = new Set(); m.qcm.forEach(q => { if (qs.has(q.q)) err('question dupliquée ' + q.q); qs.add(q.q); });
}
Object.keys(F).forEach(k => { if (!D.some(m => m.revision.some(c => c.id === k))) err('fiche orpheline ' + k); });
for (const f of files) if (!fs.existsSync(path.join(dir, f))) err('fichier absent ' + f);
const nEx = D.reduce((a, m) => a + m.revision.reduce((b, c) => b + c.exercises.length, 0), 0);
console.log(`fichiers référencés: ${files.size}, fiches: ${Object.keys(F).length}, QCM: ${D.reduce((a, m) => a + m.qcm.length, 0)}, exercices: ${nEx}, annales: ${D.reduce((a, m) => a + m.annales.length, 0)}`);
console.log(errors ? errors + ' erreur(s)' : 'données OK');
process.exit(errors ? 1 : 0);
