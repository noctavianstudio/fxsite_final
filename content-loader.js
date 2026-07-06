/**
 * FX Textile Content Loader v2
 * Reads saved content from localStorage and applies to page.
 */
(function() {
  const STORAGE_KEY = 'fxtextile_content';
  const IMG_STORAGE_KEY = 'fxtextile_images';
  const THEME_STORAGE_KEY = 'fxtextile_theme';

  function getExportedTexts() {
    return (window.FX_TEXTILE_EXPORTED_CONTENT && window.FX_TEXTILE_EXPORTED_CONTENT.texts) || {};
  }

  function getExportedImages() {
    return (window.FX_TEXTILE_EXPORTED_CONTENT && window.FX_TEXTILE_EXPORTED_CONTENT.images) || {};
  }

  function getExportedTheme() {
    return (window.FX_TEXTILE_EXPORTED_CONTENT && window.FX_TEXTILE_EXPORTED_CONTENT.theme) || {};
  }

  function applyTheme() {
    try {
      const exported = getExportedTheme();
      const raw = localStorage.getItem(THEME_STORAGE_KEY);
      const local = raw ? JSON.parse(raw) : {};
      const theme = Object.assign({}, exported, local);
      if (!Object.keys(theme).length) return;

      const root = document.documentElement;
      const vars = {
        primary: '--red',
        primaryLight: '--red-light',
        primaryDark: '--red-dark',
        black: '--black',
        offWhite: '--off-white',
        cream: '--cream',
        gray: '--gray',
        grayLight: '--gray-light',
        borderColor: '--border',
        heroOpacity: '--fx-hero-opacity',
        pageHeroOpacity: '--fx-page-hero-opacity',
        heroOverlayOpacity: '--fx-hero-overlay-opacity',
        pageHeroOverlayOpacity: '--fx-page-hero-overlay-opacity',
        sectorOverlayOpacity: '--fx-sector-overlay-opacity',
        navFontSize: '--fx-nav-font-size',
        navMobileFontSize: '--fx-nav-mobile-font-size'
      };
      Object.keys(vars).forEach(key => {
        if (theme[key]) root.style.setProperty(vars[key], theme[key]);
      });

      let style = document.getElementById('fx-theme-overrides');
      if (!style) {
        style = document.createElement('style');
        style.id = 'fx-theme-overrides';
        document.head.appendChild(style);
      }
      style.textContent = `
        .hero-bg-img{opacity:0!important}
        .hero-slide.active .hero-bg-img{opacity:var(--fx-hero-opacity,0.3)!important}
        .hero-slide.leaving .hero-bg-img{opacity:0!important}
        .page-hero img[data-img-key^="hero-"]{opacity:var(--fx-page-hero-opacity,0.2)!important}
        .contact-hero img[data-img-key^="hero-"]{opacity:var(--fx-page-hero-opacity,0.18)!important}
        .hero-grad{opacity:var(--fx-hero-overlay-opacity,1)!important}
        .page-hero-grad,.contact-hero-grad{opacity:var(--fx-page-hero-overlay-opacity,1)!important}
        .sector-overlay{background:linear-gradient(to top,rgba(10,10,10,var(--fx-sector-overlay-opacity,.8)) 30%,rgba(10,10,10,0))!important}
        .nav-links a{font-size:var(--fx-nav-font-size,11px)!important}
        body{background:var(--off-white)!important}
        nav{background:var(--off-white)!important}
        @media(max-width:600px){.nav-links{background:var(--off-white)!important}}
        @media(max-width:600px){.nav-links a{font-size:var(--fx-nav-mobile-font-size,13px)!important}}
      `;
    } catch(e) { console.warn('Theme loader:', e); }
  }

  function applyTexts() {
    try {
      const exported = getExportedTexts();
      const raw = localStorage.getItem(STORAGE_KEY);
      const local = raw ? JSON.parse(raw) : {};
      const data = Object.assign({}, exported, local);
      if (!Object.keys(data).length) return;

      document.querySelectorAll('[data-edit-key]').forEach(enSpan => {
        const key = enSpan.getAttribute('data-edit-key');
        const entry = data[key];
        if (!entry) return;

        // EN span is the element itself
        if (entry.en !== undefined) enSpan.innerHTML = entry.en;

        // TR and ES are the next siblings
        let node = enSpan.nextSibling;
        let found = 0;
        while (node && found < 4) {
          if (node.nodeType === 1) { // element node
            const lang = node.getAttribute('data-lang');
            if (lang === 'tr' && entry.tr !== undefined) {
              node.innerHTML = entry.tr;
            } else if (lang === 'es' && entry.es !== undefined) {
              node.innerHTML = entry.es;
            }
          }
          node = node.nextSibling;
          found++;
        }
      });
    } catch(e) { console.warn('Text loader:', e); }
  }

  function applyImages() {
    try {
      const exported = getExportedImages();
      const raw = localStorage.getItem(IMG_STORAGE_KEY);
      const local = raw ? JSON.parse(raw) : {};
      const data = Object.assign({}, exported, local);
      if (!Object.keys(data).length) return;

      document.querySelectorAll('[data-img-key]').forEach(img => {
        const key = img.getAttribute('data-img-key');
        if (data[key]) img.src = data[key];
      });
    } catch(e) { console.warn('Image loader:', e); }
  }

  function addAdminBar() {
    if (localStorage.getItem('fxtextile_admin_mode') !== 'true') return;
    if (document.getElementById('fx-admin-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'fx-admin-bar';
    bar.style.cssText = `
      position:fixed;bottom:0;left:0;right:0;z-index:99999;
      background:#100505;border-top:2px solid #8b1a1a;
      padding:9px 20px;display:flex;align-items:center;gap:14px;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      font-size:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.4)`;
    bar.innerHTML = `
      <span style="color:#fff;font-weight:700;letter-spacing:1px;opacity:.7">⚙ ADMIN</span>
      <span style="color:rgba(255,255,255,0.35);flex:1">Editing: <strong style="color:rgba(255,255,255,0.6)">${document.title}</strong></span>
      <a href="admin.html" style="background:#8b1a1a;color:#fff;padding:5px 14px;text-decoration:none;font-weight:600;letter-spacing:.5px">Open Admin Panel</a>
      <a href="#" style="color:rgba(255,255,255,0.4);text-decoration:none;padding:5px 10px;border:1px solid rgba(255,255,255,0.15)"
        onclick="localStorage.removeItem('fxtextile_admin_mode');location.reload();return false">Exit</a>`;
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '50px';
  }

  function applyMotion() {
    try {
      if (!document.getElementById('fx-motion-styles')) {
        const style = document.createElement('style');
        style.id = 'fx-motion-styles';
        style.textContent = `
          @media (prefers-reduced-motion:no-preference){
            .fx-reveal{opacity:0;transform:translate3d(0,64px,0) scale(.985);filter:blur(8px);transition:opacity 1.05s ease,transform 1.05s cubic-bezier(.16,.84,.24,1),filter 1.05s ease}
            .fx-reveal.fx-from-left{transform:translate3d(-52px,24px,0) scale(.985)}
            .fx-reveal.fx-from-right{transform:translate3d(52px,24px,0) scale(.985)}
            .fx-reveal.in-view{opacity:1;transform:none}
            .fx-reveal.in-view{filter:none}
            .fx-hover-lift{transition:transform .28s ease,box-shadow .28s ease}
            .fx-hover-lift:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.12)}
            .fx-image-hover{overflow:hidden}
            .fx-image-hover img{transition:transform .7s ease}
            .fx-image-hover:hover img{transform:scale(1.04)}
          }
        `;
        document.head.appendChild(style);
      }

      const revealSelector = [
        '.section-eyebrow','.section-title','.section-body','.intro-text-side','.intro-text-side p',
        '.intro-img-side','.about-img-grid div','.stats-band','.stat-item',
        '.pillar','.about-card','.mission-card','.cert-strip-left','.cbadge',
        '.sector-card','.prod-card','.pd-card','.esg-card','.memb-card',
        '.region-card','.office-card','.cert-card','.dash-card',
        '.global-intro','.map-section','.regions-section','.products-main',
        '.material-section','.spec-table-section','.contact-main','.offices',
        '.certs-main','.all-certs','.why-certs'
      ].join(',');
      document.querySelectorAll(revealSelector).forEach((el, index) => {
        el.classList.add('fx-reveal');
        if (el.matches('.intro-text-side,.section-title,.about-card,.mission-card,.prod-card,.region-card')) el.classList.add('fx-from-left');
        if (el.matches('.intro-img-side,.about-img-grid div,.sector-card,.pd-card,.office-card,.cert-card')) el.classList.add('fx-from-right');
        el.style.transitionDelay = Math.min(index % 6, 5) * 45 + 'ms';
      });

      document.querySelectorAll('.pillar,.about-card,.mission-card,.prod-card,.pd-card,.esg-card,.region-card,.office-card,.cert-card').forEach(el => el.classList.add('fx-hover-lift'));
      document.querySelectorAll('.sector-card,.intro-img-side,.about-img-grid div,.prod-img,.pd-card-img,.cert-card-img,.office-card').forEach(el => el.classList.add('fx-image-hover'));

      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fx-reveal').forEach(el => el.classList.add('in-view'));
        return;
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.fx-reveal').forEach(el => observer.observe(el));
    } catch(e) { console.warn('Motion loader:', e); }
  }

  function init() {
    applyTheme();
    applyTexts();
    applyImages();
    applyMotion();
    addAdminBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
