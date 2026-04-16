# International School of Kuantan Rebrand Prototype

This folder now contains a modern split-page HTML5 rebrand concept for `isk.edu.my`.

## Files

- `index.html` - split-site homepage.
- `programmes.html` - programme overview page.
- `kindergarten.html` - dedicated Kindergarten page.
- `primary.html` - dedicated Primary School page.
- `lower-secondary.html` - dedicated Lower Secondary page.
- `high-school.html` - dedicated High School page.
- `pathways.html` - pathways and enrichment page.
- `organization.html` - organisation, mission, vision, values, accreditation, facilities, and houses.
- `key-person.html` - key leadership profile page.
- `key-profiles.html` - support staff and academic staff profile page.
- `admissions.html` - admissions and fee snapshot page.
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

Create individual WordPress pages, then paste the content inside `<div class="isk-rebrand">...</div>` from each HTML file into a Custom HTML block.

Recommended WordPress page mapping:

```text
Home -> index.html
Programmes -> programmes.html
Kindergarten -> kindergarten.html
Primary School -> primary.html
Lower Secondary -> lower-secondary.html
High School -> high-school.html
Pathways and Enrichment -> pathways.html
Organisation -> organization.html
Key Persons -> key-person.html
Key Profiles -> key-profiles.html
Admissions -> admissions.html
```

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

## Pages Included

- Full-bleed campus hero with Three.js constellation animation.
- Home page with page cards and ISK overview.
- Programme overview plus dedicated Kindergarten, Primary, Lower Secondary, and High School pages.
- Pathways and enrichment page covering A Level, BTEC, Foundation, ACCA/ICAEW, English support, summer school, and the four elective pillars.
- Organisation page covering mission, vision, CLIPPER values, WASC accreditation, facilities, houses, and school structure.
- Key Persons page covering CEO, COO, Principal, academic quality, and operations leadership.
- Key Profiles page covering support staff and academic staff profile cards.
- Admissions page with application steps, contact details, and 2026 fee snapshot.
