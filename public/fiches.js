// ===================== FICHES DE RÉVISION =====================
// Une fiche par chapitre de la section Révision (clé = id du chapitre dans data.js).
// Chaque fiche indique ses sources (PDF présents dans /pdfs). Les supports de CM
// d'UML sont des polycopiés « à trous » : les définitions complétées ici sont des
// formulations standard, signalées comme telles dans `note`.
//
// Format des sections :
//   { title, kind?, items?: [string], code?: string }
//   kind : "def" | "key" | "method" | "code" | "pitfall" | "exam"  (sert au style)
//   Dans les chaînes : `code` -> <code>, **gras** -> <strong>

const FICHE_NOTE_UML = "Les CM d'UML sont distribués « à trous » : la structure et les exemples viennent du support, les définitions manquantes ont été complétées avec les formulations usuelles. Compare avec tes notes de cours.";

const FICHES = {

// ============================== UML ==============================
"uml-c1": {
  sources: [
    { label: "CM1 — Principes de la POO", file: "pdfs/uml/cm1-principes-poo.pdf" },
    { label: "CM1 — Modéliser (généralités UML)", file: "pdfs/uml/cm1-modeliser.pdf" },
  ],
  note: FICHE_NOTE_UML,
  sections: [
    { title: "Définitions essentielles", kind: "def", items: [
      "**Classe** : modèle commun à un ensemble d'objets (même structure, même comportement). En UML : un rectangle à 3 volets — nom / attributs (nom et type) / méthodes (nom, arguments, valeur retournée).",
      "**Objet** : instance d'une classe. Il a une **identité** (référence unique), un **état** (valeurs de ses attributs) et un **comportement** (ses méthodes / opérations).",
      "**Instanciation** : opération qui crée un objet à partir d'une classe ; chaque objet a sa propre copie des attributs d'instance.",
      "**Attribut de classe** (ex. `NombreDeVéhicules`) : une seule copie partagée par tous les objets, stockée au niveau de la classe.",
      "**Modèle** : représentation simplifiée d'une réalité, qui capture les aspects pertinents pour un objectif défini à l'avance.",
      "**UML** (Unified Modeling Language) : langage de modélisation graphique (une notation, pas une méthode), né de la conception orientée objet, avec une douzaine de types de diagrammes utilisables pendant tout le cycle de vie du projet.",
    ]},
    { title: "Les principes de la POO (plan du CM1)", kind: "key", items: [
      "**Encapsulation** : les données d'un objet sont cachées et accessibles seulement par ses méthodes. L'**interface** (liste des messages auxquels l'objet sait répondre) est publique ; l'implémentation reste privée, ce qui permet de la modifier sans casser le code utilisateur.",
      "**Héritage** : relation de généralisation / spécialisation. On associe une classe au concept le plus général (classe de base / mère) et on en dérive des classes spécialisées. Se lit « la classe dérivée **est un** cas particulier de la classe de base ».",
      "**Polymorphisme** : un même message (ex. `Afficher`) déclenche le comportement propre à la classe réelle de chaque objet. Condition : la **même signature** est conservée dans toute la hiérarchie.",
      "**Surcharge** : plusieurs méthodes de même nom avec des signatures différentes (forme « faible » du polymorphisme). La **redéfinition** dans une sous-classe est la forme « forte ».",
      "**Classe abstraite** (nom en *italique* en UML) : non instanciable ; ses méthodes abstraites sont définies par les classes dérivées. Sert à factoriser et à mettre en place le polymorphisme.",
      "**Interface** : ensemble de méthodes abstraites qu'une classe s'engage à implémenter ; une classe peut implémenter plusieurs interfaces (alternative à l'héritage multiple).",
      "**Agrégation / composition** : relations « tout / partie » (ex. une Voiture composée d'un Moteur, de 4 Roues, d'un Châssis).",
    ]},
    { title: "Pourquoi l'héritage ? (avantages cités dans le CM)", kind: "key", items: [
      "Code plus court : les comportements communs sont factorisés dans les classes générales.",
      "Dans les classes dérivées, seul le code spécifique reste à écrire.",
      "Modélisation naturelle → systèmes conceptuellement mieux conçus.",
      "Le polymorphisme fort repose sur l'héritage ; le code des classes hautes est très utilisé donc vite fiabilisé.",
    ]},
    { title: "Méthode : exemple du parc de véhicules", kind: "method", items: [
      "Repérer ce que partagent tous les éléments (Démarrer, Accélérer, Ralentir, Arrêter) → ancêtre commun `Véhicule`.",
      "Regrouper par sous-familles : `VéhiculeRoulant` (Voiture, Camion), `VéhiculeAérien` (Hélicoptère)…",
      "Les classes intermédiaires purement conceptuelles sont **abstraites** (en italique).",
      "**Généralisation** = partir des classes concrètes pour remonter vers l'ancêtre ; **spécialisation** = greffer de nouvelles sous-classes dans un système existant.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Confondre classe (le modèle) et objet (l'instance).",
      "Utiliser l'héritage pour une relation « a un » (une Voiture *a* un Moteur : composition, pas héritage).",
      "Croire qu'UML impose une démarche : c'est une notation.",
      "Oublier que l'héritage multiple pose le problème de l'héritage répété (« losange ») — d'où les interfaces.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Savoir définir : objet, classe, encapsulation, héritage, polymorphisme, surcharge, classe abstraite, interface.",
      "Savoir justifier un héritage par la phrase « … est un … ».",
      "Les questions de cours du partiel Java (2025) portaient justement sur `private`, polymorphisme dynamique et classe abstraite vs interface.",
    ]},
  ],
},

"uml-c2": {
  sources: [
    { label: "CM4-5 — Axe statique", file: "pdfs/uml/cm45-axe-statique.pdf" },
    { label: "Carte de référence UML 2", file: "pdfs/uml/annexe-carte-reference.pdf" },
  ],
  note: FICHE_NOTE_UML,
  sections: [
    { title: "Le diagramme de classes", kind: "def", items: [
      "Diagramme central de l'**axe statique** : c'est celui que les outils de génération de code utilisent en priorité.",
      "En **analyse**, il décrit les concepts du domaine ; en **conception**, la structure du code orienté objet.",
      "**Association** : relation structurelle durable entre classes. Elle peut porter un nom, des **rôles** et des **multiplicités** à chaque extrémité.",
      "**Multiplicités** : `1`, `0..1`, `*` (= `0..*`), `1..*`, `m..n`. Elles se lisent depuis l'autre extrémité.",
      "**Dépendance** (flèche pointillée) : A utilise B ponctuellement (paramètre de méthode, variable locale) sans le stocker.",
      "**Généralisation** (flèche à triangle vide) : la sous-classe hérite de la super-classe.",
    ]},
    { title: "Agrégation ou composition ?", kind: "key", items: [
      "**Agrégation** (losange vide côté tout) : relation « contient / est composé de », non symétrique ; pas besoin de la nommer.",
      "**Composition** (losange plein) : agrégation forte. Deux critères à vérifier : **multiplicité ≤ 1 côté composite** (une partie n'appartient qu'à un seul tout) **et** cycle de vie des parties dépendant du composite (détruit le tout ⇒ détruit les parties).",
      "Si l'un des deux critères n'est pas vérifié → agrégation (ou simple association).",
    ]},
    { title: "Constructions avancées (carte de référence)", kind: "key", items: [
      "**Rôle** : nom donné à une extrémité d'association (ex. `depart` et `arrivee` entre Vol et Aéroport).",
      "**Classe d'association** : association promue au rang de classe pour porter des attributs propres au lien (ex. `InfosEscale` avec `heureArrivee`, `heureDepart`).",
      "**Association qualifiée** : un qualificatif (clé) réduit la multiplicité de l'autre côté, souvent à `0..1`.",
      "**Contrainte** entre accolades, ex. `{ordered}`.",
      "**Navigabilité** : une flèche sur l'association indique le seul sens de parcours possible (limite les dépendances).",
      "**Association réflexive** : d'une classe vers elle-même (ex. `chef` / `subordonne` sur Personne).",
    ]},
    { title: "Méthode : construire le diagramme (étude « réservation de vols »)", kind: "method", items: [
      "Partir des phrases de l'expert métier et les modéliser une par une.",
      "Objet ou attribut ? Si on ne peut demander à l'élément **que sa valeur** → attribut ; si on peut lui poser **plusieurs questions** → classe (ex. Aéroport a un nom, une capacité, dessert des villes…).",
      "Deux aéroports (départ / arrivée) : ni multiplicité 2, ni deux sous-classes (tout aéroport peut être les deux) → **deux associations avec des rôles**.",
      "Les escales portent des heures propres au couple Vol–Aéroport → **classe d'association**.",
      "Placer chaque opération sur l'objet qui subit le traitement (ex. `ouvrirReservation()` sur Vol).",
      "Utiliser un **diagramme d'objets** pour donner un exemple ou un contre-exemple et lever une ambiguïté.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Modéliser par héritage ce qui est un rôle (« aéroport de départ » n'est pas une sous-classe d'Aéroport).",
      "Mettre une composition alors qu'une partie peut être partagée ou survivre au tout.",
      "Représenter un **état** (ex. `estAnnulee`) comme attribut : le CM recommande de le traiter dans le diagramme d'états.",
      "Utiliser la généralisation si la sous-classe n'est pas conforme **à 100 %** à la super-classe.",
      "Oublier les multiplicités : en examen elles rapportent des points.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Les annales demandent toujours d'abord une **version simplifiée** (classes + liens + multiplicités), puis le détail des classes.",
      "Justifier chaque héritage (« est un ») et chaque composition (2 critères).",
    ]},
  ],
},

"uml-c3": {
  sources: [
    { label: "CM4-5 — Axe statique", file: "pdfs/uml/cm45-axe-statique.pdf" },
    { label: "Carte de référence UML 2", file: "pdfs/uml/annexe-carte-reference.pdf" },
    { label: "Correspondances UML ↔ Java", file: "pdfs/uml/annexe-correspondances-java.pdf" },
  ],
  note: FICHE_NOTE_UML,
  sections: [
    { title: "Syntaxe d'une classe (carte de référence)", kind: "code", code:
`ExempleDeClasse
- attribut : type[m..n] = valeurInit
- /attributDerive : type        (« / » = dérivé)
- attributDeClasse : type       (souligné = static)
+ operation(param : type) : retour
+ operationAbstraite() : void   (italique = abstraite)
+ operationDeClasse() : void    (souligné = static)` },
    { title: "Visibilités", kind: "def", items: [
      "`+` public : accessible partout.",
      "`#` protégé (protected) : la classe, ses sous-classes (et en Java le même paquetage).",
      "`-` privé (private) : uniquement la classe elle-même.",
      "`~` paquetage : les classes du même paquetage (en Java : aucun mot-clé).",
    ]},
    { title: "Conventions de nommage (CM4-5)", kind: "key", items: [
      "Noms de **classes** : commencent par une **majuscule** (`CompagnieAerienne`).",
      "Noms d'**attributs**, de **rôles** et d'**opérations** : commencent par une **minuscule**, mots suivants en majuscule (`heureDepart`).",
      "Éviter accents et caractères spéciaux.",
    ]},
    { title: "Notions à maîtriser", kind: "key", items: [
      "**Attribut dérivé** (`/age`) : valeur déductible d'autres informations ; permet de ne pas faire un choix de conception prématuré.",
      "**Attribut / opération de classe** : souligné → `static` en Java.",
      "**Opération abstraite** : en italique ; la classe qui la contient est abstraite.",
      "**Constructeur** : porte le nom de la classe, sans type de retour.",
      "En analyse, on ajoute plutôt les opérations en conception (choix d'attribution des responsabilités).",
    ]},
    { title: "Méthode : détailler une classe en examen", kind: "method", items: [
      "Lister les attributs donnés par l'énoncé avec un **type adapté** (ex. code postal et numéro de rue en `String` : zéros en tête, « bis »/« ter »).",
      "Mettre les attributs en `-` (encapsulation), les opérations en `+`.",
      "Ajouter les constructeurs, puis les **méthodes fonctionnelles** demandées (recherche, calcul…) dans la classe qui possède les données nécessaires.",
      "Ne pas écrire getters/setters/toString si l'énoncé les dispense.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Typer en `int` une donnée qui n'est pas un nombre de calcul (numéro de sécu, code postal, numéro de commande alphanumérique).",
      "Oublier le type de retour d'une opération, ou en mettre un au constructeur.",
      "Confondre `#` (protégé) et `~` (paquetage).",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Format d'une ligne : `visibilité nom(param : Type) : TypeRetour`.",
      "Souligné = static ; italique = abstrait ; `/` = dérivé.",
    ]},
  ],
},

"uml-c4": {
  sources: [
    { label: "CM2-3 — Axe fonctionnel", file: "pdfs/uml/cm23-axe-fonctionnel.pdf" },
  ],
  note: FICHE_NOTE_UML,
  sections: [
    { title: "Définitions essentielles", kind: "def", items: [
      "**Acteur** : rôle joué par une entité **externe** (humain ou autre système) qui interagit directement avec le système, en émettant et/ou recevant des messages.",
      "Trouver les acteurs : les **utilisateurs humains directs** et les **systèmes connexes** qui interagissent directement avec le système étudié.",
      "**Acteur principal** : celui pour qui le cas produit un résultat (il le déclenche). **Acteur secondaire** : sollicité pendant le déroulement (ex. Système d'autorisation pour le GAB).",
      "**Cas d'utilisation** : ensemble de séquences d'actions réalisées par le système qui produisent un résultat observable intéressant pour un acteur. Décrit **ce que** le système fait, pas **comment**.",
      "**Scénario** : une exécution particulière d'un cas d'utilisation. Un cas contient un **scénario nominal**, des **enchaînements alternatifs** (A1, A2…) et des **enchaînements d'erreur** (E1, E2…).",
    ]},
    { title: "Fiche de description textuelle (non normalisée par UML)", kind: "key", items: [
      "**Sommaire d'identification** (obligatoire) : titre, résumé, acteurs, dates, version, responsable.",
      "**Description des scénarios** (obligatoire) : préconditions, scénario nominal numéroté, alternatifs, erreurs, postconditions.",
      "**Exigences non fonctionnelles** (optionnel) : temps de réponse, concurrence, disponibilité, intégrité, confidentialité.",
      "**Besoins d'IHM** (optionnel) : dispositifs d'entrée/sortie.",
    ]},
    { title: "Organiser les cas d'utilisation", kind: "key", items: [
      "**«include»** : le cas de base incorpore **obligatoirement** un autre cas, à un endroit précis. Sert à factoriser un comportement commun (ex. `S'authentifier`). Flèche du cas de base vers le cas inclus.",
      "**«extend»** : le cas de base incorpore **optionnellement** un autre cas, à un **point d'extension** (ex. `Consulter le solde` pendant `Retirer de l'argent`, au point « Vérification montant »). Flèche du cas qui étend vers le cas de base.",
      "**Généralisation** entre cas : les cas descendants héritent du comportement du cas parent et le spécialisent (ex. `Déposer de l'argent` → `Déposer du numéraire`, `Déposer des chèques`).",
      "**Généralisation entre acteurs** : l'acteur spécialisé hérite des cas de l'acteur général.",
      "**Packages** : regrouper les cas d'utilisation (par acteur, par domaine…).",
    ]},
    { title: "Méthode du CM (étude du GAB)", kind: "method", items: [
      "1. Identifier les acteurs (diagramme de contexte statique).",
      "2. Identifier les cas d'utilisation par acteur (principal / secondaire).",
      "3. Construire le diagramme de cas d'utilisation (frontière du système = rectangle, acteurs à l'extérieur).",
      "4. Décrire textuellement chaque cas (fiche type).",
      "5. Compléter par des diagrammes dynamiques : **diagramme de séquence système** (acteur principal à gauche, système = boîte noire, acteurs secondaires à droite) et **diagramme d'activité**.",
      "6. Organiser : include, extend, généralisation, packages.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Placer un acteur (banque, bracelet, service de paiement) **à l'intérieur** du système.",
      "Écrire des cas trop fins (« cliquer sur Valider ») ou techniques (« trier la liste »).",
      "Inverser le sens des flèches include / extend.",
      "Utiliser «extend» pour une étape obligatoire (c'est «include»).",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Chaque annale contient un exercice de cas d'utilisation (7 pts, ~20 min).",
      "Lire l'énoncé en repérant : qui agit (acteurs), quels objectifs (cas), ce qui est obligatoire (include), optionnel (extend), et les variantes (généralisation).",
    ]},
  ],
},

"uml-c5": {
  sources: [
    { label: "Annexe — Correspondances UML ↔ Java", file: "pdfs/uml/annexe-correspondances-java.pdf" },
  ],
  note: "Synthèse de l'annexe « Correspondances UML – Java – C# » (partie Java uniquement).",
  sections: [
    { title: "Table de correspondance", kind: "key", items: [
      "Classe → `public class Catalogue { … }` (un fichier `.java` par classe).",
      "Classe abstraite (italique) → `public abstract class Personne`.",
      "Interface «interface» → `public interface IAffichable { void afficher(); }`.",
      "Package → `package catalogue;` (nom en **minuscules**).",
      "Attribut → variable d'instance ; visibilité `+ # -` → `public protected private`.",
      "Attribut / opération de classe (souligné) → `static`.",
      "Opération abstraite (italique) → méthode `abstract` sans corps.",
      "Généralisation → `extends` ; réalisation d'interface → `implements` (plusieurs interfaces possibles, une seule super-classe).",
      "Dépendance → paramètre / variable locale de type B, ou `import` entre packages.",
    ]},
    { title: "Traduire une association", kind: "key", items: [
      "Multiplicité **1** (ou 0..1) → une référence : `private B1 leB1;` (peut valoir `null` si 0..1).",
      "Multiplicité `*` → une collection : `private List<B3> lesB3 = new ArrayList<>();` (ou un tableau).",
      "**Qualificatif** → dictionnaire : `private Map<Q, B4> lesB4 = new HashMap<>();`.",
      "Association **bidirectionnelle** → une référence dans chaque classe (nommées d'après les rôles).",
      "Association **réflexive** → référence vers la même classe (`chef`, `subordonne[]`).",
      "**Agrégation / composition** → se traduisent comme une association ; une classe interne est possible pour la composition mais pas obligatoire.",
      "**Classe d'association** → n'existe pas en Java : on crée une classe normale avec une référence vers chacune des deux classes (ex. `Emploi` → `Personne employe`, `Societe employeur`).",
    ]},
    { title: "Exemple de l'annexe", kind: "code", code:
`// UML : Personne {abstract} -nom:String #dateNaissance:Date
//        -ageMajorite:int=18 (souligné) +calculerDureePret():int (italique)
public abstract class Personne {
    private String nom;
    protected Date dateNaissance;
    private static int ageMajorite = 18;

    public abstract int calculerDureePret();
    public static void setAgeMajorite(int aMaj) { ageMajorite = aMaj; }
}

public class Adherent extends Personne {
    private int iD;
    @Override
    public int calculerDureePret() { return 14; }
}` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Traduire une multiplicité `*` par une simple référence.",
      "Oublier l'`import` (ex. `java.util.Date`, `java.util.ArrayList`).",
      "Stocker un attribut dérivé au lieu de le calculer dans une méthode.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Le partiel Java demande souvent de coder une classe à partir d'un diagramme : attributs `private`, constructeur(s), collection pour les `*`.",
    ]},
  ],
},

