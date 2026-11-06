# DESIGN.md — Système de design de Credere.ma

**Statut : source de vérité.** Ce document décide. Le code applique.

| Ce que vous cherchez | Où c'est |
| --- | --- |
| La règle, le rôle, l'intention | ce fichier |
| La valeur exécutable (couleur, taille, espace) | `css/tokens.css` |
| Le rendu réel, contrôlable à l'œil | `design-system.html` |
| Où vit chaque fichier du site | `AGENTS.md` |

Ordre de priorité en cas de doute : `DESIGN.md` → `css/tokens.css` → la page existante la plus proche. Une page qui contredit ce document est un défaut à corriger, pas une référence.

Rien dans ce document n'est une préférence personnelle : chaque valeur décrit ce que le site fait déjà, ou tranche explicitement un cas qui n'était pas couvert. Les valeurs qui n'existaient pas avant sont marquées **(nouveau)** dans l'historique des modifications.

---

## 1. Identité

Credere.ma est le site d'un courtier en financement immobilier au Maroc, appuyé par un consultant en finance et ingénierie bancaire. Le visiteur arrive avec un projet concret et une inquiétude : la banque va-t-elle suivre ?

Le site doit donc inspirer **la compétence bancaire et la proximité d'un conseil privé**. Pas une néobanque, pas une agence immobilière, pas une page de vente.

Trois principes, dans cet ordre :

1. **Sobre et assuré.** Fond clair, texte dense, filets fins. L'autorité vient de la typographie et du blanc, pas de la décoration.
2. **L'or en signal, jamais en fond.** L'or marque un repère : un numéro, un filet, un bouton, un point. Il ne remplit jamais une grande surface.
3. **Éditorial, pas corporate.** Crimson Pro pour les titres, phrases complètes en français, aucun chiffre, prix ni délai non vérifié. Un seul interlocuteur, du premier échange à la signature.

### Ton de voix

