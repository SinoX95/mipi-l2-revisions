// ===================== DONNÉES DU SITE DE RÉVISION MIPI L2 =====================
// Par matière :
//   sections  -> documents de cours PDF (Moodle) affichés dans « Cours »
//   qcm       -> banque de QCM ; chaque question a un chapitre (chap) et un indice (hint).
//                correct = index (réponse unique) ou tableau d'index (réponses multiples).
//                fixedOrder = ne pas mélanger les options (Vrai / Faux).
//   annales   -> sujets d'examen + corrections (section « Annales »)
//   revision  -> chapitres, 10 à 15 exercices chacun (section « Révision » et partiels blancs)
// Les fiches de révision sont dans fiches.js (clé = id de chapitre).

const DATA = [
  {
    id: "uml",
    name: "Modélisation objet & UML",
    short: "UML",
    code: "UE1",
    color: "#6c63ff",
    sections: [
      {
        label: "Présentation",
        docs: [
          {
            title: "Présentation de l'UE",
            file: "pdfs/uml/00-presentation.pdf",
          },
        ],
      },
      {
        label: "Cours (CM)",
        docs: [
          {
            title: "CM1 — Principes de la POO",
            file: "pdfs/uml/cm1-principes-poo.pdf",
          },
          {
            title: "CM1 — Modéliser...",
            file: "pdfs/uml/cm1-modeliser.pdf",
          },
          {
            title: "CM2-3 — Axe fonctionnel",
            file: "pdfs/uml/cm23-axe-fonctionnel.pdf",
          },
          {
            title: "CM4-5 — Axe statique",
            file: "pdfs/uml/cm45-axe-statique.pdf",
          },
        ],
      },
      {
        label: "Travaux dirigés (TD)",
        docs: [
          {
            title: "TD1 — Sujet",
            file: "pdfs/uml/td1-sujet.pdf",
          },
          {
            title: "TD1 — Correction",
            file: "pdfs/uml/td1-correction.pdf",
          },
          {
            title: "TD2 — Sujet",
            file: "pdfs/uml/td2-sujet.pdf",
          },
          {
            title: "TD2 — Correction",
            file: "pdfs/uml/td2-correction.pdf",
          },
          {
            title: "TD3 — Sujet",
            file: "pdfs/uml/td3-sujet.pdf",
          },
          {
            title: "TD3 — Correction",
            file: "pdfs/uml/td3-correction.pdf",
          },
          {
            title: "TD4 — Anciens sujets",
            file: "pdfs/uml/td4-sujet.pdf",
          },
          {
            title: "TD4 — Correction",
            file: "pdfs/uml/td4-correction.pdf",
          },
        ],
      },
      {
        label: "Annexes",
        docs: [
          {
            title: "Carte de référence UML 2",
            file: "pdfs/uml/annexe-carte-reference.pdf",
          },
          {
            title: "Correspondances UML ↔ Java",
            file: "pdfs/uml/annexe-correspondances-java.pdf",
          },
        ],
      },
    ],
    qcm: [
      {
        q: "Qu'est-ce qu'un diagramme de classe représente ?",
        options: [
          "Le comportement dynamique du système",
          "La structure statique des classes et leurs relations",
          "Le déploiement physique du système",
          "Les cas d'utilisation",
        ],
        correct: 1,
        explain: "Le diagramme de classe fait partie de l'axe statique : il montre les classes, leurs attributs/méthodes et les relations entre elles, sans décrire leur comportement dans le temps.",
        chap: "uml-c2",
        hint: "Pense aux axes vus en CM : l'un décrit la structure, l'autre ce que fait le système pour ses acteurs.",
      },
      {
        q: "Quelle est la différence principale entre agrégation et composition ?",
        options: [
          "Aucune, ce sont des synonymes",
          "Dans la composition, les parties ne peuvent pas exister sans le tout",
          "L'agrégation est plus forte que la composition",
          "La composition ne s'applique qu'aux attributs statiques",
        ],
        correct: 1,
        explain: "La composition est une forme d'agrégation « forte » : si l'objet composite est détruit, ses parties le sont aussi (ex : une Maison et ses Pièces). L'agrégation est plus lâche (ex : une Equipe et ses Joueurs, qui existent indépendamment).",
        chap: "uml-c2",
        hint: "Le CM4-5 donne deux critères pour la composition : la multiplicité côté composite et le cycle de vie des parties.",
      },
      {
        q: "En UML, l'encapsulation désigne...",
        options: [
          "Le fait de cacher les détails d'implémentation et de n'exposer qu'une interface",
          "La capacité d'une classe à hériter de plusieurs classes",
          "Le lien entre deux objets",
          "La création d'un diagramme de séquence",
        ],
        correct: 0,
        explain: "L'encapsulation consiste à protéger l'état interne d'un objet (attributs) et à ne l'exposer qu'à travers des méthodes publiques contrôlées.",
        chap: "uml-c1",
        hint: "Comment un objet laisse-t-il accéder à ses données ?",
      },
      {
        q: "Qu'est-ce que l'héritage multiple ?",
        options: [
          "Une classe qui hérite de plusieurs classes parentes",
          "Une classe ayant plusieurs attributs",
          "Un diagramme avec plusieurs cas d'utilisation",
          "Une relation d'agrégation entre trois classes",
        ],
        correct: 0,
        explain: "L'héritage multiple permet à une classe de dériver de plusieurs classes parentes en même temps (attention : Java ne l'autorise pas pour les classes, seulement pour les interfaces).",
        chap: "uml-c1",
        hint: "« Multiple » porte sur le nombre de classes parentes.",
      },
      {
        q: "Dans un diagramme de classe, la visibilité « - » devant un attribut signifie...",
        options: ["Public", "Protégé", "Privé", "Package"],
        correct: 2,
        explain: "+ = public, # = protégé, - = privé, ~ = package. Le « - » indique que l'attribut n'est accessible que depuis l'intérieur de la classe.",
        chap: "uml-c3",
        hint: "Quatre symboles : +, #, -, ~. Le « moins » correspond à l'accès le plus restreint.",
      },
      {
        q: "Quel axe UML décrit l'aspect « statique » du système ?",
        options: ["Les diagrammes de classe", "Les diagrammes de séquence", "Les diagrammes d'état", "Les diagrammes d'activité"],
        correct: 0,
        explain: "L'axe statique décrit la structure (classes, attributs, relations) indépendamment du temps — c'est le rôle du diagramme de classe.",
        chap: "uml-c1",
        hint: "Statique = indépendant du temps.",
      },
      {
        q: "Une association en UML représente...",
        options: ["Un lien structurel entre deux classes", "Une méthode", "Un attribut privé", "Une interface"],
        correct: 0,
        explain: "L'association est la relation la plus générale entre deux classes : elle indique qu'elles sont liées, sans notion de possession forte (contrairement à l'agrégation/composition).",
        chap: "uml-c2",
        hint: "C'est la relation la plus générale entre deux classes.",
      },
      {
        q: "Qu'est-ce qu'une méthode abstraite ?",
        options: [
          "Une méthode sans implémentation, que les sous-classes doivent définir",
          "Une méthode statique",
          "Une méthode privée",
          "Une méthode qui ne retourne rien",
        ],
        correct: 0,
        explain: "Une méthode abstraite déclare une signature sans corps : chaque sous-classe concrète est obligée de fournir sa propre implémentation.",
        chap: "uml-c3",
        hint: "En UML elle est écrite en italique : il manque quelque chose dans la classe qui la déclare.",
      },
      {
        q: "La multiplicité « 0..* » sur une association signifie...",
        options: ["Exactement zéro", "De zéro à plusieurs", "Exactement un", "Un ou plusieurs uniquement"],
        correct: 1,
        explain: "0..* (ou *) signifie qu'il peut y avoir aucune, une, ou plusieurs instances liées — c'est la multiplicité la plus permissive.",
        chap: "uml-c2",
        hint: "Lis les deux bornes : le minimum puis le maximum.",
      },
      {
        q: "Qu'est-ce qui différencie une classe abstraite d'une interface (de façon simplifiée) ?",
        options: [
          "Rien, c'est identique",
          "Une classe abstraite peut avoir des attributs et du code partagé, l'interface ne définit que des contrats",
          "L'interface peut être instanciée directement",
          "La classe abstraite ne peut jamais avoir de méthodes",
        ],
        correct: 1,
        explain: "Une classe abstraite peut mélanger méthodes concrètes et abstraites, et porter un état (attributs). Une interface ne définit (classiquement) que des signatures de méthodes, sans état.",
        chap: "uml-c1",
        hint: "Laquelle des deux peut porter des attributs et du code partagé ?",
      },
      {
        chap: "uml-c3",
        q: "Comment UML indique-t-il qu'un attribut est un attribut de classe (static) ?",
        options: ["Il est souligné", "Il est en italique", "Il est précédé de « / »", "Il est entre accolades"],
        correct: 0,
        hint: "L'italique et le « / » ont déjà un autre sens.",
        explain: "Carte de référence UML 2 : souligné = de classe (static) ; italique = abstrait ; « / » = attribut dérivé.",
      },
      {
        chap: "uml-c3",
        q: "Lesquels de ces attributs faut-il typer en String plutôt qu'en int ?",
        options: [
          "Code postal",
          "Numéro de rue (« bis », « ter » possibles)",
          "Quantité commandée",
          "Numéro de sécurité sociale",
        ],
        correct: [0, 1, 3],
        hint: "Fait-on des calculs dessus ? Peut-il contenir des zéros en tête ou des lettres ?",
        explain: "Le code postal doit garder ses zéros en tête, le numéro de rue peut contenir « bis »/« ter », le numéro de sécu est un identifiant (on ne calcule pas avec). La quantité est un vrai nombre : int. Piège classique de l'annale session 2.",
      },
      {
        chap: "uml-c3",
        q: "Selon les conventions du CM4-5, le nom d'un attribut commence par une majuscule.",
        options: ["Vrai", "Faux"],
        correct: 1,
        fixedOrder: true,
        hint: "Compare avec la convention pour les noms de classes.",
        explain: "Faux : les attributs, rôles et opérations commencent par une minuscule (heureDepart) ; seules les classes commencent par une majuscule.",
      },
      {
        chap: "uml-c4",
        q: "Qu'est-ce qu'un acteur dans un diagramme de cas d'utilisation ?",
        options: [
          "Un rôle joué par une entité externe qui interagit directement avec le système",
          "Une classe du diagramme de classes",
          "Une fonctionnalité interne du système",
          "Le développeur du projet",
        ],
        correct: 0,
        hint: "Il est toujours dessiné à l'extérieur de la frontière du système.",
        explain: "Un acteur représente un rôle joué par un utilisateur humain direct ou un autre système qui échange des messages avec le système étudié (CM2-3).",
      },
      {
        chap: "uml-c4",
        q: "La relation «include» entre deux cas d'utilisation signifie que…",
        options: [
          "le cas de base incorpore obligatoirement l'autre cas",
          "le cas de base peut, en option, incorporer l'autre cas",
          "un acteur hérite d'un autre acteur",
          "le cas inclus est hors du système",
        ],
        correct: 0,
        hint: "Pense à « S'authentifier », factorisé dans plusieurs cas du GAB.",
        explain: "«include» = incorporation obligatoire, à un endroit précis, pour factoriser un comportement commun. L'incorporation optionnelle, c'est «extend».",
      },
      {
        chap: "uml-c4",
        q: "Pour une relation «extend», dans quel sens va la flèche ?",
        options: [
          "Du cas qui étend vers le cas de base",
          "Du cas de base vers le cas qui étend",
          "Dans les deux sens",
          "De l'acteur vers le cas qui étend",
        ],
        correct: 0,
        hint: "La flèche part du comportement optionnel.",
        explain: "Le cas optionnel (ex. Consulter le solde) pointe vers le cas de base (Retirer de l'argent) qu'il peut enrichir à un point d'extension.",
      },
      {
        chap: "uml-c4",
        q: "Dans l'étude du GAB, le Système d'autorisation est un acteur secondaire du cas « Retirer de l'argent ».",
        options: ["Vrai", "Faux"],
        correct: 0,
        fixedOrder: true,
        hint: "Qui déclenche le retrait ? Qui est seulement sollicité pendant son déroulement ?",
        explain: "Vrai : le Porteur de carte est l'acteur principal ; le Système d'autorisation est sollicité par le GAB (étapes 6-7 du scénario nominal), c'est un acteur secondaire.",
      },
      {
        chap: "uml-c4",
        q: "Quelles rubriques sont obligatoires dans la fiche de description textuelle d'un cas d'utilisation (CM2-3) ?",
        options: [
          "Le sommaire d'identification",
          "La description des scénarios",
          "Les exigences non fonctionnelles",
          "Les besoins d'IHM",
        ],
        correct: [0, 1],
        hint: "Deux rubriques sont marquées « (option) » dans le CM.",
        explain: "Le sommaire d'identification et la description des scénarios sont obligatoires ; exigences non fonctionnelles et besoins d'IHM sont optionnels.",
      },
      {
        chap: "uml-c5",
        q: "Une association navigable de multiplicité * vers la classe B se traduit en Java par…",
        options: [
          "Une collection, par exemple List<B>",
          "Une seule référence de type B",
          "Un attribut static",
          "Un héritage extends B",
        ],
        correct: 0,
        hint: "Combien d'objets B faut-il pouvoir mémoriser ?",
        explain: "Annexe Correspondances : multiplicité 1 → une référence ; multiplicité * → une collection de références (ArrayList, ou un tableau).",
      },
      {
        chap: "uml-c5",
        q: "Comment traduit-on une classe d'association en Java ?",
        options: [
          "Par une classe normale qui référence les deux classes liées",
          "Avec le mot-clé association",
          "Par une interface",
          "Ce n'est pas traduisible",
        ],
        correct: 0,
        hint: "Le concept n'existe pas en Java : il faut le transformer.",
        explain: "On la transforme en classe ordinaire avec une référence vers chaque extrémité (ex. Emploi avec Personne employe et Societe employeur).",
      },
      {
        chap: "uml-c5",
        q: "Une opération soulignée dans un diagramme de classes devient en Java…",
        options: ["une méthode static", "une méthode abstract", "une méthode private", "un constructeur"],
        correct: 0,
        hint: "Même convention que pour les attributs de classe.",
        explain: "Souligné = membre de classe, donc static en Java (ex. setAgeMajorite dans l'annexe).",
      },
      {
        chap: "uml-c5",
        q: "Une association qualifiée (qualificatif de type Q, multiplicité 0..1 de l'autre côté) se traduit de préférence par…",
        options: ["Une Map<Q, B>", "Un tableau B[]", "Une ArrayList<Q>", "Un simple attribut de type Q"],
        correct: 0,
        hint: "On retrouve un objet B à partir d'une clé.",
        explain: "Annexe : private Map<Q,B4> lesB4 = new HashMap<Q,B4>(); — le qualificatif sert de clé.",
      },
      {
        chap: "uml-c5",
        q: "En Java, une classe peut hériter (extends) de plusieurs classes à la fois.",
        options: ["Vrai", "Faux"],
        correct: 1,
        fixedOrder: true,
        hint: "Compare extends et implements.",
        explain: "Faux : héritage simple uniquement. Une classe peut en revanche implémenter plusieurs interfaces (implements A, B).",
      },
    ],
    annales: [
      {
        id: "uml-partiel-2025",
        title: "Partiel — 6 novembre 2025",
        meta: "60 minutes · aucun document autorisé",
        official: true,
        sujetFile: "pdfs/uml/annale-partiel-2025.pdf",
        correctionNote: "Correction rédigée par le site (non officielle), fidèle à l'énoncé.",
        correction: `EXERCICE 1 — Diagramme de classe (13 pts)

1.1 Version simplifiée (classes + liens)

  Client ──1────1── Compte
                        △
              ┌─────────┴─────────┐
        CompteNormal      CompteAbonnement

  Client "1" ──── "0..*" Commande ──── "1" Produit

1.2 Détail des classes

Client
  - nom: String
  - email: String
  - compte: Compte
  + Client(nom: String, email: String, compte: Compte)

Compte (abstraite)
  - modePaiement: String
  + Compte(modePaiement: String)

CompteNormal extends Compte
  - nbCommandesMaxMensuel: int
  + CompteNormal(modePaiement: String, nbCommandesMaxMensuel: int)

CompteAbonnement extends Compte
  - montantMensuel: double
  + CompteAbonnement(modePaiement: String, montantMensuel: double)

Commande
  - numero: String
  - date: Date
  - produit: Produit
  + Commande(numero: String, date: Date, produit: Produit)

Produit
  - nom: String
  - categorie: String
  + Produit(nom: String, categorie: String)

Fonctionnalités (méthodes citées dans le sujet, portées par la classe la plus logique — ex. un "Gestionnaire" ou le "Client"/"Commande" directement selon le niveau attendu) :
  + rechercherCommande(numero: String): Commande
  + retrouverEmail(nom: String): String
  + ajouterClientAbonnement(nom: String, email: String, modePaiement: String, montantMensuel: double): Client
  + retrouverCommandesParDate(date: Date): List<Commande>

Points-clés attendus par le correcteur : héritage Compte → CompteNormal/CompteAbonnement (chaque type a SES attributs propres), association Client–Compte en 1-1, Commande qui ne concerne qu'un seul Produit (multiplicité 1), et le bon typage Date pour la date de commande.

EXERCICE 2 — Diagramme de cas d'utilisation (7 pts)

Système : Cuisine automatisée.
Acteurs principaux : Adulte, Enfant.
Acteur secondaire : Fournisseur / service de commande en ligne (reçoit les commandes d'ingrédients).

Cas d'utilisation :
  - Renseigner les informations de santé .................. Adulte
  - Programmer les repas de la semaine (cas général)
        ├─ Mode manuel : l'adulte programme lui-même ....... Adulte
        └─ Mode automatique : la cuisine propose les repas . Adulte
           (selon ingrédients en stock + santé de la famille)
  - Gérer les ingrédients : détecter le stock et commander automatiquement
        → acteur secondaire : Fournisseur
  - Prendre quelque chose pour grignoter ................... Enfant uniquement

Relations attendues :
  - « Mode manuel » et « Mode automatique » spécialisent « Programmer les repas » (généralisation entre cas, comme « Déposer de l'argent » dans le CM).
  - « Mode automatique » <<include>> « Gérer les ingrédients » (il en a besoin pour proposer les repas).
  - La connexion Internet n'est ni un acteur ni un vrai service rendu : c'est une contrainte / précondition de « Gérer les ingrédients » (on peut l'écrire en note). Certains corrigés la modélisent en <<include>> « Se connecter à Internet » : accepté si c'est justifié.
  - Les adultes ne grignotent pas : ne pas relier Adulte à « Grignoter ».

Remarque : la commande automatique d'ingrédients se fait sans intervention humaine ; on peut la rattacher au mode automatique ou la laisser comme cas déclenché par le système (notez votre choix).`,
      },
      {
        id: "uml-session1-2025",
        title: "Examen — Session 1 — 4 décembre 2025",
        meta: "60 minutes · aucun document autorisé",
        official: true,
        sujetFile: "pdfs/uml/annale-session1-2025.pdf",
        correctionNote: "Correction rédigée par le site (non officielle), fidèle à l'énoncé.",
        correction: `EXERCICE 1 — Diagramme de classe (13 pts)

2.1 Version simplifiée

  Centre ──1────0..* Departement ──1────0..* Medecin
                                   ──1────0..* Infirmier
  Medecin ──1────0..* Patient
  Patient ──1────1── Remboursement
                          △
            ┌─────────────┴─────────────┐
    RembSoinsBasiques          RembFraisChirurgicaux

2.2 Détail des classes

Departement
  - nomSpecialite: String
  + Departement(nomSpecialite: String)
  + ajouterMedecin(nom: String, anciennete: int): void
  + medecinPlusAncien(): Medecin

Medecin
  - nom: String
  - anciennete: int
  + Medecin(nom: String, anciennete: int)

Infirmier
  - nom: String
  - competencePrincipale: String
  + Infirmier(nom: String, competencePrincipale: String)

Patient
  - numeroSecu: String
  - pathologie: String
  - medecin: Medecin
  + Patient(numeroSecu: String, pathologie: String, medecin: Medecin)

Remboursement (abstraite)
  + calculerMontantSecu(): double
  + calculerMontantMutuelle(): double

RembSoinsBasiques extends Remboursement
RembFraisChirurgicaux extends Remboursement
  (chacune redéfinit calculerMontantSecu/Mutuelle selon son propre mode de calcul)

Fonctionnalités complémentaires :
  + medecinPlusAncienDe(specialite: String): Medecin   (porté par Centre ou Departement)
  + ajouterMedecin(departement: String, nom: String, anciennete: int): void
  + nbPatientsAvecPathologie(pathologie: String): int

Points-clés : bien justifier le choix d'héritage pour Remboursement (deux modes de calcul « très différents » → polymorphisme plutôt qu'un gros if/else), chaque Patient inscrit auprès d'un SEUL médecin (multiplicité 1), numéro de sécu = identifiant unique du Patient.

EXERCICE 2 — Diagramme de cas d'utilisation (7 pts)

Acteur : Utilisateur. Système : Application mobile de recherche de restaurant.

Cas d'utilisation :
  - S'authentifier
  - Rechercher un restaurant (mode manuel avec mots-clés OU mode automatique via historique/préférences) — <<include>> Se connecter à Internet (localisation + données restaurants)
  - Consulter le menu
  - Réserver / commander un repas — <<include>> Effectuer le paiement (qui <<include>> Se connecter à la banque à distance)
  - Commenter le restaurant (obligatoire après le repas) — alimente les préférences du profil et les données partagées

Remarques attendues : les deux modes de recherche (manuel/auto) peuvent être modélisés comme deux cas liés par une généralisation vers "Rechercher un restaurant", ou comme deux cas distincts — les deux sont acceptés si la logique est cohérente. Le commentaire après repas est présenté comme obligatoire dans l'énoncé : bien le relier par un <<include>> depuis "Réserver un repas" plutôt que comme un cas isolé optionnel.`,
      },
      {
        id: "uml-session2-2026",
        title: "Examen — Session 2 — 19 juin 2026",
        meta: "60 minutes · aucun document autorisé",
        official: true,
        sujetFile: "pdfs/uml/annale-session2-2026.pdf",
        correctionNote: "Correction rédigée par le site (non officielle), fidèle à l'énoncé.",
        correction: `EXERCICE 1 — Diagramme de classe (13 pts)

2.1 Version simplifiée

  Entreprise ──1────0..* Departement ──1────1── Pays
  Departement ──1────0..* Vendeur
                              △
                 ┌────────────┴────────────┐
         VendeurPhysique            VendeurEnLigne
  Vendeur ──1────0..* Commande ──1────1── Produit
  Commande ──1────1── AdresseLivraison

2.2 Détail des classes

Pays
  - nom: String
  + Pays(nom: String)

Departement
  - pays: Pays
  + Departement(pays: Pays)

Vendeur (abstraite)
  - nom: String
  - prenom: String
  + Vendeur(nom: String, prenom: String)

VendeurPhysique extends Vendeur
  - nomPointDeVente: String
  + VendeurPhysique(nom: String, prenom: String, nomPointDeVente: String)

VendeurEnLigne extends Vendeur
  - emailPro: String
  + VendeurEnLigne(nom: String, prenom: String, emailPro: String)

Produit
  - code: String
  - nom: String
  + Produit(code: String, nom: String)

AdresseLivraison
  - numeroRue: String        // String car "bis"/"ter" possibles
  - nomRue: String
  - codePostal: String       // String pour préserver les zéros en tête
  - ville: String
  - pays: String
  + AdresseLivraison(numeroRue: String, nomRue: String, codePostal: String, ville: String, pays: String)

Commande
  - numero: String
  - quantite: int
  - produit: Produit
  - adresseLivraison: AdresseLivraison
  + Commande(numero: String, quantite: int, produit: Produit, adresseLivraison: AdresseLivraison)

Fonctionnalités :
  + vendeurDeCommande(numero: String): Vendeur
  + emailVendeurEnLigne(nom: String, prenom: String): String
  + nbProduitsDistinctsParPays(pays: String): int
  + quantiteTotaleVendueParVendeur(nom: String, prenom: String): int

Points-clés : numéroRue et codePostal en String (pas en int) — c'est un piège classique de l'énoncé (« bis »/« ter », zéros en tête). Vendeur est abstraite avec deux sous-types (physique/en ligne) qui partagent nom/prénom/commandes mais ont un attribut spécifique chacun.

EXERCICE 2 — Diagramme de cas d'utilisation (7 pts)

Acteurs : Utilisateur, Bracelet (acteur secondaire/capteur), Banque (acteur externe). Système : application mobile « Santé ».

Cas d'utilisation :
  - Mesurer les pas quotidiens ............................ Utilisateur
  - Ajouter un ami / Partager ses statistiques ............ Utilisateur (nécessite Internet → précondition ou <<include>>)
  - Analyser la qualité du sommeil ........................ Utilisateur ; acteur secondaire : Bracelet (fournit les données)
  - Demander une proposition d'activités (payante) ........ Utilisateur
        <<include>> Analyser la qualité du sommeil (la proposition se fait « à l'issue de l'analyse »)
        <<include>> Payer la fonctionnalité
  - Payer la fonctionnalité (cas général)
        ├─ Payer par carte bleue (une fois) ............... acteur secondaire : Banque (vérification du compte)
        └─ Payer par prélèvement mensuel
               <<include>> Remplir un mandat

Relations attendues : les deux modes de paiement sont des spécialisations (généralisation entre cas) de « Payer la fonctionnalité » — ce ne sont pas des <<extend>>, car l'un des deux est forcément choisi.
Note de l'énoncé : seule l'application mobile est le système — Banque et Bracelet sont des acteurs externes, à dessiner hors de la frontière.`,
      },
    ],
    revision: [
      {
        id: "uml-c1",
        title: "Chapitre 1 — Principes de la POO & modélisation",
        exercises: [
          {
            title: "Objet vs classe",
            statement: "Explique en une phrase la différence entre une classe et un objet.",
            hint: "Pense « plan » vs « maison construite ».",
            solution: "Une classe est un modèle/plan décrivant la structure et le comportement communs à un ensemble d'objets ; un objet est une instance concrète de ce modèle, avec son propre état (valeurs d'attributs).",
          },
          {
            title: "Pourquoi modéliser avant de coder ?",
            statement: "Donne deux raisons de faire un diagramme UML avant d'écrire le code Java.",
            hint: "Pense communication et détection d'erreurs.",
            solution: "1) Cela permet de communiquer et valider la conception avec d'autres personnes (client, équipe) sans entrer dans les détails de syntaxe. 2) Cela aide à détecter des incohérences ou oublis de structure (relations, multiplicités) avant d'avoir investi du temps dans le code, ce qui coûte moins cher à corriger.",
          },
          {
            title: "UML n'est pas une méthode",
            statement: "Vrai ou faux : UML est une méthode de conception logicielle qui impose les étapes à suivre. Justifie.",
            hint: "UML est un langage, pas un processus.",
            solution: "Faux. UML (Unified Modeling Language) est un LANGAGE de modélisation standardisé (une notation graphique), pas une méthode : il ne dit pas dans quel ordre travailler, seulement comment représenter les concepts (classes, cas d'utilisation, séquences...).",
          },
          {
            title: "Deux piliers de la POO",
            statement: "Cite et définis brièvement deux des quatre piliers de la POO (encapsulation, héritage, polymorphisme, abstraction).",
            hint: "Un pilier protège les données, un autre factorise du code.",
            solution: "Encapsulation : cacher l'état interne d'un objet et ne l'exposer que via des méthodes contrôlées. Héritage : permettre à une classe de réutiliser/étendre la structure et le comportement d'une autre classe. (Polymorphisme et abstraction sont aussi acceptés avec une définition correcte.)",
          },
          {
            title: "Attribut ou méthode ?",
            statement: "Pour une classe Rectangle, « largeur » et « calculerAire() » sont-ils des attributs ou des méthodes ? Justifie.",
            hint: "Un attribut stocke une donnée, une méthode exécute un comportement.",
            solution: "« largeur » est un attribut : une donnée stockée dans l'objet. « calculerAire() » est une méthode : un comportement/calcul exécuté par l'objet, qui utilise généralement les attributs (largeur, longueur) pour produire un résultat.",
          },
          {
            title: "Qu'est-ce qu'une instance ?",
            statement: "Si « Chat » est une classe, que représente l'instruction (conceptuelle) « créer un Chat nommé Félix » ?",
            hint: "C'est l'action qui transforme un plan en objet réel.",
            solution: "Cela crée une instance de la classe Chat : un objet concret en mémoire, avec ses propres valeurs d'attributs (ici nom = « Félix »), distinct de tout autre Chat créé par ailleurs.",
          },
          {
            title: "Axe statique vs axe fonctionnel",
            statement: "À quoi sert, en gros, l'axe fonctionnel d'UML (diagrammes de cas d'utilisation) par rapport à l'axe statique (diagramme de classe) ?",
            hint: "L'un décrit la structure, l'autre les interactions avec l'extérieur.",
            solution: "L'axe statique (diagramme de classe) décrit LA STRUCTURE interne du système (classes, attributs, relations). L'axe fonctionnel (diagramme de cas d'utilisation) décrit CE QUE le système offre comme services aux acteurs externes (utilisateurs, autres systèmes), sans entrer dans les détails internes.",
          },
          {
            title: "Encapsulation en pratique",
            statement: "Pourquoi un attribut « solde » d'un Compte bancaire devrait-il être privé plutôt que public ?",
            hint: "Pense à ce qu'un code extérieur pourrait faire de mal avec un accès direct.",
            solution: "Si « solde » est public, n'importe quel code extérieur pourrait le modifier directement (ex : compte.solde = -500000;) sans passer par une logique de contrôle (vérifier qu'un retrait ne dépasse pas le solde disponible, journaliser l'opération, etc.). En le rendant privé et en passant par des méthodes (retirer(), deposer()), la classe garde le contrôle de la cohérence de son propre état.",
          },
          {
            title: "Modéliser un besoin flou",
            statement: "Un client dit : « je veux une appli pour gérer ma bibliothèque personnelle ». Cite deux questions à lui poser avant de dessiner le moindre diagramme de classe.",
            hint: "Pense aux informations à stocker et aux fonctionnalités attendues.",
            solution: "Exemples de bonnes questions : « Quelles informations veux-tu garder sur chaque livre (titre, auteur, date d'emprunt...) ? », « Faut-il distinguer plusieurs types d'exemplaires (papier/numérique) ? », « Quelles actions veux-tu pouvoir faire (rechercher, marquer comme lu/prêté...) ? ». L'idée est d'extraire les classes et fonctionnalités avant de modéliser.",
          },
          {
            title: "Avantage de la réutilisation",
            statement: "En quoi la POO favorise-t-elle la réutilisation de code par rapport à une approche purement procédurale (fonctions + variables globales) ?",
            hint: "Pense à l'héritage et à l'encapsulation comme unités réutilisables.",
            solution: "En POO, une classe regroupe données et comportements en une unité cohérente qui peut être réutilisée telle quelle (instanciée ailleurs) ou étendue par héritage sans dupliquer le code. En procédural, il faut souvent copier-coller ou faire circuler beaucoup de paramètres entre fonctions indépendantes, ce qui est plus fragile à faire évoluer.",
          },
          {
            title: "Justifier une classe abstraite",
            statement: "Pourquoi utiliser une classe abstraite « Forme » avec des sous-classes Cercle et Carré plutôt que de tout mettre dans une seule classe « Forme » avec un attribut « type » ?",
            hint: "Pense au polymorphisme et à la duplication de code.",
            solution: "Cela factorise le code commun (nom, couleur...) dans Forme, tout en forçant chaque sous-classe à implémenter sa propre logique (ex: calculerAire()) via une méthode abstraite. On évite les gros if/switch sur un attribut « type » et on profite du polymorphisme : le bon calcul s'exécute automatiquement selon la classe réelle de l'objet.",
          },
        ],
      },
      {
        id: "uml-c2",
        title: "Chapitre 2 — Diagramme de classes : les relations",
        exercises: [
          {
            title: "Association simple",
            statement: "Un Client passe des Commandes. Dessine (décris en texte) l'association et ses multiplicités : un client peut avoir 0 à N commandes, une commande appartient à exactement 1 client.",
            hint: "Multiplicité côté Client = 1, côté Commande = 0..*.",
            solution: `Client "1" ────── "0..*" Commande
Un Client est lié à 0 ou plusieurs Commande(s) ; chaque Commande est liée à exactement 1 Client.`,
          },
          {
            title: "Agrégation ou composition ?",
            statement: "Une Bibliothèque contient des Livres, mais si la bibliothèque ferme, les livres peuvent être transférés ailleurs (ils survivent). Agrégation ou composition ?",
            hint: "Les parties survivent-elles à la destruction du tout ?",
            solution: "Agrégation (losange vide). Les livres ont une existence indépendante de la bibliothèque qui les héberge actuellement — contrairement à la composition où les parties sont détruites avec le tout.",
          },
          {
            title: "Dépendance vs association",
            statement: "Une classe « ServiceImpression » utilise ponctuellement une classe « Document » uniquement comme paramètre d'une méthode imprimer(doc: Document), sans la stocker comme attribut. Quelle relation UML est la plus appropriée ?",
            hint: "Pas de lien durable = relation plus faible qu'une association.",
            solution: "Une dépendance (flèche pointillée). ServiceImpression dépend de Document pour fonctionner (il en a besoin ponctuellement) mais ne le stocke pas comme attribut durable — ce n'est donc pas une association au sens classique.",
          },
          {
            title: "Héritage et redéfinition",
            statement: "Une classe Forme a une méthode calculerAire(). Carre et Cercle en héritent. Comment appelle-t-on, en UML/POO, le fait que chaque sous-classe fournisse SA propre version de calculerAire() ?",
            hint: "C'est le même mécanisme qui permet le polymorphisme.",
            solution: "On appelle cela la redéfinition (ou « overriding ») : chaque sous-classe override la méthode héritée avec son propre comportement, tout en conservant la même signature.",
          },
          {
            title: "Multiplicité 1..1 vs 0..1",
            statement: "Quelle différence de sens y a-t-il entre une multiplicité « 1 » (ou « 1..1 ») et « 0..1 » sur une association ?",
            hint: "L'une impose une présence obligatoire, l'autre la rend optionnelle.",
            solution: "« 1 » (= « 1..1 ») signifie que l'objet lié est OBLIGATOIRE : il doit y en avoir exactement un. « 0..1 » signifie que le lien est OPTIONNEL : l'objet peut être absent (0) ou présent une seule fois (1), jamais plus.",
          },
          {
            title: "Association réflexive",
            statement: "Une classe Employe a un attribut « manager » qui est aussi un Employe (son supérieur). Comment appelle-t-on une association d'une classe vers elle-même ?",
            hint: "Le lien part et arrive sur la même classe.",
            solution: "C'est une association réflexive (ou récursive). Elle est représentée par une association qui relie la classe Employe à elle-même, généralement avec des rôles différents à chaque bout (ex : « subordonné » / « manager »).",
          },
          {
            title: "Choisir agrégation vs association simple",
            statement: "Une Equipe est formée de Joueurs qui existent indépendamment de l'équipe (ils peuvent changer d'équipe). Faut-il une simple association ou une agrégation ? Justifie.",
            hint: "L'agrégation insiste sur une relation « tout / partie », même faible.",
            solution: "Une agrégation est préférable : il y a bien une relation « tout / partie » (l'équipe est composée de joueurs), mais les parties (joueurs) existent et peuvent exister indépendamment de ce tout précis — c'est la définition même de l'agrégation, plus précise qu'une simple association non qualifiée.",
          },
          {
            title: "Classe-association (association de classe)",
            statement: "Pour modéliser qu'un Etudiant s'Inscrit à un Cours, avec une date d'inscription et une note associées à CE lien précis (pas à l'étudiant ni au cours seuls), quelle construction UML utiliser ?",
            hint: "Les attributs appartiennent au LIEN lui-même, pas aux deux classes.",
            solution: "Une classe-association (ou « classe d'association ») : une classe « Inscription » reliée par une ligne pointillée à l'association Etudiant–Cours, portant les attributs propres à ce lien (dateInscription, note).",
          },
          {
            title: "Lire un diagramme : combinaison de relations",
            statement: "Un diagramme montre : Vehicule ◇──1..* Roue (agrégation), et VoitureElectrique --▷ Vehicule (triangle vide). Explique en une phrase ce que représente chaque relation.",
            hint: "Le losange = agrégation, le triangle vide = héritage.",
            solution: "Vehicule ◇──1..* Roue est une agrégation : un Vehicule est composé d'au moins une Roue, mais les roues existent indépendamment. VoitureElectrique --▷ Vehicule est une relation d'héritage (généralisation) : VoitureElectrique est une sous-classe (spécialisation) de Vehicule.",
          },
          {
            title: "Erreur fréquente : confondre composition et héritage",
            statement: "Un·e étudiant·e modélise « Un Moteur EST UNE Voiture » par héritage (Moteur extends Voiture). Explique pourquoi c'est une erreur et propose la bonne relation.",
            hint: "Demande-toi : « un Moteur est-il un type de Voiture » ou « une Voiture a-t-elle un Moteur » ?",
            solution: "C'est une erreur : un Moteur n'EST PAS un type de Voiture (la relation « est-un » de l'héritage ne s'applique pas ici). La vraie relation est « une Voiture A un Moteur » (relation « a-un »), donc une composition (le moteur fait partie intégrante de la voiture et n'a pas de sens détaché de celle-ci dans ce contexte) : Voiture ◆── 1 Moteur.",
          },
          {
            title: "Multiplicité d'une association",
            statement: "Un Professeur peut donner cours à plusieurs Classes, et une Classe peut avoir plusieurs Professeurs. Quelle multiplicité faut-il indiquer de chaque côté de l'association ?",
            hint: "Regarde combien d'objets de chaque côté peuvent être liés.",
            solution: "0..* des deux côtés (relation many-to-many) : un Professeur est lié à 0 ou plusieurs Classes, et une Classe à 0 ou plusieurs Professeurs.",
          },
        ],
      },
      {
        id: "uml-c3",
        title: "Chapitre 3 — Attributs, méthodes et visibilité",
        exercises: [
          {
            title: "Lire une signature de méthode",
            statement: "Que signifie la ligne UML suivante ? + retirer(montant: double): boolean",
            hint: "Décompose : visibilité, nom, paramètre(s), type de retour.",
            solution: "C'est une méthode PUBLIQUE (+) nommée « retirer », qui prend un paramètre « montant » de type double, et qui retourne un boolean (probablement pour indiquer si le retrait a réussi).",
          },
          {
            title: "Écrire une signature d'attribut",
            statement: "Écris la ligne UML pour un attribut protégé « dateNaissance » de type Date.",
            hint: "Symbole de visibilité protégée = #",
            solution: "# dateNaissance: Date",
          },
          {
            title: "Visibilité package",
            statement: "Quel symbole UML indique une visibilité « package » (accessible seulement depuis le même package) et dans quel contexte Java cela correspond-il ?",
            hint: "C'est le symbole le moins courant des quatre.",
            solution: "Le symbole est « ~ ». En Java, cela correspond à l'absence de modificateur d'accès (ni public, ni private, ni protected) : le membre est visible uniquement par les classes du même package.",
          },
          {
            title: "Souligner un élément statique",
            statement: "En UML, comment représente-t-on visuellement qu'un attribut ou une méthode est « static » (de classe, pas d'instance) ?",
            hint: "Convention graphique très utilisée dans les diagrammes de classe.",
            solution: "On souligne le nom de l'attribut ou de la méthode (texte souligné). Par exemple un attribut static « compteurInstances » s'écrit souligné pour indiquer qu'il appartient à la classe elle-même et non à chaque instance.",
          },
          {
            title: "Méthode abstraite en italique",
            statement: "Comment UML représente-t-il visuellement qu'une méthode (ou une classe) est abstraite ?",
            hint: "Convention de style typographique.",
            solution: "Le nom est écrit en italique. Une classe abstraite a son nom en italique, et une méthode abstraite est elle aussi écrite en italique dans le compartiment des méthodes.",
          },
          {
            title: "Constructeur en UML",
            statement: "Comment indique-t-on un constructeur dans un diagramme de classe UML, et quelle particularité son « type de retour » a-t-il ?",
            hint: "Le constructeur porte le même nom que la classe.",
            solution: "Le constructeur est listé comme une méthode portant exactement le même nom que la classe (ex : + Personne(nom: String, age: int)), et il n'a PAS de type de retour indiqué (contrairement aux méthodes classiques).",
          },
          {
            title: "Faut-il mettre les getters/setters ?",
            statement: "Dans un diagramme de classe destiné à un examen qui précise « vous n'avez pas besoin de mentionner les accesseurs/mutateurs », faut-il tout de même rendre les attributs privés ?",
            hint: "La convention (encapsulation) reste valable même si on ne les écrit pas.",
            solution: "Oui : les attributs doivent rester privés (bonne pratique d'encapsulation) même si l'énoncé dispense d'écrire explicitement les getters/setters correspondants dans le diagramme — on part du principe qu'ils existent implicitement si besoin.",
          },
          {
            title: "Attribut dérivé",
            statement: "Un attribut « age » peut être calculé à partir de « dateNaissance ». Comment UML note-t-il qu'un attribut est « dérivé » (calculé) plutôt que stocké directement ?",
            hint: "Un symbole se place devant le nom de l'attribut.",
            solution: "On place un « / » devant le nom de l'attribut : / age: int. Cela indique que la valeur peut être recalculée à partir d'autres données (ici dateNaissance) plutôt que stockée telle quelle.",
          },
          {
            title: "Paramètres multiples",
            statement: "Écris la signature UML d'une méthode publique « transferer » qui prend un compte destinataire (type Compte) et un montant (double), et ne retourne rien.",
            hint: "Type de retour « rien » = void.",
            solution: "+ transferer(destinataire: Compte, montant: double): void",
          },
          {
            title: "Visibilité et héritage",
            statement: "Une sous-classe peut-elle accéder directement à un attribut « protected » défini dans sa classe parente ? Et à un attribut « private » ?",
            hint: "Rappelle-toi le rôle de « protected » vis-à-vis de l'héritage.",
            solution: "Oui pour « protected » : les sous-classes (même dans un autre package en Java) peuvent y accéder directement. Non pour « private » : un attribut privé n'est accessible que dans la classe où il est déclaré, même pas par ses propres sous-classes — celles-ci doivent passer par un getter/setter public ou protected si disponible.",
          },
        ],
      },
      {
        id: "uml-c4",
        title: "Chapitre 4 — Diagramme de cas d'utilisation",
        exercises: [
          {
            title: "Identifier les acteurs",
            statement: "Pour un distributeur automatique de billets (DAB), cite les acteurs possibles.",
            hint: "Un acteur n'est pas forcément un humain.",
            solution: "Le Client (utilisateur principal), et potentiellement la Banque (système externe consulté pour vérifier le compte et débiter) ainsi qu'un Technicien de maintenance (acteur secondaire pour recharger le distributeur).",
          },
          {
            title: "Cas d'utilisation vs fonction technique",
            statement: "Pour une appli de covoiturage, « Rechercher un trajet » est-il un bon cas d'utilisation ? Et « Trier un tableau de trajets par prix » ?",
            hint: "Un cas d'utilisation correspond à un objectif métier de l'acteur, pas à un détail d'implémentation.",
            solution: "« Rechercher un trajet » est un bon cas d'utilisation : c'est un objectif compréhensible par l'utilisateur. « Trier un tableau de trajets par prix » n'est PAS un cas d'utilisation : c'est un détail d'implémentation interne qui sert à réaliser la recherche, pas un objectif autonome de l'acteur.",
          },
          {
            title: "Relation <<include>>",
            statement: "« Payer en ligne » fait systématiquement intervenir « Vérifier la carte bancaire », qui n'a aucun sens tout seul. Quelle relation UML utiliser entre ces deux cas ?",
            hint: "Le sous-cas est obligatoire et n'a pas de sens isolé.",
            solution: "Une relation <<include>> : Payer en ligne ──<<include>>──▶ Vérifier la carte bancaire. Le cas inclus est exécuté systématiquement comme partie du cas principal.",
          },
          {
            title: "Relation <<extend>>",
            statement: "« Commander un plat » peut optionnellement déclencher « Appliquer un code promo » si le client en a un. Quelle relation UML utiliser, et dans quel sens va la flèche ?",
            hint: "L'extension est optionnelle et pointe vers le cas de base.",
            solution: "Une relation <<extend>> : Appliquer un code promo ──<<extend>>──▶ Commander un plat. Contrairement à <<include>>, l'extension est optionnelle (conditionnelle) et la flèche part du cas optionnel vers le cas de base qu'il peut enrichir.",
          },
          {
            title: "Généralisation entre acteurs",
            statement: "Un site propose un espace « Utilisateur gratuit » et « Utilisateur premium », ce dernier ayant accès à tout ce que le gratuit a, plus des fonctionnalités en plus. Comment relier ces deux acteurs en UML ?",
            hint: "Même principe que l'héritage entre classes, mais appliqué aux acteurs.",
            solution: "Par une relation de généralisation (flèche à triangle vide) : UtilisateurPremium généralise/hérite de UtilisateurGratuit, ce qui signifie qu'il a accès à tous les cas d'utilisation du gratuit, plus ses cas d'utilisation spécifiques.",
          },
          {
            title: "Limite du système",
            statement: "Dans un diagramme de cas d'utilisation, à quoi sert le rectangle qui entoure les cas d'utilisation (la « frontière du système ») ?",
            hint: "Il sépare ce qui est modélisé de ce qui est extérieur.",
            solution: "Il délimite précisément ce qui fait partie du système modélisé (les cas d'utilisation à l'intérieur) par rapport à ce qui est extérieur (les acteurs, qui restent toujours à l'extérieur du rectangle, même si c'est un autre système informatique).",
          },
          {
            title: "Acteur principal vs secondaire",
            statement: "Pour le cas d'utilisation « Retirer de l'argent » d'un DAB, qui est l'acteur principal et qui est l'acteur secondaire ?",
            hint: "L'acteur principal déclenche le cas pour atteindre SON objectif.",
            solution: "L'acteur principal est le Client : c'est lui qui déclenche l'action pour atteindre son objectif (obtenir de l'argent). La Banque est un acteur secondaire : elle est sollicitée par le système pendant le déroulement du cas, mais ne déclenche pas elle-même le cas d'utilisation.",
          },
          {
            title: "Rédiger un cas d'utilisation à partir d'un besoin",
            statement: "Énoncé : « L'utilisateur d'une appli de notes veut pouvoir créer une note, la modifier, et la supprimer. » Liste les cas d'utilisation correspondants.",
            hint: "En général, un verbe d'action = un cas.",
            solution: "Trois cas d'utilisation distincts : Créer une note, Modifier une note, Supprimer une note — chacun déclenché par l'acteur Utilisateur. On pourrait aussi les regrouper sous un cas plus général « Gérer ses notes » si le niveau de détail demandé est plus macro, selon le contexte de l'énoncé.",
          },
          {
            title: "Système externe comme acteur",
            statement: "Dans une appli de livraison de repas, le service de paiement « Stripe » doit être représenté comme un cas d'utilisation ou comme un acteur ? Pourquoi ?",
            hint: "Un acteur peut être un autre système, pas seulement un humain.",
            solution: "Comme un acteur (acteur secondaire, souvent appelé « acteur système »). Stripe n'est pas une fonctionnalité du système modélisé : c'est un système externe avec lequel le système communique (ex: via <<include>> « Effectuer le paiement »), donc il se place à l'extérieur de la frontière du système, comme n'importe quel acteur.",
          },
          {
            title: "Un cas d'utilisation trop détaillé",
            statement: "Pourquoi « Cliquer sur le bouton Valider » n'est jamais un bon cas d'utilisation, même s'il correspond à une vraie action de l'utilisateur ?",
            hint: "Le niveau d'abstraction d'un cas d'utilisation doit rester au niveau « objectif », pas « geste ».",
            solution: "Parce qu'un cas d'utilisation doit représenter un objectif métier complet et autonome pour l'acteur (ex : « Valider sa commande »), pas un geste d'interface isolé. « Cliquer sur un bouton » est un détail d'implémentation de l'interface graphique, pas un service que le système rend à l'utilisateur.",
          },
        ],
      },
      {
        id: "uml-c5",
        title: "Chapitre 5 — Traduire UML en Java",
        exercises: [
          {
            title: "Classe simple vers Java",
            statement: `Traduis en squelette Java la classe UML suivante :
Livre
- titre: String
- nbPages: int
+ Livre(titre: String, nbPages: int)
+ getTitre(): String`,
            hint: "Attributs privés, constructeur public, méthode publique.",
            solution: `public class Livre {
    private String titre;
    private int nbPages;

    public Livre(String titre, int nbPages) {
        this.titre = titre;
        this.nbPages = nbPages;
    }

    public String getTitre() {
        return titre;
    }
}`,
          },
          {
            title: "Héritage UML vers Java",
            statement: "Traduis en Java : Animal (abstraite) avec méthode abstraite crier(): void ; Chien hérite d'Animal et implémente crier().",
            hint: "abstract class ... et @Override dans la sous-classe.",
            solution: `public abstract class Animal {
    public abstract void crier();
}

public class Chien extends Animal {
    @Override
    public void crier() {
        System.out.println("Wouf !");
    }
}`,
          },
          {
            title: "Association 1..* vers Java",
            statement: "Traduis en attribut Java une association « Equipe » ──1────0..* ── « Joueur » (côté Equipe, qui connaît ses joueurs).",
            hint: "0..* se traduit généralement par une collection.",
            solution: `public class Equipe {
    private String nom;
    private List<Joueur> joueurs;

    public Equipe(String nom) {
        this.nom = nom;
        this.joueurs = new ArrayList<>();
    }

    public void ajouterJoueur(Joueur j) {
        joueurs.add(j);
    }
}
// L'association 0..* se traduit par une collection (ici List<Joueur>).`,
          },
          {
            title: "Interface UML vers Java",
            statement: "Traduis en Java une interface UML « Comparable2 » avec une seule méthode + comparerA(autre: Object): int, puis fais implémenter cette interface par une classe Produit.",
            hint: "interface ... { ... } puis implements dans la classe.",
            solution: `public interface Comparable2 {
    int comparerA(Object autre);
}

public class Produit implements Comparable2 {
    private double prix;

    @Override
    public int comparerA(Object autre) {
        Produit p = (Produit) autre;
        return Double.compare(this.prix, p.prix);
    }
}`,
          },
          {
            title: "Multiplicité 0..1 vers Java",
            statement: "Comment traduit-on, côté Java, une association où un Employe a 0 ou 1 Bureau attitré (0..1) ?",
            hint: "Pas besoin d'une collection pour 0..1 — un simple attribut suffit, mais il peut être null.",
            solution: `Un simple attribut de type Bureau (pas une collection), qui peut valoir null quand l'employé n'a pas de bureau attitré :
private Bureau bureau; // peut être null si 0..1 non rempli
Il n'y a pas besoin de List ici car la multiplicité maximale est 1.`,
          },
          {
            title: "Classe abstraite avec attribut partagé",
            statement: "Traduis en Java : Forme (abstraite) a un attribut commun « couleur: String » et une méthode abstraite calculerAire(): double. Cercle hérite de Forme avec un attribut rayon.",
            hint: "L'attribut couleur doit être accessible depuis Cercle via super() ou protected.",
            solution: `public abstract class Forme {
    protected String couleur;

    public Forme(String couleur) {
        this.couleur = couleur;
    }

    public abstract double calculerAire();
}

public class Cercle extends Forme {
    private double rayon;

    public Cercle(String couleur, double rayon) {
        super(couleur);
        this.rayon = rayon;
    }

    @Override
    public double calculerAire() {
        return Math.PI * rayon * rayon;
    }
}`,
          },
          {
            title: "Attribut dérivé vers Java",
            statement: "L'attribut UML « / age: int » (dérivé de dateNaissance) se traduit comment en Java ? Faut-il un champ « age » stocké ?",
            hint: "Un attribut dérivé se recalcule, il ne se stocke pas en dur.",
            solution: `On ne stocke PAS un champ « age » : on calcule sa valeur à la demande via une méthode, typiquement un getter qui fait le calcul :
public int getAge() {
    return Period.between(dateNaissance, LocalDate.now()).getYears();
}
Cela évite que « age » devienne incohérent avec dateNaissance au fil du temps.`,
          },
          {
            title: "Classe-association vers Java",
            statement: "Une classe-association « Inscription » (entre Etudiant et Cours) porte une date et une note. Comment la traduire simplement en Java ?",
            hint: "La classe-association devient souvent une classe à part entière référencée par les deux autres (ou par une structure intermédiaire).",
            solution: `public class Inscription {
    private Etudiant etudiant;
    private Cours cours;
    private LocalDate dateInscription;
    private double note;

    public Inscription(Etudiant etudiant, Cours cours, LocalDate dateInscription) {
        this.etudiant = etudiant;
        this.cours = cours;
        this.dateInscription = dateInscription;
    }
}
// La classe-association devient une classe Java normale qui référence les deux classes liées.`,
          },
          {
            title: "Visibilité package en Java",
            statement: "Comment écrit-on, en Java, un attribut avec une visibilité « package » comme indiqué en UML par le symbole ~ ?",
            hint: "C'est l'absence d'un mot-clé particulier.",
            solution: `On n'écrit AUCUN modificateur d'accès devant l'attribut :
String codeInterne; // visibilité package (par défaut)
C'est la seule des quatre visibilités qui ne s'écrit avec aucun mot-clé explicite en Java.`,
          },
          {
            title: "Du diagramme au code complet",
            statement: "À partir de : CompteBancaire { - solde: double ; + CompteBancaire(solde: double) ; + deposer(montant: double): void ; + retirer(montant: double): boolean }, écris la classe Java complète.",
            hint: "retirer() doit retourner false si le solde est insuffisant.",
            solution: `public class CompteBancaire {
    private double solde;

    public CompteBancaire(double solde) {
        this.solde = solde;
    }

    public void deposer(double montant) {
        solde += montant;
    }

    public boolean retirer(double montant) {
        if (montant > solde) {
            return false;
        }
        solde -= montant;
        return true;
    }
}`,
          },
        ],
      },
    ],
  },
  {
    id: "java",
    name: "POO & Java",
    short: "Java",
    code: "UE2",
    color: "#ff9f6c",
    sections: [
      {
        label: "Ressources",
        docs: [
          {
            title: "Polycopié complet",
            file: "pdfs/java/poly-complet.pdf",
          },
        ],
      },
      {
        label: "Travaux dirigés (TD)",
        docs: [
          {
            title: "TD1",
            file: "pdfs/java/td1.pdf",
          },
          {
            title: "TD2",
            file: "pdfs/java/td2.pdf",
          },
          {
            title: "TD3",
            file: "pdfs/java/td3.pdf",
          },
          {
            title: "TD4",
            file: "pdfs/java/td4.pdf",
          },
        ],
      },
    ],
    qcm: [
      {
        q: "Que signifie POO ?",
        options: [
          "Programmation Orientée Objet",
          "Programme Optimisé Objet",
          "Processus Ordonné Objet",
          "Programmation Ouverte Objet",
        ],
        correct: 0,
        explain: "POO = Programmation Orientée Objet, un paradigme où le code est organisé autour d'objets (données + comportements) plutôt que de simples fonctions.",
        chap: "java-c1",
        hint: "Le premier mot désigne une façon de « programmer ».",
      },
      {
        q: "Quel mot-clé Java permet à une classe d'hériter d'une autre ?",
        options: ["implements", "extends", "inherits", "super"],
        correct: 1,
        explain: "« extends » déclare l'héritage entre classes. « implements » sert pour les interfaces, « super » sert à appeler le parent depuis une sous-classe.",
        chap: "java-c2",
        hint: "implements est réservé aux interfaces.",
      },
      {
        q: "Quel mot-clé permet d'accéder à une méthode ou un constructeur de la classe parente ?",
        options: ["this", "super", "parent", "base"],
        correct: 1,
        explain: "« super » référence la classe parente directe — utile pour appeler super.methode() ou super() dans un constructeur.",
        chap: "java-c2",
        hint: "this désigne l'objet courant ; ici il faut désigner la classe du dessus.",
      },
      {
        q: "Une méthode déclarée « private » est accessible...",
        options: [
          "Uniquement dans la classe où elle est définie",
          "Dans tout le package",
          "Partout dans le projet",
          "Uniquement dans les sous-classes",
        ],
        correct: 0,
        explain: "« private » restreint l'accès à l'intérieur de la classe elle-même — c'est la base de l'encapsulation.",
        chap: "java-c1",
        hint: "C'est la visibilité la plus restrictive des quatre.",
      },
      {
        q: "Qu'est-ce que le polymorphisme en Java ?",
        options: [
          "La capacité d'une même méthode à se comporter différemment selon le type réel de l'objet",
          "La possibilité d'avoir plusieurs constructeurs",
          "La possibilité d'hériter de plusieurs classes",
          "Un type de boucle",
        ],
        correct: 0,
        explain: "Le polymorphisme permet, par exemple, d'appeler forme.calculerAire() sur une liste de Forme et d'obtenir automatiquement le bon calcul selon que l'objet est un Cercle ou un Carré.",
        chap: "java-c2",
        hint: "Quelle « forme » réelle a l'objet au moment de l'exécution ?",
      },
      {
        q: "Quelle est la différence entre une classe abstraite et une interface en Java ?",
        options: [
          "Aucune différence",
          "Une classe abstraite peut contenir des méthodes avec implémentation, une interface classique non",
          "Une interface peut être instanciée directement",
          "Une classe abstraite ne peut jamais avoir de constructeur",
        ],
        correct: 1,
        explain: "Une classe abstraite peut mélanger code concret et méthodes abstraites, et avoir un constructeur (appelé via super()). Une interface ne définissait classiquement que des signatures (avant les « default methods » de Java 8+).",
        chap: "java-c3",
        hint: "Laquelle peut contenir du code concret et un constructeur ?",
      },
      {
        q: "Que fait le mot-clé « static » appliqué à une méthode ?",
        options: [
          "Rend la méthode accessible sans créer d'instance de la classe",
          "Empêche la méthode d'être redéfinie",
          "Rend la méthode privée",
          "Supprime la méthode après exécution",
        ],
        correct: 0,
        explain: "Une méthode static appartient à la classe elle-même, pas à une instance particulière : on l'appelle via NomClasse.methode().",
        chap: "java-c1",
        hint: "On écrit Math.sqrt(2.0) sans jamais faire new Math().",
      },
      {
        q: "Qu'est-ce que l'encapsulation permet d'éviter ?",
        options: [
          "L'accès direct et incontrôlé aux données internes d'un objet",
          "La création d'objets",
          "L'héritage",
          "Les boucles infinies",
        ],
        correct: 0,
        explain: "En rendant les attributs privés et en passant par des getters/setters, on contrôle comment l'état interne est lu ou modifié (validation, cohérence...).",
        chap: "java-c1",
        hint: "Pourquoi passe-t-on par des getters/setters ?",
      },
      {
        q: "Un constructeur en Java...",
        options: [
          "Porte le même nom que la classe et initialise l'objet",
          "Retourne toujours un booléen",
          "Doit être privé",
          "Ne peut jamais avoir de paramètres",
        ],
        correct: 0,
        explain: "Le constructeur partage le nom de la classe, n'a pas de type de retour, et sert à initialiser les attributs de l'objet au moment de sa création.",
        chap: "java-c1",
        hint: "Il est appelé avec new et n'a pas de type de retour.",
      },
      {
        q: "Si une sous-classe redéfinit une méthode de sa classe parente avec la même signature, on parle de...",
        options: ["Erreur de compilation", "Surcharge (overloading)", "Redéfinition (overriding)", "Java ignore la méthode"],
        correct: 2,
        explain: "C'est de l'overriding (redéfinition) : la sous-classe fournit sa propre version d'une méthode héritée. L'overloading, lui, consiste à avoir plusieurs méthodes de même nom mais de signatures différentes dans la même classe.",
        chap: "java-c2",
        hint: "Même signature, mais dans une sous-classe.",
      },
      {
        chap: "java-c1",
        q: "Avec Point p1 = new Point(1, 2); Point p2 = new Point(1, 2); que vaut p1 == p2 ?",
        options: ["false", "true", "Erreur de compilation", "Cela dépend de toString()"],
        correct: 0,
        hint: "== compare-t-il le contenu ou les références ?",
        explain: "false : p1 et p2 référencent deux objets distincts. Pour comparer le contenu, il faut redéfinir equals() (poly §5.5.1).",
      },
      {
        chap: "java-c3",
        q: "Peut-on écrire new Vehicule() si Vehicule est une classe abstraite ?",
        options: [
          "Non, une classe abstraite n'est pas instanciable",
          "Oui, si elle a un constructeur",
          "Oui, si aucune méthode n'est abstraite",
          "Oui, en appelant super()",
        ],
        correct: 0,
        hint: "Relis la définition d'une classe abstraite (poly §3.8).",
        explain: "Une classe abstraite ne peut pas recevoir l'opérateur new, même si elle a des constructeurs : ceux-ci sont appelés par les sous-classes concrètes via super(...).",
      },
      {
        chap: "java-c3",
        q: "Une classe abstraite peut avoir un constructeur.",
        options: ["Vrai", "Faux"],
        correct: 0,
        fixedOrder: true,
        hint: "Qui l'appellerait, puisqu'on ne fait jamais new dessus ?",
        explain: "Vrai : il est appelé par les classes dérivées avec super(...), par exemple pour initialiser nbRoues (poly §3.8).",
      },
      {
        chap: "java-c3",
        q: "Que peut contenir une interface Java ?",
        options: [
          "Des méthodes abstraites",
          "Des constantes (static final)",
          "Des attributs d'instance modifiables",
          "Des méthodes default",
        ],
        correct: [0, 1, 3],
        hint: "Une interface ne porte pas d'état propre à chaque objet.",
        explain: "Méthodes abstraites, constantes static final, méthodes static et méthodes default. Pas d'attributs d'instance.",
      },
      {
        chap: "java-c3",
        q: "Pourquoi Java n'autorise-t-il pas l'héritage multiple de classes ?",
        options: [
          "À cause du problème du losange : ambiguïté sur la méthode héritée",
          "Parce que ce serait trop lent",
          "Parce que le Garbage Collector l'interdit",
          "Parce que les interfaces n'existeraient plus",
        ],
        correct: 0,
        hint: "Imagine D qui hérite de B et de C, qui redéfinissent tous deux methodeA().",
        explain: "Si D héritait de B et C, quelle version de methodeA() aurait-il ? Pour éviter ce « losange », Java n'autorise que l'héritage simple, et propose les interfaces (poly §5.3).",
      },
      {
        chap: "java-c4",
        q: "Quelle collection garantit qu'un élément n'apparaît jamais deux fois ?",
        options: ["HashSet", "ArrayList", "LinkedList", "Un tableau"],
        correct: 0,
        hint: "Pense à l'interface Set.",
        explain: "L'interface Set (HashSet, TreeSet) interdit la duplication d'éléments ; une List accepte les doublons.",
      },
      {
        chap: "java-c4",
        q: "Pourquoi écrit-on ArrayList<Integer> et non ArrayList<int> ?",
        options: [
          "Les collections ne contiennent que des références d'objets",
          "int est trop petit",
          "Integer est plus rapide",
          "C'est une simple convention",
        ],
        correct: 0,
        hint: "Le poly définit une collection comme un ensemble de références.",
        explain: "Les éléments d'une collection sont des références sur des objets ; on utilise la classe enveloppe Integer, et Java convertit automatiquement int ↔ Integer.",
      },
      {
        chap: "java-c4",
        q: "Que fait it.remove() sur un Iterator ?",
        options: [
          "Supprime le dernier élément renvoyé par next()",
          "Supprime l'élément suivant",
          "Vide toute la collection",
          "Supprime le premier élément",
        ],
        correct: 0,
        hint: "Le poly la décrit comme « nécessairement associée (consécutive) à next() ».",
        explain: "remove() supprime l'élément que le dernier next() vient de renvoyer ; c'est la façon sûre de supprimer pendant un parcours.",
      },
      {
        chap: "java-c4",
        q: "Quelle méthode donne le nombre d'éléments d'une ArrayList ?",
        options: ["size()", "length", "length()", "count()"],
        correct: 0,
        hint: "length est réservé aux tableaux.",
        explain: "liste.size() pour une collection ; tab.length (sans parenthèses) pour un tableau ; s.length() pour une String.",
      },
      {
        chap: "java-c4",
        q: "contains() d'une ArrayList compare les éléments avec equals().",
        options: ["Vrai", "Faux"],
        correct: 0,
        fixedOrder: true,
        hint: "Si equals n'est pas redéfini, que compare-t-il ?",
        explain: "Vrai. Sans redéfinition, equals() hérité d'Object compare les références : deux objets de même contenu ne seront pas reconnus.",
      },
    ],
    annales: [
      {
        id: "java-partiel-2025",
        title: "Partiel — 6 novembre 2025",
        meta: "60 minutes · aucun document autorisé",
        official: true,
        sujetFile: "pdfs/java/annale-partiel-2025.pdf",
        correctionNote: "Correction rédigée par le site (non officielle), fidèle à l'énoncé.",
        correction: `EXERCICE 1 — Questions de cours (6 pts)

1.1 Pourquoi « private » pour les attributs ?
Pour protéger l'état interne de l'objet (encapsulation) : on évite qu'un code extérieur modifie directement et sans contrôle les données, et on peut valider/filtrer les accès via des getters/setters.

1.2 Pourquoi redéfinir toString() ?
Par défaut, toString() hérité d'Object affiche une chaîne peu lisible (nom de classe + code de hachage). La redéfinir permet d'afficher une représentation textuelle utile et lisible de l'objet (ex: pour un affichage ou un débogage), notamment avec System.out.println(objet) ou dans une concaténation de String.

1.3 Avantage du polymorphisme dynamique
Il permet d'écrire du code générique qui manipule des objets via le type de leur classe mère (ou d'une interface), et de laisser Java choisir AUTOMATIQUEMENT, à l'exécution, la bonne méthode redéfinie selon le type RÉEL de l'objet. Cela évite les gros if/else sur le type et rend le code plus extensible (ajouter une sous-classe sans toucher au code appelant).

1.4 Classe abstraite vs interface
Une classe abstraite peut contenir des attributs, un constructeur, et mélanger méthodes concrètes (avec corps) et abstraites ; une classe ne peut hériter que d'UNE classe abstraite. Une interface ne définit (classiquement) que des contrats de méthodes sans état, mais une classe peut implémenter PLUSIEURS interfaces — l'interface sert surtout à définir un comportement commun à des classes qui n'ont pas forcément de lien de parenté.

EXERCICE 2 — Analyse de programme (2,5 pts)

Trace d'exécution pour tab[6] avec tab[i] = i, condition (tab[i] + 2 > 5) ⇔ (i > 3) ⇔ i >= 4 :
  i=0 : tab[0]=0, 0+2=2 ≤ 5 → affiche "valeur : 1"   (tab[i]+1)
  i=1 : tab[1]=1, 1+2=3 ≤ 5 → affiche "valeur : 2"
  i=2 : tab[2]=2, 2+2=4 ≤ 5 → affiche "valeur : 3"
  i=3 : tab[3]=3, 3+2=5, 5 > 5 est FAUX → affiche "valeur : 4"
  i=4 : tab[4]=4, 4+2=6 > 5 → affiche "valeur : 4"   (tab[i], pas +1 !)
  i=5 : tab[5]=5, 5+2=7 > 5 → affiche "valeur : 5"

Sortie complète :
valeur : 1
valeur : 2
valeur : 3
valeur : 4
valeur : 4
valeur : 5

Piège classique : pour i=3, 3+2=5 et "5 > 5" est FAUX (pas vrai), donc on passe dans le else (affiche tab[i]+1 = 4), pas dans le if.

EXERCICE 3 — Programmation Java (11,5 pts)

3.1 Constructeur surchargé + toString (Roman)
public Roman(String titre, Auteur auteur) {
    this(titre, auteur, 5);
}

@Override
public String toString() {
    return "Titre : " + titre + "\\nEcrit par : " + auteur.toString() + "\\nNote d'évaluation : " + evaluation;
}

Remarque : Java affiche un float avec un point (4.5) ; l'énoncé montre « 4,5 » à la française, les deux sont acceptés.

3.2 Sous-classe RomanHorreur
public class RomanHorreur extends Roman {
    private int limiteAge;

    public RomanHorreur(String titre, Auteur auteur, float evaluation, int limiteAge) {
        super(titre, auteur, evaluation);
        this.limiteAge = limiteAge;
    }

    @Override
    public String toString() {
        return super.toString() + "\\nInterdit aux moins de " + limiteAge + " ans";
    }
}

3.3 Classe Librairie — ajouter + meilleure note
public class Librairie {
    private ArrayList<Roman> romans = new ArrayList<>();

    public void ajouterRoman(Roman r) {
        romans.add(r);
    }

    public Roman meilleurRoman() {
        Iterator<Roman> it = romans.iterator();
        if (!it.hasNext()) {
            return null;              // librairie vide
        }
        Roman meilleur = it.next();
        while (it.hasNext()) {
            Roman courant = it.next();
            if (courant.getEvaluation() > meilleur.getEvaluation()) {
                meilleur = courant;
            }
        }
        return meilleur;
    }

3.4 Note moyenne par auteur (dans Librairie)
    public float noteMoyenneAuteur(String nom, String prenom) {
        Iterator<Roman> it = romans.iterator();
        float somme = 0;
        int compteur = 0;
        while (it.hasNext()) {
            Roman r = it.next();
            if (r.getAuteur().getNom().equals(nom) && r.getAuteur().getPrenom().equals(prenom)) {
                somme += r.getEvaluation();
                compteur++;
            }
        }
        if (compteur == 0) {
            return -1;
        }
        return somme / compteur;
    }
}`,
      },
    ],
    revision: [
      {
        id: "java-c1",
        title: "Chapitre 1 — Classes, encapsulation, constructeurs",
        exercises: [
          {
            title: "Classe avec 3 attributs",
            statement: "Écris une classe « Livre » avec attributs privés titre (String), auteur (String), nbPages (int), un constructeur les initialisant tous, et des getters pour chacun.",
            hint: "3 getters, 1 constructeur, tous les attributs en private.",
            solution: `public class Livre {
    private String titre;
    private String auteur;
    private int nbPages;

    public Livre(String titre, String auteur, int nbPages) {
        this.titre = titre;
        this.auteur = auteur;
        this.nbPages = nbPages;
    }

    public String getTitre() { return titre; }
    public String getAuteur() { return auteur; }
    public int getNbPages() { return nbPages; }
}`,
          },
          {
            title: "Setter avec validation",
            statement: "Écris un setter setAge(int age) qui refuse (ignore) toute valeur négative.",
            hint: "Un simple if avant l'affectation.",
            solution: `public void setAge(int age) {
    if (age >= 0) {
        this.age = age;
    }
}`,
          },
          {
            title: "Constructeur par défaut",
            statement: "Pourquoi, dès qu'on écrit SOI-MÊME un constructeur dans une classe Java, le constructeur par défaut (sans paramètre) fourni automatiquement par Java disparaît-il ?",
            hint: "Java ne fournit le constructeur par défaut QUE si la classe n'en déclare aucun.",
            solution: "Java ajoute un constructeur sans paramètre automatiquement seulement si la classe n'en définit AUCUN explicitement. Dès qu'un constructeur (avec ou sans paramètres) est écrit à la main, Java considère que le développeur gère lui-même l'initialisation et n'ajoute plus le constructeur par défaut implicite. Si on veut un constructeur sans paramètre en plus, il faut l'écrire explicitement.",
          },
          {
            title: "this() pour chaîner les constructeurs",
            statement: "Écris deux constructeurs pour une classe Point (x, y en int) : un avec (x, y), un sans paramètre qui place le point à (0, 0) en réutilisant le premier via this(...).",
            hint: "this(0, 0); doit être la première ligne du second constructeur.",
            solution: `public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point() {
        this(0, 0);
    }
}`,
          },
          {
            title: "Attribut d'instance vs variable locale",
            statement: `Dans ce code, à quoi fait référence « this.nom » par rapport à « nom » tout court ?

public Personne(String nom) {
    this.nom = nom;
}`,
            hint: "Il y a un conflit de nom entre le paramètre et l'attribut.",
            solution: "« nom » (sans this) désigne le PARAMÈTRE du constructeur (variable locale). « this.nom » désigne l'ATTRIBUT de l'objet en cours de construction. La ligne affecte donc la valeur reçue en paramètre à l'attribut de l'objet — sans « this. », on affecterait la variable locale à elle-même, ce qui ne servirait à rien.",
          },
          {
            title: "Immutabilité simple",
            statement: "Comment rendre une classe « Point » immuable (ses coordonnées ne peuvent plus changer après création) ?",
            hint: "Pas de setters, et des attributs qu'on ne modifie qu'au constructeur.",
            solution: "En ne fournissant AUCUN setter, en rendant les attributs « private final » (final empêche toute réaffectation après le constructeur), et en les initialisant uniquement dans le constructeur. Ainsi, une fois l'objet créé, son état ne peut plus être modifié — on crée un nouveau Point si on veut des coordonnées différentes.",
          },
          {
            title: "Encapsulation : exposer une copie",
            statement: "Une classe « Groupe » a un attribut List<String> membres. Pourquoi un getter « public List<String> getMembres() { return membres; } » casse-t-il l'encapsulation ?",
            hint: "Qui détient la référence après l'appel du getter ?",
            solution: "Parce que ce getter retourne la RÉFÉRENCE directe à la liste interne : le code appelant peut alors faire getMembres().add(\"intrus\") et modifier l'état interne de l'objet Groupe sans passer par aucune méthode de contrôle. Pour protéger l'encapsulation, il faudrait retourner une copie (ex: new ArrayList<>(membres)) ou une vue non modifiable (Collections.unmodifiableList(membres)).",
          },
          {
            title: "Toujours initialiser ses attributs",
            statement: "Que vaut l'attribut « private int compteur; » (sans initialisation explicite) juste après la création d'un objet, en Java ?",
            hint: "Java donne une valeur par défaut à chaque type primitif.",
            solution: "Il vaut 0 (valeur par défaut des int en Java). Les attributs numériques valent 0 par défaut, les boolean valent false, et les références d'objet (String, etc.) valent null — contrairement aux variables locales qui doivent être explicitement initialisées avant usage.",
          },
          {
            title: "Classe utilitaire sans instance",
            statement: "Une classe « MathUtils » ne contient que des méthodes statiques (ex: carre(int n)). Est-il utile de l'instancier avec « new » ? Que peut-on faire pour empêcher son instanciation ?",
            hint: "Pense à un constructeur privé.",
            solution: "Non, inutile : les méthodes static s'appellent directement via MathUtils.carre(5) sans créer d'objet. Pour empêcher toute instanciation accidentelle, on peut déclarer un constructeur PRIVÉ sans corps utile (private MathUtils() {}), ce qui interdit à tout code extérieur de faire new MathUtils().",
          },
          {
            title: "Comparer deux objets avec equals",
            statement: "Pourquoi « p1 == p2 » peut renvoyer false pour deux objets Personne ayant exactement les mêmes attributs, alors que « p1.equals(p2) » (correctement redéfini) renverrait true ?",
            hint: "== compare les références, equals peut comparer le contenu.",
            solution: "« == » compare les RÉFÉRENCES mémoire : p1 et p2 sont deux objets distincts en mémoire, même avec le même contenu, donc == renvoie false. equals(), quand on le redéfinit nous-mêmes pour comparer les attributs (nom, age, etc.) plutôt que d'utiliser l'implémentation par défaut d'Object (qui se comporte comme ==), permet de dire que deux objets sont « égaux » au sens métier dès que leur contenu est identique.",
          },
          {
            title: "Trouver le bug",
            statement: `Ce code ne compile pas, trouve pourquoi :

class Voiture {
    private String marque;
    public voiture(String marque) {
        this.marque = marque;
    }
}`,
            hint: "Regarde attentivement le nom du constructeur.",
            solution: "Le constructeur doit porter EXACTEMENT le même nom que la classe, avec la même casse : il faut « Voiture(String marque) » (V majuscule) et non « voiture(...) ». Tel quel, Java considère « voiture » comme une méthode normale sans type de retour, ce qui est une erreur de compilation.",
          },
          {
            title: "Méthode statique",
            statement: "Écris une méthode statique « max » qui prend deux int en paramètre et retourne le plus grand des deux.",
            hint: "static type nom(params) { ... }",
            solution: `public static int max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}
// Appel : int resultat = NomClasse.max(5, 9);`,
          },
        ],
      },
      {
        id: "java-c2",
        title: "Chapitre 2 — Héritage & polymorphisme",
        exercises: [
          {
            title: "Héritage simple",
            statement: "Vehicule a un attribut vitesse et une méthode accelerer(). Crée Voiture qui hérite de Vehicule et ajoute nbPortes.",
            hint: "extends + super() si besoin.",
            solution: `public class Vehicule {
    protected double vitesse;

    public void accelerer(double delta) {
        vitesse += delta;
    }
}

public class Voiture extends Vehicule {
    private int nbPortes;

    public Voiture(int nbPortes) {
        this.nbPortes = nbPortes;
    }
}`,
          },
          {
            title: "super() obligatoire ou pas ?",
            statement: "Si la classe parente n'a qu'un constructeur avec paramètres (pas de constructeur sans paramètre), que doit OBLIGATOIREMENT faire le constructeur de la sous-classe ?",
            hint: "Java appelle super() implicitement... sauf si ça n'existe pas.",
            solution: "Il DOIT appeler explicitement super(...) avec les bons arguments, en première ligne de son propre constructeur. Sans cela, Java tenterait d'appeler implicitement un super() sans arguments, qui n'existe pas ici — ce qui provoque une ERREUR DE COMPILATION.",
          },
          {
            title: "Override vs Overload",
            statement: "Quelle est la différence entre redéfinir (override) et surcharger (overload) une méthode ?",
            hint: "L'une concerne l'héritage, l'autre la même classe.",
            solution: "Overriding (redéfinition) : une sous-classe fournit sa propre implémentation d'une méthode héritée, avec EXACTEMENT la même signature (nom + types de paramètres). Overloading (surcharge) : on définit PLUSIEURS méthodes avec le MÊME nom mais des signatures différentes (nombre/type de paramètres) dans la MÊME classe — ce n'est pas lié à l'héritage.",
          },
          {
            title: "Polymorphisme à l'exécution",
            statement: `Que va afficher ce code, et pourquoi ?

Animal a = new Chien();
a.crier();
// Chien redéfinit crier() pour afficher "Wouf", Animal affiche "..."`,
            hint: "Le type déclaré est Animal, mais le type RÉEL de l'objet est Chien.",
            solution: "Il affiche « Wouf » (le comportement de Chien), pas celui d'Animal. C'est le principe du polymorphisme dynamique : Java choisit la méthode à exécuter en fonction du type RÉEL de l'objet en mémoire (Chien), pas du type déclaré de la variable (Animal), pour toute méthode redéfinie.",
          },
          {
            title: "@Override, pourquoi l'utiliser ?",
            statement: "À quoi sert l'annotation @Override, sachant qu'elle n'est pas strictement obligatoire pour que la redéfinition fonctionne ?",
            hint: "Elle n'ajoute pas de comportement, mais ajoute une vérification.",
            solution: "Elle demande au COMPILATEUR de vérifier qu'une méthode portant ce nom et cette signature existe bien dans la classe parente (ou l'interface implémentée). Si on fait une faute de frappe dans le nom ou la signature, sans @Override on créerait silencieusement une NOUVELLE méthode (pas une redéfinition) — avec @Override, le compilateur signale l'erreur immédiatement.",
          },
          {
            title: "Appeler la version parente",
            statement: "Dans une méthode redéfinie toString() d'une sous-classe, comment réutiliser le texte produit par le toString() de la classe parente, puis y ajouter des informations ?",
            hint: "super.methode() appelle la version du parent.",
            solution: `@Override
public String toString() {
    return super.toString() + " - informations supplémentaires";
}
// super.toString() appelle explicitement la version de la classe parente avant d'y ajouter du contenu.`,
          },
          {
            title: "Interdire l'héritage ou la redéfinition",
            statement: "Comment empêche-t-on, en Java, qu'une classe soit héritée, ou qu'une méthode soit redéfinie par une sous-classe ?",
            hint: "Un seul mot-clé pour les deux cas, à des endroits différents.",
            solution: "Avec le mot-clé « final ». « public final class Constante { ... } » empêche toute classe d'en hériter. « public final void methode() { ... } » empêche toute sous-classe de redéfinir cette méthode précise, même si la classe elle-même peut être héritée.",
          },
          {
            title: "Liste polymorphe",
            statement: "Pourquoi peut-on écrire « List<Animal> animaux = new ArrayList<>(); animaux.add(new Chien()); animaux.add(new Chat());» alors que Chien et Chat sont des classes différentes ?",
            hint: "Chien et Chat sont tous deux des Animal (héritage).",
            solution: "Parce que Chien et Chat héritent tous deux d'Animal (relation « est-un »). Une List<Animal> peut donc contenir n'importe quel objet dont le type réel est Animal OU une de ses sous-classes. C'est l'intérêt du polymorphisme : on peut parcourir cette liste et appeler animal.crier() sur chaque élément, chacun exécutant SA propre version.",
          },
          {
            title: "Downcast et ClassCastException",
            statement: "Dans « Animal a = new Chat(); Chien c = (Chien) a; », que se passe-t-il à l'exécution ? Pourquoi ?",
            hint: "Le type réel de l'objet est Chat, pas Chien.",
            solution: "Cela lève une ClassCastException à l'exécution. Le downcast (conversion vers un type plus spécifique) n'est valide que si le type RÉEL de l'objet correspond effectivement à Chien (ou une sous-classe de Chien) — ici l'objet est réellement un Chat, donc la conversion est impossible et Java le détecte au moment de l'exécution (pas à la compilation).",
          },
          {
            title: "Constructeur et ordre d'initialisation",
            statement: "Dans une hiérarchie A → B → C (C hérite de B qui hérite de A), dans quel ordre les constructeurs de A, B et C s'exécutent-ils quand on fait « new C(...) » ?",
            hint: "Le parent est toujours initialisé avant l'enfant.",
            solution: "Dans l'ordre A, puis B, puis C. Chaque constructeur appelle implicitement ou explicitement super(...) en première instruction, ce qui garantit que la classe la plus ANCIENNE (la racine de la hiérarchie) est initialisée en premier, avant que les couches plus spécifiques (B, puis C) n'ajoutent leur propre initialisation.",
          },
          {
            title: "Héritage",
            statement: "Crée une classe « Etudiant » qui hérite de « Personne » (ci-dessus) et ajoute un attribut « numeroEtudiant ». Redéfinis afficher() pour inclure ce numéro.",
            hint: "Utilise extends, super(...) dans le constructeur, et @Override pour la méthode.",
            solution: `public class Etudiant extends Personne {
    private String numeroEtudiant;

    public Etudiant(String nom, int age, String numeroEtudiant) {
        super(nom, age);
        this.numeroEtudiant = numeroEtudiant;
    }

    @Override
    public void afficher() {
        super.afficher();
        System.out.println("Numéro étudiant : " + numeroEtudiant);
    }
}`,
          },
        ],
      },
      {
        id: "java-c3",
        title: "Chapitre 3 — Classes abstraites & interfaces",
        exercises: [
          {
            title: "Créer une classe abstraite",
            statement: "Crée une classe abstraite « Employe » avec un attribut nom, un constructeur, et une méthode abstraite calculerSalaire(): double.",
            hint: "abstract class ... { abstract double methode(); }",
            solution: `public abstract class Employe {
    protected String nom;

    public Employe(String nom) {
        this.nom = nom;
    }

    public abstract double calculerSalaire();
}`,
          },
          {
            title: "Pourquoi ne peut-on pas instancier une classe abstraite ?",
            statement: "Explique pourquoi « new Employe(\"Dupont\") » est interdit si Employe est une classe abstraite.",
            hint: "Pense à la méthode abstraite sans implémentation.",
            solution: "Parce qu'une classe abstraite peut contenir des méthodes SANS implémentation (abstraites) : si on pouvait l'instancier directement, appeler calculerSalaire() sur cet objet n'aurait aucun code à exécuter. Java interdit donc l'instanciation directe d'une classe abstraite — seules ses sous-classes CONCRÈTES (qui implémentent toutes les méthodes abstraites) peuvent être instanciées.",
          },
          {
            title: "Interface simple",
            statement: "Crée une interface « Volant » avec une méthode voler(): void, puis fais-la implémenter par une classe Oiseau.",
            hint: "interface Volant { void voler(); } puis implements.",
            solution: `public interface Volant {
    void voler();
}

public class Oiseau implements Volant {
    @Override
    public void voler() {
        System.out.println("L'oiseau vole.");
    }
}`,
          },
          {
            title: "Implémenter plusieurs interfaces",
            statement: "Une classe « CanardMecanique » doit à la fois « voler » (interface Volant) et « flotter » (interface Flottant). Comment Java permet-il cela, contrairement à l'héritage de classes ?",
            hint: "implements accepte une liste séparée par des virgules.",
            solution: `public class CanardMecanique implements Volant, Flottant {
    @Override
    public void voler() { /* ... */ }

    @Override
    public void flotter() { /* ... */ }
}
// Java interdit l'héritage multiple de CLASSES (extends A, B est interdit)
// mais autorise l'implémentation de PLUSIEURS interfaces à la fois.`,
          },
          {
            title: "Classe abstraite avec code partagé",
            statement: "Pourquoi préférer une classe abstraite à une interface quand plusieurs sous-classes partagent une IMPLÉMENTATION commune (pas seulement une signature) ?",
            hint: "Une interface classique n'a pas de corps de méthode réutilisable (hors default methods).",
            solution: "Parce qu'une classe abstraite peut fournir du CODE CONCRET partagé (méthodes avec corps, attributs, constructeur) que toutes les sous-classes héritent sans le réécrire, en plus des méthodes abstraites qu'elles doivent implémenter chacune à leur façon. Une interface classique ne permet pas de factoriser un état (attributs) ni, historiquement, du code par défaut (même si les « default methods » depuis Java 8 permettent un peu de code partagé, sans état).",
          },
          {
            title: "Constante dans une interface",
            statement: "Quelle est la visibilité et la mutabilité implicites d'un champ déclaré directement dans une interface Java (ex: « int MAX = 100; » dans une interface) ?",
            hint: "Les champs d'interface sont toujours de la même nature.",
            solution: "Il est implicitement public, static et final (donc une CONSTANTE de classe, pas un attribut d'instance modifiable), même si ces mots-clés ne sont pas écrits explicitement. On ne peut donc jamais avoir d'état mutable propre à chaque objet dans une interface classique.",
          },
          {
            title: "Classe concrète obligatoire",
            statement: "Une classe B hérite d'une classe abstraite A qui a deux méthodes abstraites. B n'en implémente qu'une. Que se passe-t-il à la compilation ?",
            hint: "Toutes les méthodes abstraites doivent être couvertes avant qu'une classe soit instanciable.",
            solution: "Erreur de compilation si B essaie d'être une classe concrète (instanciable) : toute classe concrète DOIT implémenter TOUTES les méthodes abstraites héritées. La seule façon d'éviter l'erreur serait de déclarer B elle-même comme « abstract », reportant l'implémentation de la méthode manquante à une sous-classe ultérieure.",
          },
          {
            title: "Interface comme contrat",
            statement: "En quoi une interface « Comparable<T> » constitue-t-elle un « contrat » plutôt qu'une simple relation d'héritage ?",
            hint: "Pense à des classes très différentes qui peuvent toutes être comparables.",
            solution: "Une interface définit un COMPORTEMENT attendu (ici : « être comparable à un autre objet du même type ») sans imposer de parenté entre les classes qui l'implémentent. Des classes totalement différentes (Personne, Produit, Date...) qui n'ont aucun lien de famille peuvent toutes implémenter Comparable et être triées de la même façon (Collections.sort), simplement parce qu'elles respectent le même contrat.",
          },
          {
            title: "Classe abstraite sans aucune méthode abstraite",
            statement: "Peut-on déclarer une classe « abstract » même si elle ne contient AUCUNE méthode abstraite ? Pourquoi ferait-on cela ?",
            hint: "« abstract » sur une classe empêche surtout une chose précise.",
            solution: "Oui, c'est autorisé. On fait cela principalement pour EMPÊCHER L'INSTANCIATION DIRECTE de cette classe (forcer l'utilisateur à passer par une sous-classe), même si toutes ses méthodes ont déjà une implémentation par défaut — par exemple pour une classe de base générique qui n'a de sens que spécialisée.",
          },
          {
            title: "Choisir entre classe abstraite et interface",
            statement: "On modélise Forme (Cercle, Carré, Triangle) qui partagent un attribut couleur et une méthode afficherInfos() commune, mais chacune calcule son aire différemment. Classe abstraite ou interface ? Justifie.",
            hint: "Il y a un état partagé (couleur) ET du code commun (afficherInfos).",
            solution: "Classe abstraite : il y a un ÉTAT partagé (couleur) et du CODE COMMUN réutilisable (afficherInfos()) entre toutes les sous-classes, ce qu'une interface classique ne permet pas de factoriser aussi simplement. Seule calculerAire() doit rester abstraite, propre à chaque forme. Une interface serait plus adaptée s'il n'y avait aucun état ni code partagé, juste un contrat de méthodes.",
          },
        ],
      },
      {
        id: "java-c4",
        title: "Chapitre 4 — Collections & Iterator",
        exercises: [
          {
            title: "Créer et remplir une ArrayList",
            statement: "Déclare une ArrayList<String> de prénoms et ajoute-lui trois valeurs.",
            hint: "import java.util.ArrayList; puis new ArrayList<>().",
            solution: `ArrayList<String> prenoms = new ArrayList<>();
prenoms.add("Alice");
prenoms.add("Bob");
prenoms.add("Chloé");`,
          },
          {
            title: "Parcourir avec un Iterator",
            statement: "Parcours une ArrayList<Integer> « notes » avec un Iterator pour afficher chaque valeur.",
            hint: "hasNext() puis next() dans une boucle while.",
            solution: `Iterator<Integer> it = notes.iterator();
while (it.hasNext()) {
    int note = it.next();
    System.out.println(note);
}`,
          },
          {
            title: "Pourquoi utiliser Iterator plutôt qu'un for classique ?",
            statement: "Donne une situation où utiliser un Iterator (plutôt qu'une boucle for à index) est particulièrement utile, voire nécessaire.",
            hint: "Pense à la suppression d'éléments pendant un parcours.",
            solution: "Quand on doit SUPPRIMER des éléments d'une collection PENDANT qu'on la parcourt : avec un for à index classique ou un for-each, supprimer un élément en cours de parcours provoque souvent une ConcurrentModificationException ou décale les index de façon incorrecte. L'Iterator fournit une méthode remove() sûre, conçue spécifiquement pour ce cas (it.remove() après it.next()).",
          },
          {
            title: "Trouver le maximum avec Iterator",
            statement: `Écris une méthode qui retourne la plus grande valeur d'une ArrayList<Integer>, en utilisant un Iterator (pas de boucle for classique, ni Collections.max).
On suppose la liste non vide.`,
            hint: "Initialise le max avec le premier élément via it.next() avant la boucle.",
            solution: `public int trouverMax(ArrayList<Integer> liste) {
    Iterator<Integer> it = liste.iterator();
    int max = it.next();
    while (it.hasNext()) {
        int val = it.next();
        if (val > max) {
            max = val;
        }
    }
    return max;
}
// it.next() sur une liste vide lève NoSuchElementException : en vrai code, tester liste.isEmpty() avant.`,
          },
          {
            title: "contains() et equals()",
            statement: "Pourquoi « liste.contains(new Personne(\"Dupont\", 30)) » peut renvoyer false même si une Personne avec exactement ces attributs est déjà dans la liste, si on n'a rien fait de particulier ?",
            hint: "contains() s'appuie sur equals().",
            solution: "Parce que contains() utilise la méthode equals() de la classe Personne pour comparer les éléments, et que par défaut (héritée d'Object), equals() compare les RÉFÉRENCES mémoire (comme ==). Tant qu'on n'a pas redéfini equals() (et idéalement hashCode()) dans la classe Personne pour comparer le contenu (nom, âge), deux objets avec les mêmes valeurs mais créés séparément seront considérés comme différents.",
          },
          {
            title: "ArrayList vs tableau classique",
            statement: "Cite deux avantages d'une ArrayList<T> par rapport à un tableau classique T[] en Java.",
            hint: "Pense à la taille et aux méthodes disponibles.",
            solution: "1) Une ArrayList peut grandir ou rétrécir dynamiquement (add/remove) sans avoir à connaître la taille finale à l'avance, contrairement à un tableau dont la taille est fixée à la création. 2) Elle fournit de nombreuses méthodes utilitaires prêtes à l'emploi (contains, indexOf, remove par valeur, etc.) qu'il faudrait réimplémenter soi-même avec un tableau classique.",
          },
          {
            title: "Supprimer pendant un parcours avec Iterator",
            statement: "Écris une méthode qui retire de l'ArrayList<Integer> « notes » toutes les valeurs strictement inférieures à 10, en utilisant un Iterator.",
            hint: "it.remove() juste après avoir lu la valeur avec it.next().",
            solution: `public void retirerNotesInsuffisantes(ArrayList<Integer> notes) {
    Iterator<Integer> it = notes.iterator();
    while (it.hasNext()) {
        int note = it.next();
        if (note < 10) {
            it.remove();
        }
    }
}`,
          },
          {
            title: "Générique et typage",
            statement: "Pourquoi « ArrayList<Integer> » et non « ArrayList<int> » ? Qu'est-ce que l'autoboxing a à voir avec cela ?",
            hint: "Les génériques Java ne fonctionnent qu'avec des types objets.",
            solution: "Les génériques Java (<T>) ne peuvent fonctionner qu'avec des TYPES OBJETS, pas avec les types primitifs (int, double...) directement — « int » n'est pas une classe. Integer est la classe « wrapper » (enveloppe objet) correspondant au primitif int. L'autoboxing est la conversion automatique que Java effectue entre int et Integer (ex: liste.add(5) convertit automatiquement le int 5 en Integer), ce qui permet d'utiliser les génériques de façon transparente avec des valeurs numériques.",
          },
          {
            title: "Parcourir une collection d'objets personnalisés",
            statement: "On a une ArrayList<Produit> (classe Produit avec getPrix()). Calcule, avec un Iterator, la somme totale des prix.",
            hint: "Même principe que pour les int, mais on appelle une méthode sur chaque objet.",
            solution: `public double sommeDesPrix(ArrayList<Produit> produits) {
    Iterator<Produit> it = produits.iterator();
    double somme = 0;
    while (it.hasNext()) {
        Produit p = it.next();
        somme += p.getPrix();
    }
    return somme;
}`,
          },
          {
            title: "Choisir la bonne structure",
            statement: "Pour stocker un ensemble de noms sans AUCUN doublon, et sans se soucier de leur ordre, quelle collection choisir plutôt qu'une ArrayList ?",
            hint: "Il existe une collection Java dédiée à l'unicité.",
            solution: "Un HashSet<String> (ou TreeSet si on veut en plus un ordre trié). Contrairement à une ArrayList qui accepte les doublons et conserve l'ordre d'ajout, un Set garantit automatiquement qu'aucune valeur ne peut apparaître deux fois (selon equals/hashCode).",
          },
        ],
      },
    ],
  },
  {
    id: "c",
    name: "Introduction au langage C",
    short: "C",
    code: "UE3",
    color: "#4ecb8e",
    sections: [
      {
        label: "Cours (CM)",
        docs: [
          {
            title: "CM1 — Du Python au C",
            file: "pdfs/c/cm1-du-python-au-c.pdf",
          },
          {
            title: "CM2 — Les pointeurs",
            file: "pdfs/c/cm2-pointeurs.pdf",
          },
          {
            title: "CM3 — Tableaux et pointeurs",
            file: "pdfs/c/cm3-tableaux-pointeurs.pdf",
          },
          {
            title: "CM4 — Chaînes de caractères",
            file: "pdfs/c/cm4-chaines-caracteres.pdf",
          },
          {
            title: "CM5 — Structures et allocation dynamique",
            file: "pdfs/c/cm5-structures-allocation.pdf",
          },
        ],
      },
      {
        label: "Travaux dirigés (TD)",
        docs: [
          {
            title: "TD1 — Premiers programmes en C",
            file: "pdfs/c/td1-premiers-programmes.pdf",
          },
          {
            title: "TD2 — Les pointeurs",
            file: "pdfs/c/td2-pointeurs.pdf",
          },
          {
            title: "TD3 — Tableaux et chaînes de caractères",
            file: "pdfs/c/td3-tableaux-chaines.pdf",
          },
          {
            title: "TD4 — Structures et allocation dynamique",
            file: "pdfs/c/td4-structures-allocation.pdf",
          },
        ],
      },
      {
        label: "Projet",
        docs: [
          {
            title: "Projet Puissance 4 — Présentation",
            file: "pdfs/c/projet-puissance4.pdf",
          },
        ],
      },
    ],
    qcm: [
      {
        q: "Que représente un pointeur en C ?",
        options: [
          "Une variable qui stocke une adresse mémoire",
          "Un type de boucle",
          "Une fonction récursive",
          "Un tableau à deux dimensions",
        ],
        correct: 0,
        explain: "Un pointeur est une variable dont la valeur est l'adresse mémoire d'une autre variable, pas la donnée elle-même.",
        chap: "c-c2",
        hint: "Analogie du CM2 : le numéro du casier.",
      },
      {
        q: "Quel opérateur permet d'obtenir l'adresse d'une variable ?",
        options: ["*", "&", "%", "#"],
        correct: 1,
        explain: "« & » (adresse de) donne l'adresse mémoire d'une variable. Exemple : int *p = &x; fait pointer p vers x.",
        chap: "c-c2",
        hint: "On le lit « adresse de ».",
      },
      {
        q: "Quel opérateur permet d'accéder à la valeur pointée par un pointeur ?",
        options: ["&", "->", "*", "::"],
        correct: 2,
        explain: "« * » (déréférencement) donne accès à la valeur stockée à l'adresse pointée. *p lit ou écrit la valeur de x si p = &x.",
        chap: "c-c2",
        hint: "On le lit « ce qui est contenu à l'adresse ».",
      },
      {
        q: "Que fait malloc() ?",
        options: [
          "Libère de la mémoire",
          "Alloue dynamiquement de la mémoire sur le tas (heap)",
          "Alloue de la mémoire sur la pile",
          "Copie une chaîne de caractères",
        ],
        correct: 1,
        explain: "malloc(taille) réserve un bloc mémoire sur le tas et retourne un pointeur vers ce bloc (ou NULL si l'allocation échoue).",
        chap: "c-c5",
        hint: "m-alloc : memory allocation.",
      },
      {
        q: "Pourquoi faut-il appeler free() après avoir utilisé malloc() ?",
        options: [
          "Ce n'est pas nécessaire",
          "Pour éviter les fuites mémoire (memory leaks)",
          "Pour accélérer le programme",
          "Pour initialiser la mémoire à zéro",
        ],
        correct: 1,
        explain: "La mémoire allouée dynamiquement n'est pas libérée automatiquement : si on ne fait pas free(), elle reste occupée jusqu'à la fin du programme — c'est une fuite mémoire.",
        chap: "c-c5",
        hint: "Que devient une zone réservée que l'on ne rend jamais ?",
      },
      {
        q: "En C, un tableau « tab » déclaré en paramètre de fonction se comporte essentiellement comme...",
        options: [
          "Une copie complète du tableau",
          "Un pointeur vers son premier élément",
          "Un type totalement différent, sans lien avec les pointeurs",
          "Un double pointeur",
        ],
        correct: 1,
        explain: "Une fonction reçoit l'adresse de la première case : dans les paramètres, float tab[] et float* tab représentent la même chose (CM3). Elle accède donc aux mêmes cases que l'appelant, sans copie.",
        chap: "c-c3",
        hint: "La fonction reçoit-elle tout le tableau, ou seulement de quoi le retrouver ?",
      },
      {
        q: "Comment se termine une chaîne de caractères en C ?",
        options: [
          "Par un espace",
          "Par le caractère nul '\\0'",
          "Par un retour à la ligne",
          "Les chaînes C n'ont pas de terminateur",
        ],
        correct: 1,
        explain: "Une chaîne C est un tableau de char terminé par l'octet '\\0' (valeur 0), qui marque la fin de la chaîne pour des fonctions comme strlen ou printf.",
        chap: "c-c4",
        hint: "Il faut bien que printf sache où s'arrêter.",
      },
      {
        q: "Que se passe-t-il si on déréférence un pointeur NULL (*p avec p == NULL) ?",
        options: [
          "Le programme retourne simplement 0",
          "Comportement indéfini, souvent un plantage (segmentation fault)",
          "Rien, c'est autorisé et sûr",
          "Le pointeur devient automatiquement valide",
        ],
        correct: 1,
        explain: "Déréférencer un pointeur NULL (ou invalide) est un comportement indéfini qui provoque généralement un crash du programme (segmentation fault).",
        chap: "c-c2",
        hint: "NULL vaut l'adresse 0, que le programme n'a pas le droit de lire.",
      },
      {
        q: "Quelle est la différence principale entre un tableau statique et une allocation dynamique avec malloc ?",
        options: [
          "Aucune différence",
          "La taille d'un tableau statique est fixée à la compilation ; une allocation dynamique peut dépendre de données connues seulement à l'exécution",
          "malloc est interdit en pratique",
          "Un tableau statique est toujours plus grand",
        ],
        correct: 1,
        explain: "int tab[10]; fige la taille au moment de la compilation. Avec malloc(n * sizeof(int)), la taille n peut être calculée pendant l'exécution du programme (ex: saisie utilisateur).",
        chap: "c-c5",
        hint: "À quel moment la taille est-elle connue ?",
      },
      {
        q: "Que fait l'opérateur sizeof ?",
        options: [
          "Retourne la taille en octets d'un type ou d'une variable",
          "Retourne toujours le nombre d'éléments d'un tableau",
          "Alloue de la mémoire",
          "Libère de la mémoire",
        ],
        correct: 0,
        explain: "sizeof(type) ou sizeof(variable) donne la taille en octets occupée en mémoire — très utilisé avec malloc : malloc(n * sizeof(int)).",
        chap: "c-c5",
        hint: "Dans malloc(nb * sizeof(int)), que représente sizeof(int) ?",
      },
      {
        chap: "c-c1",
        q: "Que fait l'option -Wall de gcc ?",
        options: [
          "Affiche tous les warnings",
          "Transforme les warnings en erreurs",
          "Lance l'exécutable",
          "Supprime les warnings",
        ],
        correct: 0,
        hint: "-Werror fait autre chose.",
        explain: "-Wall affiche tous les warnings ; -Werror les transforme en erreurs (CM1).",
      },
      {
        chap: "c-c1",
        q: "Que vaut r après : int a = 2, b = 1; float r = b / a; ?",
        options: ["0.000000", "0.500000", "1.000000", "Erreur de compilation"],
        correct: 0,
        hint: "Quel est le type des deux opérandes de la division ?",
        explain: "b / a est une division entre deux int : 1 / 2 = 0 (partie décimale tronquée), puis 0 est converti en float. Exemple du CM1.",
      },
      {
        chap: "c-c1",
        q: "Quelle est la première étape de la chaîne de compilation ?",
        options: ["Le préprocessing (gcc -E)", "L'édition de liens", "L'assemblage", "L'interprétation ligne par ligne"],
        correct: 0,
        hint: "Avant tout, les #include et #define doivent être remplacés.",
        explain: "Préprocessing → compilation (-S) → assemblage (-c) → édition de liens. Le C n'est pas interprété.",
      },
      {
        chap: "c-c1",
        q: "En C, on peut appeler une fonction définie plus bas dans le fichier sans l'avoir prototypée.",
        options: ["Vrai", "Faux"],
        correct: 1,
        fixedOrder: true,
        hint: "Souviens-toi de la diapo « illégal : ça ne compile pas ».",
        explain: "Faux : une fonction doit être prototypée (déclarée) avant son premier appel.",
      },
      {
        chap: "c-c1",
        q: "Quel spécificateur de format utilise-t-on pour un double dans scanf ?",
        options: ["%lf", "%d", "%c", "%ld"],
        correct: 0,
        hint: "« l » pour la version « grosse », « f » pour réel.",
        explain: "Tableau du CM1 : int %d, char %c, float %f, long %ld, double %lf.",
      },
      {
        chap: "c-c3",
        q: "Pour float tab[5], que désigne *(tab + 2) ?",
        options: ["La valeur de tab[2]", "L'adresse de tab[2]", "tab[0] + 2", "Une erreur"],
        correct: 0,
        hint: "tab[i] == *(tab + i).",
        explain: "tab + 2 est l'adresse de la case 2 ; l'étoile donne la valeur qui s'y trouve, donc tab[2].",
      },
      {
        chap: "c-c3",
        q: "Quels sont les indices valides d'un tableau de taille 5 ?",
        options: ["De 0 à 4", "De 1 à 5", "De 0 à 5", "De 1 à 4"],
        correct: 0,
        hint: "La première case est notes[0].",
        explain: "Premier indice 0, dernier taille - 1 = 4. notes[5] sort du tableau.",
      },
      {
        chap: "c-c3",
        q: "Le C vérifie automatiquement qu'on ne sort pas des limites d'un tableau.",
        options: ["Vrai", "Faux"],
        correct: 1,
        fixedOrder: true,
        hint: "Que dit le CM3 à propos de notes[5] = 10; ?",
        explain: "Faux : aucune vérification. Un accès hors limites est un comportement indéfini, même s'il semble fonctionner.",
      },
      {
        chap: "c-c3",
        q: "Pourquoi transmettre la taille d'un tableau en paramètre d'une fonction ?",
        options: [
          "L'adresse reçue indique où commence le tableau, pas où il se termine",
          "Pour copier le tableau",
          "Parce que sizeof est interdit dans une fonction",
          "Pour allouer le tableau",
        ],
        correct: 0,
        hint: "Que reçoit exactement la fonction ?",
        explain: "La fonction ne reçoit que l'adresse de la première case : sans la taille, elle ne sait pas où s'arrêter.",
      },
      {
        chap: "c-c4",
        q: "Combien de cases occupe char mot[] = \"chat\"; ?",
        options: ["5", "4", "6", "Cela dépend du compilateur"],
        correct: 0,
        hint: "N'oublie pas le marqueur de fin.",
        explain: "4 caractères visibles + '\\0' ajouté automatiquement par les guillemets doubles = 5 cases.",
      },
      {
        chap: "c-c4",
        q: "Que renvoie strcmp(s1, s2) quand les deux chaînes sont identiques ?",
        options: ["0", "1", "-1", "true"],
        correct: 0,
        hint: "Le test d'égalité s'écrit strcmp(s1, s2) == …",
        explain: "0 si identiques, une valeur négative si s1 est avant s2, positive si après.",
      },
      {
        chap: "c-c4",
        q: "Pourquoi n'y a-t-il pas de & dans scanf(\"%19s\", mot) avec char mot[20] ?",
        options: [
          "Le nom du tableau donne déjà l'adresse de mot[0]",
          "Parce que %s l'interdit",
          "Parce que mot vaut NULL",
          "C'est une erreur, il en faut un",
        ],
        correct: 0,
        hint: "Rappel CM3 : tab == &tab[0].",
        explain: "mot est un tableau de char : son nom fournit l'adresse de sa première case. scanf range les caractères puis ajoute '\\0'.",
      },
      {
        chap: "c-c4",
        q: "Pour char mot[20] = \"chat\";, quelles affirmations sont vraies ?",
        options: ["strlen(mot) vaut 4", "sizeof(mot) vaut 20", "sizeof(mot) vaut 4", "strlen(mot) vaut 5"],
        correct: [0, 1],
        hint: "strlen et sizeof ne répondent pas à la même question.",
        explain: "strlen compte les caractères avant '\\0' (4) ; sizeof donne la capacité du tableau en octets (20).",
      },
    ],
    annales: [
      {
        id: "c-mock-2026",
        title: "Sujet type — Langage C (créé pour la révision)",
        meta: "60 minutes · aucun document autorisé · sujet ORIGINAL inspiré du programme du cours",
        official: false,
        sujetFile: null,
        correctionNote: "Sujet et correction entièrement rédigés par le site : aucune annale officielle n'existe pour cette matière sur Moodle. Le format et le niveau imitent les partiels d'UML/Java pour s'entraîner dans les mêmes conditions.",
        sujetText: `Introduction au langage C — Sujet d'entraînement (non officiel)
Durée conseillée : 60 minutes — Aucun document autorisé

EXERCICE 1 — Questions de cours (6 points, 1,5 point par question)
1.1 Expliquez la différence entre une variable et un pointeur vers cette variable.
1.2 Expliquez pourquoi on utilise souvent "const char *" plutôt que "char *" pour un paramètre de fonction qui ne doit que LIRE une chaîne.
1.3 Expliquez ce qu'est une fuite mémoire (memory leak) et donnez un exemple de code qui en provoque une.
1.4 Comparez l'allocation d'un tableau statique (int tab[10];) et d'un tableau dynamique (malloc).

EXERCICE 2 — Analyse de programme (3 points)
Quel est l'affichage de ce programme ?

#include <stdio.h>
int main() {
    int tab[5] = {2, 4, 6, 8, 10};
    int *p = tab;
    for (int i = 0; i < 5; i++) {
        if (*(p + i) % 4 == 0) {
            printf("%d pair-4\\n", *(p + i));
        } else {
            printf("%d simple\\n", *(p + i));
        }
    }
    return 0;
}

EXERCICE 3 — Programmation en C (11 points)
On souhaite gérer une petite liste d'élèves avec leurs notes.

struct Eleve {
    char nom[30];
    float note;
};

3.1 (3 points) Écrivez une fonction "struct Eleve* creerEleve(const char *nom, float note)" qui alloue dynamiquement un struct Eleve, copie le nom (avec strcpy) et initialise la note, puis retourne le pointeur. Vérifiez que l'allocation a réussi.

3.2 (3 points) Écrivez une fonction "struct Eleve* creerListe(int n)" qui alloue dynamiquement un tableau de n struct Eleve (pas de pointeurs vers Eleve, directement un tableau de structures).

3.3 (3 points) Écrivez une fonction "float moyenne(struct Eleve *liste, int n)" qui calcule et retourne la moyenne des notes du tableau.

3.4 (2 points) Écrivez une fonction "void libererListe(struct Eleve *liste)" et expliquez en une phrase pourquoi elle est nécessaire ici.`,
        correction: `EXERCICE 1 — Questions de cours (6 pts)

1.1 Variable vs pointeur
Une variable "classique" stocke directement une donnée (ex: int x = 5; stocke la valeur 5). Un pointeur stocke une ADRESSE MÉMOIRE, c'est-à-dire l'emplacement où se trouve une donnée (ex: int *p = &x; stocke l'adresse de x, pas 5 directement). On accède à la donnée pointée via le déréférencement (*p).

1.2 const char *
On utilise "const char *" pour indiquer, au niveau du code ET du compilateur, que la fonction ne doit QUE LIRE la chaîne reçue, sans jamais la modifier. Le compilateur refuse alors toute tentative de modification du contenu pointé (ex: chaine[0] = 'X';), ce qui documente l'intention de la fonction et évite des bugs de modification accidentelle, en particulier si on passe une chaîne littérale (non modifiable de toute façon).

1.3 Fuite mémoire
Une fuite mémoire se produit quand de la mémoire allouée dynamiquement (via malloc/calloc) n'est jamais libérée par free(), et que le programme perd en plus toute référence à cette mémoire (le pointeur est écrasé ou sort de portée). Exemple :
void f() {
    int *p = malloc(sizeof(int));
    *p = 10;
    // pas de free(p) ici, et p disparaît à la fin de la fonction
}
À chaque appel de f(), 4 octets restent occupés sans jamais pouvoir être récupérés tant que le programme tourne.

1.4 Tableau statique vs dynamique
int tab[10]; réserve une taille FIXE, connue dès la COMPILATION, sur la pile (stack) — on ne peut pas changer sa taille ensuite. Avec malloc(n * sizeof(int)), la taille (n) peut être déterminée seulement à l'EXÉCUTION (ex: lue au clavier) et la mémoire est réservée sur le tas (heap) ; il faut alors explicitement la libérer avec free() quand on n'en a plus besoin, ce qui n'est pas nécessaire pour un tableau statique.

EXERCICE 2 — Analyse de programme (3 pts)

p pointe sur tab, donc *(p+i) équivaut à tab[i]. Valeurs : 2, 4, 6, 8, 10. Condition : valeur % 4 == 0.
  2 % 4 = 2  → "2 simple"
  4 % 4 = 0  → "4 pair-4"
  6 % 4 = 2  → "6 simple"
  8 % 4 = 0  → "8 pair-4"
  10 % 4 = 2 → "10 simple"

Sortie :
2 simple
4 pair-4
6 simple
8 pair-4
10 simple

EXERCICE 3 — Programmation en C (11 pts)

3.1 Créer un élève
struct Eleve* creerEleve(const char *nom, float note) {
    struct Eleve *e = malloc(sizeof(struct Eleve));
    if (e == NULL) {
        fprintf(stderr, "Erreur d'allocation\\n");
        exit(1);
    }
    strcpy(e->nom, nom);
    e->note = note;
    return e;
}

3.2 Créer un tableau de structures
struct Eleve* creerListe(int n) {
    struct Eleve *liste = malloc(n * sizeof(struct Eleve));
    if (liste == NULL) {
        fprintf(stderr, "Erreur d'allocation\\n");
        exit(1);
    }
    return liste;
}
// Ici, pas besoin de boucle pour initialiser chaque élément à ce stade : le tableau est simplement réservé.

3.3 Calculer la moyenne
float moyenne(struct Eleve *liste, int n) {
    float somme = 0;
    for (int i = 0; i < n; i++) {
        somme += liste[i].note;
    }
    return somme / n;
}

3.4 Libérer la liste
void libererListe(struct Eleve *liste) {
    free(liste);
}
// Nécessaire car "liste" a été allouée dynamiquement avec malloc() en 3.2 : cette mémoire reste réservée sur le tas
// jusqu'à ce qu'on la libère explicitement avec free(), sinon c'est une fuite mémoire.`,
      },
    ],
    revision: [
      {
        id: "c-c1",
        title: "Chapitre 1 — Bases du C (du Python au C)",
        exercises: [
          {
            title: "Déclarer et typer une variable",
            statement: "Pourquoi, en C, doit-on écrire « int x = 5; » alors qu'en Python « x = 5 » suffit ?",
            hint: "Pense au typage statique vs dynamique.",
            solution: "Le C est un langage à TYPAGE STATIQUE : chaque variable doit avoir un type déclaré explicitement (int, float, char...) qui ne change jamais ensuite, et ce type est vérifié à la compilation. Python est à typage dynamique : une variable ne porte pas de type fixe, celui-ci est déterminé (et peut changer) à l'exécution selon la valeur affectée.",
          },
          {
            title: "Structure minimale d'un programme C",
            statement: "Quelle est la fonction qui DOIT obligatoirement exister dans tout programme C exécutable, et que représente généralement sa valeur de retour ?",
            hint: "C'est le point d'entrée du programme.",
            solution: "La fonction « main() », point d'entrée obligatoire de tout programme C. Sa valeur de retour (un int) indique généralement le code de sortie du programme au système d'exploitation : 0 signifie « succès », une valeur non nulle signale généralement une erreur.",
          },
          {
            title: "Compilation : étapes",
            statement: "Cite, dans l'ordre, les 4 étapes de la chaîne de compilation présentée au CM1, avec l'option gcc correspondante quand il y en a une. Pourquoi Python n'a-t-il pas cette étape ?",
            hint: "Fichiers successifs : .c → .i → .s → .o → exécutable.",
            solution: `1) Préprocessing (gcc -E) : remplace les #include et #define par leur contenu (.c → .i).
2) Compilation (gcc -S) : vérifie la syntaxe et traduit le C en assembleur (.i → .s).
3) Assemblage (gcc -c) : transforme l'assembleur en binaire, fichier objet (.s → .o), avec des références en attente.
4) Édition de liens : relie les fichiers objets et résout les références pour créer l'exécutable.
En pratique une seule commande fait tout : gcc -Wall main.c fonctions.c -o monExe.exe
Python est interprété : la traduction se fait pendant l'exécution, ligne par ligne.`,
          },
          {
            title: "Boucle for en C vs Python",
            statement: "Traduis en C cette boucle Python : for i in range(5): print(i)",
            hint: "for (int i = 0; i < 5; i++) { ... }",
            solution: `for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}`,
          },
          {
            title: "Types numériques en C",
            statement: "Quelle est la différence entre « int » et « float » en C, et pourquoi 7 / 2 ne donne-t-il pas 3.5 si les deux opérandes sont des int ?",
            hint: "La division entre deux int reste de type int.",
            solution: "« int » stocke des nombres entiers, « float » stocke des nombres à virgule flottante (décimaux). Si les DEUX opérandes de la division sont des int, le C effectue une DIVISION ENTIÈRE qui tronque la partie décimale : 7 / 2 donne 3 (pas 3.5). Pour obtenir 3.5, il faut qu'au moins un des deux opérandes soit un float (ex: 7.0 / 2 ou (float)7 / 2).",
          },
          {
            title: "Fonctions en C : prototype",
            statement: "Pourquoi déclare-t-on souvent un « prototype » de fonction (ex: int addition(int a, int b);) en haut d'un fichier C, avant sa définition complète plus bas ?",
            hint: "Le compilateur lit le fichier dans l'ordre, du haut vers le bas.",
            solution: "Le compilateur C lit le fichier séquentiellement et doit connaître la signature d'une fonction (type de retour, nombre et type des paramètres) AVANT de rencontrer un appel à cette fonction, pour vérifier que l'appel est correct. Le prototype permet d'utiliser une fonction avant sa définition complète (par exemple si on l'appelle dans main() mais qu'elle est définie plus bas dans le fichier).",
          },
          {
            title: "printf et les spécificateurs de format",
            statement: "Quels spécificateurs de format utilise-t-on dans printf pour afficher respectivement un int, un float, et un char ?",
            hint: "Trois lettres différentes précédées de %.",
            solution: "%d (ou %i) pour un int, %f pour un float (ou double), %c pour un char. Exemple : printf(\"%d - %f - %c\\n\", 5, 3.14, 'A');",
          },
          {
            title: "Portée des variables (scope)",
            statement: "Une variable déclarée à l'intérieur d'un bloc { } (par exemple dans un if) est-elle accessible en dehors de ce bloc ? Pourquoi ?",
            hint: "Pense à la « portée de bloc ».",
            solution: "Non. En C, une variable déclarée dans un bloc { } n'existe (et n'est accessible) que DANS ce bloc — c'est la portée de bloc (scope). Une fois le bloc terminé (la accolade fermante atteinte), la variable est détruite et toute tentative d'y accéder en dehors provoque une erreur de compilation.",
          },
          {
            title: "Pas de booléen natif (avant C99/stdbool.h)",
            statement: "Comment le C représente-t-il traditionnellement une valeur « vraie » ou « fausse » dans une condition, en l'absence d'un vrai type booléen ?",
            hint: "Pense à quelle valeur numérique est considérée comme fausse.",
            solution: "Le C utilise des entiers : la valeur 0 est considérée comme FAUSSE, et TOUTE valeur non nulle (1, -5, 42...) est considérée comme VRAIE dans un test (if, while...). C'est pourquoi on peut écrire « if (x) » pour tester si x est différent de zéro, sans comparaison explicite.",
          },
          {
            title: "Lire une entrée utilisateur",
            statement: "Quelle fonction standard utilise-t-on pour lire un entier saisi au clavier dans une variable « int n; », et à quoi faut-il faire attention avec elle ?",
            hint: "scanf, et son premier argument de format.",
            solution: "scanf(\"%d\", &n); — on passe l'ADRESSE de la variable (avec &) car scanf doit pouvoir ÉCRIRE la valeur lue directement en mémoire à cet endroit. Il faut faire attention à toujours faire correspondre le spécificateur de format (%d) au type de la variable, et à vérifier la valeur de retour de scanf (nombre d'éléments correctement lus) pour détecter une saisie invalide.",
          },
        ],
      },
      {
        id: "c-c2",
        title: "Chapitre 2 — Les pointeurs",
        exercises: [
          {
            title: "Déclarer un pointeur",
            statement: "Déclare un pointeur « p » vers un int, puis fais-le pointer vers une variable « x » existante valant 10.",
            hint: "int *p; puis p = &x;",
            solution: `int x = 10;
int *p = &x;
// p contient maintenant l'adresse de x`,
          },
          {
            title: "Écrire le swap qui fonctionne",
            statement: "La fonction void swap(int a, int b) n'échange pas les variables du main. Réécris-la avec des pointeurs (exercice du CM2) et donne l'appel.",
            hint: "Utilise une variable temporaire et le déréférencement *a, *b.",
            solution: `void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
// Appel : int x = 1, y = 2; swap(&x, &y);`,
          },
          {
            title: "Lire et modifier via un pointeur",
            statement: "Écris du code qui, à partir du pointeur p (pointant sur x), affiche la valeur de x, puis la modifie à 20 via p.",
            hint: "*p pour lire ET pour écrire.",
            solution: `printf("%d\\n", *p);  // affiche 10 (valeur de x)
*p = 20;              // modifie x via le pointeur
printf("%d\\n", x);    // affiche 20`,
          },
          {
            title: "Double pointeur (approfondissement, hors CM)",
            statement: "À quoi sert un pointeur sur pointeur (int **pp) ? Donne un cas d'usage typique.",
            hint: "Pense à modifier un pointeur lui-même depuis une fonction.",
            solution: "Un double pointeur (int **pp) stocke l'adresse d'un AUTRE pointeur. Cas d'usage typique : une fonction qui doit modifier la valeur d'un pointeur passé en paramètre (par exemple une fonction qui alloue de la mémoire et doit faire pointer le pointeur de l'appelant vers cette nouvelle zone) doit recevoir l'adresse de ce pointeur, donc un int** (ou void**, etc.), sinon elle ne modifierait qu'une copie locale du pointeur.",
          },
          {
            title: "Passer un pointeur à une fonction pour le modifier",
            statement: "Écris une fonction void doubler(int *p) qui double la valeur pointée par p, puis le code d'appel sur une variable x.",
            hint: "La fonction reçoit l'adresse, pas une copie de la valeur.",
            solution: `void doubler(int *p) {
    *p = *p * 2;
}

int x = 5;
doubler(&x);
printf("%d\\n", x);  // affiche 10`,
          },
          {
            title: "Pointeur NULL",
            statement: "Pourquoi initialise-t-on souvent un pointeur à NULL quand on ne sait pas encore vers quoi il doit pointer, plutôt que de le laisser non initialisé ?",
            hint: "Compare « pointeur sauvage » et « pointeur NULL ».",
            solution: "Un pointeur non initialisé contient une adresse ALÉATOIRE (indéterminée) — le déréférencer provoque un comportement imprévisible (pointeur « sauvage »). En l'initialisant à NULL, on a une valeur connue et testable (if (p != NULL)) : on peut vérifier explicitement avant de déréférencer, et un déréférencement accidentel de NULL provoque un crash NET et reproductible (plus facile à déboguer qu'une corruption mémoire silencieuse).",
          },
          {
            title: "Arithmétique de pointeurs",
            statement: "Si « int *p » pointe sur le premier élément d'un tableau d'int, que représente « p + 1 » (et pas « adresse de p + 1 octet ») ?",
            hint: "L'arithmétique de pointeur tient compte de la TAILLE du type pointé.",
            solution: "« p + 1 » représente l'adresse de l'ÉLÉMENT SUIVANT du tableau, c'est-à-dire l'adresse de p augmentée de sizeof(int) octets (généralement 4), PAS de 1 octet. Le compilateur ajuste automatiquement le décalage selon la taille du type pointé — c'est ce qui permet d'écrire tab[i] ou *(p + i) de façon équivalente.",
          },
          {
            title: "Trouver le bug : mauvais type de pointeur",
            statement: `Pourquoi ce code pose-t-il problème ?

float x = 3.14;
int *p = &x;
printf("%d", *p);`,
            hint: "Le type du pointeur ne correspond pas au type de la variable.",
            solution: "« p » est déclaré comme un pointeur sur int (int *) alors qu'il reçoit l'adresse d'un float. Le compilateur signale normalement une incompatibilité de type (avertissement ou erreur selon le compilateur). Si le code s'exécute malgré tout, *p va mal interpréter les octets du float comme un int (réinterprétation binaire incorrecte), produisant une valeur absurde — PAS la valeur 3 attendue naïvement.",
          },
          {
            title: "const et pointeurs (approfondissement, hors CM)",
            statement: "Quelle est la différence entre « const int *p » et « int * const p » ?",
            hint: "La position de const change ce qui est protégé : la valeur pointée, ou le pointeur lui-même.",
            solution: "« const int *p » : la VALEUR POINTÉE ne peut pas être modifiée via p (*p = 5; est interdit), mais p peut être réaffecté pour pointer ailleurs. « int * const p » : c'est le POINTEUR LUI-MÊME qui est constant (p = &autreVariable; est interdit après initialisation), mais on peut modifier la valeur pointée via *p = 5;.",
          },
          {
            title: "Qu'affiche ce code ?",
            statement: `int a = 4;
int b = 7;
int *p = &a;
*p = *p + 1;
p = &b;
*p = *p * 2;
printf("a=%d b=%d\\n", a, b);`,
            hint: "Suis l'adresse contenue dans p ligne par ligne : vers qui pointe-t-il à chaque instant ?",
            solution: `a=5 b=14
- p pointe sur a : *p = *p + 1 met a à 5.
- p = &b : p pointe maintenant sur b (a n'est plus concerné).
- *p = *p * 2 met b à 14.`,
          },
          {
            title: "Pourquoi « &x » et pas juste « x »",
            statement: "Dans « scanf(\"%d\", &x); », pourquoi doit-on écrire « &x » et non simplement « x » ?",
            hint: "scanf doit pouvoir modifier la variable depuis l'extérieur de main().",
            solution: "Parce que scanf doit pouvoir ÉCRIRE une valeur DANS la variable x de l'appelant. Si on passait « x » directement, scanf recevrait une COPIE de sa valeur et ne pourrait modifier que cette copie locale, sans aucun effet sur le x du programme appelant. En passant « &x » (l'adresse de x), scanf peut écrire directement à cet emplacement mémoire, modifiant réellement x.",
          },
          {
            title: "Pointeur non initialisé",
            statement: `Pourquoi ce code plante-t-il (ou a un comportement imprévisible) ?

int *p;
*p = 5;`,
            hint: "Vers quoi pointe p avant d'être initialisé ?",
            solution: "p est un pointeur « sauvage » (wild pointer) : il n'a jamais été initialisé, donc il contient une adresse mémoire aléatoire (indéterminée). Écrire *p = 5; écrit à cette adresse arbitraire, ce qui peut corrompre de la mémoire ou provoquer un segmentation fault. Il faut toujours initialiser un pointeur (vers une variable existante, via malloc, ou à NULL) avant de le déréférencer.",
          },
        ],
      },
      {
        id: "c-c3",
        title: "Chapitre 3 — Tableaux et pointeurs",
        exercises: [
          {
            title: "Déclarer et initialiser un tableau",
            statement: "Déclare un tableau de 5 int initialisé directement avec les valeurs 1, 2, 3, 4, 5.",
            hint: "int tab[5] = {...};",
            solution: "int tab[5] = {1, 2, 3, 4, 5};",
          },
          {
            title: "Parcourir un tableau avec un pointeur",
            statement: "Écris une boucle qui affiche tous les éléments d'un tableau « tab » de taille n, en utilisant UNIQUEMENT un pointeur (pas tab[i]).",
            hint: "int *p = tab; puis *(p+i) ou p++ dans la boucle.",
            solution: `int *p = tab;
for (int i = 0; i < n; i++) {
    printf("%d\\n", *(p + i));
}
// équivalent à tab[i], car *(p + i) == tab[i]`,
          },
          {
            title: "Taille d'un tableau avec sizeof",
            statement: "Comment calcule-t-on le nombre d'éléments d'un tableau statique « int tab[10]; » avec sizeof ? Pourquoi cette technique NE fonctionne-t-elle PAS si « tab » est en réalité un paramètre de fonction ?",
            hint: "sizeof(tab) / sizeof(tab[0]), mais un paramètre de fonction « dégrade » en simple pointeur.",
            solution: "On calcule sizeof(tab) / sizeof(tab[0]) (taille totale en octets divisée par la taille d'un élément) — ici 40 octets / 4 octets = 10 éléments. Mais si « tab » est un PARAMÈTRE de fonction (ex: void f(int tab[])), il « dégrade » automatiquement en un simple pointeur (int *) : sizeof(tab) donne alors la taille d'un pointeur (souvent 8 octets), pas celle du tableau original — il faut donc TOUJOURS passer la taille du tableau en paramètre séparé à une fonction.",
          },
          {
            title: "Tableau 2D : somme d'une matrice",
            statement: "Écris une fonction qui calcule la somme de tous les éléments d'un tableau 2D int mat[3][4].",
            hint: "Deux boucles for imbriquées.",
            solution: `int sommeMatrice(int mat[3][4]) {
    int somme = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            somme += mat[i][j];
        }
    }
    return somme;
}`,
          },
          {
            title: "Décalage de tableau = pointeur + offset",
            statement: "Que représente « &tab[2] » par rapport à « tab + 2 », pour un tableau int tab[10] ?",
            hint: "Ce sont deux écritures différentes pour la même chose.",
            solution: "Les deux expressions sont strictement ÉQUIVALENTES : elles représentent toutes les deux l'adresse du TROISIÈME élément du tableau (index 2). « tab » se décompose en pointeur sur le premier élément, et l'arithmétique de pointeur fait que tab + 2 avance de 2 « cases » (pas 2 octets) pour atteindre le même emplacement que &tab[2].",
          },
          {
            title: "Modifier un tableau dans une fonction",
            statement: "Pourquoi une fonction « void doublerTous(int tab[], int n) » qui fait « tab[i] *= 2; » dans une boucle modifie-t-elle réellement le tableau de l'appelant, alors qu'une simple variable int passée en paramètre ne serait, elle, PAS modifiée à l'extérieur ?",
            hint: "Un tableau passé en paramètre « dégrade » en pointeur, une variable simple est copiée.",
            solution: "Parce qu'un tableau passé en paramètre de fonction se « dégrade » automatiquement en POINTEUR vers son premier élément (pas une copie du tableau entier) : la fonction manipule donc directement la MÊME zone mémoire que l'appelant. À l'inverse, un int simple passé en paramètre est transmis PAR VALEUR (copié) : toute modification à l'intérieur de la fonction ne touche que la copie locale, sans effet sur la variable de l'appelant.",
          },
          {
            title: "Trouver le bug : dépassement de tableau",
            statement: `Quel est le problème avec ce code ?

int tab[5];
for (int i = 0; i <= 5; i++) {
    tab[i] = i;
}`,
            hint: "Regarde attentivement la condition de boucle.",
            solution: "La condition « i <= 5 » permet à i d'atteindre 5, alors que les index valides d'un tableau de taille 5 vont de 0 à 4. « tab[5] = 5; » écrit donc en DEHORS des limites du tableau (dépassement de tampon / buffer overflow), ce qui est un comportement indéfini en C (aucune vérification automatique n'existe) : cela peut corrompre une autre variable en mémoire, ou provoquer un crash. La bonne condition est « i < 5 ».",
          },
          {
            title: "Copier un tableau",
            statement: "Pourquoi « int tab2[5] = tab1; » (où tab1 est un tableau) ne fonctionne-t-il PAS pour copier un tableau en C ? Comment fait-on une copie correcte ?",
            hint: "On ne peut pas affecter un tableau entier directement ; il faut une boucle ou memcpy.",
            solution: `En C, on ne peut pas affecter directement un tableau à un autre avec « = » (ce n'est pas autorisé par le langage, contrairement à une simple variable). Il faut copier élément par élément avec une boucle :
for (int i = 0; i < 5; i++) { tab2[i] = tab1[i]; }
ou utiliser la fonction memcpy(tab2, tab1, 5 * sizeof(int));`,
          },
          {
            title: "Tableau de pointeurs (approfondissement, hors CM)",
            statement: "Que représente une déclaration comme « int *tableauDePointeurs[5]; » ?",
            hint: "Lis la déclaration de droite à gauche, en partant du nom.",
            solution: "C'est un tableau de 5 éléments, où CHAQUE élément est un pointeur vers un int (pas un tableau d'int directement). Chaque case du tableau peut donc pointer vers une variable int différente (voire vers un tableau d'int dans un autre contexte), ce qui est utile par exemple pour représenter un tableau de tableaux de tailles différentes.",
          },
          {
            title: "Fonction retournant un pointeur vers un tableau local : piège",
            statement: `Pourquoi ce code est-il dangereux ?

int* creerTableau() {
    int tab[5] = {1,2,3,4,5};
    return tab;
}`,
            hint: "Que devient une variable locale à la fin de la fonction ?",
            solution: "« tab » est une variable LOCALE (sur la pile), détruite automatiquement dès que la fonction se termine. Le pointeur retourné pointe donc vers une zone mémoire qui n'est plus valide (« dangling pointer »/pointeur pendouillant) : l'utiliser après l'appel est un comportement indéfini. La solution correcte est d'allouer le tableau dynamiquement avec malloc() dans la fonction (il survit alors à la fonction, tant qu'on le libère nous-mêmes plus tard avec free()).",
          },
        ],
      },
      {
        id: "c-c4",
        title: "Chapitre 4 — Chaînes de caractères",
        exercises: [
          {
            title: "Déclarer une chaîne littérale",
            statement: "Déclare une chaîne de caractères « message » initialisée avec le texte « Bonjour », et explique combien de cases mémoire sont réellement utilisées.",
            hint: "N'oublie pas le caractère de fin '\\0'.",
            solution: `char message[] = "Bonjour";
// Utilise 8 cases : 'B','o','n','j','o','u','r','\\0'
// Le caractère nul final est ajouté AUTOMATIQUEMENT par le compilateur pour les littéraux entre guillemets.`,
          },
          {
            title: "Copier une chaîne",
            statement: "Pourquoi « char dest[20]; dest = source; » (où source est une chaîne) ne compile-t-il PAS, et quelle fonction utiliser à la place ?",
            hint: "Même raison que pour les tableaux classiques : on ne peut pas affecter un tableau entier avec =.",
            solution: "Une chaîne C est un TABLEAU de char : comme pour tout tableau, on ne peut pas l'affecter directement avec « = » après sa déclaration. Il faut utiliser la fonction strcpy(dest, source); de <string.h>, qui copie caractère par caractère (y compris le '\\0' final) depuis source vers dest.",
          },
          {
            title: "Comparer deux chaînes",
            statement: "Pourquoi « if (chaine1 == chaine2) » ne compare-t-il PAS le contenu de deux chaînes en C ? Quelle fonction utiliser à la place, et que signifie sa valeur de retour 0 ?",
            hint: "chaine1 et chaine2 sont en réalité des pointeurs/adresses.",
            solution: "« chaine1 » et « chaine2 » sont en réalité des POINTEURS (adresses du premier caractère) : « == » compare donc les ADRESSES, pas le contenu textuel — deux chaînes de même contenu stockées à des endroits différents seraient jugées « différentes » par ==. Il faut utiliser strcmp(chaine1, chaine2) qui retourne 0 si les deux chaînes ont EXACTEMENT le même contenu (une valeur négative ou positive sinon, selon l'ordre alphabétique).",
          },
          {
            title: "Concaténer deux chaînes",
            statement: "Écris du code qui concatène « bonjour » à la fin de la chaîne « s » (qui doit avoir assez de place).",
            hint: "strcat(dest, source);",
            solution: `char s[50] = "Dis : ";
strcat(s, "bonjour");
// s contient maintenant "Dis : bonjour"
// Attention : le tableau "s" doit être assez grand pour contenir le résultat final, sinon dépassement de tampon.`,
          },
          {
            title: "Inverser une chaîne",
            statement: "Écris une fonction void inverser(char *s) qui inverse une chaîne de caractères SUR PLACE (sans en créer une nouvelle).",
            hint: "Échange les caractères des deux extrémités en te rapprochant du centre.",
            solution: `void inverser(char *s) {
    int debut = 0;
    int fin = strlen(s) - 1;   // #include <string.h>
    while (debut < fin) {
        char temp = s[debut];
        s[debut] = s[fin];
        s[fin] = temp;
        debut++;
        fin--;
    }
}`,
          },
          {
            title: "Trouver le bug : dépassement de buffer avec strcpy",
            statement: `Quel est le problème avec ce code ?

char dest[5];
strcpy(dest, "Bonjour");`,
            hint: "Compare la taille de dest avec la taille (avec le '\\0') de \"Bonjour\".",
            solution: "« Bonjour » occupe 8 octets avec son '\\0' final (7 lettres + 1), alors que « dest » n'a de la place que pour 5 octets. strcpy ne vérifie AUCUNE limite de taille : elle copie tout le texte source, ce qui écrit 3 octets en dehors des limites de « dest » (dépassement de tampon / buffer overflow), un comportement indéfini qui peut corrompre d'autres données en mémoire. Il faudrait utiliser strncpy avec une limite, ou s'assurer que dest est assez grand.",
          },
          {
            title: "Parcourir une chaîne caractère par caractère",
            statement: "Écris une fonction qui compte le nombre de voyelles (a, e, i, o, u, en minuscules) dans une chaîne.",
            hint: "Boucle jusqu'au '\\0', avec un test sur chaque caractère.",
            solution: `int compterVoyelles(const char *s) {
    int compteur = 0;
    int i = 0;
    while (s[i] != '\\0') {
        char c = s[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            compteur++;
        }
        i++;
    }
    return compteur;
}`,
          },
          {
            title: "Chaîne modifiable vs non modifiable",
            statement: "Pourquoi « char *s = \"Bonjour\"; s[0] = 'b'; » est dangereux (comportement indéfini), alors que « char s[] = \"Bonjour\"; s[0] = 'b'; » fonctionne correctement ?",
            hint: "Où est stocké le littéral de chaîne dans chaque cas ?",
            solution: "Avec « char *s = \"Bonjour\"; », s pointe vers un littéral de chaîne souvent stocké dans une zone mémoire EN LECTURE SEULE : le modifier est un comportement indéfini (souvent un crash). Avec « char s[] = \"Bonjour\"; », le compilateur crée un véritable TABLEAU modifiable sur la pile, initialisé avec une COPIE du contenu du littéral — ce tableau peut être librement modifié.",
          },
          {
            title: "Lire un nom avec un espace",
            statement: "L'utilisateur tape « Jean Dupont Martin ». Que contient nom après char nom[30]; scanf(\"%29s\", nom); ? Quelle fonction utiliser pour lire toute la ligne ?",
            hint: "Où s'arrête la lecture avec %s ?",
            solution: `nom contient seulement "Jean" : %s s'arrête au premier espace.
Pour lire une ligne entière : fgets(nom, 30, stdin); — elle lit au plus 29 caractères, ajoute '\\0' et peut conserver le retour à la ligne '\\n' (CM4).`,
          },
          {
            title: "Longueur vs taille allouée",
            statement: "Quelle est la différence entre « strlen(s) » et « sizeof(s) » pour une chaîne déclarée « char s[20] = \"Bonjour\"; » ?",
            hint: "L'une compte les caractères utiles, l'autre la taille totale réservée.",
            solution: "strlen(s) retourne la LONGUEUR RÉELLE de la chaîne (nombre de caractères avant le '\\0'), ici 7 pour « Bonjour » — peu importe la taille du tableau. sizeof(s) retourne la TAILLE TOTALE RÉSERVÉE pour le tableau en mémoire, ici 20 (la taille déclarée), qu'elle soit ou non entièrement utilisée par la chaîne actuelle.",
          },
          {
            title: "Longueur d'une chaîne sans strlen",
            statement: "Écris une fonction int maStrlen(const char *s) qui calcule la longueur d'une chaîne sans utiliser strlen().",
            hint: "Parcours le tableau jusqu'à trouver le caractère '\\0'.",
            solution: `int maStrlen(const char *s) {
    int longueur = 0;
    while (s[longueur] != '\\0') {
        longueur++;
    }
    return longueur;
}`,
          },
        ],
      },
      {
        id: "c-c5",
        title: "Chapitre 5 — Structures et allocation dynamique",
        exercises: [
          {
            title: "Déclarer une structure",
            statement: "Déclare un type structuré Point (syntaxe typedef struct du CM5) avec deux champs x et y (int), puis crée une variable p de ce type initialisée à (3, 4).",
            hint: "typedef struct { … } Point; puis Point p = {3, 4};",
            solution: `typedef struct {
    int x;
    int y;
} Point;

Point p = {3, 4};`,
          },
          {
            title: "Accéder aux champs d'une structure",
            statement: "Affiche les champs x et y de la structure « p » déclarée ci-dessus.",
            hint: "Opérateur point « . » pour accéder aux champs d'une variable (pas d'un pointeur).",
            solution: "printf(\"x = %d, y = %d\\n\", p.x, p.y);",
          },
          {
            title: "Accéder aux champs via un pointeur",
            statement: "Si Point* pp = &p;, comment accède-t-on au champ x via pp ? Pourquoi les parenthèses sont-elles nécessaires ?",
            hint: "Quel opérateur est prioritaire entre . et * ?",
            solution: `(*pp).x — c'est l'écriture que le CM5 préfère. Les parenthèses sont obligatoires car « . » est prioritaire sur « * » : *pp.x serait lu *(pp.x), ce qui n'a pas de sens.
Écriture équivalente : pp->x.`,
          },
          {
            title: "Structure imbriquée",
            statement: "Modélise une structure « Rectangle » qui contient deux champs de type « Point » (coinHautGauche et coinBasDroit).",
            hint: "Un champ de structure peut être lui-même une structure.",
            solution: `typedef struct {
    Point coinHautGauche;
    Point coinBasDroit;
} Rectangle;

// Accès : Rectangle r; r.coinHautGauche.x = 0;`,
          },
          {
            title: "Allouer dynamiquement une structure",
            statement: "Écris du code qui alloue dynamiquement UNE structure Point (pas un tableau), l'initialise à (1, 2), puis la libère.",
            hint: "malloc(sizeof(Point)) puis l'opérateur ->.",
            solution: `Point *p = malloc(sizeof(Point));
if (p == NULL) {
    exit(1);
}
p->x = 1;
p->y = 2;
// ... utilisation ...
free(p);`,
          },
          {
            title: "Tableau de structures",
            statement: "Déclare un tableau statique de 3 structures Point et initialise chacune.",
            hint: "Point tab[3] = { {..}, {..}, {..} };",
            solution: `Point tab[3] = {
    {0, 0},
    {1, 1},
    {2, 4}
};
// Accès : tab[1].x vaut 1`,
          },
          {
            title: "Passer une structure par valeur vs par pointeur",
            statement: "Pourquoi préfère-t-on souvent passer une grosse structure à une fonction via un pointeur (Point *p) plutôt que « par valeur » (Point p) ?",
            hint: "Pense à la copie mémoire ET à la possibilité de modifier l'original.",
            solution: "Passer « par valeur » COPIE l'intégralité de la structure (tous ses champs) dans la pile de la fonction, ce qui peut être coûteux en mémoire/temps pour une grosse structure, et toute modification à l'intérieur de la fonction ne touche que la COPIE (l'original de l'appelant reste inchangé). Passer un pointeur évite cette copie coûteuse (on ne copie qu'une adresse) ET permet, si on le souhaite, de MODIFIER directement la structure originale de l'appelant via l'opérateur ->.",
          },
          {
            title: "Allocation dynamique d'un tableau de structures",
            statement: "Écris une fonction qui alloue dynamiquement un tableau de n structures Point (pas un tableau de pointeurs).",
            hint: "malloc(n * sizeof(Point));",
            solution: `Point* creerTableauPoints(int n) {
    Point *tab = malloc(n * sizeof(Point));
    if (tab == NULL) {
        exit(1);
    }
    return tab;
}
// Accès : tab[i].x, tab[i].y comme pour un tableau classique.`,
          },
          {
            title: "Libérer une structure contenant un pointeur",
            statement: "Une structure « Eleve » contient un champ « char *nom; » alloué dynamiquement avec malloc/strdup. Pourquoi un simple « free(eleve); » ne suffit-il PAS à tout libérer correctement ?",
            hint: "free() ne libère QUE le bloc qu'on lui donne directement, pas ce qu'il contient.",
            solution: `free(eleve) libère uniquement le BLOC MÉMOIRE de la structure Eleve elle-même, mais PAS la mémoire séparée pointée par son champ « nom » (qui a été allouée indépendamment). Il faut d'abord libérer le champ interne, PUIS la structure elle-même, dans cet ordre précis :
free(eleve->nom);
free(eleve);
(l'ordre inverse rendrait eleve->nom inaccessible après le premier free).`,
          },
          {
            title: "Comparer deux structures",
            statement: "Pourquoi « if (p1 == p2) » (p1 et p2 de type Point) ne compile-t-il pas, alors que « p2 = p1; » est accepté ?",
            hint: "L'opérateur == n'est défini que pour certains types simples en C.",
            solution: `Le CM5 le résume : une structure peut être copiée avec =, mais ne peut pas être comparée avec ==. Il faut comparer champ par champ :
if (p1.x == p2.x && p1.y == p2.y) { … }
ou écrire une fonction de comparaison dédiée.`,
          },
          {
            title: "Allocation dynamique sécurisée",
            statement: "Écris une fonction qui alloue dynamiquement un tableau de n entiers initialisés à 0, et vérifie que malloc n'a pas échoué.",
            hint: "Pense à calloc, ou malloc + une boucle, et à tester le pointeur retourné contre NULL.",
            solution: `int* creerTableau(int n) {
    int *tab = malloc(n * sizeof(int));
    if (tab == NULL) {
        fprintf(stderr, "Erreur d'allocation\\n");
        exit(1);
    }
    for (int i = 0; i < n; i++) {
        tab[i] = 0;
    }
    return tab;
}
// Ne pas oublier : free(tab); après usage.`,
          },
          {
            title: "Trouver le bug : use-after-free",
            statement: `Quel est le problème dans ce code ?

int *p = malloc(sizeof(int));
*p = 42;
free(p);
printf("%d", *p);`,
            hint: "Que devient p après free(p) ?",
            solution: "C'est un « use-after-free » : après free(p), la mémoire pointée par p peut être réutilisée par le système à tout moment. Lire *p ensuite est un comportement indéfini (valeur imprévisible, voire crash). La bonne pratique est de mettre p = NULL; juste après free(p) pour éviter de le réutiliser par erreur.",
          },
        ],
      },
    ],
  },
];
