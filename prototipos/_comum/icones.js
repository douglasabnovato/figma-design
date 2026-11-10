/* Ícones compartilhados pelos protótipos (mesmos traços do ferramentas/svgkit.js).
   Uso: <i data-i="nome"></i> e window.pintarIcones(raiz). */
(() => {
  const I = {
    grid: 'M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM8 8h5v5H8z', home: 'M1 6.5L7 1l6 5.5V13H9V9H5v4H1z',
    store: 'M1 5l1.5-4h9L13 5M1 5h12v8H1zM5 13V9h4v4', bag: 'M2 4h10l-1 9H3zM5 4a2 2 0 0 1 4 0',
    chart: 'M1 1v12h12M4 9l3-3 2 2 4-4', file: 'M3 1h6l3 3v9H3zM9 1v3h3',
    users: 'M5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM1 13c0-2.5 2-4 4-4s4 1.5 4 4M9.5 1.3a2.5 2.5 0 0 1 0 4.4M11 9.2c1.3.5 2 1.8 2 3.8',
    box: 'M7 1l6 3v6l-6 3-6-3V4zM1 4l6 3 6-3M7 7v6',
    gear: 'M7 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM7 .5v2M7 11.5v2M.5 7h2M11.5 7h2M2.4 2.4l1.4 1.4M10.2 10.2l1.4 1.4M2.4 11.6l1.4-1.4M10.2 3.8l1.4-1.4',
    plug: 'M5 1v3M9 1v3M3 4h8v3a4 4 0 0 1-8 0zM7 11v2', gift: 'M1 5h12v3H1zM2 8h10v5H2zM7 5v8M7 5C5 1 3 3 4.5 5M7 5c2-4 4-2 2.5 0',
    wallet: 'M1 4h12v9H1zM1 4l9-3v3M10 8.5h1', cart: 'M1 1h2l2 8h7l1-5H4M6 12.5h.1M11 12.5h.1',
    hook: 'M5 4a2 2 0 1 1 3 1.7L10 9M4 12a2 2 0 1 1 1-3.7h5M12 12a2 2 0 1 1-1-3.7',
    link: 'M6 8l2-2M5 6L3.5 7.5a2 2 0 0 0 3 3L8 9M9 8l1.5-1.5a2 2 0 0 0-3-3L6 5',
    pct: 'M2 12L12 2M3.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    code: 'M4.5 3L1 7l3.5 4M9.5 3L13 7l-3.5 4', mega: 'M1 5h2l7-3v10L3 9H1zM3 9l1 4h2l-1-4',
    dollar: 'M7 1v12M10 3.5C9.5 2.5 8.4 2 7 2 5.3 2 4 2.9 4 4.3c0 3.2 6 1.8 6 5 0 1.5-1.3 2.7-3 2.7-1.5 0-2.7-.6-3.2-1.7',
    ticket: 'M1 4h12v2a1 1 0 0 0 0 2v2H1V8a1 1 0 0 0 0-2zM9 4v6', check: 'M2 7.5l3 3 7-7',
    card: 'M1 3h12v8H1zM1 6h12', pix: 'M7 1l6 6-6 6-6-6zM4.5 7h5', barcode: 'M2 3v8M4 3v8M5.5 3v8M8 3v8M10 3v8M12 3v8',
    chevD: 'M3 5l4 4 4-4', chevR: 'M5 3l4 4-4 4', chevL: 'M9 3L5 7l4 4', chevUD: 'M4 5l3-3 3 3M4 9l3 3 3-3',
    panel: 'M1 1h12v12H1zM5 1v12',
    sun: 'M7 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM7 .5V2M7 12v1.5M.5 7H2M12 7h1.5M2.4 2.4l1 1M10.6 10.6l1 1M2.4 11.6l1-1M10.6 3.4l1-1',
    moon: 'M12 8.5A5.5 5.5 0 1 1 5.5 2 4.5 4.5 0 0 0 12 8.5z', user: 'M7 6.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zM1.5 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5',
    eye: 'M1 7s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4zM7 8.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z', eyeOff: 'M1 7s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4zM2 2l10 10',
    warn: 'M7 1.5L13 12.5H1zM7 5.5v3M7 10.5h.01', info: 'M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 6.5v3.5M7 4.5h.01',
    search: 'M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zM10 10l3 3', cal: 'M1 3h12v10H1zM1 6h12M4 1v3M10 1v3',
    ext: 'M8 1h5v5M13 1L6 8M11 9v4H1V3h4', x: 'M3 3l8 8M11 3l-8 8', logout: 'M5 1H1v12h4M9 4l3 3-3 3M12 7H5',
    trophy: 'M4 1h6v4a3 3 0 0 1-6 0zM4 2H1.5a2.5 2.5 0 0 0 2.6 3M10 2h2.5a2.5 2.5 0 0 1-2.6 3M7 8v3M4.5 13h5',
    arrowUp: 'M7 12V2M3 6l4-4 4 4', arrowDown: 'M7 2v10M3 8l4 4 4-4',
    undo: 'M4 5H9a3.5 3.5 0 0 1 0 7H5M4 5l2.5-2.5M4 5l2.5 2.5', receipt: 'M2 1h10v12l-2-1.5L8 13l-1-1-1 1-2-1.5L2 13zM4.5 4.5h5M4.5 7h5',
    lock: 'M3 6h8v7H3zM4.5 6V4a2.5 2.5 0 0 1 5 0v2', clock: 'M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 3.5V7l2.5 1.5',
    plus: 'M7 2v10M2 7h10', rocket: 'M8.5 1.5C11 1.5 12.5 3 12.5 5.5L8 10 4 6zM4 6L1.5 6.5 3 4.5h3M8 10l-.5 2.5 2-1.5V8M3.5 9.5L1.5 12.5l3-2',
    bell: 'M3 10V6a4 4 0 0 1 8 0v4l1.5 1.5h-11zM5.5 12.5a1.5 1.5 0 0 0 3 0', doc: 'M3 1h8v12H3zM5 4h4M5 6.5h4M5 9h2.5',
    bank: 'M1 5L7 1.5 13 5zM2 5v6M5 5v6M9 5v6M12 5v6M1 12.5h12', shield: 'M7 1l5.5 2v4c0 3-2.5 5.3-5.5 6-3-.7-5.5-3-5.5-6V3z',
    copy: 'M4 4h8v9H4zM2 10V1h7',
  };
  window.ICONES = I;
  window.pintarIcones = (root = document) => root.querySelectorAll('i[data-i]').forEach(el => {
    const d = I[el.dataset.i];
    if (d) el.innerHTML = `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  });
  window.escHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
})();
