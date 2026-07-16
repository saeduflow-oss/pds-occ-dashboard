# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Public-facing school department website for กลุ่มสาระการงานอาชีพและเทคโนโลยี (Technology & Vocational Education), Patumwan Demonstration School (SWU). Pure static site — no build system, no package manager, no bundler.

## Running the Site

Open any `.html` file directly in a browser, **or** use a local server (required for `localStorage` to work reliably across pages):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

There are no lint, test, or build commands.

## Architecture

### File Layout

```
index.html          # Home — CMS-powered (dynamic)
about.html          # Static inner page
curriculum.html     # Static inner page
faculty.html        # Static inner page
resources.html      # Static inner page
contact.html        # Static inner page
admin.html          # Redirect → admin/
admin/
  index.html        # CMS admin panel (password: admin1234)
  admin.css         # Admin-only styles
  admin.js          # Admin panel logic
assets/css/style.css   # Single stylesheet for all pages
assets/js/cms.js       # Data layer (localStorage CMS)
assets/js/script.js    # UI behaviors (slider, nav, reveal)
fonts/              # Local Srinakharinwirot font (Thai)
```

### Two-JS Architecture

**`cms.js`** — loaded on `index.html` and `admin/index.html` only. Exposes `window.CMS` with a localStorage-backed data store. Default data lives in `DEFAULT_DATA` (site info, slider, departments, news, faculty). `CMS.get()` deep-merges localStorage over defaults.

**`script.js`** — loaded on all public pages. Handles: active nav link detection (by `location.pathname`), hamburger menu, scroll-shadow on navbar, IntersectionObserver reveal animations (`.reveal` → `.visible`), count-up animation (`data-count` attribute), and the hero slider. On `index.html`, also calls `renderIndexFromCMS()` which reads from `window.CMS` and renders the slider, department icon grid, and news grid dynamically.

### What Is CMS-Driven vs. Static

- **`index.html`**: Hero slider, department icon grid (`#deptGrid`), and news grid (`#newsGrid`) are fully rendered by `renderIndexFromCMS()` in script.js using CMS data.
- **`about.html`, `curriculum.html`, `faculty.html`, `resources.html`, `contact.html`**: Content is hardcoded HTML. Changes must be made directly in the file.
- **`admin/index.html`** (or root `admin.html` redirect): Provides a UI to edit the CMS data (site info, slider, departments, news, faculty). Changes persist to localStorage and are immediately reflected on `index.html`.

### CSS Design System

All design tokens are CSS custom properties in `:root` at the top of `style.css`. Key tokens:

- **Brand colors**: `--blue` (#6958a6 purple), `--pink` (#c784b7), `--dark` (#252048 navy)
- **Gradients**: `--grad` (navy→purple→pink), `--grad-hero` (dark blue), `--grad-soft` (pastel)
- **Slide/dept dark backgrounds**: `.di-1` through `.di-9` — dark gradient classes used for slide and department card backgrounds
- **News card backgrounds**: `.ni-1` through `.ni-4`
- **Typography**: `Srinakharinwirot` (local, Thai) → `Sarabun` (Google Fonts) → system fallbacks

The `.reveal` class triggers fade-in via IntersectionObserver. Add `style="--i:N"` for staggered delay (where N is the index).

### Page Template Pattern

Every public page follows the same structure:
1. `<head>` with both font links + `style.css?v=3`
2. `.skip-link` accessibility anchor
3. `<header class="navbar">` (identical across all pages)
4. Page-specific hero: `.page-hero` (inner pages) or `.hero-slider` (index only)
5. `<main class="main">` content
6. `<footer class="footer">` (identical across all pages)
7. `<script src="assets/js/cms.js">` (index and admin only) + `<script src="assets/js/script.js">`

When adding or editing a page, the navbar and footer HTML must be duplicated — there is no templating system.

### Department Icon Colors

The `DEPT_COLOR` map in `script.js` defines per-code icon bubble colors for the index dept grid (AI, DMT, DRONE, ROBOT, ESPORTS, CODING, CG, COMSCI, D&T). Icons are inline SVG returned by `getDeptIcon(code)`.
