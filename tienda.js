/* Catálogo y ficha de producto, mayorista y minorista (04/10/2026).
   Lee window.HTG_RUBROS y window.HTG_PRODUCTOS (productos.js). Sin precios:
   en mayorista el precio se ve solo con cuenta de cliente; en minorista se
   consulta. Cuando la tienda de PepperLabs esté online, estos links pasan a
   la categoría y la ficha de la tienda y estas páginas se retiran. */
(() => {
  const body = document.body;
  const canal = body.dataset.canal === 'minorista' ? 'minorista' : 'mayorista';
  const may = canal === 'mayorista';
  const R = window.HTG_RUBROS || {}, P = window.HTG_PRODUCTOS || [];
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const IG = 'https://ig.me/m/htgaccesorios';
  const pag = may ? { cat: 'catalogo.html', prod: 'producto.html', inicio: 'index.html' }
                  : { cat: 'minorista-catalogo.html', prod: 'minorista-producto.html', inicio: 'minorista.html' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  const CHAT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  const precioCorto = may ? `<span class="pcard-price">${LOCK}Precio para clientes</span>` : `<span class="pcard-price">${CHAT}Consultá precio</span>`;

  const card = p => `<a class="pcard" href="${pag.prod}?id=${encodeURIComponent(p.id)}">
    <span class="pcard-img"><img src="assets/productos/${esc(p.id)}.webp" alt="" width="800" height="800" loading="lazy"></span>
    <span class="pcard-body"><small>SOUL · ${esc(p.cod)}</small><b>${esc(p.n)}</b>${precioCorto}</span></a>`;

  /* ---------------------------------------------------------------- Catálogo */
  const grid = $('#shop-grid');
  if (grid) {
    const cat = params.get('categoria'), q = (params.get('q') || '').trim(), soul = params.get('marca') === 'soul';
    const rubro = cat && R[cat] ? cat : null;
    let lista = P, titulo = 'Catálogo', bajada = 'Toda la línea SOUL y más, ordenada por categoría.', miga = 'Catálogo';
    if (rubro) {
      lista = P.filter(p => p.cat === rubro); titulo = R[rubro].t; bajada = R[rubro].bajada; miga = R[rubro].t;
    } else if (q) {
      const t = norm(q).split(/\s+/).filter(Boolean);
      lista = P.filter(p => { const h = norm([p.n, p.cod, (R[p.cat] || {}).t, ...(p.r || [])].join(' ')); return t.every(x => h.includes(x)); });
      titulo = `Resultados para “${q}”`; bajada = ''; miga = 'Búsqueda';
    } else if (soul) {
      titulo = 'SOUL'; bajada = 'Somos distribuidores oficiales: estos son algunos de los productos de la línea.'; miga = 'SOUL';
    }
    document.title = `${titulo} · HTG Accesorios`;
    $('#shop-title').textContent = titulo;
    $('#shop-sub').textContent = bajada;
    $('#shop-sub').hidden = !bajada;
    $('#shop-crumb').textContent = miga;
    const search = $('.header-search input'); if (search && q) search.value = q;

    const chips = Object.entries(R).map(([k, r]) => `<a href="${pag.cat}?categoria=${k}"${k === rubro ? ' aria-current="page"' : ''}>${esc(r.t)}</a>`);
    $('#shop-cats').innerHTML = `<a href="${pag.cat}"${!rubro && !q && !soul ? ' aria-current="page"' : ''}>Todo</a>` + chips.join('');
    const activo = $('#shop-cats [aria-current]'); if (activo) activo.scrollIntoView({ block: 'nearest', inline: 'center' });

    $('#shop-count').textContent = lista.length === 1 ? '1 producto' : `${lista.length} productos`;
    if (lista.length) {
      grid.innerHTML = lista.map(card).join('');
    } else {
      grid.innerHTML = `<div class="shop-empty"><b>${rubro ? 'Todavía no cargamos estos productos en la web.' : 'No encontramos productos con esa búsqueda.'}</b>
        <p>Puede que los tengamos igual: escribinos y te decimos modelos y disponibilidad.</p>
        <a class="button button-orange" href="${IG}" target="_blank" rel="noopener">Consultar por Instagram <span aria-hidden="true">→</span></a></div>`;
    }
  }

  /* ------------------------------------------------------------------- Ficha */
  const ficha = $('#pdp');
  if (ficha) {
    const p = P.find(x => x.id === params.get('id'));
    if (!p) {
      ficha.innerHTML = `<div class="shop-empty"><h1 class="shop-empty-title">No encontramos ese producto.</h1><p>Puede que ya no esté en la web.</p><a class="button button-orange" href="${pag.cat}">Ver el catálogo <span aria-hidden="true">→</span></a></div>`;
      return;
    }
    const r = R[p.cat] || { t: '' };
    document.title = `${p.n} · HTG Accesorios`;
    $('#pdp-crumb').innerHTML = `<a href="${pag.inicio}">Inicio</a> / <a href="${pag.cat}?categoria=${p.cat}">${esc(r.t)}</a> / <span>${esc(p.n)}</span>`;
    const caja = may
      ? `<div class="pdp-price">${LOCK}<div><b>Precio mayorista</b><p>Los precios se ven con tu cuenta de cliente. Si todavía no tenés, pedí el alta: es rápido y sin compromiso.</p>
          <div class="pdp-actions"><a class="button button-orange" href="alta.html?interes=${p.cat}">Hacete cliente <span aria-hidden="true">→</span></a><a class="button button-outline-dark" href="${IG}" target="_blank" rel="noopener">Consultar por Instagram</a></div></div></div>`
      : `<div class="pdp-price">${CHAT}<div><b>Consultá precio y stock</b><p>Escribinos por Instagram y te pasamos el precio y en qué local lo tenemos. También hacemos envíos.</p>
          <div class="pdp-actions"><a class="button button-orange" href="${IG}" target="_blank" rel="noopener">Consultar por Instagram <span aria-hidden="true">→</span></a></div></div></div>`;
    ficha.innerHTML = `<div class="pdp-img"><img src="assets/productos/${esc(p.id)}.webp" alt="${esc(p.n)}" width="800" height="800"></div>
      <div class="pdp-info"><p class="pdp-brand">SOUL · Cód. ${esc(p.cod)}</p><h1>${esc(p.n)}</h1>
        <ul class="pdp-feats">${(p.r || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>${caja}
        <p class="pdp-note">${may ? 'Stock en depósito, retiro en Arana 77 o envío a todo el país.' : 'Retirá en nuestros locales de Monte Grande o recibilo en tu casa.'}</p></div>`;
    const rel = P.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    const relBox = $('#pdp-related');
    if (rel.length && relBox) {
      relBox.hidden = false;
      $('#pdp-related-title').textContent = `Más en ${r.t}`;
      $('#pdp-related-more').href = `${pag.cat}?categoria=${p.cat}`;
      $('#pdp-related-grid').innerHTML = rel.map(card).join('');
    }
  }
})();