// ============================== JAVA ==============================
"java-c1": {
  sources: [
    { label: "Polycopié — ch. 3.1 à 3.6 (classe, attribut, constructeur, encapsulation)", file: "pdfs/java/poly-complet.pdf" },
    { label: "Polycopié — ch. 5.1 (static, final, this) et 5.5 (Object)", file: "pdfs/java/poly-complet.pdf" },
  ],
  note: "Synthèse du polycopié « Aide-mémoire UML & Java ».",
  sections: [
    { title: "Définitions essentielles", kind: "def", items: [
      "**Classe** : « moule » qui réunit des données (**attributs**) et les fonctions associées (**méthodes**). En Java, tout code appartient à une classe.",
      "**Objet** : instance d'une classe, créé par `new` (allocation mémoire + appel du constructeur).",
      "**Référence** : variable qui désigne un objet (l'équivalent d'un pointeur en C). Un attribut référence vaut `null` par défaut ; une variable locale doit être initialisée explicitement.",
      "**Constructeur** : porte **le nom de la classe**, **pas de type de retour (surtout pas `void`)**, appelé une seule fois à la création pour initialiser les attributs.",
      "**Surcharge (overload)** : plusieurs constructeurs/méthodes de même nom avec des paramètres différents.",
      "**Message** : appel d'une méthode sur un objet via l'opérateur `.` (ex. `p1.afficher()`).",
    ]},
    { title: "Visibilités (tableau 3.2 du poly)", kind: "key", items: [
      "`public` : accès partout où la classe est accessible.",
      "`protected` : classes dérivées (dans ou hors du paquetage) + classes du même paquetage.",
      "(aucun mot-clé) : classes du même paquetage.",
      "`private` : uniquement la classe où il est déclaré.",
      "Usage : attributs `private` (ou `protected`), méthodes `public`, accès aux attributs par **accesseurs** `getX()` / `isX()` et **mutateurs** `setX()` (où l'on place les contrôles de validité).",
      "Une seule classe `public` par fichier `.java`.",
    ]},
    { title: "static, final, this", kind: "key", items: [
      "`static` : attribut/méthode **de classe**, commun à tous les objets, utilisable sans instance (`Math.sqrt(2.0)`, `Integer.parseInt(\"12\")`).",
      "`final` : constante (non réaffectable) ; `static final` = constante de classe (`Math.PI`), nom en MAJUSCULES.",
      "`this` : l'objet courant. `this.abscisse = abscisse;` distingue l'attribut du paramètre ; `this(…)` appelle un autre constructeur de la même classe (en première ligne).",
      "Pas de destructeur : le **Garbage Collector** détruit les objets qui ne sont plus référencés.",
    ]},
    { title: "Exemple du poly : classe Point", kind: "code", code:
`public class Point {
    private int abscisse;
    private int ordonnee;

    public Point() { this(0, 0); }              // constructeur par défaut
    public Point(int abscisse, int ordonnee) {
        this.abscisse = abscisse;
        this.ordonnee = ordonnee;
    }
    public void deplacer(int dx, int dy) { abscisse += dx; ordonnee += dy; }
    public int getAbscisse() { return abscisse; }
    public void setAbscisse(int abscisse) { this.abscisse = abscisse; }
}

Point p1 = new Point(2, 3);   // déclaration + instanciation
p1.deplacer(4, 1);` },
    { title: "La classe Object : toString et equals", kind: "key", items: [
      "Toute classe hérite implicitement de `Object` (`toString()`, `equals()`, `hashCode()`…).",
      "On redéfinit `toString()` pour obtenir un affichage lisible (`System.out.println(objet)`).",
      "`p1 == p2` compare les **références** (même objet ?), pas le contenu. Pour comparer le contenu : redéfinir `equals(Object obj)`.",
      "Piège : si le paramètre de `equals` n'est pas de type `Object`, c'est une **surcharge**, pas une redéfinition.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Mettre `void` devant un constructeur → ce n'est plus un constructeur.",
      "Constructeur mal orthographié (casse) : `voiture(…)` dans la classe `Voiture`.",
      "Oublier qu'écrire un constructeur supprime le constructeur par défaut implicite.",
      "Comparer deux objets ou deux `String` avec `==`.",
      "Getter qui renvoie directement une liste interne modifiable (casse l'encapsulation).",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Partiel 2025 : « pourquoi `private` ? », « pourquoi redéfinir `toString` ? », écrire un 2ᵉ constructeur qui rappelle le premier avec `this(…)`.",
    ]},
  ],
},

