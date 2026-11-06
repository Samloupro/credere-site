# Credere.ma — guide de maintenance

Site statique du courtier **Credere.ma** : 8 pages HTML, sans build, sans serveur.
Ouvre `index.html` par double-clic ou depuis l'aperçu du projet : tout fonctionne hors ligne.

Ce fichier s'adresse à un humain **ou à un agent IA**. Lis-le avant de modifier le site :
il dit où vit chaque chose et ce qu'il ne faut pas dupliquer.

## 0. Autorités

Trois documents, trois domaines, aucune concurrence :

| Document | Fait autorité sur |
|---|---|
| `DESIGN.md` | toutes les valeurs visuelles : palette, typographie, espacements, rayons, ombres, états, contrastes |
| `AGENTS.md` (ce fichier) | la structure et les procédures : où vit chaque fichier, comment ajouter une page, où sont les contenus partagés |
| instructions d'exécution de l'agent | la méthode de travail : lecture, écriture, vérification, plafonds d'itération |

En cas de conflit : valeur visuelle → `DESIGN.md`, emplacement ou procédure → `AGENTS.md`,
méthode d'exécution → les règles de l'agent. Ce fichier ne redéfinit jamais une valeur de
design : il renvoie à `DESIGN.md`.

---

## 1. Carte des fichiers

```
index.html                            accueil (hero, à propos, services, bénéfices, témoignages, contact)
a-propos.html                         page « À propos »
contact.html                          page « Contact » (formulaire + FAQ)
blog.html                             liste des articles, filtres par thème
promoteur-immobilier.html             page « Promoteurs » : crédit promotion immobilière (glossaire, montages, étapes, dossier, critères, FAQ)
blog-credit-immobilier-maroc.html     article
blog-mourabaha.html                   article
blog-investissement-locatif.html      article

DESIGN.md                             SOURCE DE VÉRITÉ du système de design : rôles, règles, ratios mesurés
design-system.html                    référence visuelle : palette, typographie, composants réels et leurs états

css/
  tokens.css      SEULE implémentation du système : couleurs, tailles, espacements, durées
  styles.css      mise en forme de l'accueil + composants communs (en-tête, hero, sections, pied de page)
  pages.css       composants des pages intérieures (bandeau, cartes, formulaires, article, FAQ)

js/
  site.data.js    SOURCE UNIQUE des contenus partagés : marque, menu, coordonnées, réseaux, libellés
  layout.js       compose l'en-tête et le pied de page depuis site.data.js
  ui.js           comportements : en-tête fixe, menu mobile, apparitions, carrousel, filtres, formulaires

assets/
  hero.png  hero-1920.webp  hero-960.webp         couverture (PNG = repli, WebP = servi)
  portrait.png  portrait-1120.webp  portrait-720.webp   portrait + avatar d'article
  cta-bg.png  cta-bg-1600.webp                    fond du bandeau d'appel
  flag-en.png                                     sélecteur de langue
  fonts/    Crimson Pro et DM Sans en .woff2 (servis localement, aucun CDN)
  credits.json  provenance et licence de chaque photo

AGENTS.md       ce guide
```

## 2. Règles d'or

1. **L'en-tête et le pied de page ne sont écrits dans aucune page.** Chaque page contient
   seulement deux emplacements, remplis par `js/layout.js` :

   ```html
   <div data-site-header></div>
   … contenu de la page …
   <div data-site-footer></div>
   ```

   Si tu vois du HTML d'en-tête recopié dans une page, c'est une régression : supprime-le.

2. **Une page se déclare par `<body data-page="…">`.** Valeurs utilisées : `home`,
   `a-propos`, `contact`, `blog`, `promoteurs`. C'est ce qui met l'entrée de menu correspondante
   en surbrillance et ce qui adapte les ancres (`#services` sur l'accueil,
   `index.html#services` ailleurs).

3. **Aucune couleur, police ou taille en dur dans les feuilles.** Tout passe par les
   variables de `css/tokens.css` (`var(--navy)`, `var(--font-display)`, `var(--radius)`…).
   Une couleur littérale (`#…`) dans `styles.css` ou `pages.css` est un défaut à corriger.
   Toute décision visuelle s'écrit **d'abord** dans `DESIGN.md`, puis se traduit une seule
   fois dans `tokens.css`. Ce document prime sur la page existante la plus proche.

4. **Pas de build, pas de module ES.** Les scripts sont des `<script src>` classiques
   exécutés en fin de `<body>`, dans cet ordre : `site.data.js`, `layout.js`, `ui.js`.
   C'est ce qui permet d'ouvrir le site en `file://`. Conséquence assumée : sans
   JavaScript, l'en-tête et le pied de page ne s'affichent pas ; le contenu des pages
   reste lisible.

5. **Les images sont locales et référencées en relatif.** Jamais d'URL distante.
   Toute nouvelle photo se dépose dans `assets/` et s'inscrit dans `assets/credits.json`.

