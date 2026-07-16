/* ════════════════════════════════════════
   CORE
════════════════════════════════════════ */
const PASS = 'admin1234';
const SITE_ROOT = '..';
const siteUrl = (path) => `${SITE_ROOT}/${String(path).replace(/^\//, '')}`;

function doLogin() {
  const val = document.getElementById('loginPass').value;
  if (val === PASS) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display = 'grid';
    loadAll();
  } else {
    document.getElementById('loginErr').style.display = 'block';
  }
}
document.getElementById('loginPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function doLogout() { location.reload(); }

function doReset() {
  if (!confirm('รีเซ็ตข้อมูลทั้งหมดเป็นค่าเริ่มต้น?\nการกระทำนี้ไม่สามารถย้อนกลับได้')) return;
  CMS.reset(); showToast('รีเซ็ตสำเร็จ'); loadAll();
}

function showToast(msg, ok = true) {
  const t = document.getElementById('toast');
  t.textContent = (ok ? '✓  ' : '⚠  ') + msg;
  t.style.borderLeftColor = ok ? '#c784b7' : '#f59e0b';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function showPanel(name, navEl) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');
  if (navEl) navEl.classList.add('active');
}

/* ── Mourning / announcement (CMS) ── */
function loadMourningForm() {
  const m = CMS.getMourning();
  document.getElementById('mr-enabled').checked     = !!m.enabled;
  document.getElementById('mr-grayscale').checked   = m.grayscale !== false;
  document.getElementById('mr-ribbon').checked      = m.showRibbon !== false;
  document.getElementById('mr-modal').checked       = m.showModal !== false;
  document.getElementById('mr-modal-once').checked  = m.modalOnce !== false;
  document.getElementById('mr-mode').value          = m.mode || 'mourning';
  document.getElementById('mr-title').value         = m.title || '';
  document.getElementById('mr-title-en').value      = m.title_en || '';
  document.getElementById('mr-sub').value           = m.subtitle || '';
  document.getElementById('mr-body').value          = m.body || '';
  document.getElementById('mr-body-en').value         = m.body_en || '';
  document.getElementById('mr-footer').value        = m.footer || '';
  document.getElementById('mr-image').value         = m.image || '';
  document.getElementById('mr-link').value            = m.link || '';
  document.getElementById('mr-link-text').value       = m.linkText || '';
  applyMourningPreview(m);
}
function collectMourningForm() {
  return {
    enabled:    document.getElementById('mr-enabled').checked,
    grayscale:  document.getElementById('mr-grayscale').checked,
    showRibbon: document.getElementById('mr-ribbon').checked,
    showModal:  document.getElementById('mr-modal').checked,
    modalOnce:  document.getElementById('mr-modal-once').checked,
    mode:       document.getElementById('mr-mode').value,
    title:      document.getElementById('mr-title').value,
    title_en:   document.getElementById('mr-title-en').value,
    subtitle:   document.getElementById('mr-sub').value,
    body:       document.getElementById('mr-body').value,
    body_en:    document.getElementById('mr-body-en').value,
    footer:     document.getElementById('mr-footer').value,
    image:      document.getElementById('mr-image').value.trim(),
    link:       document.getElementById('mr-link').value.trim(),
    linkText:   document.getElementById('mr-link-text').value
  };
}
function applyMourningPreview(m) {
  document.documentElement.classList.remove('mourning');
  document.body.style.filter = '';
  if (m.enabled && m.grayscale) {
    document.documentElement.classList.add('mourning');
    document.body.style.filter = 'grayscale(100%)';
  }
  try {
    localStorage.setItem('pds_mourning', (m.enabled && m.grayscale) ? '1' : '0');
  } catch (_) {}
}
function saveMourning() {
  const m = collectMourningForm();
  CMS.updateMourning(m);
  applyMourningPreview(m);
  showToast('บันทึกไว้อาลัย / ประกาศแล้ว');
}
function previewMourning() {
  const m = collectMourningForm();
  applyMourningPreview(m);
  window.open(siteUrl('index.html'), 'pds_mourn_preview', 'width=1280,height=800,scrollbars=yes,resizable=yes');
  showToast('เปิด Preview — รีเฟรชหน้าเว็บเพื่อดูป๊อปอัป');
}

function loadAll() {
  loadSite(); loadMourningForm(); loadSlider(); loadDept(); loadNews(); loadActivity();
  loadCalendar(); loadFaculty(); loadAbout(); loadCurriculum(); loadResources();
  buildLabelsForm(); loadHeroes(); loadContact(); loadDashboard();
}

/* ════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════ */
function loadDashboard() {
  document.getElementById('stat-slides').textContent     = CMS.getSlider().length;
  document.getElementById('stat-depts').textContent      = CMS.getDepts().length;
  document.getElementById('stat-news').textContent       = CMS.getNews().length;
  document.getElementById('stat-faculty').textContent    = CMS.getFaculty().length;
  document.getElementById('stat-activities').textContent = CMS.getActivities().length;
  document.getElementById('stat-calendar').textContent   = CMS.getCalendar().length;
  document.getElementById('stat-curriculum').textContent = CMS.getCurriculum().length;
  document.getElementById('stat-resources').textContent  = CMS.getResources().length;
}

/* ════════════════════════════════════════
   LIVE PREVIEW
════════════════════════════════════════ */
let previewWin = null;
function openPreview() {
  const url = siteUrl('index.html');
  if (previewWin && !previewWin.closed) {
    previewWin.location.reload();
    previewWin.focus();
  } else {
    previewWin = window.open(url, 'pds_preview', 'width=1280,height=800,scrollbars=yes,resizable=yes');
  }
  showToast('เปิด Preview แล้ว');
}

/* ════════════════════════════════════════
   EXPORT / IMPORT
════════════════════════════════════════ */
function exportData() {
  const data = CMS.get();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href     = url;
  a.download = `pds-occ-cms-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('ดาวน์โหลดไฟล์ JSON สำเร็จ');
}

function importData() {
  const input = document.createElement('input');
  input.type   = 'file';
  input.accept = '.json,application/json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.site || !Array.isArray(data.slider) || !Array.isArray(data.departments)) {
        showToast('ไฟล์ไม่ถูกต้อง — ต้องเป็น CMS export เท่านั้น', false);
        return;
      }
      if (!Array.isArray(data.news)) data.news = [];
      if (!Array.isArray(data.activities)) data.activities = [];
      if (!Array.isArray(data.calendar)) data.calendar = [];
      if (!Array.isArray(data.faculty)) data.faculty = [];
      if (!Array.isArray(data.curriculum)) data.curriculum = [];
      if (!Array.isArray(data.resources)) data.resources = [];
      if (!confirm(`นำเข้าข้อมูลจาก "${file.name}"?\nข้อมูลปัจจุบันจะถูกแทนที่`)) return;
      CMS.save(data);
      loadAll();
      showToast(`นำเข้าข้อมูลจาก ${file.name} สำเร็จ`);
    } catch {
      showToast('อ่านไฟล์ไม่ได้ — ตรวจสอบว่าเป็น JSON ที่ถูกต้อง', false);
    }
  };
  input.click();
}

/* ════════════════════════════════════════
   SITE INFO
════════════════════════════════════════ */
function loadSite() {
  const s = CMS.getSite();
  document.getElementById('s-name').value       = s.name       || '';
  document.getElementById('s-school').value     = s.school     || '';
  document.getElementById('s-philosophy').value = s.philosophy || '';
  document.getElementById('s-vision').value     = s.vision     || '';
  document.getElementById('s-mission').value    = s.mission    || '';
  document.getElementById('s-fb-page').value    = s.fb_page    || '';
  document.getElementById('s-fb-api').value     = s.fb_api_url || '';
}
function saveSite() {
  const apiUrl = document.getElementById('s-fb-api').value.trim().replace(/\/$/, '');
  CMS.updateSite({
    ...CMS.getSite(),
    name:       document.getElementById('s-name').value,
    school:     document.getElementById('s-school').value,
    philosophy: document.getElementById('s-philosophy').value,
    vision:     document.getElementById('s-vision').value,
    mission:    document.getElementById('s-mission').value,
    fb_page:    document.getElementById('s-fb-page').value.trim(),
    fb_api_url: apiUrl
  });
  const newsApi = document.getElementById('n-fb-api');
  if (newsApi) newsApi.value = apiUrl;
  showToast('บันทึกข้อมูลทั่วไปแล้ว');
}

/* ════════════════════════════════════════
   SLIDER
════════════════════════════════════════ */
let sliderData = [];
function loadSlider() { sliderData = CMS.getSlider(); renderSlider(); }
function renderSlider() {
  const bgOpts = ['di-1','di-2','di-3','di-4','di-5','di-6','di-7','di-8','di-9'].map(v => `<option value="${v}">${v}</option>`).join('');
  document.getElementById('sliderList').innerHTML = sliderData.map((s,i) => `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <strong>สไลด์ที่ ${i+1}</strong>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" onclick="moveSlide(${i},-1)">↑</button>`:''}
          ${i<sliderData.length-1?`<button class="btn-icon" onclick="moveSlide(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteSlide(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Eyebrow text</label><input class="form-input" value="${s.eyebrow||''}" oninput="sliderData[${i}].eyebrow=this.value"/></div>
      <div class="form-group"><label class="form-label">Eyebrow (EN)</label><input class="form-input" value="${s.eyebrow_en||''}" oninput="sliderData[${i}].eyebrow_en=this.value"/></div>
      <div class="form-group"><label class="form-label">หัวเรื่อง (HTML ได้)</label><textarea class="form-textarea" rows="2" oninput="sliderData[${i}].title=this.value">${s.title||''}</textarea></div>
      <div class="form-group"><label class="form-label">หัวเรื่อง (EN)</label><textarea class="form-textarea" rows="2" oninput="sliderData[${i}].title_en=this.value">${s.title_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">คำอธิบาย</label><textarea class="form-textarea" rows="2" oninput="sliderData[${i}].subtitle=this.value">${s.subtitle||''}</textarea></div>
      <div class="form-group"><label class="form-label">คำอธิบาย (EN)</label><textarea class="form-textarea" rows="2" oninput="sliderData[${i}].subtitle_en=this.value">${s.subtitle_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">URL รูปภาพพื้นหลัง</label>
        <div class="img-url-row">
          <input class="form-input" value="${s.image||''}" placeholder="https://images.unsplash.com/photo-..." oninput="sliderData[${i}].image=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${s.image||''}" ${s.image?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">สีพื้นหลัง (Fallback)</label><select class="form-select" onchange="sliderData[${i}].bg=this.value">${bgOpts.replace(`"${s.bg}"`,`"${s.bg}" selected`)}</select></div>
        <div class="form-group"><label class="form-label">ข้อความปุ่ม</label><input class="form-input" value="${s.linkText||'เรียนรู้เพิ่มเติม'}" oninput="sliderData[${i}].linkText=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">ลิงก์ปุ่ม</label><input class="form-input" value="${s.link||'about.html'}" oninput="sliderData[${i}].link=this.value"/></div>
    </div>`).join('') +
  `<button class="btn-save" style="margin-top:8px" onclick="saveSlider()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    บันทึก Slider ทั้งหมด
  </button>`;
}
function addSlide() {
  if (sliderData.length >= 5) { showToast('มีสไลด์สูงสุดแล้ว (5)', false); return; }
  sliderData.push({ id: CMS.nextId(sliderData), eyebrow: 'ข้อความใหม่', title: 'หัวเรื่อง', subtitle: 'คำอธิบาย', bg: 'di-1', link: 'about.html', linkText: 'เรียนรู้เพิ่มเติม' });
  renderSlider();
}
function deleteSlide(i) { if (!confirm('ลบสไลด์นี้?')) return; sliderData.splice(i,1); renderSlider(); }
function moveSlide(i,dir) { const j=i+dir; [sliderData[i],sliderData[j]]=[sliderData[j],sliderData[i]]; renderSlider(); }
function saveSlider() { CMS.updateSlider(sliderData); showToast('บันทึก Slider แล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   DEPARTMENTS
════════════════════════════════════════ */
let deptData = [];
function loadDept() { deptData = CMS.getDepts(); renderDept(); }
function renderDept() {
  const bgOpts = ['di-1','di-2','di-3','di-4','di-5','di-6','di-7','di-8','di-9'].map(v => `<option value="${v}">${v}</option>`).join('');
  document.getElementById('deptList').innerHTML = deptData.map((d,i) => `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <strong>${d.code} — ${d.name}</strong>
        <div class="cms-item-actions"><button class="btn-delete" onclick="deleteDept(${i})">ลบ</button></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">รหัส (เช่น AI, CODING)</label><input class="form-input" value="${d.code||''}" oninput="deptData[${i}].code=this.value"/></div>
        <div class="form-group"><label class="form-label">ชื่อภาษาไทย</label><input class="form-input" value="${d.name||''}" oninput="deptData[${i}].name=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">ชื่อภาษาอังกฤษ (EN)</label><input class="form-input" value="${d.name_en||''}" oninput="deptData[${i}].name_en=this.value"/></div>
      <div class="form-group"><label class="form-label">คำอธิบาย</label><textarea class="form-textarea" rows="2" oninput="deptData[${i}].desc=this.value">${d.desc||''}</textarea></div>
      <div class="form-group"><label class="form-label">คำอธิบาย (EN)</label><textarea class="form-textarea" rows="2" oninput="deptData[${i}].desc_en=this.value">${d.desc_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">URL รูปภาพ</label>
        <div class="img-url-row">
          <input class="form-input" value="${d.image||''}" placeholder="https://images.unsplash.com/photo-..." oninput="deptData[${i}].image=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${d.image||''}" ${d.image?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-group"><label class="form-label">สีพื้นหลัง</label><select class="form-select" onchange="deptData[${i}].bg=this.value">${bgOpts.replace(`"${d.bg}"`,`"${d.bg}" selected`)}</select></div>
      <button class="btn-save" onclick="saveDept()">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        บันทึกทั้งหมด
      </button>
    </div>`).join('');
}
function addDept() {
  deptData.push({ id: CMS.nextId(deptData), code: 'NEW', name: 'ชื่อ Department', desc: 'คำอธิบาย', bg: 'di-1' });
  renderDept();
}
function deleteDept(i) { if (!confirm('ลบ Department นี้?')) return; deptData.splice(i,1); renderDept(); }
function saveDept() { CMS.updateDepts(deptData); showToast('บันทึก Departments แล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   NEWS
════════════════════════════════════════ */
let newsData = [];
function loadNews() {
  newsData = CMS.getNews();
  renderNews();
  const site = CMS.getSite();
  const apiUrl = site.fb_api_url || '';
  document.getElementById('n-fb-api').value = apiUrl;
  const siteApi = document.getElementById('s-fb-api');
  if (siteApi) siteApi.value = apiUrl;
  if (apiUrl) document.getElementById('fbApiStatus').style.display = '';
}
function saveFbApi() {
  const url = document.getElementById('n-fb-api').value.trim().replace(/\/$/, '');
  CMS.updateSite({ ...CMS.getSite(), fb_api_url: url });
  const siteField = document.getElementById('s-fb-api');
  if (siteField) siteField.value = url;
  document.getElementById('fbApiStatus').style.display = url ? '' : 'none';
  showToast(url ? 'บันทึก Railway URL แล้ว' : 'ล้าง URL แล้ว — ใช้การ์ดด้านล่างแทน');
}
async function testFbApi() {
  const url = document.getElementById('n-fb-api').value.trim().replace(/\/$/, '');
  if (!url) { showToast('กรุณาใส่ URL ก่อน', false); return; }
  const statusEl = document.getElementById('fbApiStatus');
  statusEl.style.display = '';
  statusEl.style.cssText = 'display:inline-flex;font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px;background:#fef9c3;color:#854d0e;border:1px solid #fde68a';
  statusEl.textContent = '⏳ กำลังทดสอบ…';
  try {
    const res  = await fetch(`${url}/api/posts?limit=1`);
    const data = await res.json();
    if (data.posts && data.posts.length > 0) {
      statusEl.style.cssText = 'display:inline-flex;font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0';
      statusEl.textContent = `✓ เชื่อมต่อสำเร็จ — ดึงได้ ${data.posts.length} posts`;
      showToast('Railway API ใช้งานได้');
    } else { throw new Error('no posts'); }
  } catch {
    statusEl.style.cssText = 'display:inline-flex;font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px;background:#fff5f5;color:#c0392b;border:1px solid #fbc5c5';
    statusEl.textContent = '✗ เชื่อมต่อไม่ได้';
    showToast('ไม่สามารถเชื่อมต่อ Railway ได้ — ตรวจสอบ URL', false);
  }
}
function detectPlatform(url) {
  if (!url) return { cat:'', icon:'🔗', color:'' };
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { cat:'YouTube', icon:'▶', color:'#FF0000', videoId:ytMatch[1] };
  if (url.includes('facebook.com')||url.includes('fb.com')||url.includes('fb.watch'))
    return { cat:'Facebook · กลุ่มสาระเทคโนโลยี', icon:'f', color:'#1877F2' };
  if (url.includes('instagram.com')) return { cat:'Instagram', icon:'◉', color:'#E1306C' };
  if (url.includes('tiktok.com'))    return { cat:'TikTok', icon:'♪', color:'#000000' };
  if (url.includes('line.me')||url.includes('lin.ee')) return { cat:'LINE OA', icon:'L', color:'#06C755' };
  if (url.includes('twitter.com')||url.includes('x.com')) return { cat:'X (Twitter)', icon:'X', color:'#000000' };
  return { cat:'ลิงก์ทั่วไป', icon:'🔗', color:'#6958a6' };
}
async function addNewsFromLink() {
  const input  = document.getElementById('smartLinkInput');
  const btn    = document.querySelector('.btn-smart');
  const url    = input.value.trim();
  if (!url) { input.focus(); return; }
  const p      = detectPlatform(url);
  const orig   = btn.textContent;
  btn.textContent = '⏳ กำลังดึงข้อมูล…';
  btn.disabled = true;
  let title = '', image = '';
  try {
    const FB_PROXY = (CMS.getSite().fb_api_url || 'https://pds-occ-fb-proxy.onrender.com').replace(/\/$/, '');
    const res  = await fetch(`${FB_PROXY}/api/oembed?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    title = data.title || '';
    image = data.image || '';
  } catch { if (p.videoId) image = `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`; }
  btn.textContent = orig; btn.disabled = false;
  newsData.push({
    id: CMS.nextId(newsData),
    title: title || (p.cat ? `ติดตามข่าวสารล่าสุดผ่านช่องทาง ${p.cat}` : 'หัวข้อข่าวสาร'),
    cat: p.cat || 'ประชาสัมพันธ์', link: url,
    bg: ['ni-1','ni-2','ni-3','ni-4'][newsData.length % 4], image
  });
  input.value = ''; renderNews();
  showToast(`เพิ่มการ์ดจาก ${p.cat||'URL'} แล้ว ${title?'✓ ดึงข้อมูลได้':''}`);
}
function renderNews() {
  const bgOpts = ['ni-1','ni-2','ni-3','ni-4'].map(v => `<option value="${v}">${v}</option>`).join('');
  document.getElementById('newsList').innerHTML = newsData.map((n,i) => {
    const p = detectPlatform(n.link||'');
    const pb = p.cat ? `<span class="plat-badge" style="background:${p.color}15;color:${p.color};border-color:${p.color}30">${p.cat}</span>` : '';
    return `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <div style="display:flex;align-items:center;gap:8px"><strong>การ์ดที่ ${i+1}</strong>${pb}</div>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" title="ขึ้น" onclick="moveNews(${i},-1)">↑</button>`:''}
          ${i<newsData.length-1?`<button class="btn-icon" title="ลง" onclick="moveNews(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteNews(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-group"><label class="form-label">หัวข้อข่าว</label><textarea class="form-textarea" rows="2" oninput="newsData[${i}].title=this.value">${n.title||''}</textarea></div>
      <div class="form-group"><label class="form-label">หัวข้อข่าว (EN)</label><textarea class="form-textarea" rows="2" oninput="newsData[${i}].title_en=this.value">${n.title_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">URL รูปภาพ</label>
        <div class="img-url-row">
          <input class="form-input" value="${n.image||''}" placeholder="https://..." oninput="newsData[${i}].image=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${n.image||''}" ${n.image?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">หมวดหมู่ / แหล่งที่มา</label><input class="form-input" value="${n.cat||''}" oninput="newsData[${i}].cat=this.value"/></div>
        <div class="form-group"><label class="form-label">หมวดหมู่ (EN)</label><input class="form-input" value="${n.cat_en||''}" oninput="newsData[${i}].cat_en=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">สีพื้นหลัง</label><select class="form-select" onchange="newsData[${i}].bg=this.value">${bgOpts.replace(`"${n.bg||'ni-1'}"`,`"${n.bg||'ni-1'}" selected`)}</select></div>
      <div class="form-group"><label class="form-label">ลิงก์</label><input class="form-input" value="${n.link||''}" placeholder="https://..." oninput="newsData[${i}].link=this.value"/></div>
    </div>`;
  }).join('') + (newsData.length ? `<button class="btn-save" style="margin-top:4px" onclick="saveNews()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    บันทึกข่าวสารทั้งหมด
  </button>` : '');
}
function moveNews(i,dir){ const j=i+dir; [newsData[i],newsData[j]]=[newsData[j],newsData[i]]; renderNews(); }
function addNews() {
  newsData.push({ id: CMS.nextId(newsData), title: 'หัวข้อข่าวใหม่', cat: 'ประชาสัมพันธ์', bg: 'ni-1', link: '#', image: '' });
  renderNews();
}
function deleteNews(i) { if (!confirm('ลบข่าวนี้?')) return; newsData.splice(i,1); renderNews(); }
function saveNews() { CMS.updateNews(newsData); showToast('บันทึกข่าวสารแล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   ACTIVITIES
════════════════════════════════════════ */
let activityData = [];
function loadActivity() { activityData = CMS.getActivities(); renderActivity(); }
function renderActivity() {
  const bgOpts = ['ni-1','ni-2','ni-3','ni-4'].map(v => `<option value="${v}">${v}</option>`).join('');
  document.getElementById('activityList').innerHTML = activityData.map((n,i) => {
    const over = i >= 4 ? `<span class="plat-badge" style="background:#fff5f5;color:#c0392b;border-color:#fbc5c5">ไม่แสดง (เกิน 4)</span>` : '';
    return `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <div style="display:flex;align-items:center;gap:8px"><strong>การ์ดที่ ${i+1}</strong>${over}</div>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" title="ขึ้น" onclick="moveActivity(${i},-1)">↑</button>`:''}
          ${i<activityData.length-1?`<button class="btn-icon" title="ลง" onclick="moveActivity(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteActivity(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-group"><label class="form-label">หัวข้อกิจกรรม</label><textarea class="form-textarea" rows="2" oninput="activityData[${i}].title=this.value">${n.title||''}</textarea></div>
      <div class="form-group"><label class="form-label">หัวข้อกิจกรรม (EN)</label><textarea class="form-textarea" rows="2" oninput="activityData[${i}].title_en=this.value">${n.title_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">URL รูปภาพ</label>
        <div class="img-url-row">
          <input class="form-input" value="${n.image||''}" placeholder="https://..." oninput="activityData[${i}].image=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${n.image||''}" ${n.image?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">หมวดหมู่ / แหล่งที่มา</label><input class="form-input" value="${n.cat||''}" oninput="activityData[${i}].cat=this.value"/></div>
        <div class="form-group"><label class="form-label">หมวดหมู่ (EN)</label><input class="form-input" value="${n.cat_en||''}" oninput="activityData[${i}].cat_en=this.value"/></div>
        <div class="form-group"><label class="form-label">สีพื้นหลัง</label><select class="form-select" onchange="activityData[${i}].bg=this.value">${bgOpts.replace(`"${n.bg||'ni-1'}"`,`"${n.bg||'ni-1'}" selected`)}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">แท็ก (ป้ายกำกับ)</label><input class="form-input" value="${n.tag||''}" placeholder="ปีการศึกษา 2569" oninput="activityData[${i}].tag=this.value"/></div>
        <div class="form-group"><label class="form-label">แท็ก (EN)</label><input class="form-input" value="${n.tag_en||''}" oninput="activityData[${i}].tag_en=this.value"/></div>
        <div class="form-group"><label class="form-label">วันที่ประกาศ</label><input class="form-input" type="date" value="${n.publishedDate||''}" oninput="activityData[${i}].publishedDate=this.value"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">วันที่เริ่ม</label><input class="form-input" type="date" value="${n.date||''}" oninput="activityData[${i}].date=this.value"/></div>
        <div class="form-group"><label class="form-label">วันที่สิ้นสุด</label><input class="form-input" type="date" value="${n.endDate||''}" oninput="activityData[${i}].endDate=this.value"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">ป้ายช่วงวันที่</label><input class="form-input" value="${n.dateLabel||''}" placeholder="วันที่รับสมัคร - วันที่ปิดรับ" oninput="activityData[${i}].dateLabel=this.value"/></div>
        <div class="form-group"><label class="form-label">ป้ายช่วงวันที่ (EN)</label><input class="form-input" value="${n.dateLabel_en||''}" oninput="activityData[${i}].dateLabel_en=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">เนื้อหารายละเอียด (ย่อหน้าละบรรทัดว่าง)</label><textarea class="form-textarea" rows="4" oninput="activityData[${i}].body=this.value">${n.body||''}</textarea></div>
      <div class="form-group"><label class="form-label">เนื้อหารายละเอียด (EN)</label><textarea class="form-textarea" rows="4" oninput="activityData[${i}].body_en=this.value">${n.body_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">ลิงก์ภายนอก (ปุ่มดูเพิ่มเติม)</label><input class="form-input" value="${n.link||''}" placeholder="https://..." oninput="activityData[${i}].link=this.value"/></div>
    </div>`;
  }).join('') + (activityData.length ? `<button class="btn-save" style="margin-top:4px" onclick="saveActivity()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    บันทึกกิจกรรมทั้งหมด
  </button>` : '');
}
function moveActivity(i,dir){ const j=i+dir; [activityData[i],activityData[j]]=[activityData[j],activityData[i]]; renderActivity(); }
function addActivity() {
  activityData.push({ id: CMS.nextId(activityData), title: 'หัวข้อกิจกรรมใหม่', cat: 'กิจกรรม', bg: ['ni-1','ni-2','ni-3','ni-4'][activityData.length % 4], link: '#', image: '' });
  renderActivity();
}
function deleteActivity(i) { if (!confirm('ลบกิจกรรมนี้?')) return; activityData.splice(i,1); renderActivity(); }
function saveActivity() { CMS.updateActivities(activityData); showToast('บันทึกกิจกรรมแล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   CALENDAR
════════════════════════════════════════ */
let calendarData = [];
function loadCalendar() { calendarData = CMS.getCalendar(); renderCalendarAdmin(); }
function renderCalendarAdmin() {
  const bgOpts = ['ni-1','ni-2','ni-3','ni-4'].map(v => `<option value="${v}">${v}</option>`).join('');
  document.getElementById('calendarList').innerHTML = calendarData.map((ev,i) => `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <strong>กิจกรรม #${i+1}</strong>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" title="ขึ้น" onclick="moveCalendar(${i},-1)">↑</button>`:''}
          ${i<calendarData.length-1?`<button class="btn-icon" title="ลง" onclick="moveCalendar(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteCalendar(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-group"><label class="form-label">ชื่อกิจกรรม</label><input class="form-input" value="${ev.title||''}" oninput="calendarData[${i}].title=this.value"/></div>
      <div class="form-group"><label class="form-label">ชื่อกิจกรรม (EN)</label><input class="form-input" value="${ev.title_en||''}" oninput="calendarData[${i}].title_en=this.value"/></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">เชื่อมการ์ดกิจกรรม (ID)</label><input class="form-input" type="number" min="1" value="${ev.activityId||''}" placeholder="เว้นว่างถ้าไม่เชื่อม" oninput="calendarData[${i}].activityId=this.value?+this.value:''"/></div>
        <div class="form-group"><label class="form-label">วันที่ประกาศ</label><input class="form-input" type="date" value="${ev.publishedDate||''}" oninput="calendarData[${i}].publishedDate=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">URL รูปภาพ</label>
        <div class="img-url-row">
          <input class="form-input" value="${ev.image||''}" placeholder="https://..." oninput="calendarData[${i}].image=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${ev.image||''}" ${ev.image?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">วันที่เริ่ม</label><input class="form-input" type="date" value="${ev.date||''}" oninput="calendarData[${i}].date=this.value"/></div>
        <div class="form-group"><label class="form-label">วันที่สิ้นสุด (ถ้ามี)</label><input class="form-input" type="date" value="${ev.endDate||''}" oninput="calendarData[${i}].endDate=this.value"/></div>
        <div class="form-group"><label class="form-label">เวลา</label><input class="form-input" value="${ev.time||''}" placeholder="09:00–12:00" oninput="calendarData[${i}].time=this.value"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">สถานที่</label><input class="form-input" value="${ev.location||''}" oninput="calendarData[${i}].location=this.value"/></div>
        <div class="form-group"><label class="form-label">สถานที่ (EN)</label><input class="form-input" value="${ev.location_en||''}" oninput="calendarData[${i}].location_en=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">รายละเอียด</label><textarea class="form-textarea" rows="2" oninput="calendarData[${i}].desc=this.value">${ev.desc||''}</textarea></div>
      <div class="form-group"><label class="form-label">รายละเอียด (EN)</label><textarea class="form-textarea" rows="2" oninput="calendarData[${i}].desc_en=this.value">${ev.desc_en||''}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">แท็ก</label><input class="form-input" value="${ev.tag||''}" oninput="calendarData[${i}].tag=this.value"/></div>
        <div class="form-group"><label class="form-label">แท็ก (EN)</label><input class="form-input" value="${ev.tag_en||''}" oninput="calendarData[${i}].tag_en=this.value"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">ป้ายช่วงวันที่</label><input class="form-input" value="${ev.dateLabel||''}" oninput="calendarData[${i}].dateLabel=this.value"/></div>
        <div class="form-group"><label class="form-label">ป้ายช่วงวันที่ (EN)</label><input class="form-input" value="${ev.dateLabel_en||''}" oninput="calendarData[${i}].dateLabel_en=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">เนื้อหาหน้ารายละเอียด</label><textarea class="form-textarea" rows="4" oninput="calendarData[${i}].body=this.value">${ev.body||''}</textarea></div>
      <div class="form-group"><label class="form-label">เนื้อหาหน้ารายละเอียด (EN)</label><textarea class="form-textarea" rows="4" oninput="calendarData[${i}].body_en=this.value">${ev.body_en||''}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">สีแถบ</label><select class="form-select" onchange="calendarData[${i}].bg=this.value">${bgOpts.replace(`"${ev.bg||'ni-1'}"`,`"${ev.bg||'ni-1'}" selected`)}</select></div>
        <div class="form-group"><label class="form-label">ลิงก์ (ถ้ามี)</label><input class="form-input" value="${ev.link||''}" placeholder="https://..." oninput="calendarData[${i}].link=this.value"/></div>
      </div>
    </div>`).join('') + (calendarData.length ? `<button class="btn-save" style="margin-top:4px" onclick="saveCalendar()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    บันทึกปฏิทินกิจกรรม
  </button>` : '');
}
function moveCalendar(i,dir){ const j=i+dir; [calendarData[i],calendarData[j]]=[calendarData[j],calendarData[i]]; renderCalendarAdmin(); }
function addCalendarEvent() {
  calendarData.push({ id: CMS.nextId(calendarData), title: 'กิจกรรมใหม่', date: new Date().toISOString().slice(0,10), endDate: '', time: '', location: '', desc: '', link: '', bg: 'ni-1' });
  renderCalendarAdmin();
}
function deleteCalendar(i) { if (!confirm('ลบกิจกรรมนี้?')) return; calendarData.splice(i,1); renderCalendarAdmin(); }
function saveCalendar() { CMS.updateCalendar(calendarData); showToast('บันทึกปฏิทินกิจกรรมแล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   IMAGE PREVIEW
════════════════════════════════════════ */
function refreshImgPreview(input) {
  const img = input.parentElement.querySelector('.img-preview');
  if (!img) return;
  if (input.value) { img.src = input.value; img.style.display = ''; img.onerror = () => { img.style.display = 'none'; }; }
  else { img.style.display = 'none'; }
}

/* ════════════════════════════════════════
   FACULTY
════════════════════════════════════════ */
let facultyData = [];
function loadFaculty() { facultyData = CMS.getFaculty(); renderFaculty(); }
function renderFaculty() {
  const roleLabel = { director:'ผู้อำนวยการโรงเรียน', deputy:'รองผู้อำนวยการ', head:'หัวหน้ากลุ่มสาระ', teacher:'ครูผู้สอน' };
  document.getElementById('facultyList').innerHTML = facultyData.map((f,i) => `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <strong>${f.name} <span style="font-weight:400;opacity:.55;font-size:.82em">(${roleLabel[f.role]||f.role})</span></strong>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" onclick="moveFaculty(${i},-1)">↑</button>`:''}
          ${i<facultyData.length-1?`<button class="btn-icon" onclick="moveFaculty(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteFaculty(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">ชื่อ-นามสกุล</label><input class="form-input" value="${f.name||''}" oninput="facultyData[${i}].name=this.value"/></div>
        <div class="form-group"><label class="form-label">ตำแหน่งในระบบ</label>
          <select class="form-select" onchange="facultyData[${i}].role=this.value">
            <option value="director" ${f.role==='director'?'selected':''}>ผู้อำนวยการโรงเรียน</option>
            <option value="deputy"   ${f.role==='deputy'  ?'selected':''}>รองผู้อำนวยการ</option>
            <option value="head"     ${f.role==='head'    ?'selected':''}>หัวหน้ากลุ่มสาระ</option>
            <option value="teacher"  ${f.role==='teacher' ?'selected':''}>ครูผู้สอน</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">URL รูปภาพ</label>
        <div class="img-url-row">
          <input class="form-input" value="${f.photo||''}" placeholder="https://..." oninput="facultyData[${i}].photo=this.value;refreshImgPreview(this)"/>
          <img class="img-preview round" src="${f.photo||''}" ${f.photo?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-group"><label class="form-label">อีเมล</label><input class="form-input" type="email" value="${f.email||''}" placeholder="example@swu.ac.th" oninput="facultyData[${i}].email=this.value"/></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">กลุ่มงาน / แผนก</label><input class="form-input" value="${f.dept||''}" oninput="facultyData[${i}].dept=this.value"/></div>
        <div class="form-group"><label class="form-label">วิชาที่สอน</label><input class="form-input" value="${f.subject||''}" oninput="facultyData[${i}].subject=this.value"/></div>
      </div>
      <div class="form-group"><label class="form-label">แท็กความเชี่ยวชาญ (คั่นด้วยจุลภาค)</label><input class="form-input" value="${Array.isArray(f.tag)?f.tag.join(', '):(f.tag||'')}" oninput="facultyData[${i}].tag=this.value.split(',').map(t=>t.trim()).filter(Boolean)"/></div>
      <button class="btn-save" onclick="saveFaculty()">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        บันทึกทั้งหมด
      </button>
    </div>`).join('');
}
function moveFaculty(i,dir){ const j=i+dir; [facultyData[i],facultyData[j]]=[facultyData[j],facultyData[i]]; renderFaculty(); }
function addFaculty() {
  facultyData.push({ id: CMS.nextId(facultyData), name:'ชื่อ-นามสกุล', dept:'กลุ่มงาน', subject:'วิชาที่สอน', role:'teacher', photo:'', email:'', tag:[] });
  renderFaculty();
}
function deleteFaculty(i){ if (!confirm('ลบบุคลากรนี้?')) return; facultyData.splice(i,1); renderFaculty(); }
function saveFaculty(){ CMS.updateFaculty(facultyData); showToast('บันทึกข้อมูลบุคลากรแล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   CURRICULUM
════════════════════════════════════════ */
let currData = [];
let currActiveGrade = 1;

function loadCurriculum() { currData = CMS.getCurriculum(); renderCurriculum(); }

function currShowGrade(g) {
  currActiveGrade = g;
  document.querySelectorAll('#currGradeTabs .btn-icon').forEach(b => b.classList.remove('active'));
  document.getElementById('cgTab-' + g)?.classList.add('active');
  renderCurriculum();
}

function renderCurriculum() {
  const typeLabel = { core: 'วิชาพื้นฐาน', major: 'วิชาเอก', elec: 'วิชาเลือกเพิ่ม' };
  const trackOpts = `
    <option value="">ไม่มี (เลือกทั่วไป)</option>
    <option value="ai">เอก AI</option>
    <option value="dmt">เอก DMT</option>`;
  const typeOpts = `
    <option value="core">วิชาพื้นฐาน</option>
    <option value="major">วิชาเอก</option>
    <option value="elec">วิชาเลือกเพิ่ม</option>`;
  const gradeOpts = [1,2,3,4,5,6].map(g => `<option value="${g}">ม.${g}</option>`).join('');

  const filtered = currData.filter(c => c.grade === currActiveGrade);

  document.getElementById('currCourseList').innerHTML = (filtered.length
    ? filtered.map((c, fi) => {
      const i = currData.indexOf(c);
      return `<div class="admin-section cms-item">
        <div class="cms-item-head">
          <strong>${c.code} — ${c.name} <span style="font-weight:400;opacity:.5;font-size:.8em">(${typeLabel[c.type]||c.type}${c.track?' · เอก '+c.track.toUpperCase():''})</span></strong>
          <div class="cms-item-actions">
            <button class="btn-delete" onclick="deleteCourse(${i})">ลบ</button>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">รหัสวิชา</label><input class="form-input" value="${c.code||''}" oninput="currData[${i}].code=this.value"/></div>
          <div class="form-group"><label class="form-label">ชื่อวิชา</label><input class="form-input" value="${c.name||''}" oninput="currData[${i}].name=this.value"/></div>
        </div>
        <div class="form-group"><label class="form-label">ชื่อวิชา (EN)</label><input class="form-input" value="${c.name_en||''}" oninput="currData[${i}].name_en=this.value"/></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">ครูผู้สอน</label><input class="form-input" value="${c.teacher||''}" oninput="currData[${i}].teacher=this.value"/></div>
          <div class="form-group"><label class="form-label">ภาคเรียน</label><input class="form-input" value="${c.sem||''}" placeholder="เทอม 1, 2" oninput="currData[${i}].sem=this.value"/></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">ระดับชั้น</label>
            <select class="form-select" onchange="currData[${i}].grade=parseInt(this.value);renderCurriculum()">${gradeOpts.replace(`value="${c.grade}"`,`value="${c.grade}" selected`)}</select>
          </div>
          <div class="form-group"><label class="form-label">ประเภทวิชา</label>
            <select class="form-select" onchange="currData[${i}].type=this.value;renderCurriculum()">${typeOpts.replace(`value="${c.type}"`,`value="${c.type}" selected`)}</select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">สาขา (วิชาเอก)</label>
            <select class="form-select" onchange="currData[${i}].track=this.value">${trackOpts.replace(`value="${c.track||''}"`,`value="${c.track||''}" selected`)}</select>
          </div>
          <div class="form-group" style="display:flex;align-items:flex-end;gap:8px;padding-bottom:2px">
            <label style="display:flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;color:#6b6480;cursor:pointer">
              <input type="checkbox" ${c.pending?'checked':''} onchange="currData[${i}].pending=this.checked" style="width:14px;height:14px;accent-color:#6958a6"/>
              รอเปิดใช้งาน
            </label>
          </div>
        </div>
        <button class="btn-save" onclick="saveCurriculum()">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          บันทึกทั้งหมด
        </button>
      </div>`;
    }).join('')
    : `<div style="padding:24px;text-align:center;color:#9186a8;font-size:.84rem;background:#faf9ff;border:1px dashed #e4e0f0;border-radius:10px">ยังไม่มีรายวิชาในระดับนี้</div>`
  );
}

function addCourse() {
  currData.push({
    id: CMS.nextId(currData), grade: currActiveGrade, type: 'core',
    code: 'วXXXXX', name: 'ชื่อวิชาใหม่', teacher: '', sem: 'เทอม 1', track: '', pending: false
  });
  renderCurriculum();
}
function deleteCourse(i) { if (!confirm('ลบรายวิชานี้?')) return; currData.splice(i,1); renderCurriculum(); }
function saveCurriculum() { CMS.updateCurriculum(currData); showToast('บันทึกหลักสูตรแล้ว'); }

/* ════════════════════════════════════════
   RESOURCES
════════════════════════════════════════ */
let resData = [];
function loadResources() { resData = CMS.getResources(); renderResources(); }

function renderResources() {
  const typeOpts = `
    <option value="website">เว็บไซต์ / แพลตฟอร์ม</option>
    <option value="book">หนังสือ</option>
    <option value="journal">วารสาร</option>
    <option value="research">งานวิจัย</option>`;
  const catOpts = `
    <option value="ai">AI</option>
    <option value="robot">หุ่นยนต์</option>
    <option value="drone">โดรน</option>
    <option value="cg">กราฟิก</option>
    <option value="dmt">ดิจิทัลมีเดีย</option>
    <option value="code">โปรแกรมมิง</option>`;

  document.getElementById('resourceList').innerHTML = resData.map((r,i) => `
    <div class="admin-section cms-item">
      <div class="cms-item-head">
        <strong>${r.name}</strong>
        <div class="cms-item-actions">
          ${i>0?`<button class="btn-icon" onclick="moveRes(${i},-1)">↑</button>`:''}
          ${i<resData.length-1?`<button class="btn-icon" onclick="moveRes(${i},1)">↓</button>`:''}
          <button class="btn-delete" onclick="deleteRes(${i})">ลบ</button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">ชื่อแหล่งเรียนรู้</label><input class="form-input" value="${r.name||''}" oninput="resData[${i}].name=this.value"/></div>
        <div class="form-group"><label class="form-label">ประเภท (แสดงในหน้า Resources)</label>
          <select class="form-select" onchange="resData[${i}].type=this.value">${typeOpts.replace(`value="${r.type||'website'}"`,`value="${r.type||'website'}" selected`)}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">หมวดหมู่</label>
          <select class="form-select" onchange="resData[${i}].cat=this.value">${catOpts.replace(`value="${r.cat}"`,`value="${r.cat}" selected`)}</select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">คำอธิบาย</label><textarea class="form-textarea" rows="2" oninput="resData[${i}].desc=this.value">${r.desc||''}</textarea></div>
      <div class="form-group"><label class="form-label">คำอธิบาย (EN)</label><textarea class="form-textarea" rows="2" oninput="resData[${i}].desc_en=this.value">${r.desc_en||''}</textarea></div>
      <div class="form-group"><label class="form-label">URL เว็บไซต์</label><input class="form-input" type="url" value="${r.url||''}" placeholder="https://..." oninput="resData[${i}].url=this.value"/></div>
      <div class="form-group"><label class="form-label">URL โลโก้ / ไอคอน</label>
        <div class="img-url-row">
          <input class="form-input" value="${r.logo||''}" placeholder="https://cdn.simpleicons.org/..." oninput="resData[${i}].logo=this.value;refreshImgPreview(this)"/>
          <img class="img-preview" src="${r.logo||''}" ${r.logo?'':'style="display:none"'} onerror="this.style.display='none'" alt="preview"/>
        </div>
      </div>
      <div class="form-group"><label class="form-label">สี background (CSS gradient)</label><input class="form-input" value="${r.bg||''}" placeholder="linear-gradient(135deg,#e8f4fd,#d0e8ff)" oninput="resData[${i}].bg=this.value"/></div>
      <button class="btn-save" onclick="saveResources()">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        บันทึกทั้งหมด
      </button>
    </div>`).join('') + (resData.length ? `<button class="btn-save" style="margin-top:4px" onclick="saveResources()">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      บันทึกทั้งหมด
    </button>` : '');
}
function moveRes(i,dir){ const j=i+dir; [resData[i],resData[j]]=[resData[j],resData[i]]; renderResources(); }
function addResource() {
  resData.push({ id: CMS.nextId(resData), type:'website', name:'ชื่อแหล่งเรียนรู้', desc:'คำอธิบาย', url:'https://', cat:'ai', logo:'', bg:'linear-gradient(135deg,#e8f4fd,#d0e8ff)' });
  renderResources();
}
function deleteRes(i){ if (!confirm('ลบแหล่งเรียนรู้นี้?')) return; resData.splice(i,1); renderResources(); }
function saveResources(){ CMS.updateResources(resData); showToast('บันทึกแหล่งเรียนรู้แล้ว'); loadDashboard(); }

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
function loadAbout() {
  const ab = CMS.getAbout();
  document.getElementById('ab-phil-badge').value     = ab.phil_badge     || '';
  document.getElementById('ab-phil-badge-en').value  = ab.phil_badge_en  || '';
  document.getElementById('ab-phil-text').value      = ab.phil_text      || '';
  document.getElementById('ab-phil-text-en').value   = ab.phil_text_en   || '';
  document.getElementById('ab-phil-sub').value      = ab.phil_sub       || '';
  document.getElementById('ab-phil-sub-en').value   = ab.phil_sub_en    || '';
  document.getElementById('ab-vision').value        = ab.vision_text    || '';
  document.getElementById('ab-vision-en').value     = ab.vision_text_en || '';
  document.getElementById('ab-mc1-title').value     = ab.mc1_title      || '';
  document.getElementById('ab-mc1-title-en').value  = ab.mc1_title_en   || '';
  document.getElementById('ab-mc1-text').value      = ab.mc1_text       || '';
  document.getElementById('ab-mc1-text-en').value   = ab.mc1_text_en    || '';
  document.getElementById('ab-mc2-title').value     = ab.mc2_title      || '';
  document.getElementById('ab-mc2-title-en').value  = ab.mc2_title_en   || '';
  document.getElementById('ab-mc2-text').value      = ab.mc2_text       || '';
  document.getElementById('ab-mc2-text-en').value   = ab.mc2_text_en    || '';
  document.getElementById('ab-mc3-title').value     = ab.mc3_title      || '';
  document.getElementById('ab-mc3-title-en').value  = ab.mc3_title_en   || '';
  document.getElementById('ab-mc3-text').value      = ab.mc3_text       || '';
  document.getElementById('ab-mc3-text-en').value   = ab.mc3_text_en    || '';
  document.getElementById('ab-mc4-title').value     = ab.mc4_title      || '';
  document.getElementById('ab-mc4-title-en').value  = ab.mc4_title_en   || '';
  document.getElementById('ab-mc4-text').value      = ab.mc4_text       || '';
  document.getElementById('ab-mc4-text-en').value   = ab.mc4_text_en    || '';
}
function saveAbout() {
  CMS.updateAbout({
    ...CMS.getAbout(),
    phil_badge:     document.getElementById('ab-phil-badge').value,
    phil_badge_en:  document.getElementById('ab-phil-badge-en').value,
    phil_text:      document.getElementById('ab-phil-text').value,
    phil_text_en:   document.getElementById('ab-phil-text-en').value,
    phil_sub:      document.getElementById('ab-phil-sub').value,
    phil_sub_en:   document.getElementById('ab-phil-sub-en').value,
    vision_text:   document.getElementById('ab-vision').value,
    vision_text_en: document.getElementById('ab-vision-en').value,
    mc1_title:     document.getElementById('ab-mc1-title').value,
    mc1_title_en:  document.getElementById('ab-mc1-title-en').value,
    mc1_text:      document.getElementById('ab-mc1-text').value,
    mc1_text_en:   document.getElementById('ab-mc1-text-en').value,
    mc2_title:     document.getElementById('ab-mc2-title').value,
    mc2_title_en:  document.getElementById('ab-mc2-title-en').value,
    mc2_text:      document.getElementById('ab-mc2-text').value,
    mc2_text_en:   document.getElementById('ab-mc2-text-en').value,
    mc3_title:     document.getElementById('ab-mc3-title').value,
    mc3_title_en:  document.getElementById('ab-mc3-title-en').value,
    mc3_text:      document.getElementById('ab-mc3-text').value,
    mc3_text_en:   document.getElementById('ab-mc3-text-en').value,
    mc4_title:     document.getElementById('ab-mc4-title').value,
    mc4_title_en:  document.getElementById('ab-mc4-title-en').value,
    mc4_text:      document.getElementById('ab-mc4-text').value,
    mc4_text_en:   document.getElementById('ab-mc4-text-en').value
  });
  showToast('บันทึกหน้า About แล้ว');
}

/* ════════════════════════════════════════
   LABELS (UI TEXT)
════════════════════════════════════════ */
const LABEL_PREFIX_GROUPS = [
  { title: 'แบรนด์', prefixes: ['brand.'] },
  { title: 'เมนูนำทาง', prefixes: ['nav.'] },
  { title: 'ท้ายหน้า', prefixes: ['footer.'] },
  { title: 'หน้าแรก', prefixes: ['index.'] },
  { title: 'เกี่ยวกับเรา (ข้อความทั่วไป)', prefixes: ['about.hero.', 'about.stat.', 'about.vision.', 'about.mission.', 'about.dept.'] },
  { title: 'หลักสูตร', prefixes: ['curr.'] },
  { title: 'แหล่งเรียนรู้', prefixes: ['res.'] },
  { title: 'ติดต่อ', prefixes: ['contact.'] },
  { title: 'ข่าวสาร', prefixes: ['news.'] },
  { title: 'ประชาสัมพันธ์', prefixes: ['pr.'] }
];

const ABOUT_CMS_KEYS = new Set([
  'about.phil.badge', 'about.phil.text', 'about.phil.sub',
  'about.vision.text', 'about.mc1.title', 'about.mc1.text',
  'about.mc2.title', 'about.mc2.text', 'about.mc3.title', 'about.mc3.text',
  'about.mc4.title', 'about.mc4.text'
]);

function getEditableLabelKeys() {
  if (!window.i18n) return [];
  const keys = Object.keys(window.i18n.T.th);
  const prefixes = LABEL_PREFIX_GROUPS.flatMap(g => g.prefixes);
  return keys.filter(k => prefixes.some(p => k.startsWith(p)) && !ABOUT_CMS_KEYS.has(k)).sort();
}

function buildLabelsForm() {
  const root = document.getElementById('labelsForm');
  if (!root || !window.i18n) return;
  const labels = CMS.getLabels();
  const keys = getEditableLabelKeys();
  root.innerHTML = LABEL_PREFIX_GROUPS.map(group => {
    const groupKeys = keys.filter(k => group.prefixes.some(p => k.startsWith(p)));
    if (!groupKeys.length) return '';
    const rows = groupKeys.map(key => {
      const thVal = (labels.th && labels.th[key] !== undefined && labels.th[key] !== '')
        ? labels.th[key] : (window.i18n.T.th[key] || '');
      const enVal = (labels.en && labels.en[key] !== undefined && labels.en[key] !== '')
        ? labels.en[key] : (window.i18n.T.en[key] || '');
      return `<div class="label-row" data-label-row="${key}">
        <div class="label-key">${key}</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">TH</label>
            <textarea class="form-textarea label-field" rows="2" data-label-key="${key}" data-label-lang="th">${escHtml(thVal)}</textarea></div>
          <div class="form-group"><label class="form-label">EN</label>
            <textarea class="form-textarea label-field" rows="2" data-label-key="${key}" data-label-lang="en">${escHtml(enVal)}</textarea></div>
        </div>
      </div>`;
    }).join('');
    return `<details class="label-group" open><summary class="admin-section-title">${group.title}</summary>${rows}</details>`;
  }).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function filterLabelFields(q) {
  const term = (q || '').trim().toLowerCase();
  document.querySelectorAll('[data-label-row]').forEach(row => {
    const key = row.dataset.labelRow || '';
    row.style.display = !term || key.toLowerCase().includes(term) ? '' : 'none';
  });
}

function saveLabels() {
  const th = {}, en = {};
  document.querySelectorAll('[data-label-key]').forEach(input => {
    const key = input.dataset.labelKey;
    const lang = input.dataset.labelLang;
    if (lang === 'th') th[key] = input.value;
    else en[key] = input.value;
  });
  CMS.updateLabels({ th, en });
  showToast('บันทึกข้อความ UI แล้ว');
}

/* ════════════════════════════════════════
   HERO BACKGROUNDS
════════════════════════════════════════ */
function loadHeroes() {
  const h = CMS.getHeroes();
  document.getElementById('hero-about').value      = h.about?.image      || '';
  document.getElementById('hero-curriculum').value = h.curriculum?.image || '';
  document.getElementById('hero-resources').value  = h.resources?.image  || '';
  document.getElementById('hero-news').value       = h.news?.image       || '';
  document.getElementById('hero-contact').value    = h.contact?.image    || '';
}
function saveHeroes() {
  CMS.updateHeroes({
    about:      { image: document.getElementById('hero-about').value.trim() },
    curriculum: { image: document.getElementById('hero-curriculum').value.trim() },
    resources:  { image: document.getElementById('hero-resources').value.trim() },
    news:       { image: document.getElementById('hero-news').value.trim() },
    contact:    { image: document.getElementById('hero-contact').value.trim() }
  });
  showToast('บันทึก Hero แล้ว');
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
function loadContact() {
  const c = CMS.getContact();
  document.getElementById('ct-fb').value    = c.fb_url || '';
  document.getElementById('ct-maps').value  = c.maps_url || '';
  document.getElementById('ct-web').value   = c.web_url || '';
  document.getElementById('ct-phone').value = c.phone || '';
  document.getElementById('ct-email').value = c.email || '';
  document.getElementById('ct-ej-pk').value  = c.emailjs_public_key || '';
  document.getElementById('ct-ej-svc').value = c.emailjs_service_id || '';
  document.getElementById('ct-ej-tpl').value = c.emailjs_template_id || '';
}
function saveContact() {
  CMS.updateContact({
    fb_url: document.getElementById('ct-fb').value.trim(),
    maps_url: document.getElementById('ct-maps').value.trim(),
    web_url: document.getElementById('ct-web').value.trim(),
    phone: document.getElementById('ct-phone').value.trim(),
    email: document.getElementById('ct-email').value.trim(),
    emailjs_public_key: document.getElementById('ct-ej-pk').value.trim(),
    emailjs_service_id: document.getElementById('ct-ej-svc').value.trim(),
    emailjs_template_id: document.getElementById('ct-ej-tpl').value.trim()
  });
  showToast('บันทึกหน้าติดต่อแล้ว');
}