"java-c2": {
  sources: [
    { label: "Polycopié — ch. 3.7 Héritage et polymorphisme", file: "pdfs/java/poly-complet.pdf" },
    { label: "Polycopié — ch. 5.1.2 final", file: "pdfs/java/poly-complet.pdf" },
  ],
  note: "Synthèse du polycopié « Aide-mémoire UML & Java ».",
  sections: [
    { title: "Héritage", kind: "def", items: [
      "Mot-clé `extends`. La classe dérivée (fille, sous-classe) possède implicitement les attributs et méthodes de la classe de base ; on n'écrit que ce qui la différencie.",
      "Java : **héritage simple uniquement** (une seule classe mère).",
      "Recherche d'une méthode : dans la classe de l'objet, sinon dans la classe mère, et ainsi de suite.",
      "Une instance de la classe dérivée est compatible avec la classe de base : `Point p = new PointColore();` est valide, l'inverse est une erreur de compilation.",
    ]},
    { title: "super", kind: "key", items: [
      "`super(…)` : appel d'un constructeur de la classe mère, **obligatoirement en première instruction**.",
      "Si la première instruction n'est ni `super(…)` ni `this(…)`, Java ajoute un appel implicite à `super()` (constructeur sans paramètre) — erreur s'il n'existe pas.",
      "`super.methode()` : appelle la version de la classe mère (ex. `super.afficher()` dans `PointColore.afficher()`).",
      "Ordre de construction : la classe la plus haute est initialisée en premier.",
    ]},
    { title: "Polymorphisme dynamique", kind: "key", items: [
      "**Redéfinition (override)** : même signature dans la classe dérivée ; elle prévaut sur la version de la classe de base. `@Override` fait vérifier la signature par le compilateur.",
      "**Liaison dynamique** : la méthode exécutée est choisie **à l'exécution** par la JVM selon le **type réel** de l'objet, pas selon le type de la référence.",
      "Intérêt : traiter une collection de `Point` et de `PointColore` avec un seul appel `afficher()` ; chaque objet s'affiche selon sa nature réelle.",
      "**Surcharge** ≠ redéfinition : surcharge = même nom, paramètres différents, dans la même classe (le poly l'appelle aussi « polymorphisme paramétrique »).",
      "`final` sur une classe : non dérivable (ex. `String`) ; sur une méthode : non redéfinissable.",
    ]},
    { title: "Exemple du poly : PointColore", kind: "code", code:
`public class PointColore extends Point {
    private int couleur;

    public PointColore(int abs, int ord, int col) {
        super(abs, ord);          // 1re instruction
        couleur = col;
    }
    public PointColore(int abs, int ord) {
        this(abs, ord, 0);
    }
    @Override
    public void afficher() {
        super.afficher();
        System.out.println(" >>> et de couleur : " + couleur);
    }
}

Point p = new PointColore(1, 2, 5);
p.afficher();   // version de PointColore (liaison dynamique)` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Placer `super(…)` ailleurs qu'en première ligne.",
      "Croire que le type déclaré de la variable décide de la méthode redéfinie appelée.",
      "Transtyper vers un type qui n'est pas le type réel → `ClassCastException` à l'exécution (vérifier avec `instanceof`).",
      "Faute de frappe dans une méthode « redéfinie » sans `@Override` : on crée une nouvelle méthode sans le voir.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Partiel 2025 : créer `RomanHorreur extends Roman` avec constructeur (`super(…)`) et `toString()` qui réutilise `super.toString()`.",
      "Savoir expliquer l'avantage du polymorphisme dynamique : code générique, extensible sans `if` sur le type.",
    ]},
  ],
},