6. **Poids mobile : chaque image est servie en WebP, le PNG ne sert que de repli.**
   Dans le HTML, un `<picture>` avec `<source type="image/webp">` puis l'`<img>` en `.png` ;
   dans le CSS, `-webkit-image-set(...)` puis `image-set(...)`, précédés du `background`
   PNG. Le hero a deux tailles : `hero-960.webp` sous 768 px (29 Ko), `hero-1920.webp`
   au-dessus (73 Ko). Les deux sont préchargées par `media`. Toute image hors du premier
   écran porte `loading="lazy" decoding="async"` et des `width`/`height` (anti-CLS).
   Une image de plus de 100 Ko en WebP est un défaut à corriger avant livraison.

## 3. Recettes

### Ajouter une page
1. Copie une page existante de même famille (`contact.html` pour une page de contenu).
2. Garde le bloc `<head>` (commentaire + `tokens.css` + `styles.css` + `pages.css`),
   l'emplacement `data-site-header`, l'emplacement `data-site-footer` et les trois scripts.
3. Mets à jour `<title>`, `<meta name="description">` et les balises `og:`.
4. Donne-lui un `data-page` : une valeur existante pour réutiliser la surbrillance du menu,
   ou une nouvelle valeur si elle doit avoir sa propre entrée.
5. Si la page doit figurer au menu : ajoute-la **une seule fois** dans `SITE.nav`
   (`js/site.data.js`), avec `{ key: 'ma-page', label: 'Ma page', page: 'ma-page.html' }`.
   En-tête et pied de page la reprennent automatiquement.

### Ajouter un article au blog
1. Duplique un article existant (`blog-mourabaha.html` est le plus court).
2. Change `<title>`, la description, le fil d'Ariane, la catégorie, la date, le temps de lecture,
   puis le corps de l'article.
3. Dans `blog.html`, duplique une carte `<article>` et renseigne `data-cat`
   (doit correspondre à un `data-filter` de la barre de filtres, sinon l'article
   n'apparaîtra sous aucun filtre) ainsi que le lien vers le nouvel article.
4. Le compteur « N articles affichés » se recalcule tout seul (`ui.js`, bloc 5).

### Changer une couleur
1. Vérifie le rôle et le ratio dans `DESIGN.md` (section 2). Si la valeur change, le
   document change d'abord.
2. Modifie la variable dans `css/tokens.css`. Rien d'autre à toucher.
3. Ne réintroduis pas de valeur littérale dans `styles.css` ou `pages.css`.
4. Si le rendu doit être contrôlé, ouvre `design-system.html` : il charge les mêmes
   feuilles et affiche les composants dans leurs états.

### Ajouter un jeton ou un composant
1. Écris la règle dans `DESIGN.md` (rôle, usage, contraste si c'est une couleur).
2. Ajoute le jeton dans `css/tokens.css`, dans la section « ÉCHELLE PUBLIÉE ».
3. Utilise `var(--…)` dans la feuille concernée. Les classes `ds-*` n'existent que
   dans `design-system.html` : ne les réutilise pas sur les pages du site.
4. Ajoute l'exemple dans `design-system.html`, avec ses états (repos, survol, focus,
   désactivé ou erreur).

### Changer une entrée de menu, le téléphone, l'e-mail, un réseau social
1. Tout est dans `js/site.data.js`. Une modification s'applique aux 7 pages à la fois.
2. `anchor` = section de la page d'accueil ; `page` = fichier HTML indépendant.

### Changer un comportement (menu mobile, carrousel, filtres, formulaires)
1. Tout est dans `js/ui.js`, un bloc numéroté par composant. Le sommaire est en tête de fichier.
2. Les formulaires sont des **démonstrations** : ils valident et affichent un message,
   ils n'envoient rien. Ne présente pas l'un d'eux comme un envoi réel sans brancher un service.

### Modifier le bandeau d'appel à l'action ou le pied de page
1. Structure : `js/layout.js` (fonction `footerMarkup`).
2. Textes et liens : `js/site.data.js`.

## 4. Points ouverts

- Le sélecteur de langue pointe vers `https://credere.ma/en/` : adresse supposée, à confirmer.
- Le téléphone, le WhatsApp et la page Facebook sont repris du site d'origine ; à vérifier.
- Les photos de `assets/` proviennent de l'ancien site et restent sous son copyright :
  à remplacer par des visuels propres avant une mise en ligne publique.
- La marque est composée en texte dans `js/site.data.js` (`brand.name` = `Credere`)
  et stylée par `.logo-word` / `.logo-word-initial` dans `css/styles.css` ;
  l'ancienne image de logo a été supprimée.
- `assets/flag-en.png` est un fichier vide (0 octet) : le sélecteur de langue
  affiche donc une image cassée. À remplacer par un drapeau réel ou par le texte « EN ».
