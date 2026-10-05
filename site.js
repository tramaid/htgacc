(() => {
  window.__htgReady = true;
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* Canales de contacto. Instagram está confirmado; el WhatsApp central se
     completa cuando HTG lo pase (formato internacional: 5491112345678). */
  const CONTACTO = { instagram: 'htgaccesorios', whatsapp: '5491179009784', email: 'htg.facturacion@gmail.com' }; // correo provisorio hasta tener uno con el dominio

  /* ---- Motor de movimiento (motor TRAMA recortado) --------------------------
     Un solo requestAnimationFrame para todo lo continuo. A diferencia del motor
     del catálogo, se apaga cuando la página deja de moverse. */
  const Motion = (() => {
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const subs = new Set();
    let raf = 0, lastY = scrollY, vel = 0, lastMove = 0;
    function frame(now) {
      const y = scrollY;
      vel += (clamp((y - lastY) / 42, -1, 1) - vel) * .22;
      lastY = y;
      for (const fn of subs) fn({ y, vel });
      if (now - lastMove > 260 && Math.abs(vel) < .005) { raf = 0; vel = 0; return; }
      raf = requestAnimationFrame(frame);
    }
    addEventListener('scroll', () => {
      lastMove = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
    const onTick = fn => { subs.add(fn); return () => subs.delete(fn); };

    /* Reveal de disparo único: un observer para todo el documento. */
    function revealOnce(stagger = 80) {
      $$('[data-stagger]').forEach(box =>
        $$('.reveal', box).forEach((el, i) => el.style.setProperty('--d', Math.min(i * stagger, 480) + 'ms')));
      $$('.reveal[data-d]').forEach(el => el.style.setProperty('--d', el.dataset.d + 'ms'));
      const els = $$('.reveal');
      if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }), { threshold: .01, rootMargin: '0px 0px -6% 0px' });
      els.forEach(e => io.observe(e));
    }
    return { onTick, revealOnce };
  })();

  /* ---- Header: menú, búsqueda y barra que se esconde al bajar -------------- */
  const header = $('.site-header');
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  const menuOpen = () => nav?.classList.contains('open');
  /* Velo detrás del menú: un toque afuera cierra el menú sin activar lo que hay debajo. */
  const scrim = document.createElement('div');
  scrim.className = 'nav-scrim'; scrim.hidden = true;
  document.body.append(scrim);
  scrim.addEventListener('click', () => setMenu(false));
  function setMenu(open, focusToggle) {
    if (!menu || !nav) return;
    scrim.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
    if (open) $('a', nav)?.focus({ preventScroll: true });
    else if (focusToggle) menu.focus();
  }
  menu?.addEventListener('click', () => setMenu(!menuOpen()));
  nav && $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen()) setMenu(false, true); });
  matchMedia('(min-width: 1121px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  $$('.header-search').forEach(form => {
    const input = $('input', form);
    $('button', form).addEventListener('click', e => {
      if (matchMedia('(max-width: 700px)').matches && document.activeElement !== input && !input.value.trim()) {
        e.preventDefault(); form.classList.add('search-open'); input.focus();
      }
    });
    input.addEventListener('blur', () => { if (!input.value) form.classList.remove('search-open'); });
    form.addEventListener('submit', e => { if (!input.value.trim()) { e.preventDefault(); input.focus(); } });
  });

  if (header) {
    let hidden = false;
    const setHidden = v => { if (v !== hidden) { hidden = v; header.classList.toggle('is-hidden', v); } };
    Motion.onTick(({ y, vel }) => {
      header.classList.toggle('is-scrolled', y > 8);
      if (reduce.matches || menuOpen() || header.contains(document.activeElement) || y < 160) return setHidden(false);
      if (vel > .06) setHidden(true);
      else if (vel < -.06) setHidden(false);
    });
    header.addEventListener('focusin', () => setHidden(false));
  }

  /* ---- Hero: el local prende las luces ------------------------------------- */
  const hero = $('.hero');
  if (hero) {
    const start = () => requestAnimationFrame(() => hero.classList.add('is-in'));
    const fonts = document.fonts?.ready;
    fonts ? Promise.race([fonts, new Promise(r => setTimeout(r, 700))]).then(start) : start();
  }

  Motion.revealOnce();

  /* ---- Minorista: diapositivas del hero ------------------------------------ */
  const mHero = $('.m-hero');
  if (mHero) {
    const slides = $$('.m-slide', mHero), dots = $$('.m-dots button', mHero);
    let cur = slides.findIndex(s => s.classList.contains('is-active'));
    function go(i, focusDot) {
      i = (i + slides.length) % slides.length;
      if (i === cur) return;
      slides[cur].classList.remove('is-active'); slides[cur].inert = true;
      slides[i].classList.add('is-active'); slides[i].inert = false;
      dots.forEach((d, k) => d.setAttribute('aria-pressed', String(k === i)));
      mHero.classList.toggle('is-dark', slides[i].classList.contains('m-slide--dark'));
      cur = i;
      if (focusDot) dots[i].focus();
    }
    dots.forEach((d, k) => {
      d.addEventListener('click', () => go(k));
      d.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1, true); }
      });
    });
    /* Deslizar con el dedo: decide con un umbral, no sigue al dedo. */
    let sx = null, sy = 0;
    mHero.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; } });
    mHero.addEventListener('pointerup', e => {
      if (sx === null) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1));
    });
    mHero.addEventListener('pointercancel', () => { sx = null; });
  }

  /* ---- Marquesina de marcas: botón de pausa (WCAG 2.2.2) ------------------- */
  $$('.marquee-toggle').forEach(btn => {
    const marquee = btn.closest('section').querySelector('[data-marquee]');
    btn.addEventListener('click', () => {
      const paused = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', paused);
      btn.setAttribute('aria-label', paused ? 'Reanudar la cinta de marcas' : 'Pausar la cinta de marcas');
      marquee.classList.toggle('is-paused', paused);
    });
  });

  /* ---- Alta: validación en línea y mensaje listo para mandar --------------- */
  const interest = $('#interes');
  if (interest) {
    const initial = new URLSearchParams(location.search).get('interes');
    if ([...interest.options].some(o => o.value === initial)) interest.value = initial;
  }
  const signup = $('#signup-form');
  if (signup) {
    const MSG = {
      nombre: { valueMissing: 'Escribí tu nombre y apellido.', tooShort: 'Escribí tu nombre y apellido.' },
      negocio: { valueMissing: 'Contanos cómo se llama tu negocio.' },
      email: { valueMissing: 'Necesitamos un correo para responderte.', typeMismatch: 'Revisá el correo: falta la @ o el dominio.' },
      telefono: { valueMissing: 'Dejanos un teléfono con código de área.', patternMismatch: 'Usá solo números, con código de área (mínimo 8 dígitos).' },
    };
    const errorFor = f => {
      const v = f.validity, m = MSG[f.name] || {}, val = f.value.trim();
      for (const k of ['valueMissing', 'typeMismatch', 'tooShort']) if (v[k]) return m[k] || 'Revisá este dato.';
      if (f.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return m.typeMismatch;
      if (f.name === 'telefono' && (/[^0-9 +()-]/.test(val) || val.replace(/\D/g, '').length < 8)) return m.patternMismatch;
      if (f.name === 'nombre' && val.length < 2) return m.tooShort;
      return '';
    };
    const show = (f, msg) => {
      const out = $('#e-' + f.name);
      f.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (out) out.textContent = msg;
    };
    const fields = $$('input[required]', signup);
    fields.forEach(f => {
      f.addEventListener('blur', () => { if (f.value) show(f, errorFor(f)); });
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') show(f, errorFor(f)); });
    });

    const done = $('#signup-done');
    const output = $('#signup-message');
    const status = $('#form-message');
    const igLink = $('#send-instagram');
    const waLink = $('#send-whatsapp');
    const dl = $('#download-request');
    if (igLink) igLink.href = `https://ig.me/m/${CONTACTO.instagram}`;
    if (waLink && !CONTACTO.whatsapp) waLink.hidden = true;

    async function copy(text) {
      try { await navigator.clipboard.writeText(text); return true; } catch {}
      try { output.select(); return document.execCommand('copy'); } catch { return false; }
    }

    signup.addEventListener('submit', async e => {
      e.preventDefault();
      let first = null;
      fields.forEach(f => { const m = errorFor(f); show(f, m); if (m && !first) first = f; });
      if (first) {
        status.textContent = 'Revisá los campos marcados.';
        first.focus();
        return;
      }
      const d = new FormData(signup);
      const rubro = interest && interest.value ? interest.selectedOptions[0].textContent : 'Sin especificar';
      const text = [
        'Hola HTG, quiero darme de alta como cliente mayorista.', '',
        `Nombre: ${d.get('nombre').trim()}`, `Negocio: ${d.get('negocio').trim()}`,
        `Correo: ${d.get('email').trim()}`, `Teléfono: ${d.get('telefono').trim()}`,
        `Rubro de interés: ${rubro}`,
        ...(d.get('mensaje').trim() ? ['', `Consulta: ${d.get('mensaje').trim()}`] : []),
      ].join('\n');
      output.value = text;
      if (waLink && CONTACTO.whatsapp) waLink.href = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(text)}`;
      if (dl) {
        URL.revokeObjectURL(dl.href);
        dl.href = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      }
      signup.hidden = true;
      done.hidden = false;
      const copied = await copy(text);
      $('#signup-done-lead').textContent = copied
        ? 'Tu mensaje ya está copiado. Abrí el chat de Instagram, pegalo y envialo.'
        : 'Copiá el mensaje del recuadro, abrí el chat de Instagram, pegalo y envialo.';
      $('h2', done).focus();
    });

    $('#signup-edit')?.addEventListener('click', () => {
      done.hidden = true;
      signup.hidden = false;
      status.textContent = '';
      $('input', signup).focus();
    });
    $('#copy-again')?.addEventListener('click', async e => {
      const ok = await copy(output.value);
      e.currentTarget.textContent = ok ? 'Copiado' : 'Seleccioná y copiá el texto';
    });
  }

  /* ---- Botón de arrepentimiento: código de gestión en el momento ------------ */
  const arrep = $('#arrep-form');
  if (arrep) {
    const AMSG = {
      nombre: 'Escribí tu nombre y apellido.', email: 'Necesitamos un correo válido para responderte.',
      telefono: 'Dejanos un teléfono con código de área.', fecha: 'Indicá la fecha en que recibiste el producto.',
      producto: 'Contanos qué producto compraste.',
    };
    const req = $$('[required]', arrep);
    const err = f => {
      const v = f.value.trim();
      if (!v) return AMSG[f.name];
      if (f.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return AMSG.email;
      if (f.name === 'telefono' && v.replace(/\D/g, '').length < 8) return AMSG.telefono;
      return '';
    };
    const mark = (f, msg) => { f.setAttribute('aria-invalid', msg ? 'true' : 'false'); const o = $('#ae-' + f.name); if (o) o.textContent = msg; };
    req.forEach(f => f.addEventListener('blur', () => { if (f.value) mark(f, err(f)); }));
    arrep.addEventListener('submit', async e => {
      e.preventDefault();
      let first = null;
      req.forEach(f => { const m = err(f); mark(f, m); if (m && !first) first = f; });
      if (first) { $('#arrep-status').textContent = 'Revisá los campos marcados.'; first.focus(); return; }
      const d = new FormData(arrep), now = new Date();
      const p2 = n => String(n).padStart(2, '0');
      const code = 'HTG-ARR-' + String(now.getFullYear()).slice(2) + p2(now.getMonth() + 1) + p2(now.getDate()) + '-' +
        Array.from(crypto.getRandomValues(new Uint8Array(3)), b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const text = [
        'Solicitud de arrepentimiento de compra (Ley 24.240, art. 34)', 'Código de gestión: ' + code,
        'Fecha de la solicitud: ' + now.toLocaleString('es-AR'), '',
        'Nombre: ' + d.get('nombre').trim(), 'Correo: ' + d.get('email').trim(), 'Teléfono: ' + d.get('telefono').trim(),
        'Producto: ' + d.get('producto').trim(), 'Recibido el: ' + d.get('fecha'),
        ...(d.get('comprobante').trim() ? ['Comprobante o pedido: ' + d.get('comprobante').trim()] : []),
        ...(d.get('motivo').trim() ? ['Motivo: ' + d.get('motivo').trim()] : []),
      ].join('\n');
      $('#arrep-code').textContent = code;
      $('#arrep-message').value = text;
      const mail = $('#arrep-mail'), wa = $('#arrep-whatsapp'), dl = $('#arrep-download');
      if (CONTACTO.email) { mail.href = 'mailto:' + CONTACTO.email + '?subject=' + encodeURIComponent('Arrepentimiento ' + code) + '&body=' + encodeURIComponent(text); mail.hidden = false; }
      if (CONTACTO.whatsapp) { wa.href = 'https://wa.me/' + CONTACTO.whatsapp + '?text=' + encodeURIComponent(text); wa.hidden = false; }
      URL.revokeObjectURL(dl.href);
      dl.href = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      arrep.hidden = true;
      $('#arrep-done').hidden = false;
      try { await navigator.clipboard.writeText(text); $('#arrep-lead').textContent = 'Guardalo. La solicitud ya está copiada: mandánosla por alguno de estos medios para que la recibamos y coordinemos la devolución.'; } catch {}
      $('#arrep-done h2').focus();
    });
    $('#arrep-copy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText($('#arrep-message').value); $('#arrep-copy').textContent = 'Copiada'; } catch { $('#arrep-message').select(); }
    });
  }
})();
