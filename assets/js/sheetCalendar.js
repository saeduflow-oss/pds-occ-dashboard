/* ── SheetCalendar: pulls ปฏิทินกิจกรรม events live from the shared Google Sheet ──
   Sheet: https://docs.google.com/spreadsheets/d/1HKQec08ot28d2svlgoE2fQFIMHlzbS7q06aTDwk8mqw
   Tab: "events" — columns ID, Event Name, Start Date, End Date, Start Time, Attachment, ฝ่ายที่รับผิดชอบ
   Loaded via the gviz JSONP callback (a <script> tag, not fetch) so it also works when the
   site is opened directly as a file:// page, where cross-origin fetch() would be CORS-blocked. */
(function () {
  const SHEET_ID = '1HKQec08ot28d2svlgoE2fQFIMHlzbS7q06aTDwk8mqw';
  const SHEET_TAB = 'events';
  const CACHE_KEY = 'pds_sheet_calendar_cache_v1';
  const BAR_CLASSES = ['ni-1', 'ni-2', 'ni-3', 'ni-4'];
  const JSONP_TIMEOUT = 10000;

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  const deptColorMap = new Map();
  function bgForDept(dept) {
    if (!dept) return 'ni-1';
    if (!deptColorMap.has(dept)) deptColorMap.set(dept, BAR_CLASSES[deptColorMap.size % BAR_CLASSES.length]);
    return deptColorMap.get(dept);
  }

  function parseSheetDate(s) {
    const m = (s || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return '';
    const [, d, mo, y] = m;
    return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  function isHttpUrl(s) {
    return /^https?:\/\//i.test((s || '').trim());
  }

  function cellText(cell) {
    if (!cell) return '';
    if (typeof cell.v === 'string') return cell.v;
    if (typeof cell.f === 'string') return cell.f;
    if (cell.v != null) return String(cell.v);
    return '';
  }

  function cellDate(cell) {
    if (!cell) return '';
    if (typeof cell.f === 'string') return parseSheetDate(cell.f);
    return '';
  }

  function tableToEvents(table) {
    const cols = (table.cols || []).map(c => (c.label || '').trim().toLowerCase());
    const idx = {
      id: cols.indexOf('id'),
      title: cols.findIndex(h => h.includes('event')),
      start: cols.findIndex(h => h.includes('start date')),
      end: cols.findIndex(h => h.includes('end date')),
      time: cols.findIndex(h => h.includes('start time')),
      attachment: cols.findIndex(h => h.includes('attachment')),
      dept: cols.findIndex(h => h.includes('ฝ่าย'))
    };

    return (table.rows || []).map((row, i) => {
      const c = row.c || [];
      const title = cellText(c[idx.title]).trim();
      const date = cellDate(c[idx.start]);
      if (!title || !date) return null;
      const endDate = cellDate(c[idx.end]) || date;
      const time = cellText(c[idx.time]).trim();
      const attachment = cellText(c[idx.attachment]).trim();
      const dept = cellText(c[idx.dept]).trim();
      const id = cellText(c[idx.id]).trim() || `sheet-${i}`;
      return {
        id,
        title: escapeHtml(title),
        date,
        endDate,
        time: escapeHtml(time),
        tag: escapeHtml(dept),
        link: isHttpUrl(attachment) ? attachment.replace(/"/g, '%22') : '',
        bg: bgForDept(dept)
      };
    }).filter(Boolean);
  }

  function loadJsonp(url) {
    return new Promise((resolve, reject) => {
      const cbName = '__pdsSheetCb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      const script = document.createElement('script');
      let settled = false;

      const cleanup = () => {
        delete window[cbName];
        script.remove();
        clearTimeout(timer);
      };
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('sheet JSONP timed out'));
      }, JSONP_TIMEOUT);

      window[cbName] = (data) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(data);
      };
      script.onerror = () => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('sheet JSONP script failed to load'));
      };
      script.src = `${url}&tqx=out:json;responseHandler:${cbName}`;
      document.head.appendChild(script);
    });
  }

  let cached = null;
  let inflight = null;

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function writeCache(events) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(events)); } catch (e) { /* ignore */ }
  }

  function load() {
    if (inflight) return inflight;
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SHEET_TAB)}`;
    inflight = loadJsonp(url)
      .then(data => {
        const events = tableToEvents(data.table || {});
        cached = events;
        writeCache(events);
        return events;
      })
      .catch(err => {
        console.warn('[SheetCalendar] load failed, falling back to cache', err);
        cached = cached || readCache() || [];
        return cached;
      })
      .finally(() => { inflight = null; });
    return inflight;
  }

  window.SheetCalendar = {
    getCached() { return cached || readCache() || []; },
    load
  };
})();
