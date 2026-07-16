/* ════════════════════════════════════════════════════
   PDS OCC — Facebook Posts Proxy
   Deploy on Railway, set env vars:
     FACEBOOK_PAGE_ID
     FACEBOOK_PAGE_ACCESS_TOKEN
     ALLOWED_ORIGIN  (optional, default *)
════════════════════════════════════════════════════ */

const express = require('express');
const cors    = require('cors');

try { require('dotenv').config(); } catch (_) { /* optional for local .env */ }

const app  = express();
const PORT = process.env.PORT || 3000;

const PAGE_ID      = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const ALLOWED      = process.env.ALLOWED_ORIGIN || '*';

// ── CORS ──────────────────────────────────────────
app.use(cors({
  origin: ALLOWED,
  methods: ['GET'],
  optionsSuccessStatus: 200
}));

// ── In-memory cache (5 min) ───────────────────────
let _cache = { data: null, ts: 0 };
const CACHE_TTL = 5 * 60 * 1000;

// ── Helpers ───────────────────────────────────────
function formatDateTH(iso) {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function truncate(str, max = 140) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max).trimEnd() + '…' : str;
}

// ── Main endpoint ─────────────────────────────────
app.get('/api/posts', async (req, res) => {
  if (!PAGE_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN env vars' });
  }

  const after = req.query.after || '';  // pagination cursor

  // Serve from cache only on first page (no cursor) if still fresh
  if (!after && _cache.data && Date.now() - _cache.ts < CACHE_TTL) {
    return res.json({ ..._cache.data, cached: true });
  }

  try {
    const limit  = Math.min(parseInt(req.query.limit) || 8, 20);
    const fields = [
      'message',
      'story',
      'full_picture',
      'permalink_url',
      'created_time',
      'attachments{media,description,subattachments}'
    ].join(',');

    let apiUrl = `https://graph.facebook.com/v19.0/${PAGE_ID}/posts`
      + `?fields=${encodeURIComponent(fields)}`
      + `&limit=${limit}`
      + `&access_token=${ACCESS_TOKEN}`;
    if (after) apiUrl += `&after=${encodeURIComponent(after)}`;

    const fbRes  = await fetch(apiUrl);
    const fbJson = await fbRes.json();

    if (fbJson.error) {
      console.error('Facebook API error:', fbJson.error);
      if (_cache.data && !after) return res.json({ ..._cache.data, cached: true, stale: true });
      return res.status(400).json({ error: fbJson.error.message });
    }

    const bgClasses = ['ni-1', 'ni-2', 'ni-3', 'ni-4'];

    const posts = (fbJson.data || [])
      .filter(p => p.message || p.story)
      .map((p, i) => {
        // Best image: full_picture → first attachment → subattachment
        let image = p.full_picture || '';
        if (!image) {
          const att = p.attachments?.data?.[0];
          image = att?.media?.image?.src
            || att?.subattachments?.data?.[0]?.media?.image?.src
            || '';
        }

        const rawText = p.message || p.story || '';

        return {
          id:            p.id,
          title:         truncate(rawText, 140),
          fullText:      rawText,
          image,
          link:          p.permalink_url,
          date:          p.created_time,
          dateFormatted: formatDateTH(p.created_time),
          bg:            bgClasses[i % 4]
        };
      });

    // Next cursor for pagination
    const nextCursor = fbJson.paging?.cursors?.after || null;

    const result = {
      posts,
      next_cursor: nextCursor,
      page_id: PAGE_ID,
      updated: new Date().toISOString(),
      cached:  false
    };

    // Cache first page only
    if (!after) _cache = { data: result, ts: Date.now() };
    res.json(result);

  } catch (err) {
    console.error('Proxy error:', err);
    if (_cache.data && !after) return res.json({ ..._cache.data, cached: true, stale: true });
    res.status(500).json({ error: 'Failed to fetch Facebook posts' });
  }
});

// ── oEmbed proxy (IG · YouTube · TikTok · Twitter) ──
app.get('/api/oembed', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'url required' });

  let platform = 'Link';
  let title    = '';
  let image    = '';
  let author   = '';

  try {
    // YouTube
    if (/youtube\.com|youtu\.be/.test(url)) {
      platform = 'YouTube';
      const r    = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      const data = await r.json();
      title  = data.title || '';
      author = data.author_name || '';
      // high-res thumbnail from video ID
      const m = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
      image = m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : (data.thumbnail_url || '');

    // Instagram — requires FB Page Token
    } else if (/instagram\.com/.test(url)) {
      platform = 'Instagram';
      if (ACCESS_TOKEN) {
        const r    = await fetch(`https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${ACCESS_TOKEN}&fields=thumbnail_url,title,author_name`);
        const data = await r.json();
        if (!data.error) {
          title  = data.title || data.author_name || '';
          image  = data.thumbnail_url || '';
          author = data.author_name || '';
        }
      }

    // TikTok
    } else if (/tiktok\.com/.test(url)) {
      platform = 'TikTok';
      const r    = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
      const data = await r.json();
      title  = data.title || '';
      image  = data.thumbnail_url || '';
      author = data.author_name || '';

    // Twitter / X
    } else if (/twitter\.com|x\.com/.test(url)) {
      platform = 'X (Twitter)';
      const r    = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`);
      const data = await r.json();
      title  = data.author_name || '';
      author = data.author_name || '';
    }

    res.json({ platform, title, image, author, link: url });

  } catch (err) {
    console.error('oEmbed error:', err.message);
    res.json({ platform, title, image, author, link: url, error: err.message });
  }
});

// ── Health check ──────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    page_id: PAGE_ID ? `...${PAGE_ID.slice(-6)}` : 'NOT SET',
    token:   ACCESS_TOKEN ? '✓ set' : '✗ MISSING',
    cache:   _cache.ts ? `last fetched ${Math.round((Date.now()-_cache.ts)/1000)}s ago` : 'empty'
  });
});

app.get('/', (_req, res) => {
  res.json({ name: 'PDS OCC FB Proxy', endpoints: ['/api/posts', '/health'] });
});

app.listen(PORT, () => {
  console.log(`✅  PDS OCC FB Proxy  →  http://localhost:${PORT}`);
  console.log(`   PAGE_ID: ${PAGE_ID || '⚠ NOT SET'}`);
  console.log(`   TOKEN:   ${ACCESS_TOKEN ? '✓ set' : '⚠ NOT SET'}`);

  // ── Keep-alive ping (Render free tier sleeps after 15 min) ──
  // Self-ping every 14 minutes to prevent cold start
  const SELF_URL = process.env.RENDER_EXTERNAL_URL;
  if (SELF_URL) {
    setInterval(() => {
      fetch(`${SELF_URL}/health`)
        .then(() => console.log('💓 keep-alive ping sent'))
        .catch(() => {});
    }, 14 * 60 * 1000);
    console.log(`   Keep-alive: pinging ${SELF_URL}/health every 14 min`);
  }
});