"java-c3": {
  sources: [
    { label: "Polycopié — ch. 3.8 Classe et méthode abstraite", file: "pdfs/java/poly-complet.pdf" },
    { label: "Polycopié — ch. 5.3 Interface", file: "pdfs/java/poly-complet.pdf" },
  ],
  note: "Synthèse du polycopié « Aide-mémoire UML & Java ».",
  sections: [
    { title: "Classe et méthode abstraites", kind: "def", items: [
      "**Méthode abstraite** : seulement déclarée (prototype, pas de corps), mot-clé `abstract`. Déclare un comportement commun très haut dans la hiérarchie.",
      "**Classe abstraite** : non instanciable (`new` interdit). Possède généralement au moins une méthode abstraite (pas obligatoire).",
      "Une classe abstraite **peut avoir des constructeurs**, appelés par les classes dérivées via `super(…)`.",
      "Une classe dérivée concrète doit définir **toutes** les méthodes abstraites héritées, sinon elle doit elle-même être `abstract`.",
    ]},
    { title: "Interfaces", kind: "def", items: [
      "Pourquoi : l'héritage multiple pose le **problème du losange** (quelle version de `methodeA()` hériter ?) → Java n'autorise que l'héritage simple.",
      "**Interface** (`interface`) : toutes les méthodes sont abstraites (`public abstract` implicites) ; seuls des **attributs constants** (`static final`) sont permis ; elle peut aussi contenir des méthodes `static` et des méthodes `default`.",
      "Une classe hérite d'**une** classe mais peut **implémenter plusieurs** interfaces : `class D extends B implements InterfaceC`.",
      "Pour être instanciable, la classe doit définir toutes les méthodes de l'interface.",
      "Une interface **définit un type** : on peut déclarer des variables de ce type.",
    ]},
    { title: "Classe abstraite ou interface ?", kind: "key", items: [
      "Classe abstraite : état partagé (attributs), code commun, constructeur ; lien « est un » fort ; une seule.",
      "Interface : contrat de comportement sans état, pour des classes sans lien de parenté ; plusieurs possibles.",
      "Tableau 5.1 du poly : `abstract` (classe non instanciable / méthode à redéfinir), `final` (classe non dérivable / méthode non redéfinissable / attribut constant), `static` (membre de classe).",
    ]},
    { title: "Syntaxe", kind: "code", code:
`public abstract class Vehicule {
    protected int nbRoues;
    public Vehicule(int nbRoues) { this.nbRoues = nbRoues; }
    public int getNbRoues() { return nbRoues; }
    public abstract void accelerer();      // pas de corps
}

public interface Volant {
    int ALTITUDE_MAX = 10000;              // public static final implicite
    void voler();                          // public abstract implicite
}

public class Helicoptere extends Vehicule implements Volant {
    public Helicoptere() { super(0); }
    @Override public void accelerer() { /* … */ }
    @Override public void voler() { /* … */ }
}` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Écrire `new Vehicule()` sur une classe abstraite.",
      "Oublier d'implémenter une méthode abstraite dans une sous-classe concrète (erreur de compilation).",
      "`extends` pour une interface implémentée par une classe (c'est `implements`).",
      "Croire qu'une interface peut avoir des attributs d'instance modifiables.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Question de cours 1.4 du partiel 2025 : « comparez classe abstraite et interface » — réponds avec : instanciation, état, constructeur, nombre (1 vs plusieurs), usage.",
    ]},
  ],
},

