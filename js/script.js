    (() => {
      'use strict';
      const $  = (s, c = document) => c.querySelector(s);
      const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

      const nav = $('#nav');
      const onScroll = () => {
        if (!nav) return;
        if (window.scrollY > 24) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      const burger = $('#burger');
      const mobileMenu = $('#mobileMenu');
      if (burger && mobileMenu) {
        const setOpen = (open) => {
          burger.classList.toggle('is-open', open);
          mobileMenu.classList.toggle('is-open', open);
          mobileMenu.setAttribute('aria-hidden', String(!open));
          document.body.style.overflow = open ? 'hidden' : '';
        };
        burger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      }

      const reveals = $$('.reveal');
      const showAll = () => reveals.forEach((el) => el.classList.add('is-in'));
      if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const explicit = el.getAttribute('data-reveal-delay');
            if (explicit) el.style.setProperty('--reveal-delay', explicit + 'ms');
            el.classList.add('is-in');
            io.unobserve(el);
          });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        reveals.forEach((el) => io.observe(el));
        setTimeout(showAll, 1500);
      } else {
        showAll();
      }

      const fadeIns = $$('.animate-fade-in');
      const showFades = () => fadeIns.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; el.style.animation = 'none'; });
      setTimeout(showFades, 800);

      const toggleBtns = $$('.toggle__btn');
      const plansHourly = $('#plansHourly');
      const plansMonthly = $('#plansMonthly');
      if (toggleBtns.length && plansHourly && plansMonthly) {
        toggleBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            toggleBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const bill = btn.getAttribute('data-bill');
            if (bill === 'monthly') {
              plansHourly.classList.add('is-hidden');
              plansMonthly.classList.remove('is-hidden');
            } else {
              plansMonthly.classList.add('is-hidden');
              plansHourly.classList.remove('is-hidden');
            }
          });
        });
      }

      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      });
    })();