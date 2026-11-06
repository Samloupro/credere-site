/* =========================================================
   Credere.ma — js/ui.js
   Comportements communs, un bloc par composant.
   ---------------------------------------------------------
   1. En-tête fixe au défilement
   2. Menu mobile
   3. Apparition au défilement
   4. Carrousel de témoignages
   5. Filtres du blog
   6. Formulaire de contact (démonstration)
   7. Lettre d'information (démonstration)
   8. Formulaire court de la page d'accueil (démonstration)
   9. Lien de navigation actif (page d'accueil)
   10. Sommaire de page actif (pages longues)
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. En-tête fixe au défilement ---------- */
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('is-stuck');
    else header.classList.remove('is-stuck');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('nav-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('nav-open', open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.matchMedia('(max-width: 1023px)').matches) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        burger.focus();
      }
    });
  }

  /* ---------- 3. Apparition au défilement ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduce.matches || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentElement.querySelectorAll('.reveal'));
        var i = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(i, 5) * 60 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. Carrousel de témoignages ---------- */
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var quotes = Array.prototype.slice.call(carousel.querySelectorAll('.quote'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('.quote-dot'));
    var current = 0;

    var show = function (index) {
      current = (index + quotes.length) % quotes.length;
      quotes.forEach(function (q, i) {
        q.classList.toggle('is-active', i === current);
        q.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
        if (i === current) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    };

    var prev = carousel.querySelector('[data-prev]');
    var next = carousel.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { show(current - 1); });
    if (next) next.addEventListener('click', function () { show(current + 1); });

    dots.forEach(function (d) {
      d.addEventListener('click', function () { show(Number(d.dataset.go)); });
    });

    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    var startX = null;
    carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- 5. Filtres du blog ---------- */
  var filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    var chips = Array.prototype.slice.call(filterBar.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-cat]'));
    var count = document.querySelector('[data-count]');

    var applyFilter = function (value) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = value === 'all' || card.getAttribute('data-cat') === value;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === value));
      });
      if (count) {
        count.textContent = shown === 1
          ? '1 article affiché'
          : shown + ' articles affichés';
      }
    };

    filterBar.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-filter]');
      if (!chip) return;
      applyFilter(chip.getAttribute('data-filter'));
    });

    applyFilter('all');
  }

  /* ---------- 6. Formulaire de contact (démonstration) ---------- */
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    var status = contactForm.querySelector('.form-status');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var fieldOf = function (input) {
      return input.closest('.field') || input.closest('.consent');
    };

    var setError = function (input, message) {
      var box = fieldOf(input);
      if (!box) return;
      var slot = box.querySelector('.field-error');
      box.classList.toggle('has-error', Boolean(message));
      if (slot) slot.textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    var fields = Array.prototype.slice.call(
      contactForm.querySelectorAll('[data-required], [data-email]')
    );

    fields.forEach(function (input) {
      input.addEventListener('input', function () {
        var box = fieldOf(input);
        if (box && box.classList.contains('has-error')) setError(input, '');
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;

      fields.forEach(function (input) {
        var value = (input.value || '').trim();
        var message = '';

        if (input.type === 'checkbox' && input.hasAttribute('data-required') && !input.checked) {
          message = 'Merci d\u2019accepter l\u2019utilisation de vos coordonnées.';
        } else if (input.hasAttribute('data-required') && !value) {
          message = 'Ce champ est nécessaire pour vous répondre.';
        } else if (input.hasAttribute('data-email') && value && !emailRe.test(value)) {
          message = 'Vérifiez le format de l\u2019adresse e-mail.';
        }

        setError(input, message);
        if (message && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        status.textContent = 'Il reste une information à compléter.';
        firstInvalid.focus();
        return;
      }

      status.textContent = 'Merci ! Démonstration uniquement : aucune demande n\u2019a été envoyée.';
      contactForm.reset();
    });
  }

  /* ---------- 7. Lettre d'information (démonstration) ---------- */
  var newsForm = document.querySelector('[data-news-form]');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var newsStatus = newsForm.parentElement.querySelector('.form-status');
      var email = newsForm.querySelector('input[type="email"]');
      var value = (email.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        if (newsStatus) newsStatus.textContent = 'Merci d\u2019indiquer une adresse e-mail valide.';
        email.focus();
        return;
      }
      if (newsStatus) newsStatus.textContent = 'Démonstration uniquement : aucune inscription n\u2019a été enregistrée.';
      newsForm.reset();
    });
  }

  /* ---------- 8. Formulaire court de la page d'accueil ---------- */
  var demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var demoStatus = demoForm.querySelector('.form-status');
      var name = demoForm.querySelector('#f-name');
      var phone = demoForm.querySelector('#f-phone');
      if (!name.value.trim() || !phone.value.trim()) {
        demoStatus.textContent = 'Merci de renseigner votre nom et votre téléphone.';
        (name.value.trim() ? phone : name).focus();
        return;
      }
      demoStatus.textContent = 'Merci ! Démonstration uniquement : aucune demande n\u2019a été envoyée.';
      demoForm.reset();
    });
  }

  /* ---------- 9. Lien de navigation actif (page d'accueil) ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var href = a.getAttribute('href') || '';
          a.classList.toggle('is-current', href === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 10. Sommaire de page actif (pages longues) ---------- */
  var subnav = document.querySelector('[data-subnav]');
  if (subnav) {
    var subLinks = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
    var subTargets = subLinks
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var setCurrentTarget = function (id) {
      subLinks.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    if ('IntersectionObserver' in window && subTargets.length) {
      var subSpy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setCurrentTarget(entry.target.id);
        });
      }, { rootMargin: '-42% 0px -52% 0px' });
      subTargets.forEach(function (target) { subSpy.observe(target); });
    }
  }
})();