"java-c4": {
  sources: [
    { label: "Polycopié — ch. 6 Tableaux, collections et dictionnaires", file: "pdfs/java/poly-complet.pdf" },
  ],
  note: "Synthèse du polycopié « Aide-mémoire UML & Java ».",
  sections: [
    { title: "Tableaux", kind: "def", items: [
      "Déclaration `int[] tab;` (recommandé) puis création `tab = new int[5];` — valeurs initialisées par défaut.",
      "Écriture condensée : `int[] tab = {1, 2, 3};`.",
      "Taille **fixe** ; pseudo-attribut `tab.length` (lecture seule).",
      "Tableau d'objets = tableau de **références**. Copie partielle : `System.arraycopy(…)`.",
    ]},
    { title: "Collections (java.util)", kind: "def", items: [
      "Ensemble de **taille dynamique** dont les éléments sont des **références d'objets** ; paramétrées depuis Java 1.5 (`ArrayList<Point>`).",
      "`Collection<E>` : `add`, `remove`, `contains`, `size`, `isEmpty`, `iterator`.",
      "`List<E>` (ordre, accès par indice) : `ArrayList`, `LinkedList`. `Set<E>` : **pas de doublons** (`HashSet`, `TreeSet` trié).",
      "`Map<K,V>` (dictionnaire clé → valeur) : `HashMap` avec `put`, `get`, `remove`, `keySet`, `values`.",
      "Types primitifs → classes enveloppes : `ArrayList<Integer>` (pas `ArrayList<int>`), conversion automatique (autoboxing).",
    ]},
    { title: "ArrayList<E> — méthodes clés", kind: "key", items: [
      "`add(e)`, `add(i, e)`, `get(i)`, `set(i, e)`, `remove(i)` / `remove(objet)`, `size()`, `contains(objet)`, `indexOf(objet)`, `isEmpty()`, `clear()`.",
      "`contains`, `indexOf`, `remove(objet)` utilisent `equals()` : à redéfinir pour comparer le contenu.",
    ]},
    { title: "Parcourir : Iterator<E>", kind: "code", code:
`// Interface Iterator<E> : hasNext(), next(), remove() (juste après next())
Iterator<Roman> it = romans.iterator();
while (it.hasNext()) {
    Roman r = it.next();
    if (r.getEvaluation() < 2) {
        it.remove();          // suppression sûre pendant le parcours
    }
}

// Autres parcours
for (int i = 0; i < al.size(); i++) { System.out.println(al.get(i)); }
for (Roman r : romans) { System.out.println(r); }   // for-each (Java 1.5)` },
    { title: "Méthodes types (annales)", kind: "method", items: [
      "**Maximum** : initialiser avec le premier élément (`it.next()`, après avoir vérifié qu'il existe), puis comparer les suivants.",
      "**Moyenne filtrée** : somme + compteur dans la boucle ; si compteur = 0 renvoyer la valeur spéciale demandée (ex. `-1`).",
      "**Recherche** : parcourir, comparer avec `equals` (Strings), renvoyer l'élément trouvé ou `null`.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Appeler `it.next()` deux fois dans la même itération (on saute un élément).",
      "Supprimer avec `liste.remove(…)` pendant un for-each → `ConcurrentModificationException`.",
      "Comparer des `String` avec `==` au lieu de `equals`.",
      "`it.next()` sur une liste vide → `NoSuchElementException`.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Le partiel 2025 impose l'approche **Iterator** pour tout parcours de collection (3.3, 3.4). Aide-mémoire fourni : `add, iterator, contains, remove, get, size` / `hasNext, next`.",
    ]},
  ],
},

