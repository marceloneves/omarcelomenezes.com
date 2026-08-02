/* ==========================================================================
   omarcelomenezes.com — main.js
   Vanilla JS. Sem dependências.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Tema: localStorage > preferência do sistema ---------------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');

  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* modo privado */ }
  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        // Sem escolha explícita ainda: inverte o que o sistema está mostrando.
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignora */ }
    });
  }

  /* --- Aviso de privacidade --------------------------------------------
     Não é banner de consentimento: o site não usa cookie nem coleta dado,
     então não há o que consentir. É só o aviso, dispensável uma vez.     */
  var notice = document.getElementById('privacy-notice');
  if (notice) {
    var seen = null;
    try { seen = localStorage.getItem('privacy-notice'); } catch (e) { /* modo privado */ }
    if (seen !== 'dismissed') {
      window.setTimeout(function () { notice.classList.add('is-visible'); }, 900);
    }
    var dismiss = document.getElementById('privacy-notice-close');
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        notice.classList.remove('is-visible');
        try { localStorage.setItem('privacy-notice', 'dismissed'); } catch (e) { /* ignora */ }
      });
    }
  }

  /* --- Formulário de contato -------------------------------------------
     Não há backend: os campos viram uma mensagem de WhatsApp, que o
     visitante revisa e envia. Nenhum dado sai daqui por conta própria. */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = document.getElementById('cf-error');
      var val = function (id) { return (document.getElementById(id).value || '').trim(); };

      var nome = val('cf-nome');
      var msg = val('cf-msg');
      if (!nome || !msg) {
        if (err) err.hidden = false;
        (nome ? document.getElementById('cf-msg') : document.getElementById('cf-nome')).focus();
        return;
      }
      if (err) err.hidden = true;

      var site = val('cf-site');
      var servico = val('cf-servico');

      var linhas = ['Oi Marcelo, vim pelo site.', '', 'Nome: ' + nome];
      if (site) linhas.push('Site: ' + site);
      if (servico) linhas.push('Procuro: ' + servico);
      linhas.push('', msg);

      window.open('https://wa.me/5548988105199?text=' +
        encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
    });
  }

  /* --- Menu mobile ------------------------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    navToggle.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* --- Header: sombra ao rolar + estado do link "Início" ----------------- */
  var header = document.querySelector('.site-header');
  var homeLink = document.querySelector('.nav a[href="#top"]');
  var TOP_ZONE = 240; // acima disso, "Início" é a seção corrente

  function atTop() { return window.scrollY < TOP_ZONE; }

  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
    if (!homeLink) return;
    var top = atTop();
    homeLink.classList.toggle('is-active', top);
    if (top) {
      document.querySelectorAll('.nav a:not([href="#top"])').forEach(function (link) {
        link.classList.remove('is-active');
      });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal ao entrar na viewport ------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add('is-visible'); }, i * 70);
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* --- Contadores das estatísticas -------------------------------------- */
  var counters = document.querySelectorAll('.stat-num');

  function runCounter(el) {
    var target = parseFloat(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || '';

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1200;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(runCounter);
  } else {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* --- Rotator do hero --------------------------------------------------- */
  var rotatorItems = document.querySelectorAll('.rotator-item');
  if (rotatorItems.length > 1 && !reduceMotion) {
    var idx = 0;
    setInterval(function () {
      rotatorItems[idx].classList.remove('is-active');
      idx = (idx + 1) % rotatorItems.length;
      rotatorItems[idx].classList.add('is-active');
    }, 2600);
  }

  /* --- Acordeão: só um item aberto por vez ------------------------------- */
  var accItems = document.querySelectorAll('.acc-item');
  accItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      accItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* --- Link ativo na navegação ------------------------------------------ */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* --- Ano no rodapé ----------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
