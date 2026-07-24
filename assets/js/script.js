/* ── Mourning mode (site-wide grayscale) ───────────
   Set MOURNING_DEFAULT = true to turn the whole site grayscale
   for ALL visitors (then deploy). The admin switch sets the
   'pds_mourning' key in localStorage, which overrides the default
   on that browser. Runs on every page (script.js is loaded everywhere). */
const MOURNING_DEFAULT = false;
function setMourning(on) {
  document.documentElement.classList.toggle('mourning', on);
  const apply = () => { if (document.body) document.body.style.filter = on ? 'grayscale(100%)' : ''; };
  if (document.body) apply();
  else document.addEventListener('DOMContentLoaded', apply);
}
(function applyMourningEarly() {
  setMourning(MOURNING_DEFAULT);
})();

/* ── Year ──────────────────────────────────────── */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ── Active nav link ───────────────────────────── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(l => {
  const href = l.getAttribute('href');
  l.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
});
if (page === 'news.html') {
  const curHash = location.hash || '#pr-activities';
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const subs = item.querySelectorAll('.nav-dropdown-link[href^="news.html"]');
    if (!subs.length) return;
    item.querySelector('.nav-link-toggle')?.classList.add('active');
    subs.forEach(s => s.classList.toggle('active', s.getAttribute('href') === 'news.html' + curHash));
  });
}