// ============================== LANGAGE C ==============================
"c-c1": {
  sources: [
    { label: "CM1 — Du Python au C", file: "pdfs/c/cm1-du-python-au-c.pdf" },
  ],
  note: "Synthèse fidèle au CM1.",
  sections: [
    { title: "Python → C : ce qui change", kind: "def", items: [
      "C : langage **compilé**, bas niveau, rapide ; Python : interprété, haut niveau.",
      "**Typage statique** : toute variable est déclarée avec un type qui ne change plus (`float x = 3.14;`).",
      "`;` à la fin de chaque instruction, blocs délimités par `{ }`.",
      "Mémoire gérée manuellement (`malloc` / `free`, CM5).",
      "L'exécution commence dans `int main()` ; `return 0;` = fin correcte.",
    ]},
    { title: "Types et formats printf / scanf", kind: "key", items: [
      "`int` entier signé 32 bits → `%d`",
      "`char` caractère 8 bits → `%c`",
      "`float` réel 32 bits → `%f`",
      "`long` « gros » entier 64 bits → `%ld`",
      "`double` « gros » réel 64 bits → `%lf`",
      "`scanf(\"%f\", &note1);` : on donne **l'adresse** de la variable ; une seule variable par `scanf`, pas de texte dedans (faire un `printf` avant).",
      "`\\n` : retour à la ligne. Dépassement d'un `int` 32 bits (max 2 147 483 647) → overflow.",
    ]},
    { title: "Programme type", kind: "code", code:
`#include <stdio.h>

float moyenne(float a, float b);      // prototype

int main() {
    float note1, note2, moy;
    printf("Note 1 : ");
    scanf("%f", &note1);
    printf("Note 2 : ");
    scanf("%f", &note2);
    moy = moyenne(note1, note2);
    printf("Moyenne : %f\\n", moy);
    return 0;
}

float moyenne(float a, float b) {     // fonction : type de retour + types des paramètres
    return (a + b) / 2;
}` },
    { title: "Compilation", kind: "key", items: [
      "`gcc -Wall monCode.c -o monExe.exe` puis `./monExe.exe`. `-Wall` affiche tous les warnings, `-Werror` les transforme en erreurs.",
      "Chaîne de compilation en 4 étapes : **préprocessing** (`gcc -E`, remplace `#include`/`#define`) → **compilation** (`gcc -S`, vérifie la syntaxe, C → assembleur) → **assemblage** (`gcc -c`, → fichier objet `.o`) → **édition de liens** (relie les `.o` → exécutable).",
      "Une fonction doit être **prototypée avant** d'être appelée.",
      "Projet : `.h` = « menu » (prototypes, `#define`, structures, gardes `#ifndef FICHIER_H / #define FICHIER_H / #endif`) ; `.c` = « recette » (code des fonctions, `#include \"fichier.h\"`).",
      "Compiler ne veut pas dire fonctionner : un warning peut cacher un bug d'exécution.",
    ]},
    { title: "Structures de contrôle", kind: "key", items: [
      "`if / else if / else` ; `switch (choix) { case 1: … break; default: … }` pour comparer à des valeurs fixes.",
      "`for (int i = 0; i < 5; i++)` quand le nombre de tours est connu ; `while` teste **avant** ; `do { } while (…);` exécute **au moins une fois**.",
      "Fonction sans valeur de retour = procédure, type `void`.",
    ]},
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Division entière : `int a = 2, b = 1; float r = b / a;` donne `0.000000` (les deux opérandes sont des `int`).",
      "Oublier le `&` dans `scanf` pour une variable simple.",
      "Oublier `break` dans un `case`.",
      "Appeler une fonction définie plus bas sans prototype → ne compile pas.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Le C demande d'être explicite : types, mémoire, structure du programme.",
      "Savoir écrire un programme complet (include, main, printf/scanf) et citer les 4 étapes de compilation.",
    ]},
  ],
},

