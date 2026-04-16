# International School of Kuantan Rebrand Prototype

This folder now contains a modern HTML5 rebrand concept for `isk.edu.my`.

## Files

- `index.html` - standalone responsive prototype.
- `isk-rebrand.css` - full responsive styling.
- `isk-rebrand.js` - GSAP, anime.js, and Three.js interactions.
- `wordpress/isk-wordpress-custom-html.html` - quick WordPress iframe embed snippet.
- Existing image files - used directly by the prototype.

## Preview

Open `index.html` in a browser. It is a static HTML5 build and does not require a dev server.

## WordPress Import Options

### Option 1: Fast HTML5 embed

Upload the prototype files and image assets into:

```text
/wp-content/uploads/isk-rebrand/
```

Then paste the content of `wordpress/isk-wordpress-custom-html.html` into a WordPress Custom HTML block.

This preserves the full HTML5 animation experience quickly, including GSAP, anime.js, and Three.js. It is best for stakeholder preview.

### Option 2: Cleaner WordPress page

Create a new WordPress page and paste the content inside `<div class="isk-rebrand">...</div>` from `index.html` into a Custom HTML block.

Then enqueue these files through the theme, child theme, or a snippets plugin:

```html
<link rel="stylesheet" href="/wp-content/uploads/isk-rebrand/isk-rebrand.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.149.0/three.min.js" defer></script>
<script src="/wp-content/uploads/isk-rebrand/isk-rebrand.js" defer></script>
```

If WordPress strips script tags, enqueue scripts with a child theme or a plugin such as Code Snippets or Header Footer Code Manager.

## Content Notes

The copy is based on:

- Live `isk.edu.my` pages scanned on 2026-04-16.
- The 2026 ISK prospectus PDF in this folder.
- Local WordPress XML exports in this folder.
- Local images supplied in this folder.

The prospectus positions ISK around Cambridge Curriculum progression from Year 1 to Year 11, IPC-inspired Primary learning, IGCSE preparation, English language development, enrichment pillars, summer school, school houses, and future pathways such as A Level, BTEC, Foundation with Kaplan, and ACCA/ICAEW.

The current live site still contains American/AP/PSAT/SAT language in several pages. Before final publication, decide whether the refreshed site should fully move to the 2026 Cambridge positioning or keep a transitional college-readiness section.

## Sections Included

- Full-bleed campus hero with Three.js constellation animation.
- About ISK, mission, vision, and CLIPPER values.
- Campus facilities.
- Dedicated Kindergarten, Primary, Lower Secondary, and High School designs.
- Enrichment pillars and assessment model.
- Academic pathways.
- Why Kuantan.
- Admissions steps and 2026 fee snapshot.
- Contact calls to action.
