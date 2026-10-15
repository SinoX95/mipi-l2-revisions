# Révisions MIPI L2

Site de révision pour la Licence Informatique 2ᵉ année (parcours MIPI) : cours en PDF, fiches de synthèse, exercices par chapitre, QCM, annales corrigées et partiels blancs pour trois matières — **Modélisation objet & UML**, **POO & Java** et **Introduction au langage C**.

En ligne : https://mipi-l2-revisions.web.app

## Fonctionnalités

- **Cours** : tous les CM, TD et annexes en PDF, consultables dans le site (lecteur intégré sur ordinateur, lecteur natif sur téléphone).
- **Fiches de révision** : une fiche par chapitre (14 au total), rédigée à partir des supports de cours : définitions, notions clés, méthodes, code, erreurs fréquentes, points d'examen. Chaque fiche cite ses sources, peut être marquée comme révisée et imprimée.
- **Exercices** : 10 à 12 exercices par chapitre (150 au total), affichés un par un, avec indice (💡), brouillon enregistré automatiquement, correction et auto-évaluation.
- **QCM** : 66 questions (réponse unique, réponses multiples, vrai/faux), un QCM par chapitre et un QCM par matière. Une question à la fois, indice, validation explicite, correction pédagogique, reprise après rechargement, bilan avec les notions à revoir.
- **Annales** : sujets d'examen avec corrigés rédigés (non officiels) ; pour le C, aucune annale n'existant, un sujet d'entraînement a été créé.
- **Partiels blancs** : 8 exercices tirés au hasard (au moins un par chapitre), minuteur de 60 minutes optionnel qui survit au rechargement.
- **Progression** sauvegardée dans le navigateur (fiches révisées, réponses, scores).
- **Responsive** : interface pensée pour le téléphone (barre d'onglets en bas) comme pour l'ordinateur.

## Stack et architecture

Volontairement simple : **HTML / CSS / JavaScript sans framework ni étape de build**, hébergé sur **Firebase Hosting**.

```
public/
  index.html   page unique + toute la feuille de style
  app.js       application : routage, vues, moteurs de QCM et d'exercices, sauvegarde
  data.js      données : documents, QCM, annales, chapitres et exercices
  fiches.js    fiches de révision (une par chapitre)
  404.html     page d'erreur
  pdfs/        supports de cours (non versionnés, voir plus bas)
tests/
  check_data.js  cohérence des données et présence des fichiers
  e2e.js         tests navigateur (Playwright)
firebase.json    configuration d'hébergement et en-têtes de cache
```

Choix techniques :

- **Routage par hash** (`#/revision/c/c-c2/exercices`) : chaque écran a sa propre adresse, le rechargement et le bouton « retour » du navigateur fonctionnent sans serveur.
- **Sauvegarde dans `localStorage`** (clé `mipi-revisions:v1`), lue et écrite dans des `try/catch` : le site reste utilisable en navigation privée ou si les données sont corrompues.
- **Aucune injection HTML** : le contenu est construit avec `textContent` / `createElement` ; un mini-format (`` `code` `` et `**gras**`) est interprété de façon sûre dans les fiches.
- **Cache maîtrisé** : `firebase.json` impose `no-cache` sur le HTML, le JS et le CSS (revalidation à chaque visite), les scripts sont versionnés (`app.js?v=…`), et l'application recharge automatiquement la page si elle détecte un mélange de fichiers de versions différentes.

## Comment le projet a été construit

1. **Collecte des supports** : récupération des CM, TD et annales depuis l'espace Moodle de l'université, rangés par matière dans `public/pdfs/`.
2. **Première version** : une page qui liste les cours par matière avec un lecteur PDF intégré, déployée sur Firebase Hosting.
3. **Entraînement** : ajout de QCM et de mini-exercices avec correction.
4. **Refonte** : navigation par sections (Accueil, Cours, Annales, Révision, Partiels blancs), design sombre type tableau de bord ; lecture des annales officielles pour rédiger des corrigés fidèles aux énoncés ; exercices organisés par chapitre ; partiels blancs avec minuteur optionnel.
5. **Audit complet** : tests sur 6 largeurs d'écran (320 à 1440 px) et des parcours utilisateurs automatisés, qui ont révélé notamment une navigation mobile qui masquait des sections, des PDF illisibles sur Android, l'absence de sauvegarde et de routage, un minuteur qui ne s'arrêtait jamais, et des erreurs de contenu par rapport aux cours. Correction de tout cela, refonte des QCM (une question à la fois, validation, indice, bilan) et rédaction des fiches à partir du texte extrait des PDF.
6. **Incident de cache** : après deux déploiements rapprochés, certains navigateurs mélangeaient anciens et nouveaux fichiers (Firebase sert par défaut `max-age=3600`). Corrigé par les en-têtes `no-cache`, le versionnage des scripts et un rechargement automatique de secours.

Le développement a été réalisé avec l'aide d'un assistant IA (Claude, d'Anthropic) ; le contenu pédagogique a été vérifié par rapport aux supports de cours.

## Ajouter du contenu

Tout le contenu est dans `public/data.js` et `public/fiches.js`.

- **Une question de QCM** (dans `qcm` de la matière) :
  ```js
  { chap: "c-c3", q: "Énoncé…", options: ["A", "B", "C", "D"], correct: 1,
    hint: "Indice qui aide sans donner la réponse", explain: "Correction" }
  ```
  `correct` peut être un tableau (`[0, 2]`) pour une question à réponses multiples ; `fixedOrder: true` empêche de mélanger les options (vrai/faux).
- **Un exercice** (dans `revision[].exercises`) : `{ title, statement, hint, solution }` — le titre doit être unique dans la matière (il sert de clé de sauvegarde).
- **Une fiche** : une entrée de `FICHES` dont la clé est l'id du chapitre, avec `sources`, `note` et `sections` (`kind` : `def`, `key`, `method`, `code`, `pitfall`, `exam`).

Après modification : `node tests/check_data.js`.

## Lancer en local

```bash
cd public
python -m http.server 8765
# puis ouvrir http://localhost:8765
```

## Tests

```bash
node tests/check_data.js          # données et fichiers référencés

npm install                       # installe Playwright
npx playwright install chromium
cd public && python -m http.server 8765 &   # serveur local
cd .. && node tests/e2e.js        # ~480 vérifications navigateur
```

Les tests navigateur couvrent : absence de débordement horizontal et taille des cibles tactiles sur 6 largeurs, navigation et routage, cours, annales, fiches (marquage, impression), exercices (un par un, indice, sauvegarde, bilan), QCM (validation, double validation, retour arrière, reprise, score, meilleur score), partiels blancs (tirage, minuteur, expiration) et stockage indisponible ou corrompu.

## Déploiement

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

Pense à changer le numéro de version des scripts dans `index.html` (`?v=…`) à chaque déploiement.

## Supports de cours (non inclus)

Les PDF de cours appartiennent à leurs auteurs et à l'université : **ils ne sont pas publiés dans ce dépôt** (`public/pdfs/` est dans `.gitignore`). Pour faire fonctionner la section Cours en local, place tes propres supports dans `public/pdfs/uml/`, `public/pdfs/java/` et `public/pdfs/c/` avec les noms attendus par `data.js` (la commande `node tests/check_data.js` liste les fichiers manquants).

Les fiches et les corrigés sont des synthèses rédigées pour ce site ; les corrigés d'annales ne sont pas officiels.

## Limites connues

- La progression est propre à chaque navigateur (pas de compte ni de synchronisation entre appareils).
- Les exercices ouverts sont auto-évalués (pas de correction automatique du code).
- Testé sur Chromium ; pas encore vérifié sur un vrai iPhone / Safari.