"c-c2": {
  sources: [
    { label: "CM2 — Les pointeurs", file: "pdfs/c/cm2-pointeurs.pdf" },
  ],
  note: "Synthèse fidèle au CM2.",
  sections: [
    { title: "Le problème : passage par valeur", kind: "def", items: [
      "Les paramètres d'une fonction reçoivent des **copies** : `swap(x, y)` échange les copies, pas les variables du `main`.",
      "Analogie des casiers : pour modifier le bon casier, il faut son **numéro** → en mémoire, son **adresse**.",
    ]},
    { title: "Pointeurs", kind: "def", items: [
      "**Pointeur** : variable dont la valeur est une **adresse mémoire** (l'adresse d'une autre variable). Son type indique le type de la variable pointée.",
      "Déclaration : `int* pa = NULL;` — `NULL` (valeur 0) indique qu'il ne pointe sur rien ; l'utiliser tel quel provoque une erreur de segmentation au lieu de modifier une zone au hasard.",
      "`&a` : adresse de `a`. `pa` : l'adresse stockée. `*pa` : la valeur pointée (« ce qui est contenu à l'adresse »).",
      "`*pa = 10;` modifie la variable pointée (ici `a` vaut 10).",
    ]},
    { title: "Passage par adresse", kind: "key", items: [
      "On passe à la fonction l'**adresse** de la variable : `type f(type1* arg1, …)`.",
      "La fonction peut alors modifier la variable d'origine : c'est le seul moyen en C pour que deux fonctions partagent le même espace mémoire.",
      "C'est pour cela que `scanf(\"%d\", &age);` reçoit `&age`.",
    ]},
    { title: "Le swap qui fonctionne", kind: "code", code:
`void swap(int* px, int* py) {
    int tmp = *px;    // tmp prend la valeur pointée par px
    *px = *py;
    *py = tmp;
}

int main() {
    int x = 3, y = 5;
    swap(&x, &y);     // on passe les adresses
    printf("x=%d y=%d\\n", x, y);   // x=5 y=3
    return 0;
}` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Confondre `p` (adresse) et `*p` (valeur pointée).",
      "Déréférencer un pointeur non initialisé (adresse aléatoire) ou `NULL` → segmentation fault.",
      "Appeler `swap(x, y)` au lieu de `swap(&x, &y)`.",
      "Type de pointeur incohérent (`int*` vers un `float`).",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Pour modifier une variable originale depuis une fonction, on transmet son adresse.",
      "Savoir tracer un petit programme à pointeurs (« qu'affiche ce code ? »).",
    ]},
  ],
},

"c-c3": {
  sources: [
    { label: "CM3 — Tableaux (et pointeurs)", file: "pdfs/c/cm3-tableaux-pointeurs.pdf" },
  ],
  note: "Synthèse fidèle au CM3.",
  sections: [
    { title: "Définitions", kind: "def", items: [
      "**Tableau** : ensemble ordonné de variables **de même type**, stockées **à la suite** en mémoire, de **taille fixe**.",
      "`type nom[taille] = {v1, v2, …};` — sans initialisation, les valeurs sont indéterminées ; taille déduite possible : `float notes[] = {12.5, 8};`.",
      "Indices de `0` à `taille - 1`. `notes[3] = 29;` modifie une case.",
      "Le C **ne vérifie pas les limites** : `notes[5]` sur un tableau de 5 = comportement indéfini, même si ça « semble marcher ».",
    ]},
    { title: "Tableaux et pointeurs", kind: "key", items: [
      "`tab` est converti en l'adresse de sa première case : `tab == &tab[0]` ; il peut être vu comme un **pointeur constant**.",
      "`tab[i] == *(tab + i)` ; `tab + i` est l'adresse de la case i (l'adresse avance de `sizeof(type)` octets, ex. 4 pour un `int`).",
      "Deux formalismes équivalents : tableau `[ ]` ou pointeur `*`.",
    ]},
    { title: "Taille et fonctions", kind: "key", items: [
      "Taille définie à un seul endroit : constante symbolique `#define NB_NOTES 5` (en MAJUSCULES).",
      "Une fonction reçoit l'**adresse de la première case** : elle modifie directement le tableau d'origine (passage par adresse, pas de `return` nécessaire).",
      "Cette adresse dit où le tableau commence, **pas où il finit** → transmettre la taille en paramètre.",
      "Dans un paramètre, `float tab[]` et `float* tab` sont identiques.",
      "`scanf(\"%19s\", mot);` sans `&` : `mot` est déjà une adresse.",
      "2D : `float notes[NB_ETUDIANTS][NB_EVAL];` ; `notes[1][2]` = évaluation 2 de l'étudiant 1 ; lignes stockées l'une après l'autre.",
    ]},
    { title: "Exemple", kind: "code", code:
`#define NB_NOTES 5

float moyenne(float tab[], int taille) {
    float somme = 0;
    for (int i = 0; i < taille; i++) {
        somme += tab[i];          // ou *(tab + i)
    }
    return somme / taille;
}

int main() {
    float notes[NB_NOTES] = {8.5, 3, 17.8, 12, 14};
    printf("%f\\n", moyenne(notes, NB_NOTES));
    return 0;
}` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Boucle `i <= taille` → une case de trop (dépassement).",
      "Calculer `sizeof(tab)/sizeof(tab[0])` sur un **paramètre** de fonction (c'est un pointeur : résultat faux).",
      "Copier un tableau avec `=` (interdit) : copier case par case.",
      "Répéter la taille « en dur » à plusieurs endroits au lieu d'un `#define`.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "L'adresse indique où commence le tableau, mais pas où il se termine.",
      "Savoir calculer des expressions comme `*(P+2)`, `*P+2`, `&tab[6]-&tab[2]`.",
    ]},
  ],
},

