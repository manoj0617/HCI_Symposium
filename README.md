# HCIPAI Symposium 2027 — Website

Static website for HCIPAI Symposium 2027 (March 18–19, 2027 · GCET, Hyderabad).
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run / preview

Open `index.html` in a browser. That's it.

## Deploy

Upload the whole folder to any static web host (the site root or a sub-folder both work —
all paths are relative). No server-side code is required. Registration is handled by HCI's
external registration page.

## Updating content

Almost all content lives in **`js/data.js`**:

| What | Where in `data.js` |
|---|---|
| Registration link (all "Register" buttons) | `event.registerUrl` |
| Pass prices, early-bird deadline, perks | `pricing` |
| Day 1 / Day 2 schedule | `schedule` |
| Keynote speakers, workshop facilitators | `speakers` |
| Organising committee | `committee` |
| Venue, contact email/phone, social links | `venue`, `contact` |

- **Early bird:** set `pricing.earlyBirdEnds` to a date like `"2027-01-31"`. Cards automatically
  switch to regular prices after that day (IST). While it is `null`, early-bird prices show with "Deadline TBA".
- **Photos:** put images in `assets/images/` (e.g. `assets/images/speakers/jane.jpg`, square, ≥ 400×400)
  and set `photo: "assets/images/speakers/jane.jpg"`. Leave `photo: ""` to show initials.
- **Navigation and footer** are shared across all pages and defined once in `js/layout.js`.
- **About GCET** page copy is directly in `about-gcet.html`.

## Files

```
index.html          Home: banner, highlights, passes, schedule, speakers, venue
about-gcet.html     About the host college
committee.html      Organising committee
contact.html        Contact details
css/style.css       All styles; colours & fonts are variables at the top
js/data.js          Editable content
js/layout.js        Shared header/nav + footer
js/main.js          Menus, schedule tabs, renders content from data.js
assets/images/      Banner, skyline, photos
```

## Pending from organisers / design team

- [ ] Final HD banner + mobile version (portrait/square)
- [ ] Official colour hex codes and banner font names/files (Chaitanya, design team) → `css/style.css` `:root`
- [ ] Logos as SVG/PNG: HCIPAI, GCET, NBA, NAAC; skyline line-art as SVG
- [ ] Registration URL
- [ ] Early-bird deadline, GST, what each pass includes
- [ ] Final schedule, speakers, committee
- [ ] About GCET: copy and figures drafted from gcet.edu.in (see `docs/gcet-info.md`) — organisers to confirm; HD campus photos still needed
- [ ] Contact email/phone, social links; confirm venue address
- [ ] Highlights copy on the home page ("Panel Discussions / Workshops / Interactive Zones") is placeholder text
