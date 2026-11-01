# HCIPAI Symposium 2027 — Website

Static website for HCIPAI Symposium 2027 (18–19 March 2027 · GCET, Hyderabad).
Plain HTML, CSS and JavaScript. No build step. The only library is GSAP (animations), vendored in `js/vendor/`.

## Run / preview

Open `index.html` in a browser, or serve the folder (`python3 -m http.server`) to get the map embed.

## Deploy

Upload the whole folder to any static host (site root or a sub-folder — all paths are relative).
Registration is handled by HCI's external registration page.

## Updating content

Almost all content lives in **`js/data.js`**:

| What | Where in `data.js` |
|---|---|
| Registration link (all "Register" buttons) | `event.registerUrl` |
| Pass prices, early-bird deadline, GST note, perks | `pricing` |
| Scrolling strip under the banner | `marquee` |
| "What's on" cards, workshop tracks | `experiences`, `tracks` |
| Day 1 / Day 2 programme (roadmap), lanes, all-day strip | `schedule`, `lanes`, `allDay` |
| Faculty workshop registration form | `workshop.registerUrl` |
| Speakers (`list`; `moreToCome` shows "More speakers to be announced") | `speakers` |
| Organising committee (groups, roles, photos, row pattern) | `committee` |
| Venue, contact email, social links | `venue`, `contact` |

- **Early bird:** `pricing.earlyBirdEnds` (currently `2027-01-31`). Cards switch to regular prices after that day (IST).
- **Programme:** each stop has a `kind`. `split` = the road forks into lane A (educators & experts) and lane B
  (students); each lane lists one or more sessions, and a `link` makes a card jump to its section. `pause` = lunch.
  Tea breaks are left out on purpose.
- **Committee rows:** `rows: [3, 2, 3]` lays cards out 3 / 2 / 3, `[1]`, `[2]`, `[3]` build a 1 / 2 / 3 pyramid.
- **Photos:** speakers/committee `photo: "assets/images/…"` (square, ≥ 400×400); `""` shows a placeholder.
- **Campus carousel:** slides are `<img>` tags in `about-gcet.html`, files in `assets/images/campus/`
  (3:2, 1600px wide, ~250 KB each — resize originals before adding; full camera files are ~14 MB).
- **Art:** `assets/images/skyline.png` is the HD skyline with the Charminar set in from the draft banner;
  `assets/images/kolam-corner.png` is the banner's corner, cleaned up; `assets/images/paisley.png` is the
  Canva page-15 pattern (line shapes only, tinted in CSS). Replace any of them with HD files of the same name.
- Navigation and footer are shared across pages in `js/layout.js`. Animations live in `js/motion.js` and
  switch off for visitors who prefer reduced motion.

## Files

```
index.html          Home: banner, marquee, what's on, tracks, passes, programme roadmap, speakers, venue
about-gcet.html     Host college: overview, photo carousel, counters, achievements
committee.html      Organising committee
contact.html        Contact details
css/style.css       All styles; colours & fonts are variables at the top
js/data.js          Editable content
js/layout.js        Shared header/nav, footer, kolam + sparkle ornaments
js/main.js          Menus, renders content from data.js, carousel
js/motion.js        GSAP scroll/hover effects
js/vendor/          GSAP 3.13 + ScrollTrigger
assets/             Logos, skyline, paisley tile (from Canva page 15), draft banner
```

## Pending from organisers / design team

- [ ] Student Design Competition details (section `#competition` in `index.html`)
- [ ] Workshop form: confirm the public link (site uses `/viewform`; the link shared was the `/edit` one)
- [ ] Workshop I / II topics for students (the "Pick your track" section still shows UI/UX and VR tracks)
- [ ] Which keynote (I or II) Rabindra Sah gives; the other keynote and Expert Talks I–IV speakers

- [ ] HD Charminar (Canva page 13) — the one in the skyline is enlarged from the draft banner, so slightly soft
- [ ] About GCET: AR/VR Lab description
- [ ] "Horizon" font file (banner's HCIPAI lettering) if it can be licensed for the web; Anybody is used meanwhile
- [ ] Registration URL
- [ ] What each pass includes
- [ ] Speakers, facilitators, committee names and photos
- [ ] Confirm venue address
