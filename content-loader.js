/**
 * FX Textile Content Loader v2
 * Reads saved content from localStorage and applies to page.
 */
(function() {
  const STORAGE_KEY = 'fxtextile_content';
  const IMG_STORAGE_KEY = 'fxtextile_images';

  function getExportedTexts() {
    return (window.FX_TEXTILE_EXPORTED_CONTENT && window.FX_TEXTILE_EXPORTED_CONTENT.texts) || {};
  }

  function getExportedImages() {
    return (window.FX_TEXTILE_EXPORTED_CONTENT && window.FX_TEXTILE_EXPORTED_CONTENT.images) || {};
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

  function init() {
    applyTexts();
    applyImages();
    addAdminBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