"c-c4": {
  sources: [
    { label: "CM4 — Chaînes de caractères", file: "pdfs/c/cm4-chaines-caracteres.pdf" },
  ],
  note: "Synthèse fidèle au CM4.",
  sections: [
    { title: "Définitions", kind: "def", items: [
      "**Chaîne** : tableau de `char` terminé par le caractère `'\\0'` qui marque la fin du texte.",
      "`char mot[] = \"chat\";` occupe **5** cases : 4 caractères + `'\\0'` (ajouté automatiquement par les guillemets doubles).",
      "Guillemets simples `'A'` = un caractère ; doubles `\"chat\"` = une chaîne.",
      "**Capacité** (cases réservées) ≠ **longueur** (caractères avant `'\\0'`) : `char mot[10] = \"chat\";` → capacité 10, longueur 4.",
      "Sans `'\\0'` (ex. `char mot[4] = \"chat\";`), `printf(\"%s\")` lit au-delà du tableau : comportement indéfini.",
    ]},
    { title: "Entrées / sorties", kind: "key", items: [
      "`%c` affiche un caractère, `%s` affiche jusqu'à `'\\0'`.",
      "`scanf(\"%19s\", mot);` pour `char mot[20]` : pas de `&`, et la largeur limite à 19 caractères + `'\\0'`. `%s` s'arrête au **premier espace** (un seul mot).",
      "`fgets(texte, TAILLE_TEXTE, stdin);` lit une ligne avec espaces (au plus TAILLE−1 caractères + `'\\0'`, peut garder le `\\n`).",
      "En paramètre, `char chaine[]` ≡ `char* chaine` ; on parcourt jusqu'à `chaine[i] != '\\0'`.",
    ]},
    { title: "string.h", kind: "key", items: [
      "`strlen(s)` : nombre de caractères avant `'\\0'` (≠ `sizeof(s)` = capacité en octets).",
      "`strcpy(dest, src)` : copie (y compris `'\\0'`). On ne peut pas faire `dest = src;`.",
      "`strcmp(s1, s2)` : `0` si identiques, `< 0` si s1 avant s2, `> 0` sinon. `==` compare des **adresses**.",
      "`strcat(dest, src)` : ajoute src à la fin de dest.",
      "Avant `strcpy` / `strcat`, la destination doit être **assez grande** (sinon dépassement).",
    ]},
    { title: "Codes", kind: "code", code:
`int longueur(char chaine[]) {        // strlen « maison »
    int i = 0;
    while (chaine[i] != '\\0') {
        i++;
    }
    return i;
}

// ASCII : 'A' = 65 … 'Z' = 90, 'a' = 97 … 'z' = 122
char lettre = 'c';
int position = lettre - 'a';          // 2
char majuscule = 'A' + position;      // 'C'

#define NB_JOUEURS 3
#define TAILLE_NOM 20
char joueurs[NB_JOUEURS][TAILLE_NOM] = {"Mario", "Peach", "Yoshi"};
for (int i = 0; i < NB_JOUEURS; i++) printf("%s\\n", joueurs[i]);` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Oublier la case du `'\\0'` dans la capacité.",
      "`scanf(\"%s\", mot)` sans largeur (risque de débordement) ou avec `&mot`.",
      "Comparer avec `==`, affecter avec `=`.",
      "`strcat` dans un tableau trop petit (`char texte[5] = \"Bon\"; strcat(texte, \"jour\");` demande 8 cases).",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "La capacité du tableau doit toujours inclure la case réservée à `'\\0'`.",
      "Savoir réécrire `strlen`, la copie et la comparaison sans `string.h`.",
    ]},
  ],
},

"c-c5": {
  sources: [
    { label: "CM5 — Structures et allocation dynamique", file: "pdfs/c/cm5-structures-allocation.pdf" },
  ],
  note: "Synthèse fidèle au CM5.",
  sections: [
    { title: "Structures", kind: "def", items: [
      "Une **structure** regroupe des informations d'une même entité, de types éventuellement différents (type défini par le programmeur).",
      "Déclaration du type (ne crée aucune variable) : `typedef struct { char nom[30]; int age; float moyenne; } Etudiant;`",
      "Variable : `Etudiant e;` ; accès : `e.age = 20;` ; initialisation dans l'ordre des champs : `Etudiant e = {\"Anna\", 20, 14.5};`",
      "Champ chaîne : `strcpy(e.nom, \"Nora\");` (pas `e.nom = \"Nora\";`).",
      "Copie **autorisée** : `e2 = e1;`. Comparaison `e1 == e2` **interdite** : comparer champ par champ.",
      "Structure imbriquée : le type `Adresse` doit être déclaré avant `Etudiant` ; accès `e.adresse.numero`.",
      "Énumération : `typedef enum { GROUPE_A, GROUPE_B, GROUPE_C } Groupe;` (valeurs 0, 1, 2 par défaut).",
    ]},
    { title: "Structures et fonctions", kind: "key", items: [
      "Par **valeur** `void afficher(Etudiant e)` : la fonction reçoit une copie, l'original n'est pas modifié.",
      "Par **adresse** `void modifier(Etudiant* e)` : la fonction modifie l'original.",
      "Accès par pointeur : `(*p).moyenne` — parenthèses obligatoires car `.` est prioritaire sur `*`. `p->moyenne` est équivalent ; **le cours préfère `(*p).champ`**.",
      "Tableau de structures : `Etudiant promo[NB_ETUDIANTS];` ; `promo[i].moyenne` ⇔ `(*(promo + i)).moyenne`.",
    ]},
    { title: "Allocation dynamique (stdlib.h)", kind: "key", items: [
      "Quand la taille n'est connue qu'**à l'exécution** (saisie utilisateur).",
      "`malloc(nb * sizeof(type))` réserve un bloc d'octets et renvoie l'adresse de la première case ; les cases **ne sont pas initialisées** ; renvoie **`NULL`** en cas d'échec.",
      "`free(p);` libère la zone (**une seule fois**), puis `p = NULL;` pour ne pas garder une ancienne adresse.",
    ]},
    { title: "Cycle de vie d'une zone allouée", kind: "code", code:
`int nb;
scanf("%d", &nb);
if (nb <= 0) {                                   // 1. vérifier la taille
    return 1;
}
Etudiant* promo = malloc(nb * sizeof(Etudiant)); // 2. malloc
if (promo == NULL) {                             // 3. tester NULL
    printf("Erreur d'allocation.\\n");
    return 1;
}
for (int i = 0; i < nb; i++) {
    scanf("%f", &promo[i].moyenne);              // utilisation dans les limites
}
free(promo);                                     // 4. free
promo = NULL;                                    // 5. pointeur à NULL` },
    { title: "Erreurs fréquentes", kind: "pitfall", items: [
      "Oublier `sizeof` : `malloc(nb)` réserve `nb` octets, pas `nb` structures.",
      "Ne pas tester `NULL` après `malloc`.",
      "Utiliser la zone après `free` (use-after-free) ou la libérer deux fois.",
      "Oublier `free` → fuite mémoire.",
      "`*p.moyenne` sans parenthèses.",
    ]},
    { title: "À retenir pour l'examen", kind: "exam", items: [
      "Une zone allouée dynamiquement doit toujours être vérifiée puis libérée.",
      "Savoir écrire le programme complet : vérifier nb → malloc → test NULL → saisie → free → NULL.",
    ]},
  ],
},
};