/* ── Hamburger ─────────────────────────────────── */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');
burger?.addEventListener('click', () => {
  const o = nav.classList.toggle('open');
  burger.classList.toggle('open', o);
  burger.setAttribute('aria-expanded', String(o));
});
document.addEventListener('click', e => {
  if (!document.querySelector('.navbar')?.contains(e.target)) {
    nav?.classList.remove('open'); burger?.classList.remove('open');
    document.querySelectorAll('.nav-item.has-dropdown.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.nav-link-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }
});

/* ── Dropdown submenus (accordion on mobile) ───── */
const mqNavMobile = window.matchMedia('(max-width: 860px)');
document.querySelectorAll('.nav-item.has-dropdown > .nav-link-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    if (!mqNavMobile.matches) return;          // desktop → follow the link (hover opens panel)
    e.preventDefault();
    const item = toggle.closest('.nav-item');
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.nav-item.has-dropdown.open').forEach(i => {
      if (i !== item) {
        i.classList.remove('open');
        i.querySelector('.nav-link-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
});

/* ── Reveal ────────────────────────────────────── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); ro.unobserve(en.target); } });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── Count-up ──────────────────────────────────── */
const co = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target; const n = parseInt(el.dataset.count, 10);
    if (isNaN(n)) return;
    const t0 = performance.now();
    const tick = now => { const p = Math.min((now-t0)/1100,1); el.textContent = Math.round((1-Math.pow(1-p,3))*n); if(p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    co.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

/* ── Navbar shadow ─────────────────────────────── */
const nb = document.querySelector('.navbar');
window.addEventListener('scroll', () => nb?.classList.toggle('scrolled', scrollY > 8), { passive: true });

/* ── HERO SLIDER ───────────────────────────────── */
function initSlider() {
  const track  = document.getElementById('sliderTrack');
  const dots   = document.getElementById('sliderDots');
  const prev   = document.getElementById('sliderPrev');
  const next   = document.getElementById('sliderNext');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  let cur = 0, timer, total = slides.length;

  function goTo(i) {
    cur = (i + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots?.querySelectorAll('.slider-dot').forEach((d,j) => d.classList.toggle('active', j === cur));
  }

  function startAuto() { timer = setInterval(() => goTo(cur + 1), 5000); }
  function stopAuto()  { clearInterval(timer); }

  prev?.addEventListener('click', () => { stopAuto(); goTo(cur - 1); startAuto(); });
  next?.addEventListener('click', () => { stopAuto(); goTo(cur + 1); startAuto(); });

  dots?.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  /* touch swipe */
  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { stopAuto(); goTo(dx < 0 ? cur + 1 : cur - 1); startAuto(); }
  });

  goTo(0);
  startAuto();
}

/* ── i18n helpers for CMS-driven renderers ─────── */
/* pick obj.field / obj.field_en depending on current language */
function cmsL(obj, field) {
  return (window.i18n && window.i18n.pick) ? window.i18n.pick(obj, field)
                                           : (obj && obj[field] != null ? obj[field] : '');
}
/* look up a static i18n dictionary string with fallback */
function cmsT(key, fallback) {
  try { const v = window.i18n.T[window.i18n.getLang()][key]; return v != null ? v : fallback; }
  catch (e) { return fallback; }
}
/* teacher-name romanisation (TH → EN), used by the curriculum renderer */
const TEACHER_EN = {
  'อ.เสกสรรค์': 'T. Seksan',  'อ.ปรเมษฐ์': 'T. Poramet',   'อ.ปริยากร': 'T. Pariyakorn',
  'อ.กิตติศักดิ์': 'T. Kittisak', 'อ.ณภัสวรรก์': 'T. Napatsawan', 'อ.อภิรัฐ': 'T. Apirat',
  'อ.กรวิชญ์': 'T. Korawit',  'อ.ดิเรก': 'T. Direk',       'อ.กิตติญา': 'T. Kittiya'
};
function teacherL(name) {
  if (!name || !name.trim()) return cmsT('curr.teacher.tbd', '—');
  if (!window.i18n || window.i18n.getLang() !== 'en') return name;
  return name.split(',').map(s => { const t = s.trim(); return TEACHER_EN[t] || t; }).join(', ');
}
function semL(sem) {
  if (!sem) return '';
  return sem.replace('เทอม', cmsT('curr.sem.word', 'เทอม'));
}

/* ── Department icon grid (index.html) — re-runnable ── */
function renderDeptGrid() {
  if (typeof CMS === 'undefined') return;
  const deptGrid = document.getElementById('deptGrid');
  if (!deptGrid) return;
  const DEPT_COLOR = {
    AI:      { bg: '#E8F0FF', fg: '#4475D8' },
    DMT:     { bg: '#EEE8FF', fg: '#7848C8' },
    DRONE:   { bg: '#E0F5FF', fg: '#2888B8' },
    ROBOT:   { bg: '#FFF2E8', fg: '#C86828' },
    ESPORTS: { bg: '#E8FFF2', fg: '#28A058' },
    CODING:  { bg: '#ECEEFF', fg: '#4050C8' },
    CG:      { bg: '#FFE8F5', fg: '#C84078' },
    COMSCI:  { bg: '#E8FFF8', fg: '#1898A0' },
    'D&T':   { bg: '#FFF8E8', fg: '#B88018' }
  };
  const depts = CMS.getDepts();
  const mkCard = (d, i) => {
    const c = DEPT_COLOR[d.code] || { bg: '#F0EBFF', fg: '#6040B8' };
    const name = cmsL(d, 'name');
    const visualInner = d.image
      ? `<img src="${d.image}" alt="${name}" loading="lazy">`
      : getDeptIcon(d.code);
    const visualStyle = d.image ? `background:${c.bg}` : `background:${c.bg};color:${c.fg}`;
    return `<a class="dept-icon-card reveal" style="--i:${i+1}" href="curriculum.html">
      <div class="dept-icon-visual" style="${visualStyle}">${visualInner}</div>
      <div class="dept-icon-body">
        <span class="dept-icon-name">${name}</span>
        <p class="dept-icon-desc">${cmsL(d, 'desc')}</p>
      </div>
    </a>`;
  };
  deptGrid.innerHTML = `
    <div class="dept-icon-row dept-icon-row-5">${depts.slice(0,5).map((d,i)=>mkCard(d,i)).join('')}</div>
    <div class="dept-icon-row dept-icon-row-4">${depts.slice(5).map((d,i)=>mkCard(d,i+5)).join('')}</div>`;
  deptGrid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

/* ── CMS-POWERED RENDER (index.html) ───────────── */
function renderIndexFromCMS() {
  if (typeof CMS === 'undefined') return;

  /* --- slider --- */
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots  = document.getElementById('sliderDots');
  if (sliderTrack && sliderDots) {
    const slides = CMS.getSlider();
    sliderTrack.innerHTML = slides.map(s => `
      <div class="slide">
        <div class="slide-bg ${s.image ? '' : s.bg}" ${s.image ? `style="background-image:url('${s.image}')"` : ''}></div>
      </div>`).join('');
    sliderDots.innerHTML = slides.map((_,i) => `<div class="slider-dot${i===0?' active':''}"></div>`).join('');
    initSlider();
  }

  /* --- site info --- */
  const site = CMS.getSite();
  document.querySelectorAll('[data-cms="philosophy"]').forEach(el => el.textContent = site.philosophy);
  document.querySelectorAll('[data-cms="vision"]').forEach(el => el.textContent = site.vision);

  /* --- departments (pastel icon grid — 5 + 4) --- */
  renderDeptGrid();

  /* --- news cards (Facebook API or manual) --- */
  const newsGrid = document.getElementById('newsGrid');
  if (newsGrid) {
    const site      = CMS.getSite();
    const FB_PROXY  = 'https://pds-occ-fb-proxy-owe6.onrender.com';
    const fbApiUrl  = (site.fb_api_url || FB_PROXY).replace(/\/$/, '');

    // Show loading state
    newsGrid.innerHTML = `<div class="news-loading" style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:260px;gap:12px">
      <div class="news-loading-dots"><span></span><span></span><span></span></div>
      <p style="margin:0;color:rgba(255,255,255,.65);font-size:.9rem">${cmsT('index.news.loading','กำลังโหลดข่าวสารจาก Facebook…')}</p>
    </div>`;

    // Use AbortController with 50s timeout to survive Render cold-start (~30s)
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 50000);

    // Fetch extra posts so we can prefer ones with images (status updates often have none)
    fetch(`${fbApiUrl}/api/posts?limit=12`, { signal: ctrl.signal })
      .then(r => { clearTimeout(tid); return r.json(); })
      .then(data => {
        if (!data.posts || !data.posts.length) throw new Error('empty');
        const withImg = data.posts.filter(p => p.image);
        const chosen = (withImg.length >= 4 ? withImg : [...withImg, ...data.posts.filter(p => !p.image)])
          .filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)
          .slice(0, 4);
        window.__pdsNewsPosts = chosen.length ? chosen : data.posts.slice(0, 4);
        paintIndexNews(window.__pdsNewsPosts);
      })
      .catch(() => {
        clearTimeout(tid);
        window.__pdsNewsPosts = null;
        renderManualNewsCards(newsGrid);
      });
  }

  /* --- activity cards (manual, from CMS) --- */
  const activityGrid = document.getElementById('activityGrid');
  if (activityGrid) renderManualNewsCards(activityGrid, CMS.getActivities(), 4, { fullImage: true, useDetail: true });
}

/* paint live Facebook posts into #newsGrid — re-runnable on language switch */
function paintIndexNews(posts) {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid || !posts) return;
  const FB_ICON = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="opacity:.8;vertical-align:middle;margin-right:4px"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>`;
  const ARROW_SVG = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const fbCat    = cmsT('index.news.fbcat', 'Facebook · กลุ่มสาระเทคโนโลยี');
  const readMore = cmsT('index.news.readmore', 'อ่านเพิ่มเติม');
  const placeholderTitle = cmsT('index.news.placeholder.title', 'รอข่าวถัดไป');
  const placeholderDesc  = cmsT('index.news.placeholder.desc', 'กำลังรออัปเดตโพสต์ล่าสุดจาก Facebook');
  const livePosts = posts.slice(0, 4);
  const placeholders = Array.from({ length: Math.max(0, 4 - livePosts.length) });
  const cssUrl = (u) => String(u).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  const liveCards = livePosts.map((p, i) => {
    const imgStyle = p.image
      ? `background-image:url('${cssUrl(p.image)}');background-size:cover;background-position:center`
      : '';
    return `
      <a class="news-img-card reveal" style="--i:${i+1}" href="${p.link}" target="_blank" rel="noreferrer">
        <div class="news-img-card-bg ${p.bg}" ${imgStyle ? `style="${imgStyle}"` : ''}></div>
        <div class="news-img-card-overlay"></div>
        <div class="news-img-card-body">
          <div class="news-img-card-cat">${FB_ICON}${fbCat} · ${p.dateFormatted}</div>
          <div class="news-img-card-title">${p.title}</div>
          <span class="news-img-card-link">${readMore} ${ARROW_SVG}</span>
        </div>
      </a>`;
  }).join('');

  const placeholderCards = placeholders.map((_, i) => `
      <div class="news-img-card reveal" style="--i:${livePosts.length + i + 1}">
        <div class="news-img-card-bg" style="background:linear-gradient(135deg,#2f3356 0%,#5b4c95 100%)"></div>
        <div class="news-img-card-overlay" style="background:linear-gradient(180deg,rgba(16,18,38,.08) 0%,rgba(16,18,38,.72) 100%)"></div>
        <div class="news-img-card-body">
          <div class="news-img-card-cat">${FB_ICON}${fbCat}</div>
          <div class="news-img-card-title">${placeholderTitle}</div>
          <span class="news-img-card-link" style="opacity:.72">${placeholderDesc}</span>
        </div>
      </div>`).join('');

  newsGrid.innerHTML = liveCards + placeholderCards;
  newsGrid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

function activityCardHref(item, index, useDetail) {
  if (!useDetail) return item.link || '#';
  const id = item.id != null ? item.id : index + 1;
  return `activity.html?id=${id}`;
}

function renderManualNewsCards(newsGrid, items, limit, opts) {
  const all = items || CMS.getNews();
  const news = limit ? all.slice(0, limit) : all;
  const readMore = cmsT('index.news.readmore', 'อ่านเพิ่มเติม');
  const fullImage = !!(opts && opts.fullImage);
  const useDetail = !!(opts && opts.useDetail);
  newsGrid.style.display = '';
  newsGrid.innerHTML = news.map((n,i) => {
    const title = cmsL(n, 'title');
    const cat = cmsL(n, 'cat');
    const href = activityCardHref(n, i, useDetail);
    const external = !useDetail && href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : '';
    if (fullImage && n.image) {
      return `<a class="news-img-card news-img-card--activity reveal" style="--i:${i+1}" href="${href}" ${external}>
        <div class="news-img-card-bg" style="background-image:url('${n.image}')"></div>
        <div class="news-img-card-overlay"></div>
        <div class="news-img-card-body">
          <div class="news-img-card-cat">${cat}</div>
          <div class="news-img-card-title">${title}</div>
          <span class="news-img-card-link">${readMore} <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </div>
      </a>`;
    }
    return `<a class="news-img-card reveal" style="--i:${i+1}" href="${href}" ${external}>
      <div class="news-img-card-bg ${n.bg||''}" ${n.image ? `style="background-image:url('${n.image}')"` : ''}></div>
      <div class="news-img-card-overlay"></div>
      <div class="news-img-card-body">
        <div class="news-img-card-cat">${cat}</div>
        <div class="news-img-card-title">${title}</div>
        <span class="news-img-card-link">${readMore} <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </div>
    </a>`;
  }).join('');
  newsGrid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

function getDeptIcon(code) {
  const icons = {
    AI: `<svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="18" fill="currentColor" opacity=".12"/>
      <circle cx="40" cy="24" r="4" fill="currentColor"/>
      <circle cx="22" cy="36" r="3.5" fill="currentColor" opacity=".75"/>
      <circle cx="58" cy="36" r="3.5" fill="currentColor" opacity=".75"/>
      <circle cx="28" cy="54" r="3.5" fill="currentColor" opacity=".85"/>
      <circle cx="52" cy="54" r="3.5" fill="currentColor" opacity=".85"/>
      <circle cx="40" cy="58" r="4" fill="currentColor"/>
      <line x1="40" y1="24" x2="22" y2="36" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="40" y1="24" x2="58" y2="36" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="22" y1="36" x2="28" y2="54" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="58" y1="36" x2="52" y2="54" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="28" y1="54" x2="40" y2="58" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="52" y1="54" x2="40" y2="58" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
      <line x1="22" y1="36" x2="58" y2="36" stroke="currentColor" stroke-width="1.2" opacity=".25"/>
      <line x1="28" y1="54" x2="52" y2="54" stroke="currentColor" stroke-width="1.2" opacity=".25"/>
      <path d="M34 40a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" fill="currentColor" opacity=".35"/>
      <circle cx="40" cy="40" r="3" fill="currentColor"/>
    </svg>`,

    DMT: `<svg viewBox="0 0 80 80" fill="none">
      <rect x="14" y="28" width="52" height="32" rx="5" fill="currentColor" opacity=".15"/>
      <rect x="14" y="28" width="52" height="32" rx="5" stroke="currentColor" stroke-width="2.5"/>
      <rect x="14" y="18" width="52" height="12" rx="4" fill="currentColor" opacity=".3"/>
      <line x1="26" y1="18" x2="22" y2="30" stroke="currentColor" stroke-width="2.5" opacity=".7"/>
      <line x1="38" y1="18" x2="34" y2="30" stroke="currentColor" stroke-width="2.5" opacity=".7"/>
      <line x1="50" y1="18" x2="46" y2="30" stroke="currentColor" stroke-width="2.5" opacity=".7"/>
      <circle cx="40" cy="43" r="11" fill="currentColor" opacity=".18"/>
      <path d="M36 38l10 5.5-10 5.5z" fill="currentColor"/>
    </svg>`,

    DRONE: `<svg viewBox="0 0 80 80" fill="none">
      <rect x="32" y="32" width="16" height="16" rx="4" fill="currentColor" opacity=".35"/>
      <rect x="32" y="32" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/>
      <line x1="32" y1="32" x2="18" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="48" y1="32" x2="62" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="48" x2="18" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="48" y1="48" x2="62" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="14" cy="14" rx="10" ry="5" fill="currentColor" opacity=".4" transform="rotate(-45 14 14)"/>
      <ellipse cx="66" cy="14" rx="10" ry="5" fill="currentColor" opacity=".4" transform="rotate(45 66 14)"/>
      <ellipse cx="14" cy="66" rx="10" ry="5" fill="currentColor" opacity=".4" transform="rotate(45 14 66)"/>
      <ellipse cx="66" cy="66" rx="10" ry="5" fill="currentColor" opacity=".4" transform="rotate(-45 66 66)"/>
      <circle cx="40" cy="40" r="5" fill="currentColor"/>
      <circle cx="40" cy="40" r="2.5" fill="currentColor" opacity=".4"/>
    </svg>`,

    ROBOT: `<svg viewBox="0 0 80 80" fill="none">
      <line x1="40" y1="10" x2="40" y2="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="40" cy="9" r="4" fill="currentColor"/>
      <rect x="22" y="16" width="36" height="26" rx="6" fill="currentColor" opacity=".18"/>
      <rect x="22" y="16" width="36" height="26" rx="6" stroke="currentColor" stroke-width="2.5"/>
      <rect x="28" y="24" width="9" height="9" rx="2.5" fill="currentColor" opacity=".6"/>
      <circle cx="32" cy="28" r="2.5" fill="currentColor"/>
      <rect x="43" y="24" width="9" height="9" rx="2.5" fill="currentColor" opacity=".6"/>
      <circle cx="47" cy="28" r="2.5" fill="currentColor"/>
      <rect x="30" y="37" width="20" height="4" rx="2" fill="currentColor" opacity=".4"/>
      <rect x="26" y="44" width="28" height="18" rx="5" fill="currentColor" opacity=".13"/>
      <rect x="26" y="44" width="28" height="18" rx="5" stroke="currentColor" stroke-width="2"/>
      <rect x="33" y="49" width="14" height="8" rx="2" fill="currentColor" opacity=".25"/>
      <rect x="12" y="47" width="12" height="5" rx="2.5" fill="currentColor" opacity=".35"/>
      <rect x="56" y="47" width="12" height="5" rx="2.5" fill="currentColor" opacity=".35"/>
    </svg>`,

    ESPORTS: `<svg viewBox="0 0 80 80" fill="none">
      <path d="M14 38c0-9 6-16 14-18h24c8 2 14 9 14 18l-3 11c-1.5 5-6 8-11 8H26c-5 0-9.5-3-11-8z" fill="currentColor" opacity=".15"/>
      <path d="M14 38c0-9 6-16 14-18h24c8 2 14 9 14 18l-3 11c-1.5 5-6 8-11 8H26c-5 0-9.5-3-11-8z" stroke="currentColor" stroke-width="2.5"/>
      <rect x="22" y="33" width="14" height="5" rx="2" fill="currentColor" opacity=".6"/>
      <rect x="26" y="29" width="5" height="14" rx="2" fill="currentColor" opacity=".6"/>
      <circle cx="52" cy="34" r="3.5" fill="currentColor" opacity=".65"/>
      <circle cx="59" cy="39" r="3.5" fill="currentColor" opacity=".4"/>
      <circle cx="52" cy="44" r="3.5" fill="currentColor" opacity=".4"/>
      <circle cx="45" cy="39" r="3.5" fill="currentColor" opacity=".65"/>
      <ellipse cx="32" cy="50" rx="7" ry="5" fill="currentColor" opacity=".2"/>
      <ellipse cx="48" cy="50" rx="7" ry="5" fill="currentColor" opacity=".2"/>
    </svg>`,

    CODING: `<svg viewBox="0 0 80 80" fill="none">
      <rect x="10" y="16" width="60" height="40" rx="5" fill="currentColor" opacity=".12"/>
      <rect x="10" y="16" width="60" height="40" rx="5" stroke="currentColor" stroke-width="2.5"/>
      <rect x="10" y="52" width="60" height="6" rx="3" fill="currentColor" opacity=".2"/>
      <rect x="32" y="58" width="16" height="6" rx="2" fill="currentColor" opacity=".18"/>
      <rect x="22" y="62" width="36" height="4" rx="2" fill="currentColor" opacity=".15"/>
      <path d="M26 30l-7 5 7 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M54 30l7 5-7 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M46 24l-12 22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>
    </svg>`,

    CG: `<svg viewBox="0 0 80 80" fill="none">
      <rect x="12" y="14" width="56" height="38" rx="5" fill="currentColor" opacity=".12"/>
      <rect x="12" y="14" width="56" height="38" rx="5" stroke="currentColor" stroke-width="2.5"/>
      <rect x="30" y="52" width="20" height="6" rx="2" fill="currentColor" opacity=".2"/>
      <rect x="22" y="58" width="36" height="4" rx="2" fill="currentColor" opacity=".15"/>
      <polygon points="24,46 40,22 56,46" fill="currentColor" opacity=".22"/>
      <polygon points="24,46 40,22 56,46" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="34,46 40,32 56,46" fill="currentColor" opacity=".3"/>
      <circle cx="51" cy="27" r="7" fill="currentColor" opacity=".3"/>
      <circle cx="51" cy="27" r="4" fill="currentColor" opacity=".5"/>
    </svg>`,

    COMSCI: `<svg viewBox="0 0 80 80" fill="none">
      <rect x="16" y="14" width="48" height="13" rx="3.5" fill="currentColor" opacity=".2"/>
      <rect x="16" y="14" width="48" height="13" rx="3.5" stroke="currentColor" stroke-width="2"/>
      <rect x="16" y="32" width="48" height="13" rx="3.5" fill="currentColor" opacity=".14"/>
      <rect x="16" y="32" width="48" height="13" rx="3.5" stroke="currentColor" stroke-width="2"/>
      <rect x="16" y="50" width="48" height="13" rx="3.5" fill="currentColor" opacity=".1"/>
      <rect x="16" y="50" width="48" height="13" rx="3.5" stroke="currentColor" stroke-width="2"/>
      <circle cx="56" cy="20" r="3" fill="currentColor" opacity=".85"/>
      <circle cx="48" cy="20" r="3" fill="currentColor" opacity=".4"/>
      <circle cx="56" cy="38" r="3" fill="currentColor" opacity=".7"/>
      <circle cx="48" cy="38" r="3" fill="currentColor" opacity=".35"/>
      <circle cx="56" cy="56" r="3" fill="currentColor" opacity=".55"/>
      <rect x="22" y="18" width="18" height="5" rx="1.5" fill="currentColor" opacity=".3"/>
      <rect x="22" y="36" width="14" height="5" rx="1.5" fill="currentColor" opacity=".3"/>
      <rect x="22" y="54" width="16" height="5" rx="1.5" fill="currentColor" opacity=".3"/>
    </svg>`,

    'D&T': `<svg viewBox="0 0 80 80" fill="none">
      <rect x="14" y="32" width="52" height="14" rx="3.5" fill="currentColor" opacity=".18"/>
      <rect x="14" y="32" width="52" height="14" rx="3.5" stroke="currentColor" stroke-width="2.5"/>
      <line x1="24" y1="32" x2="24" y2="38" stroke="currentColor" stroke-width="1.8"/>
      <line x1="34" y1="32" x2="34" y2="40" stroke="currentColor" stroke-width="1.8"/>
      <line x1="44" y1="32" x2="44" y2="38" stroke="currentColor" stroke-width="1.8"/>
      <line x1="54" y1="32" x2="54" y2="40" stroke="currentColor" stroke-width="1.8"/>
      <path d="M24 30L50 16l8 10L26 44z" fill="currentColor" opacity=".22"/>
      <path d="M24 30L50 16l8 10L26 44z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M24 30l2 14" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="56" cy="58" r="12" fill="currentColor" opacity=".14"/>
      <circle cx="56" cy="58" r="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="56" cy="58" r="5" fill="currentColor" opacity=".4"/>
      <circle cx="56" cy="58" r="2.5" fill="currentColor"/>
      <rect x="53" y="44" width="6" height="5" rx="1.5" fill="currentColor" opacity=".6"/>
      <rect x="53" y="69" width="6" height="5" rx="1.5" fill="currentColor" opacity=".6"/>
      <rect x="42" y="55" width="5" height="6" rx="1.5" fill="currentColor" opacity=".6"/>
      <rect x="65" y="55" width="5" height="6" rx="1.5" fill="currentColor" opacity=".6"/>
    </svg>`
  };
  return icons[code] || icons['CODING'];
}

/* ── RENDER ABOUT FROM CMS (about.html) ─────────── */
function renderAboutFromCMS() {
  if (typeof CMS === 'undefined' || !window.i18n) return;
  CMS.applyToI18n();
  window.i18n.applyLang(window.i18n.getLang());
}

/* ── RENDER FACULTY FROM CMS (faculty.html) ─────── */
function renderFacultyFromCMS() {
  if (typeof CMS === 'undefined') return;
  const faculty = CMS.getFaculty();

  const PERSON_ICON = `<svg class="person-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="40" cy="26" r="16" fill="url(#pGradDef)"/><path d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32" fill="url(#pGradDef)" opacity=".7"/></svg>`;
  const EMAIL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

  /* Convert sharing URLs that cannot be used directly as <img src> */
  const normalisePhotoUrl = src => {
    if (!src) return '';
    // Google Drive: /file/d/ID/view or /open?id=ID → thumbnail API (more reliable than uc?export=view)
    const gdFile = src.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/);
    if (gdFile) return `https://drive.google.com/thumbnail?id=${gdFile[1]}&sz=w600`;
    const gdOpen = src.match(/drive\.google\.com\/open\?id=([^&]+)/);
    if (gdOpen) return `https://drive.google.com/thumbnail?id=${gdOpen[1]}&sz=w600`;
    // Google Drive direct ID (lh3.googleusercontent.com/d/ID)
    const lh3d = src.match(/lh3\.googleusercontent\.com\/d\/([^\/\?]+)/);
    if (lh3d) return `https://drive.google.com/thumbnail?id=${lh3d[1]}&sz=w600`;
    return src;
  };

  window.__pdsPersonIcon = PERSON_ICON;

  const mkPhoto = f => {
    if (!f.photo) return PERSON_ICON;
    const src = normalisePhotoUrl(f.photo);
    return `<img src="${src}" alt="${f.name}" style="width:100%;height:100%;object-fit:cover;object-position:top center;" onerror="this.insertAdjacentHTML('afterend',window.__pdsPersonIcon);this.remove()">`;
  };
  const mkEmail = f => f.email
    ? `<a href="mailto:${f.email}" class="fc-email">${EMAIL_SVG} ${f.email}</a>`
    : '';

  // Director
  const dir = faculty.find(f => f.role === 'director');
  const dirCard = document.getElementById('cmsDirectorCard');
  if (dirCard && dir) {
    dirCard.querySelector('.dc-photo').innerHTML = mkPhoto(dir);
    dirCard.querySelector('.dc-name').textContent = dir.name;
    const em = dirCard.querySelector('.fc-email');
    if (em && dir.email) { em.href = 'mailto:' + dir.email; em.childNodes[em.childNodes.length-1].textContent = ' ' + dir.email; }
  }

  // Deputy
  const dep = faculty.find(f => f.role === 'deputy');
  const depCard = document.getElementById('cmsDeputyCard');
  if (depCard && dep) {
    depCard.querySelector('.sc-photo').innerHTML = mkPhoto(dep);
    depCard.querySelector('.sc-name').textContent = dep.name;
    const em = depCard.querySelector('.fc-email');
    if (em && dep.email) { em.href = 'mailto:' + dep.email; em.childNodes[em.childNodes.length-1].textContent = ' ' + dep.email; }
  }

  // Head
  const head = faculty.find(f => f.role === 'head');
  const headCard = document.getElementById('cmsHeadCard');
  if (headCard && head) {
    headCard.querySelector('.sc-photo').innerHTML = mkPhoto(head);
    headCard.querySelector('.sc-name').textContent = head.name;
    const em = headCard.querySelector('.fc-email');
    if (em && head.email) { em.href = 'mailto:' + head.email; em.childNodes[em.childNodes.length-1].textContent = ' ' + head.email; }
  }

  // Teachers
  const teachers = faculty.filter(f => f.role === 'teacher');
  const grid = document.getElementById('teacherGrid');
  if (grid) {
    grid.innerHTML = teachers.map((f, i) => `
      <div class="teacher-card-new reveal" style="--i:${i + 1}">
        <div class="tc-photo">${mkPhoto(f)}</div>
        <div class="tc-info">
          <div class="tc-name-new">${f.name}</div>
          ${mkEmail(f)}
        </div>
      </div>`).join('');
    grid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  }
}

/* ── RENDER CURRICULUM FROM CMS (curriculum.html) ── */
function renderCurriculumFromCMS() {
  if (typeof CMS === 'undefined') return;
  const courses = CMS.getCurriculum();

  /* Verified Unsplash URLs (same CDN params as index/dept grid) */
  const TECH_IMG = 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format';
  const CURR_IMG = {
    robot:    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80&fit=crop&auto=format',
    code:     'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80&fit=crop&auto=format',
    python:   'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80&fit=crop&auto=format',
    web:      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&fit=crop&auto=format',
    graphic:  'https://images.unsplash.com/photo-1547194936-28214bd75193?w=400&q=80&fit=crop&auto=format',
    esports:  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80&fit=crop&auto=format',
    drone:    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80&fit=crop&auto=format',
    ai:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80&fit=crop&auto=format',
    media:    'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=400&q=80&fit=crop&auto=format',
    workshop: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&q=80&fit=crop&auto=format',
    film:     'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80&fit=crop&auto=format',
    draw:     'https://images.unsplash.com/photo-1547194936-28214bd75193?w=400&q=80&fit=crop&auto=format',
    iot:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop&auto=format',
    project:  'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=400&q=80&fit=crop&auto=format',
    math:     'https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=400&q=80&fit=crop&auto=format',
    db:       'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80&fit=crop&auto=format',
    default:  'https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=400&q=80&fit=crop&auto=format'
  };
  const IMG_FALLBACK = {
    core:  TECH_IMG,
    major: CURR_IMG.media,
    add:   TECH_IMG,
    elec:  CURR_IMG.code
  };

  function isTechCourse(c) {
    const codes = ['ว21103', 'ว22103', 'ว23103', 'ว31103', 'ว31104', 'ว32281', 'ว33281'];
    return codes.includes(c.code) || /^Technology\s+\d/.test(c.name_en || '');
  }

  function resolveCourseImg(c) {
    if (isTechCourse(c)) return TECH_IMG;
    const n = c.name || '';
    if (/หุ่นยนต์/.test(n)) return CURR_IMG.robot;
    if (/python|ไพทอน/i.test(n)) return CURR_IMG.python;
    if (/ภาษาซี|โปรแกรมขั้นสูง|โปรแกรมคอม|การโปรแกรม/.test(n)) return CURR_IMG.code;
    if (/เว็บ|html|css/i.test(n)) return CURR_IMG.web;
    if (/esports|อีสปอร์ต/i.test(n)) return CURR_IMG.esports;
    if (/โดรน|อากาศยาน/.test(n)) return CURR_IMG.drone;
    if (/ปัญญา|อัลกอริทึม|ฐานข้อมูล/.test(n)) return CURR_IMG.ai;
    if (/ภาพยนตร์|ตัดต่อ|โมชั่น|ถ่ายภาพ/.test(n)) return CURR_IMG.film;
    if (/Procreate|การ์ตูน|วาด/.test(n)) return CURR_IMG.draw;
    if (/กราฟิก|เวกเตอร์|ออกแบบ|สื่อดิจิทัล|คอนเทนต์|โฆษณา|สิ่งพิมพ์/.test(n)) return CURR_IMG.graphic;
    if (/IoT|อินเทอร์เน็ตสำหรับ/.test(n)) return CURR_IMG.iot;
    if (/โครงงาน|บูรณาการ/.test(n)) return CURR_IMG.project;
    if (/คณิต/.test(n)) return CURR_IMG.math;
    if (/3D|3 มิติ|Print/.test(n)) return CURR_IMG.workshop;
    if (/ไมโคร/.test(n)) return CURR_IMG.iot;
    return CURR_IMG.default;
  }

  const SAVE_SVG = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function mkCard(c) {
    const img = resolveCourseImg(c);
    const fb  = IMG_FALLBACK[c.type] || CURR_IMG.default;
    const name = cmsL(c, 'name');
    const trackBadge = c.track === 'ai'
      ? `<span class="cc-eng-ai">⬡ ${cmsT('curr.badge.ai','เอก AI')}</span>`
      : c.track === 'dmt'
        ? `<span class="cc-eng-dmt">⬡ ${cmsT('curr.badge.dmt','เอก DMT')}</span>`
        : '';
const pendingBadge = '';
    return `<div class="course-card">
      <div class="cc-img">
        <img src="${img}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='${fb}'"/>
        <div class="cc-img-overlay"></div>
        ${trackBadge}
      </div>
      <div class="cc-info">
        <div class="cc-code">${c.code}</div>
        <div class="cc-name">${name}</div>
        <div class="cc-meta">
          <span class="cc-teacher">${teacherL(c.teacher)}</span>
          <span class="cc-sem">${semL(c.sem)}</span>
        </div>
        ${pendingBadge}
      </div>
    </div>`;
  }

  function renderGrade(grade) {
    const panel = document.getElementById('grade-' + grade);
    if (!panel) return;
    const pc = panel.querySelector('.panel-courses');
    if (!pc) return;

    const gradeCourses = courses.filter(c => c.grade === grade);
    const byType = { core: [], add: [], major: [], elec: [] };
    gradeCourses.forEach(c => {
      if (byType[c.type]) byType[c.type].push(c);
      else byType.elec.push(c);
    });

    /* determine if major courses have mixed tracks */
    const majorCourses = byType.major;
    const hasAI  = majorCourses.some(c => c.track === 'ai');
    const hasDMT = majorCourses.some(c => c.track === 'dmt');

    let html = '';

    /* core section */
    if (byType.core.length) {
      html += `<div class="course-section">
        <div class="ctype-head ct-core"><span class="ctype-label">${cmsT('curr.ctype.core','วิชาพื้นฐาน')}</span><div class="ctype-rule"></div></div>
        <div class="course-card-grid">${byType.core.map(mkCard).join('')}</div>
      </div>`;
    }

    /* additional (เพิ่มเติม) section — ม.5–ม.6 */
    if (byType.add.length) {
      html += `<div class="course-section">
        <div class="ctype-head ct-add"><span class="ctype-label">${cmsT('curr.ctype.add','วิชาเพิ่มเติม')}</span><div class="ctype-rule"></div></div>
        <div class="course-card-grid">${byType.add.map(mkCard).join('')}</div>
      </div>`;
    }

    /* major section */
    if (majorCourses.length) {
      /* Show legend if grade has major courses with tracks */
      let legend = '';
      if (hasAI || hasDMT) {
        legend = `<div class="curr-legend">`;
        if (hasAI)  legend += `<div class="legend-item"><span class="legend-badge legend-badge-ai">${cmsT('curr.badge.ai','เอก AI')}</span><span>${cmsT('curr.legend.ai','= เฉพาะนักเรียนสาขาปัญญาประดิษฐ์')}</span></div>`;
        if (hasDMT) legend += `<div class="legend-item"><span class="legend-badge legend-badge-dmt">${cmsT('curr.badge.dmt','เอก DMT')}</span><span>${cmsT('curr.legend.dmt','= เฉพาะนักเรียนสาขาดิจิทัลมีเดีย')}</span></div>`;
        legend += `</div>`;
      }
      /* Determine section heading class */
      const ctClass = (!hasAI && hasDMT) ? 'ct-dmt' : (!hasDMT && hasAI) ? 'ct-ai' : 'ct-eng';
      const ctLabel = cmsT('curr.ctype.eng','วิชาเอก');
      html += legend + `<div class="course-section">
        <div class="ctype-head ${ctClass}"><span class="ctype-label">${ctLabel}</span><div class="ctype-rule"></div></div>
        <div class="course-card-grid">${majorCourses.map(mkCard).join('')}</div>
      </div>`;
    }

    /* elec section */
    if (byType.elec.length) {
      html += `<div class="course-section">
        <div class="ctype-head ct-elec"><span class="ctype-label">${cmsT('curr.ctype.elec','วิชาเลือกเพิ่ม')}</span><div class="ctype-rule"></div></div>
        <div class="course-card-grid">${byType.elec.map(mkCard).join('')}</div>
      </div>`;
    }

    pc.innerHTML = html || `<div class="course-empty">${cmsT('curr.empty','ยังไม่มีรายวิชา')}</div>`;
  }

  for (let g = 1; g <= 6; g++) renderGrade(g);
}

/* ── RENDER RESOURCES FROM CMS (resources.html) ── */
function renderResourcesFromCMS() {
  if (typeof CMS === 'undefined') return;
  /* New 4-section layout (book / website / journal / research). */
  const sectionGrids = ['book', 'website', 'journal', 'research']
    .map(t => document.getElementById('resGrid-' + t));
  const legacyGrid = document.getElementById('resGrid');
  if (!sectionGrids.some(Boolean) && !legacyGrid) return;

  const resources = CMS.getResources();

  const CAT_CLASS = { ai:'subj-ai', robot:'subj-robot', drone:'subj-drone', cg:'subj-cg', dmt:'subj-dmt', code:'subj-code' };
  const CAT_KEY   = { ai:'res.cat.ai', robot:'res.cat.robot', drone:'res.cat.drone', cg:'res.cat.graphic', dmt:'res.cat.media', code:'res.cat.code' };
  const CAT_FALLBACK = { ai:'AI', robot:'หุ่นยนต์', drone:'โดรน', cg:'กราฟิก', dmt:'ดิจิทัลมีเดีย', code:'โปรแกรมมิง' };

  const EXT_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const ARR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  function getHost(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
  }

  function resFavicon(url) {
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(url)}&size=256`;
  }

  function mkCard(r, i) {
    const catClass = CAT_CLASS[r.cat] || 'subj-ai';
    const catLabel = cmsT(CAT_KEY[r.cat], CAT_FALLBACK[r.cat] || r.cat);
    const isRounded = r.logo && r.logo.includes('gstatic.com');
    const fbLogo = resFavicon(r.url);
    return `<a class="res-card reveal" style="--i:${i+1}" href="${r.url}" target="_blank" rel="noreferrer">
      <div class="res-card-thumb logo-bg" style="background:${r.bg}">
        <div class="rc-badge-wrap"><span class="res-subj ${catClass}">${catLabel}</span></div>
        <div class="logo-center"><img src="${r.logo}" alt="${r.name}" class="si-logo${isRounded?' fav-logo':''}" loading="lazy" onerror="this.onerror=null;this.src='${fbLogo}'"/></div>
      </div>
      <div class="res-card-body">
        <div class="res-card-title">${r.name}</div>
        <div class="res-card-desc">${cmsL(r,'desc')}</div>
        <div class="res-card-footer">
          <div class="res-card-url">${getHost(r.url)} ${EXT_SVG}</div>
          <div class="res-card-arrow">${ARR_SVG}</div>
        </div>
      </div>
    </a>`;
  }

  /* Legacy single-grid fallback (old markup) */
  if (legacyGrid && !sectionGrids.some(Boolean)) {
    legacyGrid.innerHTML = resources.map(mkCard).join('');
    legacyGrid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    return;
  }

  const emptyMsg = cmsT('res.empty', 'ยังไม่มีรายการในหมวดนี้');
  ['book', 'website', 'journal', 'research'].forEach(type => {
    const grid = document.getElementById('resGrid-' + type);
    if (!grid) return;
    const items = resources.filter(r => (r.type || 'website') === type);
    grid.innerHTML = items.length
      ? items.map(mkCard).join('')
      : `<div class="res-empty">${emptyMsg}</div>`;
    grid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  });
}

/* ── ACTIVITY DETAIL PAGE ── */
function activityDetailHref(item, source) {
  if (!item || !item.id) return '#';
  if (source === 'calendar' || item.date) {
    if (item.activityId) return `activity.html?id=${item.activityId}`;
    return `activity.html?cal=${item.id}`;
  }
  return `activity.html?id=${item.id}`;
}

function resolveActivityDetail() {
  if (typeof CMS === 'undefined') return null;
  const params = new URLSearchParams(location.search);
  const actId = params.get('id');
  const calId = params.get('cal');

  if (actId) {
    const act = CMS.getActivities().find(a => String(a.id) === actId);
    return act ? { ...act } : null;
  }
  if (calId) {
    const calEvents = (typeof SheetCalendar !== 'undefined') ? SheetCalendar.getCached() : [];
    const cal = calEvents.find(c => String(c.id) === calId);
    if (!cal) return null;
    if (cal.activityId) {
      const act = CMS.getActivities().find(a => a.id === cal.activityId) || {};
      return {
        ...act,
        ...cal,
        title: act.title || cal.title,
        title_en: act.title_en || cal.title_en,
        image: act.image || cal.image,
        body: act.body || cal.body || cal.desc,
        body_en: act.body_en || cal.body_en || cal.desc_en,
        tag: act.tag || cal.tag || act.cat || cal.cat,
        tag_en: act.tag_en || cal.tag_en || act.cat_en || cal.cat_en,
        publishedDate: act.publishedDate || cal.publishedDate,
        dateLabel: cal.dateLabel || act.dateLabel,
        dateLabel_en: cal.dateLabel_en || act.dateLabel_en,
        date: cal.date || act.date,
        endDate: cal.endDate || act.endDate,
        location: cal.location || act.location,
        location_en: cal.location_en || act.location_en,
        link: cal.link || act.link
      };
    }
    return { ...cal };
  }
  return null;
}

function fmtDetailDateRange(item) {
  if (!item || !item.date) return '';
  const end = item.endDate || '';
  if (end && end !== item.date) return `${fmtFullDate(item.date)} – ${fmtFullDate(end)}`;
  return fmtFullDate(item.date);
}

function bodyParagraphs(text) {
  return (text || '').split(/\n\n+/).filter(Boolean).map(p => {
    const lines = p.split('\n').map(line => {
      const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
    });
    return `<p>${lines.join('<br>')}</p>`;
  }).join('');
}

function renderActivityDetail() {
  const root = document.getElementById('activityDetail');
  if (!root || typeof CMS === 'undefined') return;

  const params = new URLSearchParams(location.search);
  if (params.get('cal') && typeof SheetCalendar !== 'undefined' && !root.dataset.sheetLoaded) {
    root.dataset.sheetLoaded = '1';
    SheetCalendar.load().then(() => renderActivityDetail());
  }

  const item = resolveActivityDetail();
  const actLabel = cmsT('index.activity.title', 'กิจกรรม');
  const pubPrefix = cmsT('act.detail.published', 'ประกาศวันที่');
  const notFound = cmsT('act.detail.notFound', 'ไม่พบกิจกรรมที่ต้องการ');
  const attachLabel = cmsT('cal.attachment', 'เอกสารแนบ');

  if (!item) {
    root.innerHTML = `<p class="act-detail-empty">${notFound}</p>`;
    document.title = notFound;
    return;
  }

  const title = cmsL(item, 'title');
  const tag = cmsL(item, 'tag') || cmsL(item, 'cat');
  const dateLabel = cmsL(item, 'dateLabel') || cmsT('act.detail.dateRange', 'วันที่เริ่ม - วันที่สิ้นสุด');
  const dateRange = fmtDetailDateRange(item);
  const published = item.publishedDate ? `${pubPrefix} ${fmtFullDate(item.publishedDate)}` : '';
  const bodyHtml = bodyParagraphs(cmsL(item, 'body') || cmsL(item, 'desc'));
  const imgHtml = item.image
    ? `<div class="act-detail-hero"><img src="${item.image}" alt="" loading="lazy"/></div>`
    : `<div class="act-detail-hero act-detail-hero--fallback ${item.bg || 'ni-1'}"></div>`;
  const attachHtml = item.link
    ? `<a class="act-detail-attach reveal" href="${item.link}" target="_blank" rel="noreferrer">📎 ${attachLabel}</a>`
    : '';

  document.title = `${title} | PDS OCC`;

  root.innerHTML = `
    <nav class="act-breadcrumb reveal" aria-label="Breadcrumb">
      <a class="act-bc-item" href="news.html#pr-activities">${actLabel}</a>
      <span class="act-bc-sep" aria-hidden="true">&gt;</span>
      <span class="act-bc-current">${title}</span>
    </nav>
    ${imgHtml}
    <div class="act-detail-meta reveal">
      ${published ? `<span class="act-detail-pub">${published}</span>` : ''}
      ${published && tag ? '<span class="act-detail-dot" aria-hidden="true">•</span>' : ''}
      ${tag ? `<span class="act-detail-tag">${tag}</span>` : ''}
    </div>
    <h1 class="act-detail-title reveal">${title}</h1>
    ${dateRange ? `
    <div class="act-detail-datebox reveal">
      <div class="act-detail-datebox-label">${dateLabel}</div>
      <div class="act-detail-datebox-value">${dateRange}</div>
    </div>` : ''}
    <div class="act-detail-body reveal">${bodyHtml}</div>
    ${attachHtml}`;

  root.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

/* ── RENDER PR PAGE (news.html — activities + calendar) ── */
function renderActivitiesFromCMS() {
  const grid = document.getElementById('activityGrid');
  if (!grid || typeof CMS === 'undefined') return;
  renderManualNewsCards(grid, CMS.getActivities(), null, { fullImage: true, useDetail: true });
}

function renderPrFromCMS() {
  renderActivitiesFromCMS();
  renderCalendarFromCMS();
}

/* ── RENDER CALENDAR + EVENT LIST ── */
let calViewYear = null;
let calViewMonth = null;
let calSelectedISO = null;


function pad2(n) { return String(n).padStart(2, '0'); }
function isoDate(y, m, d) { return `${y}-${pad2(m + 1)}-${pad2(d)}`; }

function calLang() {
  return (window.i18n && window.i18n.getLang()) || 'th';
}

function eventOnDay(ev, iso) {
  const end = ev.endDate || ev.date;
  return ev.date && iso >= ev.date && iso <= end;
}

function eventsForISO(events, iso) {
  return events.filter(ev => eventOnDay(ev, iso)).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
}

function fmtMonthYearLabel(y, m) {
  const lang = calLang();
  const opts = { month: 'long', year: 'numeric' };
  if (lang === 'th') opts.calendar = 'buddhist';
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'th-TH', opts).format(new Date(y, m, 1));
}

function fmtFullDate(iso) {
  if (!iso) return '';
  const lang = calLang();
  const [y, mo, d] = iso.split('-').map(Number);
  const opts = { day: 'numeric', month: 'long', year: 'numeric' };
  if (lang === 'th') opts.calendar = 'buddhist';
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'th-TH', opts).format(new Date(y, mo - 1, d));
}

function fmtMonthName(iso) {
  if (!iso) return '';
  const lang = calLang();
  const [y, mo] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'th-TH', { month: 'long' }).format(new Date(y, mo - 1, 1));
}

function fmtEventMeta(ev) {
  const lang = calLang();
  const end = ev.endDate || '';
  const datePart = end && end !== ev.date
    ? `${fmtFullDate(ev.date)} – ${fmtFullDate(end)}`
    : fmtFullDate(ev.date);
  const timeSep = lang === 'en' ? ' to ' : ' ถึง ';
  const timePart = (ev.time || '').replace(/\s*[–-]\s*/g, timeSep);
  const loc = cmsL(ev, 'location');
  return [datePart, timePart, loc].filter(Boolean).join(' | ');
}

function truncate(s, n) {
  const t = (s || '').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

/* ── Calendar event categorization: keyword → {category, icon} ──
   Category drives the chip color (4-hue system), icon is picked per-keyword
   so visually similar events (พิธี, อบรม, ทัศนศึกษา, …) are easy to tell apart at a glance. */
const CAL_CATS = {
  project:  { cls: 'cat-purple', label: 'โครงการ/กิจกรรม' },
  ceremony: { cls: 'cat-pink',   label: 'พิธีการ/งานสำคัญ' },
  training: { cls: 'cat-blue',   label: 'อบรม/ทัศนศึกษา' },
  student:  { cls: 'cat-green',  label: 'กิจกรรมนักเรียน' }
};
const CAL_RULES = [
  { re: /พิธี/,        cat: 'ceremony', icon: 'star' },
  { re: /วัคซีน/,      cat: 'ceremony', icon: 'health' },
  { re: /สอบ/,         cat: 'ceremony', icon: 'pencil' },
  { re: /ทัศนศึกษา/,   cat: 'training', icon: 'pin' },
  { re: /ตรวจ/,        cat: 'training', icon: 'check' },
  { re: /อบรม/,        cat: 'training', icon: 'cap' },
  { re: /ประชุม/,      cat: 'project',  icon: 'users' },
  { re: /รับสมัคร/,    cat: 'project',  icon: 'megaphone' },
  { re: /มอบ/,         cat: 'project',  icon: 'gift' },
  { re: /โครงการ/,     cat: 'project',  icon: 'book' },
  { re: /กิจกรรม/,     cat: 'student',  icon: 'sparkle' }
];
const CAL_ICON_PATHS = {
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 4.5v16"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  health: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  sparkle: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a4 4 0 0 1 0 8"/><path d="M19 5a8 8 0 0 1 0 14"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
};

function classifyEvent(ev) {
  const title = cmsL(ev, 'title') || ev.title || '';
  for (const rule of CAL_RULES) {
    if (rule.re.test(title)) return { cat: rule.cat, icon: rule.icon };
  }
  return { cat: 'project', icon: 'calendar' };
}

function calIconSvg(name, cls) {
  const d = CAL_ICON_PATHS[name] || CAL_ICON_PATHS.calendar;
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

function buildCalWeeks(y, m, daysInMonth, startDow, prevMonthDays) {
  const totalCells = Math.ceil((startDow + daysInMonth) / 7) * 7;
  const days = [];
  let curDay = 1;
  let nextDay = 1;
  for (let i = 0; i < totalCells; i++) {
    if (i < startDow) {
      const d = prevMonthDays - startDow + i + 1;
      const pm = m === 0 ? 11 : m - 1;
      const py = m === 0 ? y - 1 : y;
      days.push({ iso: isoDate(py, pm, d), day: d, inMonth: false });
    } else if (curDay <= daysInMonth) {
      days.push({ iso: isoDate(y, m, curDay), day: curDay, inMonth: true });
      curDay++;
    } else {
      const nm = m === 11 ? 0 : m + 1;
      const ny = m === 11 ? y + 1 : y;
      days.push({ iso: isoDate(ny, nm, nextDay), day: nextDay, inMonth: false });
      nextDay++;
    }
  }
  const weeks = [];
  for (let w = 0; w < days.length; w += 7) weeks.push(days.slice(w, w + 7));
  return weeks;
}

function weekEventSegments(events, weekDays) {
  const weekStart = weekDays[0].iso;
  const weekEnd = weekDays[6].iso;
  const segments = [];

  events.forEach(ev => {
    const evStart = ev.date;
    const evEnd = ev.endDate || ev.date;
    if (!evStart || evEnd < weekStart || evStart > weekEnd) return;

    let colStart = -1;
    let colEnd = -1;
    weekDays.forEach((d, i) => {
      if (d.iso >= evStart && d.iso <= evEnd) {
        if (colStart < 0) colStart = i;
        colEnd = i;
      }
    });
    if (colStart < 0) return;

    segments.push({
      ev,
      colStart,
      colEnd,
      continuesBefore: evStart < weekStart,
      continuesAfter: evEnd > weekEnd,
      title: cmsL(ev, 'title')
    });
  });

  return segments;
}

const CAL_MAX_LANES = 3;

function packLanes(segments, maxLanes) {
  const sorted = segments.slice().sort((a, b) => a.colStart - b.colStart || (a.colEnd - a.colStart) - (b.colEnd - b.colStart));
  const laneEnds = [];
  const laned = [];
  let overflowCount = 0;
  sorted.forEach(seg => {
    let lane = laneEnds.findIndex(end => end < seg.colStart);
    if (lane === -1) lane = laneEnds.length;
    if (lane < maxLanes) {
      laneEnds[lane] = seg.colEnd;
      laned.push({ ...seg, lane });
    } else {
      overflowCount++;
    }
  });
  return { laned, overflowCount };
}

function renderCalendarFromCMS() {
  const root = document.getElementById('calendarRoot');
  if (!root || typeof SheetCalendar === 'undefined') return;

  const cached = SheetCalendar.getCached();
  if (cached.length) renderCalendarBoard(cached);
  else root.innerHTML = `<div style="text-align:center;padding:32px;color:#999;font-size:.85rem">${cmsT('cal.loading', 'กำลังโหลด…')}</div>`;

  SheetCalendar.load().then(events => renderCalendarBoard(events));
}

function renderCalendarBoard(events) {
  const root = document.getElementById('calendarRoot');
  if (!root) return;

  const now = new Date();
  if (calViewYear == null) {
    calViewYear = now.getFullYear();
    calViewMonth = now.getMonth();
    calSelectedISO = null;
  }

  events = events.filter(e => e.date);
  const y = calViewYear;
  const m = calViewMonth;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const startDow = new Date(y, m, 1).getDay();
  const prevMonthDays = new Date(y, m, 0).getDate();

  const dayLabels = cmsT('cal.days', 'อา,จ,อ,พ,พฤ,ศ,ส').split(',');
  const todayISO = isoDate(now.getFullYear(), now.getMonth(), now.getDate());
  const weeks = buildCalWeeks(y, m, daysInMonth, startDow, prevMonthDays);

  const weeksHtml = weeks.map(weekDays => {
    const daysHtml = weekDays.map((d, i) => {
      const hasEv = events.some(ev => eventOnDay(ev, d.iso));
      const dayCls = [
        'ev-day',
        !d.inMonth ? 'ev-other' : '',
        d.iso === todayISO ? 'ev-today' : '',
        d.iso === calSelectedISO ? 'ev-selected' : '',
        hasEv ? 'ev-has' : ''
      ].filter(Boolean).join(' ');
      const numCls = [
        'ev-day-num',
        i === 0 ? 'ev-day-num--sun' : '',
        i === 6 ? 'ev-day-num--sat' : ''
      ].filter(Boolean).join(' ');
      if (d.inMonth) {
        return `<button type="button" class="${dayCls}" data-iso="${d.iso}"><span class="${numCls}">${d.day}</span></button>`;
      }
      return `<div class="${dayCls}"><span class="${numCls}">${d.day}</span></div>`;
    }).join('');

    const segments = weekEventSegments(events, weekDays);
    const { laned, overflowCount } = packLanes(segments, CAL_MAX_LANES);
    const barsHtml = laned.map(seg => {
      const cols = seg.colEnd - seg.colStart + 1;
      const { cat, icon } = classifyEvent(seg.ev);
      const isBanner = cols >= 4;
      const spanCls = [
        'ev-span-bar',
        CAL_CATS[cat].cls,
        isBanner ? 'ev-span-bar--banner' : '',
        seg.continuesBefore ? 'ev-span-bar--before' : 'ev-span-bar--start',
        seg.continuesAfter ? 'ev-span-bar--after' : 'ev-span-bar--end'
      ].filter(Boolean).join(' ');
      const maxLen = cols * 14;
      const label = cols >= 3 ? seg.title : truncate(seg.title, Math.max(8, maxLen));
      const titleAttr = seg.title.replace(/"/g, '&quot;');
      const detailHref = activityDetailHref(seg.ev, 'calendar');
      const iconHtml = calIconSvg(icon, 'ev-span-bar-icon');
      return `<a class="${spanCls}" href="${detailHref}" style="grid-column:${seg.colStart + 1} / ${seg.colEnd + 2};grid-row:${seg.lane + 1}" title="${titleAttr}">${iconHtml}<span class="ev-span-bar-label">${label}</span></a>`;
    }).join('');
    const moreHtml = overflowCount > 0
      ? `<a href="#calEvList" class="ev-week-more" style="grid-row:${CAL_MAX_LANES + 1}" onclick="document.getElementById('calEvList')?.scrollIntoView({behavior:'smooth',block:'start'})">+${overflowCount} ${cmsT('cal.more', 'กิจกรรมเพิ่มเติม')}</a>`
      : '';

    return `<div class="ev-week"><div class="ev-week-days">${daysHtml}</div><div class="ev-week-bars">${barsHtml}${moreHtml}</div></div>`;
  }).join('');

  const monthStart = isoDate(y, m, 1);
  const monthEnd = isoDate(y, m, daysInMonth);
  let listEvents = events
    .filter(ev => {
      const end = ev.endDate || ev.date;
      return end >= monthStart && ev.date <= monthEnd;
    })
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  if (calSelectedISO) listEvents = listEvents.filter(ev => eventOnDay(ev, calSelectedISO));

  const chev = `<svg class="ev-row-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>`;
  const defaultCatLabel = cmsT('cal.listCat', 'ปฏิทินกิจกรรม');
  const listEmpty = cmsT('cal.monthEmpty', 'ยังไม่มีกิจกรรมในเดือนนี้');
  const attachLabel = cmsT('cal.attachment', 'เอกสารแนบ');

  const listHtml = listEvents.length
    ? listEvents.map(ev => {
        const title = cmsL(ev, 'title');
        const meta = fmtEventMeta(ev);
        const catLabel = cmsL(ev, 'tag') || defaultCatLabel;
        const dayNum = parseInt(ev.date.split('-')[2], 10);
        const mon = fmtMonthName(ev.date);
        const sel = calSelectedISO && eventOnDay(ev, calSelectedISO) ? ' ev-row-highlight' : '';
        const attach = ev.link
          ? `<a class="ev-row-attach" href="${ev.link}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">📎 ${attachLabel}</a>`
          : '';
        const { cat } = classifyEvent(ev);
        const inner = `
          <div class="ev-date-box"><span class="ev-date-day">${dayNum}</span><span class="ev-date-mon">${mon}</span></div>
          <div class="ev-row-body">
            <div class="ev-row-cat ${CAL_CATS[cat].cls}-pale">${catLabel}</div>
            <div class="ev-row-title">${title}</div>
            <div class="ev-row-meta">${meta}</div>
            ${attach}
          </div>
          ${chev}`;
        const detailHref = activityDetailHref(ev, 'calendar');
        return `<a class="ev-row reveal${sel}" href="${detailHref}" data-iso="${ev.date}">${inner}</a>`;
      }).join('')
    : `<p class="ev-list-empty">${listEmpty}</p>`;

  const calSvg = calIconSvg('calendar', 'ev-cal-title-icon');
  const chevPrev = `<svg class="ev-cal-nav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`;
  const chevNext = `<svg class="ev-cal-nav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`;
  const legendHtml = Object.values(CAL_CATS).map(c =>
    `<span class="ev-legend-item"><span class="ev-legend-dot ${c.cls}"></span>${c.label}</span>`
  ).join('');
  const resetActive = calSelectedISO ? '' : ' is-disabled';

  root.innerHTML = `
    <div class="ev-cal-board reveal">
      <div class="ev-cal-nav">
        <button type="button" class="ev-cal-nav-btn" id="calPrev">${chevPrev}${cmsT('cal.prev', 'เดือนก่อนหน้า')}</button>
        <h2 class="ev-cal-month">${calSvg}${fmtMonthYearLabel(y, m)}</h2>
        <button type="button" class="ev-cal-nav-btn" id="calNext">${cmsT('cal.next', 'เดือนถัดไป')}${chevNext}</button>
      </div>
      <div class="ev-cal-weekdays">${dayLabels.map(d => `<span>${d.trim()}</span>`).join('')}</div>
      <div class="ev-cal-weeks">${weeksHtml}</div>
      <div class="ev-cal-legend">${legendHtml}</div>
    </div>
    <div class="ev-list-wrap reveal" id="calEvList">
      <div class="ev-list-head">
        <h3 class="ev-list-heading">${calIconSvg('calendar', 'ev-list-heading-icon')}${cmsT('cal.listTitle', 'รายการกิจกรรม')}</h3>
        <button type="button" class="ev-list-reset${resetActive}" id="calReset">${cmsT('cal.showAll', 'ดูทุกกิจกรรม')} →</button>
      </div>
      <div class="ev-list">${listHtml}</div>
    </div>`;

  root.querySelector('#calPrev')?.addEventListener('click', () => {
    calViewMonth -= 1;
    if (calViewMonth < 0) { calViewMonth = 11; calViewYear -= 1; }
    calSelectedISO = null;
    renderCalendarBoard(events);
  });
  root.querySelector('#calNext')?.addEventListener('click', () => {
    calViewMonth += 1;
    if (calViewMonth > 11) { calViewMonth = 0; calViewYear += 1; }
    calSelectedISO = null;
    renderCalendarBoard(events);
  });
  root.querySelector('#calReset')?.addEventListener('click', () => {
    if (!calSelectedISO) return;
    calSelectedISO = null;
    renderCalendarBoard(events);
  });
  root.querySelectorAll('.ev-day[data-iso]').forEach(btn => {
    btn.addEventListener('click', () => {
      const iso = btn.dataset.iso;
      calSelectedISO = calSelectedISO === iso ? null : iso;
      renderCalendarBoard(events);
    });
  });
  root.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

/* ── INIT ──────────────────────────────────────── */
function initCmsOnPage() {
  if (typeof CMS === 'undefined') return;
  CMS.applyPageExtras();
}

document.addEventListener('DOMContentLoaded', () => {
  initCmsOnPage();
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    if (typeof CMS !== 'undefined') renderIndexFromCMS();
    else initSlider();
  }
  if (page === 'faculty.html'    && typeof CMS !== 'undefined') renderFacultyFromCMS();
  if (page === 'about.html'      && typeof CMS !== 'undefined') { renderAboutFromCMS(); renderFacultyFromCMS(); }
  if (page === 'curriculum.html' && typeof CMS !== 'undefined') renderCurriculumFromCMS();
  if (page === 'resources.html'  && typeof CMS !== 'undefined') renderResourcesFromCMS();
  if (page === 'news.html' && typeof CMS !== 'undefined') renderPrFromCMS();
  if (page === 'activity.html' && typeof CMS !== 'undefined') renderActivityDetail();
});

/* ── Re-render CMS-driven content when the language changes ──
   (static [data-i18n] text is handled by i18n.js; this covers the
   JS-built grids: dept grid, news/activities, resources, curriculum) */
document.addEventListener('pds:langchange', () => {
  if (typeof CMS === 'undefined') return;
  const page = location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    renderDeptGrid();
    if (window.__pdsNewsPosts) paintIndexNews(window.__pdsNewsPosts);
    else { const ng = document.getElementById('newsGrid'); if (ng) renderManualNewsCards(ng); }
    const ag = document.getElementById('activityGrid');
    if (ag) renderManualNewsCards(ag, CMS.getActivities(), 4, { fullImage: true, useDetail: true });
  } else if (page === 'curriculum.html') {
    renderCurriculumFromCMS();
  } else if (page === 'resources.html') {
    renderResourcesFromCMS();
  } else if (page === 'news.html') {
    renderPrFromCMS();
  } else if (page === 'activity.html') {
    renderActivityDetail();
  }
});

/* ══════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════ */
(function () {

  /* ── Content index ─────────────────────────────── */
  const INDEX = [
    /* หน้าแรก */
    { page:'หน้าแรก', url:'index.html',
      title:'หน้าแรก — กลุ่มสาระการเรียนรู้เทคโนโลยี',
      excerpt:'กลุ่มสาระการเรียนรู้เทคโนโลยี โรงเรียนสาธิตปทุมวัน มศว', icon:'home' },

    /* เกี่ยวกับเรา */
    { page:'เกี่ยวกับเรา', url:'about.html',
      title:'เกี่ยวกับเรา',
      excerpt:'ปรัชญา วิสัยทัศน์ พันธกิจ กลุ่มสาระเทคโนโลยี', icon:'info' },
    { page:'เกี่ยวกับเรา', url:'about.html',
      title:'ปรัชญา',
      excerpt:'ความรู้และทักษะในงาน สร้างเสริมประสบการณ์ทักษะชีวิต', icon:'info' },
    { page:'เกี่ยวกับเรา', url:'about.html',
      title:'วิสัยทัศน์',
      excerpt:'เป็นแหล่งเรียนรู้วิชาการ และฝึกฝนประสบการณ์วิชาอาชีพ', icon:'info' },
    { page:'เกี่ยวกับเรา', url:'about.html',
      title:'พันธกิจ',
      excerpt:'ส่งเสริมทักษะชีวิต พัฒนาทักษะอาชีพ เทคโนโลยีดิจิทัล เสริมสร้างศักยภาพ', icon:'info' },

    /* บุคลากร */
    { page:'บุคลากร', url:'faculty.html',
      title:'บุคลากร',
      excerpt:'คณะผู้บริหารและครูผู้สอนกลุ่มสาระการเรียนรู้เทคโนโลยี', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'โชติวิทย์ ธรรมสุจิตร',
      excerpt:'ผู้อำนวยการโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.ปรเมษฐ์ คำจร',
      excerpt:'หัวหน้ากลุ่มสาระการเรียนรู้เทคโนโลยี', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.กิตติศักดิ์',
      excerpt:'วิชาเทคโนโลยีสารสนเทศ Computer Science', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.ณภัสวรรก์',
      excerpt:'วิชาคอมพิวเตอร์กราฟิก Digital Media', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.ปริยากร',
      excerpt:'วิชาคอมพิวเตอร์กราฟิก Procreate', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.กรวิชญ์',
      excerpt:'วิชาดิจิทัลมีเดีย การออกแบบสื่อ', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.อภิรัฐ',
      excerpt:'วิชาการโปรแกรมขั้นสูง ไมโครคอนโทรเลอร์', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.ดิเรก',
      excerpt:'วิชา Esports คณิตศาสตร์สำหรับคอมพิวเตอร์', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.เสกสรรค์',
      excerpt:'วิชาเทคโนโลยี Python การสร้างเว็บไซต์', icon:'people' },
    { page:'บุคลากร', url:'faculty.html',
      title:'อ.กิตติญา',
      excerpt:'วิชาการออกแบบ 3D Print โดรน', icon:'people' },

    /* หลักสูตร */
    { page:'หลักสูตร', url:'curriculum.html',
      title:'หลักสูตรกลุ่มสาระเทคโนโลยี',
      excerpt:'รายวิชาทั้งหมดในกลุ่มสาระ ม.1–ม.6 มัธยมต้น มัธยมปลาย', icon:'book' },
    { page:'หลักสูตร ม.1', url:'curriculum.html',
      title:'เทคโนโลยี 1 (ว21103)',
      excerpt:'วิชาพื้นฐาน ม.1 อ.เสกสรรค์', icon:'book' },
    { page:'หลักสูตร ม.1', url:'curriculum.html',
      title:'หุ่นยนต์คอมพิวเตอร์ 1 (ว21281)',
      excerpt:'วิชาเลือก ม.1 อ.ปรเมษฐ์ Robotics', icon:'book' },
    { page:'หลักสูตร ม.1', url:'curriculum.html',
      title:'คอมพิวเตอร์กราฟิกกับการออกแบบ (ว21282)',
      excerpt:'วิชาเลือก ม.1 อ.ปริยากร', icon:'book' },
    { page:'หลักสูตร ม.1', url:'curriculum.html',
      title:'การโปรแกรมภาษาซี 1 (ว21283)',
      excerpt:'วิชาเลือก ม.1 อ.กิตติศักดิ์ C Programming', icon:'book' },
    { page:'หลักสูตร ม.1', url:'curriculum.html',
      title:'การพัฒนาโปรแกรมภาษาไพทอน (ว21289)',
      excerpt:'วิชาเลือก ม.1 อ.เสกสรรค์ Python', icon:'book' },
    { page:'หลักสูตร ม.2', url:'curriculum.html',
      title:'เทคโนโลยี 2 (ว22103)',
      excerpt:'วิชาพื้นฐาน ม.2 อ.ณภัสวรรก์', icon:'book' },
    { page:'หลักสูตร ม.2', url:'curriculum.html',
      title:'วาดเส้นด้วย Procreate (ว22292)',
      excerpt:'วิชาเลือก ม.2 อ.ปริยากร Digital Art', icon:'book' },
    { page:'หลักสูตร ม.2', url:'curriculum.html',
      title:'นักพากย์กีฬา Esports 1 (ว22293)',
      excerpt:'วิชาเลือก ม.2 อ.ดิเรก', icon:'book' },
    { page:'หลักสูตร ม.3', url:'curriculum.html',
      title:'การโปรแกรมหุ่นยนต์คอมพิวเตอร์ (ว23282)',
      excerpt:'วิชาเลือก ม.3 อ.ปรเมษฐ์ Robotics', icon:'book' },
    { page:'หลักสูตร ม.3', url:'curriculum.html',
      title:'พื้นฐานการบินโดรน',
      excerpt:'วิชาเลือก ม.3 อ.กิตติญา Drone', icon:'book' },
    { page:'หลักสูตร ม.4', url:'curriculum.html',
      title:'เทคโนโลยี 1–2 ม.4 (ว31103–04)',
      excerpt:'วิชาพื้นฐาน ม.4 อ.กิตติศักดิ์', icon:'book' },
    { page:'หลักสูตร ม.4', url:'curriculum.html',
      title:'คอมพิวเตอร์กราฟิก (ว31296)',
      excerpt:'วิชาเอก DMT ม.4 อ.ปริยากร', icon:'book' },
    { page:'หลักสูตร ม.4', url:'curriculum.html',
      title:'พื้นฐานโปรแกรมปัญญาประดิษฐ์ (ว31294)',
      excerpt:'วิชาเอก AI ม.4 อ.กิตติญา', icon:'book' },
    { page:'หลักสูตร ม.4', url:'curriculum.html',
      title:'หุ่นยนต์อัตโนมัติ 1–2 (ว31284–85)',
      excerpt:'วิชาเลือก ม.4 อ.ปรเมษฐ์', icon:'book' },
    { page:'หลักสูตร ม.5', url:'curriculum.html',
      title:'การสร้างโมชั่นกราฟิก (ว32290)',
      excerpt:'วิชาเอก DMT ม.5 อ.ปริยากร Motion Graphics', icon:'book' },
    { page:'หลักสูตร ม.5', url:'curriculum.html',
      title:'การผลิตภาพยนตร์ (ว32291)',
      excerpt:'วิชาเอก DMT ม.5 อ.ณภัสวรรก์ Film', icon:'book' },
    { page:'หลักสูตร ม.5', url:'curriculum.html',
      title:'การโปรแกรมและปัญญาประดิษฐ์ (ว32295)',
      excerpt:'วิชาเอก AI ม.5 อ.กิตติญา', icon:'book' },
    { page:'หลักสูตร ม.6', url:'curriculum.html',
      title:'หลักสูตร ม.6',
      excerpt:'รายวิชาชั้นมัธยมศึกษาปีที่ 6 วิชาเอก AI และ DMT', icon:'book' },

    /* ประชาสัมพันธ์ */
    { page:'ประชาสัมพันธ์', url:'news.html#pr-activities',
      title:'กิจกรรม',
      excerpt:'กิจกรรมและโครงการของกลุ่มสาระเทคโนโลยี', icon:'book' },
    { page:'ประชาสัมพันธ์', url:'news.html#pr-calendar',
      title:'ปฏิทินกิจกรรม',
      excerpt:'ตารางและรายการกิจกรรมที่ประกาศผ่าน Admin', icon:'book' },

    /* แหล่งเรียนรู้ */
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'แพลตฟอร์มการเรียนรู้',
      excerpt:'เว็บไซต์และเครื่องมือสำหรับ AI หุ่นยนต์ โดรน กราฟิก โปรแกรมมิง', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Google Teachable Machine',
      excerpt:'สร้างโมเดล AI ด้วยภาพ เสียง ท่าทาง — ไม่ต้องเขียนโค้ด', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'MIT App Inventor',
      excerpt:'สร้างแอปมือถือด้วย Block-based programming', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Scratch',
      excerpt:'โปรแกรมมิงสำหรับเด็กและเยาวชน Block coding', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'freeCodeCamp',
      excerpt:'เรียนโปรแกรมมิงฟรี HTML CSS JavaScript Python', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Canva',
      excerpt:'ออกแบบกราฟิก โปสเตอร์ Presentation ออนไลน์', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Adobe Express',
      excerpt:'สร้างสื่อดิจิทัลด้วย Adobe Express', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Tinkercad',
      excerpt:'ออกแบบ 3D สำหรับงาน 3D Print และ Circuit', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'VEX VR',
      excerpt:'โปรแกรมหุ่นยนต์เสมือนจริง VEX Robotics', icon:'link' },
    { page:'แหล่งเรียนรู้', url:'resources.html',
      title:'Replit',
      excerpt:'เขียนโค้ดออนไลน์ Python JavaScript และภาษาอื่น ๆ', icon:'link' },

    /* ติดต่อ */
    { page:'ติดต่อ', url:'contact.html',
      title:'ติดต่อกลุ่มสาระฯ',
      excerpt:'ส่งข้อความถึงเรา อีเมล โทรศัพท์ ที่อยู่', icon:'mail' },
    { page:'ติดต่อ', url:'contact.html',
      title:'ที่อยู่',
      excerpt:'ถนนอังรีดูนังต์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพ 10330', icon:'mail' },
  ];

  /* ── Icons ─────────────────────────────────────── */
  const ICONS = {
    home:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    info:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    book:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    link:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    mail:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  };

  /* ── Helpers ────────────────────────────────────── */
  function esc(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function highlight(text, query) {
    if (!query) return text;
    return text.replace(new RegExp(`(${esc(query)})`, 'gi'), '<mark>$1</mark>');
  }
  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.page.toLowerCase().includes(q)
    ).slice(0, 10);
  }

  /* ── Quick links (shown when input is empty) ───── */
  const QUICK = [
    { page:'หน้าแรก',      url:'index.html',      title:'หน้าแรก',             icon:'home' },
    { page:'เกี่ยวกับเรา', url:'about.html',      title:'เกี่ยวกับเรา',         icon:'info' },
    { page:'บุคลากร',      url:'faculty.html',    title:'บุคลากร',             icon:'people' },
    { page:'หลักสูตร',     url:'curriculum.html', title:'หลักสูตร',            icon:'book' },
    { page:'แหล่งเรียนรู้',url:'resources.html',  title:'แพลตฟอร์มการเรียนรู้', icon:'link' },
    { page:'ติดต่อ',       url:'contact.html',    title:'ติดต่อกลุ่มสาระฯ',    icon:'mail' },
  ];

  /* ── Build overlay DOM ─────────────────────────── */
  function buildOverlay() {
    const div = document.createElement('div');
    div.className = 'search-overlay';
    div.id = 'searchOverlay';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-modal', 'true');
    div.setAttribute('aria-label', 'ค้นหา');
    div.innerHTML = `
      <div class="search-box">
        <div class="search-input-wrap">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.7"/>
            <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
          <input class="search-input" id="searchInput" type="search"
            placeholder="ค้นหาหน้า วิชา บุคลากร..." autocomplete="off" spellcheck="false"/>
          <button class="search-close-btn" id="searchCloseBtn" aria-label="ปิดค้นหา">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div id="searchBody"></div>
        <div class="search-hint">
          <span class="sh-tag"><span class="sh-key">Enter</span> เปิด</span>
          <span class="sh-tag"><span class="sh-key">↑↓</span> เลือก</span>
          <span class="sh-tag"><span class="sh-key">Esc</span> ปิด</span>
        </div>
      </div>`;
    document.body.appendChild(div);
    return div;
  }

  function makeItem(item, i, q) {
    return `<a class="search-result-item" href="${item.url}" data-idx="${i}">
        <div class="sri-icon">${ICONS[item.icon] || ICONS.link}</div>
        <div class="sri-body">
          <div class="sri-page">${item.page}</div>
          <div class="sri-title">${highlight(item.title, q)}</div>
          <div class="sri-excerpt">${highlight(item.excerpt, q)}</div>
        </div>
      </a>`;
  }

  /* ── Render results ─────────────────────────────── */
  function renderResults(items, q) {
    const body = document.getElementById('searchBody');
    if (!body) return;
    if (!q.trim()) {
      /* show quick navigation */
      body.innerHTML = `<div class="search-quick">
        <div class="search-quick-label">ไปยังหน้า</div>
        <div class="search-results">${QUICK.map((it,i) => makeItem(it,i,'')).join('')}</div>
      </div>`;
      return;
    }
    if (!items.length) {
      body.innerHTML = `<div class="search-empty">ไม่พบผลลัพธ์สำหรับ "<strong>${q}</strong>"</div>`;
      return;
    }
    body.innerHTML = `<div class="search-results">${items.map((it,i) => makeItem(it,i,q)).join('')}</div>`;
  }

  /* ── Keyboard navigation ────────────────────────── */
  let activeIdx = -1;
  function setActive(idx) {
    const items = document.querySelectorAll('#searchBody .search-result-item');
    items.forEach(el => el.classList.remove('active'));
    activeIdx = Math.max(-1, Math.min(idx, items.length - 1));
    if (activeIdx >= 0) {
      items[activeIdx].classList.add('active');
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  /* ── Open / Close ───────────────────────────────── */
  let overlay, input;

  function openSearch() {
    if (!overlay) {
      overlay = buildOverlay();
      input = document.getElementById('searchInput');

      input.addEventListener('input', () => {
        activeIdx = -1;
        const q = input.value;
        renderResults(search(q), q.trim());
      });

      overlay.addEventListener('keydown', e => {
        const items = document.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
        else if (e.key === 'Enter' && activeIdx >= 0) {
          e.preventDefault();
          document.querySelectorAll('#searchBody .search-result-item')[activeIdx]?.click();
        }
        else if (e.key === 'Escape') closeSearch();
      });

      document.getElementById('searchCloseBtn')?.addEventListener('click', closeSearch);
      overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 60);
  }

  function closeSearch() {
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    activeIdx = -1;
  }

  /* ── Wire up search buttons ─────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.search-btn').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });
    document.addEventListener('keydown', e => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/')) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          openSearch();
        }
      }
    });
  });

})();

/* ── Cookie consent banner ───────────────────────── */
(function initCookieConsent() {
  const COOKIE_KEY = 'pds_cookie_consent';
  const COOKIE_DAYS = 365;

  const COOKIE_SVG = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".12"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="9" cy="10" r="1.1" fill="currentColor"/>
    <circle cx="14" cy="8.5" r=".85" fill="currentColor"/>
    <circle cx="15" cy="13" r="1.05" fill="currentColor"/>
    <circle cx="10" cy="15" r=".75" fill="currentColor"/>
  </svg>`;
  const CHECK_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

  function hasConsent() {
    try {
      if (localStorage.getItem(COOKIE_KEY) === '1') return true;
    } catch (e) { /* blocked */ }
    return document.cookie.split(';').some(c => c.trim().startsWith(COOKIE_KEY + '=1'));
  }

  function setConsent() {
    try { localStorage.setItem(COOKIE_KEY, '1'); } catch (e) { /* blocked */ }
    const maxAge = COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `${COOKIE_KEY}=1; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  function refreshTexts(banner) {
    if (!banner) return;
    banner.setAttribute('aria-label', cmsT('cookie.aria', 'การแจ้งเตือนคุกกี้'));
    const title = banner.querySelector('[data-cookie-title]');
    const msg = banner.querySelector('[data-cookie-msg]');
    const policy = banner.querySelector('[data-cookie-policy]');
    const accept = banner.querySelector('[data-cookie-accept]');
    if (title) title.textContent = cmsT('cookie.title', 'คุกกี้ & ความเป็นส่วนตัว');
    if (msg) msg.textContent = cmsT('cookie.message', '');
    if (policy) policy.textContent = cmsT('cookie.policy', 'ดูรายละเอียด');
    if (accept) {
      accept.innerHTML = `${CHECK_SVG}<span>${cmsT('cookie.accept', 'ยอมรับทั้งหมด')}</span>`;
    }
  }

  function hideBanner(banner) {
    banner.classList.remove('cookie-banner--show');
    banner.classList.add('cookie-banner--hide');
    setTimeout(() => banner.remove(), 450);
  }

  function showBanner() {
    if (hasConsent()) return;
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div class="cookie-banner-backdrop" data-cookie-backdrop aria-hidden="true"></div>
      <div class="cookie-banner-card">
        <div class="cookie-banner-accent" aria-hidden="true"></div>
        <div class="cookie-banner-main">
          <div class="cookie-banner-icon">${COOKIE_SVG}</div>
          <div class="cookie-banner-content">
            <h2 class="cookie-banner-title" data-cookie-title></h2>
            <p class="cookie-banner-text" data-cookie-msg></p>
          </div>
        </div>
        <div class="cookie-banner-actions">
          <a class="cookie-banner-link" href="contact.html" data-cookie-policy></a>
          <button type="button" class="cookie-banner-btn" data-cookie-accept></button>
        </div>
      </div>`;
    refreshTexts(banner);
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('cookie-banner--show'));
    banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
      setConsent();
      hideBanner(banner);
    });
    banner.querySelector('[data-cookie-backdrop]')?.addEventListener('click', () => {
      setConsent();
      hideBanner(banner);
    });
    document.addEventListener('pds:langchange', () => refreshTexts(banner));
  }

  document.addEventListener('DOMContentLoaded', showBanner);
})();

/* ══════════════════════════════════════════════════
   MOURNING / ANNOUNCEMENT — ribbon + modal (CMS)
══════════════════════════════════════════════════ */
(function initMourningAnnounce() {
  /* Mourning ribbon icon — filled loop + tails */
  const RIBBON_SVG = `<svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m333.2 322.8-133.9-146-53.3-58.2c7.8-5.1 37-22.6 78-22.6s70.2 17.4 78 22.6L245.7 180l85.6 93.4 27.4-29.8c16.3-17.7 25.3-40.9 25.3-65v-29.5c0-19-5.6-37.5-16.1-53.3l-40.1-60.2C312.9 13.4 287.9 0 261.2 0h-76c-25.8 0-50.1 12.5-65.1 33.5L81.9 87C70.3 103.2 64 122.8 64 142.8V164c0 23.2 8.4 45.6 23.6 63.1l56 64.2 83.3 95.6 91.8 105.3c10 11.5 26.8 14.3 40 6.8l54.5-31.1c17.8-10.2 21.6-34.3 7.7-49.4zm-128 87.8L121.9 315 27.1 418.5c-13.9 15.1-10.1 39.2 7.7 49.4l55.1 31.5c13 7.4 29.3 4.9 39.4-6.1l75.9-82.6z"/></svg>`;
  const PLACEHOLDER_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="2"/><path d="M21 15l-5-5L5 21"/></svg>`;
  const MODAL_KEY = 'pds_mourn_modal_seen';

  function getMourning() {
    if (typeof CMS === 'undefined') return { enabled: false };
    return CMS.getMourning();
  }

  function mText(m, field) {
    const lang = (window.i18n && window.i18n.getLang()) || 'th';
    const enKey = field + '_en';
    if (lang === 'en' && m[enKey]) return m[enKey];
    return m[field] || '';
  }

  function applyGrayscaleFromCMS(m) {
    const wantGray = !!(m.enabled && m.grayscale);
    setMourning(wantGray);
    if (!wantGray) {
      try { localStorage.setItem('pds_mourning', '0'); } catch (_) {}
    }
  }

  let modalEl = null;

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    document.body.style.overflow = '';
    try { sessionStorage.setItem(MODAL_KEY, '1'); } catch (_) {}
  }

  function openModal(m) {
    if (!modalEl) buildModal(m);
    fillModal(m);
    modalEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalEl.querySelector('.mourn-modal__close')?.focus();
  }

  function fillModal(m) {
    if (!modalEl) return;
    const isMourn = (m.mode || 'mourning') === 'mourning';
    modalEl.classList.toggle('mourn-modal--mourning', isMourn);
    modalEl.classList.toggle('mourn-modal--announce', !isMourn);

    const eyebrow = modalEl.querySelector('[data-mourn-sub]');
    const title   = modalEl.querySelector('[data-mourn-title]');
    const body    = modalEl.querySelector('[data-mourn-body]');
    const footer  = modalEl.querySelector('[data-mourn-footer]');
    const link    = modalEl.querySelector('[data-mourn-link]');
    const photo   = modalEl.querySelector('[data-mourn-photo]');

    const sub = mText(m, 'subtitle');
    if (eyebrow) {
      eyebrow.textContent = sub;
      eyebrow.style.display = sub ? '' : 'none';
    }
    if (title) title.textContent = mText(m, 'title');
    if (body) body.textContent = mText(m, 'body');
    if (footer) {
      footer.textContent = mText(m, 'footer');
      footer.style.display = mText(m, 'footer') ? '' : 'none';
    }
    if (link) {
      const href = m.link || '';
      const label = mText(m, 'linkText') || mText(m, 'title');
      if (href && href !== '#') {
        link.href = href;
        link.textContent = label;
        link.style.display = '';
      } else {
        link.style.display = 'none';
      }
    }
    if (photo) {
      const src = m.image || '';
      if (src) {
        photo.innerHTML = `<img src="${src}" alt="" loading="lazy"/>`;
        photo.classList.remove('mourn-modal__photo--empty');
      } else {
        photo.innerHTML = PLACEHOLDER_SVG;
        photo.classList.add('mourn-modal__photo--empty');
      }
    }
  }

  function buildModal(m) {
    modalEl = document.createElement('div');
    modalEl.className = 'mourn-modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-labelledby', 'mournModalTitle');
    modalEl.innerHTML = `
      <div class="mourn-modal__backdrop" data-mourn-close></div>
      <div class="mourn-modal__box">
        <button type="button" class="mourn-modal__close" data-mourn-close aria-label="ปิด">×</button>
        <div class="mourn-modal__inner">
          <div class="mourn-modal__photo mourn-modal__photo--empty" data-mourn-photo>${PLACEHOLDER_SVG}</div>
          <div class="mourn-modal__text">
            <div class="mourn-modal__eyebrow" data-mourn-sub></div>
            <h2 class="mourn-modal__title" id="mournModalTitle" data-mourn-title></h2>
            <div class="mourn-modal__body" data-mourn-body></div>
            <a class="mourn-modal__link" data-mourn-link href="#" target="_blank" rel="noreferrer"></a>
            <p class="mourn-modal__footer" data-mourn-footer></p>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modalEl);
    modalEl.querySelectorAll('[data-mourn-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalEl?.classList.contains('is-open')) closeModal();
    });
    fillModal(m);
  }

  function buildRibbon(m) {
    if (document.getElementById('mournRibbonFab')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'mournRibbonFab';
    btn.className = 'mourn-ribbon-fab';
    btn.setAttribute('aria-label', mText(m, 'title') || 'ไว้อาลัย');
    btn.innerHTML = `<span class="mourn-ribbon-fab__badge">${RIBBON_SVG}</span>`;
    btn.addEventListener('click', () => openModal(m));
    document.body.appendChild(btn);
  }

  function maybeAutoOpen(m) {
    if (!m.showModal) return;
    if (m.modalOnce !== false) {
      try { if (sessionStorage.getItem(MODAL_KEY) === '1') return; } catch (_) {}
    }
    setTimeout(() => openModal(m), 600);
  }

  function boot() {
    const m = getMourning();
    applyGrayscaleFromCMS(m);
    if (!m.enabled) return;
    if (m.showRibbon !== false) buildRibbon(m);
    maybeAutoOpen(m);
  }

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('pds:langchange', () => {
    const m = getMourning();
    if (!m.enabled) return;
    fillModal(m);
    const fab = document.getElementById('mournRibbonFab');
    if (fab) fab.setAttribute('aria-label', mText(m, 'title') || 'ไว้อาลัย');
  });
})();
