/* =========================================================
   Credere.ma — js/site.data.js
   Source de vérité unique du site.
   ---------------------------------------------------------
   Tout ce qui apparaît sur plusieurs pages (marque, menu,
   coordonnées, réseaux, libellés d'appel à l'action) se
   modifie ICI, une seule fois. L'en-tête et le pied de page
   de chaque page sont composés à partir de cet objet.
   ========================================================= */
window.SITE = {
  /* Marque affichée dans l'en-tête et le pied de page.
     Le logotype n'affiche que `name` ; laisser `suffix` vide pour ne rien
     ajouter après le nom. */
  brand: {
    name: 'Credere',
    suffix: '',
    href: 'index.html',
    ariaLabel: "Credere, retour à l'accueil"
  },

  /* Deux lignes de présentation du pied de page. */
  footerPitch: [
    'Courtier en crédit immobilier au Maroc.',
    'Accompagnement clé en main, du dossier à la signature.'
  ],

  /* Coordonnées. Le format `href` est le lien cliquable. */
  phone: { label: '+212 662 64 13 17', href: 'tel:+212662641317' },
  email: { label: 'contact@credere.ma', href: 'mailto:contact@credere.ma' },

  /* Sélecteur de langue de l'en-tête. */
  lang: {
    label: 'EN',
    href: 'https://credere.ma/en/',
    hreflang: 'en',
    flag: 'assets/flag-en.png',
    ariaLabel: 'Passer le site en anglais'
  },

  /* Appel à l'action principal, répété dans l'en-tête. */
  cta: { label: 'Prendre rendez-vous', href: 'contact.html' },

  /* Réseaux sociaux du pied de page. */
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/credere.ma/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572876809798' },
    { label: 'WhatsApp', href: 'https://wa.me/212662641317' }
  ],

  /* Menu principal — même ordre dans l'en-tête et le pied de page.
     — `anchor` : section de la page d'accueil (index.html#…).
     — `page`   : page indépendante du site. */
  nav: [
    { key: 'a-propos', label: 'À propos', anchor: 'a-propos' },
    { key: 'services', label: 'Services', anchor: 'services' },
    { key: 'promoteurs', label: 'Promoteurs', page: 'promoteur-immobilier.html' },
    { key: 'benefices', label: 'Bénéfices', anchor: 'benefices' },
    { key: 'temoignages', label: 'Témoignages', anchor: 'temoignages' },
    { key: 'blog', label: 'Blog', page: 'blog.html' },
    { key: 'contact', label: 'Contact', page: 'contact.html' }
  ],

  /* Libellés du pied de page. */
  labels: {
    navHeading: 'Navigation',
    contactHeading: 'Contact',
    socialHeading: 'Suivez-moi',
    copyright: '© Credere.ma — Tous droits réservés.'
  }
};
