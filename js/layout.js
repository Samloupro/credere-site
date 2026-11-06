/* =========================================================
   Credere.ma — js/layout.js
   Compose l'en-tête et le pied de page depuis js/site.data.js.
   ---------------------------------------------------------
   Dans une page HTML, il suffit de deux emplacements :

     <div data-site-header></div>
     … contenu propre à la page …
     <div data-site-footer></div>

   et un identifiant de page sur le <body> :

     <body data-page="home">        page d'accueil
     <body data-page="contact">     page contact
     <body data-page="blog">        blog et articles

   Le fichier s'exécute en JavaScript classique (pas de module
   ES) pour rester ouvrable par double-clic, sans serveur.
   ========================================================= */
(function () {
  'use strict';

  var site = window.SITE;
  if (!site) return;

  var page = document.body.getAttribute('data-page') || 'home';
  var isHome = page === 'home';

  /* Toutes les pages partagent les mêmes fichiers : les ancres de la
     page d'accueil deviennent « index.html#… » hors de l'accueil. */
  function anchorHref(anchor) {
    return isHome ? '#' + anchor : 'index.html#' + anchor;
  }

  function navHref(item) {
    return item.page ? item.page : anchorHref(item.anchor);
  }

  function isCurrent(item) {
    return item.key === page;
  }

  /* Logotype : le nom seul, l'initiale dorée porte l'accent de marque.
     Le lien de marque possède déjà un aria-label, le mot est donc
     décoratif pour les lecteurs d'écran. */
  function brandMarkup() {
    var name = site.brand.name;
    var suffix = site.brand.suffix
      ? '<span class="logo-word-dot">' + site.brand.suffix + '</span>'
      : '';
    return '<span class="logo-word" aria-hidden="true">' +
      '<span class="logo-word-initial">' + name.charAt(0) + '</span>' +
      name.slice(1) + suffix + '</span>';
  }

  function navListMarkup() {
    return site.nav.map(function (item) {
      var href = navHref(item);
      var attr = isCurrent(item) ? ' aria-current="page"' : '';
      return '<li><a href="' + href + '"' + attr + '>' + item.label + '</a></li>';
    }).join('\n        ');
  }

  function headerMarkup() {
    return '<header class="site-header">\n' +
      '  <div class="wrap header-inner">\n' +
      '    <a class="brand" href="' + site.brand.href + '" aria-label="' + site.brand.ariaLabel + '">\n' +
      '      ' + brandMarkup() + '\n' +
      '    </a>\n\n' +
      '    <nav class="nav" id="nav" aria-label="Navigation principale">\n' +
      '      <ul class="nav-list">\n        ' + navListMarkup() + '\n      </ul>\n' +
      '      <div class="nav-extra">\n' +
      '        <a class="nav-extra-phone" href="' + site.phone.href + '">' + site.phone.label + '</a>\n' +
      '        <a class="btn btn--gold" href="' + site.cta.href + '">' + site.cta.label + '</a>\n' +
      '      </div>\n' +
      '    </nav>\n\n' +
      '    <div class="header-actions">\n' +
      '      <a class="lang" href="' + site.lang.href + '" hreflang="' + site.lang.hreflang +
      '" lang="' + site.lang.hreflang + '" aria-label="' + site.lang.ariaLabel + '">\n' +
      '        <img src="' + site.lang.flag + '" alt="" width="18" height="12">\n' +
      '        <span>' + site.lang.label + '</span>\n' +
      '      </a>\n' +
      '      <a class="btn btn--gold header-cta" href="' + site.cta.href + '">' + site.cta.label + '</a>\n' +
      '      <button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Ouvrir le menu">\n' +
      '        <span></span><span></span><span></span>\n' +
      '      </button>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</header>';
  }

  function footerMarkup() {
    var socials = site.socials.map(function (item) {
      return '<li><a href="' + item.href + '" target="_blank" rel="noopener">' + item.label + '</a></li>';
    }).join('\n        ');

    return '<footer class="site-footer">\n' +
      '  <div class="footer-decor" aria-hidden="true">\n' +
      '    <svg viewBox="0 0 120 320" fill="none">\n' +
      '      <circle cx="60" cy="46" r="26" stroke="currentColor" stroke-width="2"/>\n' +
      '      <circle cx="60" cy="46" r="10" stroke="currentColor" stroke-width="2"/>\n' +
      '      <path d="M60 72v200M60 240h26M60 280h18" stroke="currentColor" stroke-width="2"/>\n' +
      '    </svg>\n' +
      '  </div>\n\n' +
      '  <div class="wrap footer-grid">\n' +
      '    <div class="footer-brand">\n' +
      '      ' + brandMarkup() + '\n' +
      '      <p>' + site.footerPitch.join('<br>') + '</p>\n' +
      '    </div>\n\n' +
      '    <nav class="footer-nav" aria-label="Navigation de pied de page">\n' +
      '      <p class="footer-heading">' + site.labels.navHeading + '</p>\n' +
      '      <ul>\n        ' + navListMarkup() + '\n      </ul>\n' +
      '    </nav>\n\n' +
      '    <div class="footer-contact">\n' +
      '      <p class="footer-heading">' + site.labels.contactHeading + '</p>\n' +
      '      <ul>\n' +
      '        <li><a href="' + site.phone.href + '">' + site.phone.label + '</a></li>\n' +
      '        <li><a href="' + site.email.href + '">' + site.email.label + '</a></li>\n' +
      '      </ul>\n' +
      '      <p class="footer-heading footer-heading--spaced">' + site.labels.socialHeading + '</p>\n' +
      '      <ul class="footer-social">\n        ' + socials + '\n      </ul>\n' +
      '    </div>\n' +
      '  </div>\n\n' +
      '  <div class="wrap footer-bottom">\n' +
      '    <p>' + site.labels.copyright + '</p>\n' +
      '  </div>\n' +
      '</footer>';
  }

  var headerSlot = document.querySelector('[data-site-header]');
  if (headerSlot) headerSlot.outerHTML = headerMarkup();

  var footerSlot = document.querySelector('[data-site-footer]');
  if (footerSlot) footerSlot.outerHTML = footerMarkup();
})();