- Vouvoiement, première personne assumée par le consultant (« je », quand la page parle en son nom).
- Phrases courtes, vocabulaire bancaire exact (apport, taux, garantie, Mourabaha, décompte d'intérêts) sans jargon inutile.
- Aucune promesse de résultat, aucun superlatif de vente, aucune urgence artificielle.
- Les formulaires sont des **démonstrations** tant qu'aucun service d'envoi n'est branché, et le disent sous le bouton.

---

## 2. Palette

Trois familles : or, bleu nuit, crème. Le blanc et l'encre servent de neutres. Le rouge est réservé aux erreurs de formulaire.

Les ratios sont **mesurés** sur les valeurs exactes de `css/tokens.css` (WCAG 2.x, seuil AA : 4,5:1 pour le texte courant, 3:1 pour le texte large et les éléments d'interface).

### Or

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `--gold` | `#d3a05e` | Accent principal : boutons pleins, numéros, filets |
| `--gold-soft` | `#e6b06c` | Étiquettes et accents sur fond nuit, survol du bouton or |
| `--gold-deep` | `#c8924c` | Survol des boutons à filet, bordures d'état actif |
| `--gold-ink` | `#7f5726` | **Le seul or autorisé pour du texte sur fond clair** |

### Bleu nuit

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `--navy` | `#0d212e` | Bandeaux, pied de page, bouton fantôme |
| `--navy-deep` | `#091a24` | En-tête au défilement, ombres |
| `--navy-soft` | `#12303f` | Survols et surfaces secondaires sur fond nuit |
| `--navy-ink` | `#14232e` | Texte posé sur un aplat or |

### Neutres

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `--cream` | `#f2eee9` | Fond de page par défaut, texte sur fond nuit |
| `--cream-warm` | `#e6e0d7` | Pistes, séparateurs doux, surfaces en retrait |
| `--white` | `#ffffff` | Cartes, formulaires, sections alternées |
| `--ink` | `#171717` | Titres et texte fort |
| `--ink-soft` | `#42515b` | Texte courant |
| `--ink-mute` | `#8d979d` | **Décor uniquement — ne porte jamais de texte lisible** |
| `--danger` | `#a3241f` | Messages d'erreur de formulaire |

### Filets

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--line-gold` | `rgba(211, 160, 94, .22)` | Séparateur sur fond clair |
| `--line-cream` | `rgba(23, 23, 23, .12)` | Bordure de carte, ligne de tableau |

### Associations autorisées

| Association | Ratio | Niveau |
| --- | --- | --- |
| Encre sur crème | 15,52:1 | AAA |
| Encre sur blanc | 17,93:1 | AAA |
| Encre douce sur crème | 7,10:1 | AAA |
| Encre douce sur blanc | 8,20:1 | AAA |
| Or encre sur crème | 5,52:1 | AA |
| Nuit sur or | 6,84:1 | AA |
| Crème sur nuit | 14,27:1 | AAA |
| Or sur nuit | 7,03:1 | AAA |
| Or clair sur nuit | 8,47:1 | AAA |
| Erreur sur crème | 6,43:1 | AA |

### Associations interdites

- **Or sur crème** : 2,58:1. Pour du texte doré sur fond clair, utiliser `--gold-ink`.
- **Encre muette en texte** : 2,58:1 sur crème, 2,98:1 sur blanc. Décor seulement.
- Blanc sur or clair (2,0:1 environ), nuit sur nuit, or sur or clair.
- Une couleur seule pour signaler une erreur ou un état actif : toujours doubler d'un texte, d'une icône ou d'un attribut ARIA.
- Dégradés décoratifs, lavis violet, fonds orange ou crème orangé : hors système.

---

## 3. Typographie

Deux familles, servies en local depuis `assets/fonts/` en `.woff2`. Aucun CDN, aucune requête distante.

| Jeton | Valeur | Famille | Interligne | Usage |
| --- | --- | --- | --- | --- |
| `--text-h1` | clamp(2.7rem, 6.6vw, 5.6rem) | Crimson Pro | 1.08 | Titre d'accueil / hero |
| `--text-display` | clamp(2rem, 4.4vw, 3.45rem) | Crimson Pro | 1.08 | Titre de page intérieure |
| `--text-h2` | clamp(1.85rem, 3.2vw, 3rem) | Crimson Pro | 1.08 | Titre de section |
| `--text-h3` | clamp(1.35rem, 1.9vw, 1.62rem) | Crimson Pro | 1.3 | Titre de carte, sous-titre |
| `--text-lead` | 1.15rem | DM Sans | 1.65 | Chapô, introduction |
| `--text-body-lg` | 1.06rem | DM Sans | 1.65 | Corps de page, articles |
| `--text-body` | 0.95rem | DM Sans | 1.65 | Texte des composants |
| `--text-md` | 0.9rem | DM Sans | 1.65 | Métadonnées, petits paragraphes |
| `--text-sm` | 0.8rem | DM Sans | 1.5 | Boutons, interface |
| `--text-xs` | 0.74rem | DM Sans | 1.4 | Étiquettes, fil d'Ariane |
| `--text-2xs` | 0.68rem | DM Sans | 1.4 | Mentions, compteurs, légendes |

**Familles**

- `--font-display` : `'Crimson Pro', 'Iowan Old Style', Georgia, 'Times New Roman', serif`
- `--font-body` : `'DM Sans', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif`

**Graisses disponibles** — Crimson Pro 300/400/400 italique/500/600/700 ; DM Sans 300/400/500/600/700.
Usage : 400 pour le texte, 500 pour l'interface et les étiquettes, 600 pour un titre de carte. 700 réservé aux cas déjà en place.

**Interlettre**

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--tracking-eyebrow` | .24em | Étiquettes en capitales |
| `--tracking-caps` | .13em | Boutons en capitales |
| `--tracking-wide` | .06em | Filtres, mentions |
| `--tracking-tight` | -.01em | Grands titres |

**Règles**

- Un seul `h1` par page. Sections en `h2`, cartes en `h3`, sans saut de niveau.
- Largeur de lecture : `--measure` = 66 caractères. Au-delà, couper la colonne, pas la phrase.
- Texte courant jamais en capitales ; les capitales sont réservées aux étiquettes courtes (≤ 6 mots).
- Aucune taille en dessous de `--text-2xs` (≈ 11 px).
- Pas de texte justifié.

---

## 4. Espacement, grille, rayons, élévation

**Échelle** — uniquement des multiples de 4.

`--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 20 · `--space-6` 24 · `--space-7` 32 · `--space-8` 40 · `--space-9` 48 · `--space-10` 56 · `--space-11` 64 · `--space-12` 80 · `--space-13` 96 · `--space-14` 112 · `--space-15` 128 px.

**Mise en page**

| Jeton | Valeur |
| --- | --- |
| `--container` | 1240 px |
| `--gutter` | clamp(20px, 4vw, 44px) |
| `--section-y` | clamp(64px, 8.5vw, 112px) |
| `--header-h` | 88 px |
| `--measure` | 66ch |

**Rayons** — `--radius` 8 px (défaut : cartes, boutons, champs), `--radius-lg` 14 px (grands blocs), `--radius-pill` 999 px (filtres uniquement). Jamais de coin 0, jamais de rayon > 16 px sur une carte.

**Élévation** — `--shadow-sm`, `--shadow-md`, `--shadow-lg`. Ombre froide, très diffuse, jamais de contour net. Une seule élévation par composition.

**Rythme des fonds** — l'accueil ouvre sur le hero photographique puis alterne crème et nuit. Les pages intérieures ouvrent sur un bandeau nuit puis alternent blanc et crème. Deux sections consécutives n'ont jamais le même fond.

### Mobile et points de rupture

Le site est conçu d'abord pour 360 px ; chaque page doit rester lisible et sans défilement horizontal à cette largeur et en paysage.

| Seuil | Ce qui change |
| --- | --- |
| 1080 px | Navigation resserrée (`gap` et taille des liens) |
| 1023 px | Menu burger plein écran, `--header-h` à 78 px, bouton d'en-tête masqué, grilles principales en une colonne, colonne latérale d'article non collante |
| 860 px | Grille des services en deux colonnes |
| 767 px | Services et cartes de blog en une colonne, formulaires en une colonne, pied de page en une colonne, `--text-md` porté à 1rem |
| 640 px | Hero d'accueil raccourci, actions empilées pleine largeur, flèche de descente masquée |
| 480 px | Repères chiffrés en deux colonnes compactes, listes numérotées resserrées |
| hauteur ≤ 560 px + paysage | Hero et bandeau hero ramenés à la hauteur d'un écran, actions sur une ligne |

**Règles non négociables**

- Le corps de texte ne descend jamais sous 16 px sur mobile (iOS agrandit la page au focus d'un champ en dessous de ce seuil).
- Les champs de formulaire sont à `1rem` minimum ; les liens secondaires, filtres et entrées de sommaire offrent une cible d'au moins 44 px de haut.
- Aucun élément ne dépasse la largeur du viewport : les grilles utilisent `minmax(0, 1fr)`, les images `max-width: 100%`, et les seuls défilements horizontaux volontaires sont le sommaire de page et le tableau de contraste de `design-system.html`.
- Les hauteurs de hero utilisent `svh`, jamais `vh`, pour ne pas passer sous la barre d'URL mobile.
- `prefers-reduced-motion` désactive les apparitions et le défilement fluide.

---

## 5. Mouvement

Tout passe par `--ease-out`. Aucune animation décorative : le mouvement exprime un changement d'état ou une apparition.

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--dur-fast` | .18 s | Couleur de bordure, ombre de focus |
| `--dur-base` | .22 s | Survol de bouton, couleur de lien |
| `--dur-mid` | .26 s | Ouverture de panneau, accordéon |
| `--dur-slow` | .35 s | Transitions de visibilité |
| `--dur-reveal` | .55 s | Apparition au défilement |

Règles : entrée en `ease-out`, sortie plus courte que l'entrée (60–70 %), survol limité à une translation de 1 px, aucune parallaxe, aucun carrousel automatique. `prefers-reduced-motion` ramène toute transition à 0,01 ms et supprime le masquage initial des éléments révélés.

---

## 6. Composants et états

Chaque composant a quatre états au minimum : repos, survol, focus visible, désactivé ou erreur. Un composant sans état de focus n'est pas terminé.

### Boutons — `.btn`

| Variante | Classe | Fond | Texte | Emploi |
| --- | --- | --- | --- | --- |
| Primaire | `.btn--gold` | `--gold` | `--navy-ink` | L'action attendue, **une seule par vue** |
| Secondaire | `.btn--line` | transparent, filet | `--ink` | Action alternative sur fond clair |
| Fantôme | `.btn--ghost` | nuit translucide, filet crème | `--cream` | Uniquement sur fond nuit |
| Largeur | `.btn--block` | — | — | Formulaire, colonne étroite |

Hauteur par padding 15/26 px, capitales, interlettre .13em, rayon 8 px, poids 500.
Survol or : `--gold-soft` + translation -1 px. Survol filet : bordure `--gold-deep`, texte `--gold-ink`, fond doré à 8 %. Actif : retour à 0. Désactivé : opacité .45, curseur interdit, aucun survol. Focus : anneau `--ring`.

### Étiquette de section — `.eyebrow`

Capitales, `--text-xs`, interlettre .24em, couleur `--gold-ink` sur fond clair, `--gold-soft` sur fond nuit (`.eyebrow--light`). Précède toujours un titre, jamais un paragraphe seul.

### Badges — `.badge-list`

Liste de preuves courtes (≤ 12 mots), chacune avec une icône de validation `svg.icon` en `aria-hidden`. L'icône ne remplace jamais le texte.

### Filtres — `.chip` dans `.filters`

Pilules, `--radius-pill`, `--text-sm`, interlettre .06em. État actif porté par `aria-pressed="true"` (et non par une classe visuelle seule).

### Champs — `.field` dans `.form-grid`

- Étiquette visible au-dessus du champ, reliée par `for`/`id`.
- Champ requis : astérisque décoratif (`aria-hidden="true"`), plus `data-required`.
- Champ facultatif : mention « facultatif » en `.field-optional`, écrite en toutes lettres.
- Erreur : `.field.has-error` + `aria-invalid="true"` + message `.field-error` relié par `aria-describedby`. La bordure passe à `--danger-soft`, le focus à `--ring-danger`.
- Largeur pleine : `.field--full` (textarea, message).
- Consentement : `.consent`, case à cocher et libellé sur une seule ligne logique.
- Sous le bouton : `.form-note` (mention de démonstration) puis `.form-status` (`role="status"`, `aria-live="polite"`).
- Toute erreur porte un texte : jamais une bordure rouge seule.

### Cartes de service — `.service` dans `.services-grid`

Fond nuit, filet doré, numéro `.service-num` en or, `h3` crème, phrase courte. Aucun bouton : c'est un repère de lecture, pas une carte cliquable. Une carte cliquable porte un lien dans son titre, jamais sur toute la surface.

### Page Promoteurs — sommaire, listes numérotées, dossier

Composants propres à la page `promoteur-immobilier.html`, tous construits sur les jetons existants (aucune couleur ni taille nouvelle). Le principe : des filets et des numéros portent la structure, les cartes sont réservées aux pièces qui doivent se lire comme un objet.
- `.subnav` + `[data-subnav]` — sommaire collant sous l'en-tête (`top: var(--header-h)`), fond crème translucide, filet bas `--line-cream`. Le lien de la section visible reçoit `.is-current` et `aria-current="true"` (bloc 10 de `js/ui.js`). Les sections portent `scroll-margin-top: calc(var(--header-h) + 58px)`.
- `.split-layout` / `.split-intro` — introduction à gauche, contenu à droite ; `.split-intro--light` pour la version sur fond nuit. Retombe à une colonne à 1023 px.
- `.ranked-list` / `.ranked-item` / `.ranked-num` — liste numérotée à filets, sans carte : numéro display en `--fg-accent` sur 46 px, titre display, texte `--text-md`.
- `.glossary-split` + `.glossary-group-title` — deux groupes nommés ; chaque titre porte un filet `--line-gold`. `.glossary` repasse en une colonne et chaque terme ouvre un numéro `.glossary-num` discret.
- `.phases` / `.phase-card` / `.phase-step` / `.phase-num` — rail de quatre phases sur un filet d'or continu, sans carte, pour distinguer les montages du dossier.
- `.note-line` — note de clôture en display italique, séparée par un filet.
- `.dossier-card` — trois colonnes sur filet d'or supérieur, sans fond ni rayon ; numéro `.dossier-num`, titre display, liste à puces dorées.
- `.criteria` — liste numérotée à filets horizontaux ; le numéro est décoratif (`.criteria-num`), jamais la seule information.
- `.pull-quote` — citation en display italique sur filet gauche `--gold`.
- `.faq-split` / `.faq-side` / `.text-link` — FAQ à droite, note et lien texte à gauche. `.text-link` est le lien d'action secondaire : jamais un second bouton plein.
- `.start-band` / `.start-layout` / `.start-list` / `.start-num` — bande blanche de trois pièces à fournir, filets d'or, avant le bandeau d'appel final.
- `.subnav`, `.phases`, `.dossier-grid` et `.start-list` retombent à 2 puis 1 colonne (1023 / 767 px).

### Bandeaux et pied de page

Composés par `js/layout.js` depuis `js/site.data.js`. Aucune page ne contient leur HTML. Le logotype est du texte — « Credere » seul, initiale en or clair (`.logo-word` + `.logo-word-initial`) — jamais une image, et ne s'affiche que sur fond nuit.

### Formulaires et démonstration

Aucun formulaire n'envoie de données aujourd'hui. Tant que ce n'est pas branché, `.form-note` sous le bouton est **obligatoire** et dit clairement qu'aucune demande n'est transmise, avec le téléphone et l'e-mail en secours.

---

## 7. Accessibilité — plancher non négociable

- Contraste : corps ≥ 4,5:1, grands titres et éléments d'interface ≥ 3:1, mesuré sur les valeurs exactes.
- Cible cliquable ≥ 44 px de haut (boutons, filtres, liens de pied de page).
- Focus visible sur tout élément interactif, y compris sur fond nuit.
- Lien d'évitement en tête de page.
- Aucune information portée par la couleur seule : `aria-current` pour le menu, `aria-pressed` pour les filtres, texte pour les erreurs.
- Images décoratives en `aria-hidden`, portraits avec un texte alternatif nommant la personne.
- Le site reste lisible à 200 % de zoom et avec une police système agrandie : aucune hauteur de texte figée.
- `prefers-reduced-motion` respecté.

---

## 8. À faire / à ne pas faire

**À faire**

- Écrire la règle ici, puis la valeur dans `css/tokens.css`, puis vérifier le rendu sur `design-system.html`.
- Utiliser `var(--…)` pour toute couleur, taille, espace, rayon, durée.
- Un seul bouton or par vue ; le reste en filet ou en fantôme.
- Alterner les fonds de section.
- Écrire des textes vérifiables : aucun chiffre, prix, délai ou certification inventé.
- Signaler un formulaire de démonstration sous son bouton.

**À ne pas faire**

- Une couleur littérale dans `css/styles.css` ou `css/pages.css`.
- De l'or en texte courant sur crème, de l'encre muette en texte.
- Des dégradés décoratifs, un fond orange ou crème orangé, un lavis violet.
- Une icône devant chaque titre, des emoji tenant lieu d'icône.
- Des cartes à liseré coloré, des ombres dures, des coins très arrondis.
- Un survol qui éclaircit le texte jusqu'à le rendre illisible.
- Un état actif signalé par la seule couleur.
- Une ressource distante (police, image, script, feuille de style).
- Recopier l'en-tête ou le pied de page dans une page.
- Inventer une métrique (« 10× plus rapide », « 99,9 % »).

---

## 9. Modifier le système

1. **Décider ici.** Ajouter ou modifier la ligne dans la section concernée, avec le rôle et, si c'est une couleur, le ratio mesuré.
2. **Traduire une fois.** Ajouter le jeton dans `css/tokens.css`. Une valeur existante ne change jamais sans que ce document change d'abord.
3. **Appliquer.** Remplacer les littéraux par le jeton dans `css/styles.css` ou `css/pages.css`.
4. **Montrer.** Ajouter l'exemple dans `design-system.html` s'il s'agit d'un nouveau composant ou d'un nouvel état.
5. **Ne pas propager à la main.** Une entrée de menu, un téléphone, un réseau social se modifient dans `js/site.data.js` — pas ici.

Une modification de valeur visuelle sans mise à jour de ce fichier est une régression de gouvernance, même si le rendu est correct.

---

## 10. Historique

| Date | Changement |
| --- | --- |
| 2026-11-06 | Création du document. Valeurs reprises telles quelles du site existant. **(nouveau)** : échelles typographique et d'espacement nommées, durées `--dur-*`, anneaux `--ring` / `--ring-danger`, élévations `--shadow-sm/lg`, rôles sémantiques de couleur, `--radius-pill`, `--measure`, `--z-*`, état `.btn:disabled`. Aucun rendu existant modifié. |

---

## 11. Points ouverts

- Le site n'a pas de mode sombre : ce document ne le spécifie pas, il faudra une palette dédiée et un audit de contraste séparé.
- La police de code (`ui-monospace`, Consolas) n'existe que dans `design-system.html`, pour les codes de jeton. Elle n'appartient pas au système de marque.
- L'état de focus est décrit par `--ring`, mais les règles de `styles.css` antérieures à ce document utilisent encore des `box-shadow` écrits en dur : les nouveaux composants doivent utiliser `--ring`.
- Les photos de `assets/` proviennent de l'ancien site et restent sous copyright : à remplacer avant une mise en ligne publique.
