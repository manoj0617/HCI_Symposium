/*
 * Shared header (nav), footer and ornaments, injected into every page so they
 * are edited in one place. Each page marks itself with <body data-page="...">.
 */
const ART = (function () {
  /* Kolam corner, redrawn from the banner as vector so it stays sharp at any size.
     Each loop is a rounded diamond around a grid point; neighbouring loops overlap,
     which gives the interlaced kolam look. Paths use pathLength=1 so they can be
     "drawn" with stroke-dashoffset. */
  function kolam(extraClass = "") {
    const s = 44; // grid step
    const pad = 34;
    const n = 4; // rows/cols along each arm
    const size = pad * 2 + s * n;
    const w = s * 1.02; // loop width before rotation
    let loops = "";
    let dots = "";
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n - i; j++) {
        const cx = pad + i * s;
        const cy = size - pad - j * s;
        loops += `<rect class="kolam__line" pathLength="1" x="${cx - w / 2}" y="${cy - w / 2}" width="${w}" height="${w}" rx="${w * 0.32}" transform="rotate(45 ${cx} ${cy})"/>`;
        dots += `<circle class="kolam__dot" cx="${cx}" cy="${cy}" r="3.2"/>`;
        // inner points between diagonal neighbours
        if (i < n && j < n - i) dots += `<circle class="kolam__dot" cx="${cx + s / 2}" cy="${cy - s / 2}" r="2.4"/>`;
      }
    }
    // petals at the two tips
    const petal = (x, y, rot) =>
      `<path class="kolam__line" pathLength="1" transform="translate(${x} ${y}) rotate(${rot})" d="M0 0 C -15 -14 -12 -36 0 -50 C 12 -36 15 -14 0 0 Z"/>`;
    const top = petal(pad, size - pad - n * s - s * 0.55, 0);
    const right = petal(pad + n * s + s * 0.55, size - pad, 90);
    return `<svg class="kolam ${extraClass}" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false">
      <g fill="none">${loops}${top}${right}</g><g>${dots}</g></svg>`;
  }

  const sparkle = (cls = "") =>
    `<svg class="sparkle ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C12.9 7.4 16.6 11.1 24 12 16.6 12.9 12.9 16.6 12 24 11.1 16.6 7.4 12.9 0 12 7.4 11.1 11.1 7.4 12 0Z"/></svg>`;

  return { kolam, sparkle };
})();

(function () {
  const page = document.body.dataset.page || "";
  const current = (name) => (page === name ? ' aria-current="page"' : "");
  const aboutActive = page === "about-gcet" || page === "committee" ? " is-active" : "";
  const home = page === "home" ? "" : "index.html";

  const header = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <nav class="nav wrap" aria-label="Main">
      <a class="nav__brand" href="index.html" aria-label="HCIPAI Symposium 2027 — Home">
        <img src="assets/logos/hcipai.png" alt="" width="40" height="57">
        <span class="nav__brand-text">Symposium<b>2027</b></span>
      </a>

      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
        <span class="sr-only">Menu</span>
        <span class="nav__toggle-bar" aria-hidden="true"></span>
      </button>

      <ul class="nav__menu" id="nav-menu">
        <li><a class="nav__link" href="index.html"${current("home")}>Home</a></li>
        <li><a class="nav__link" href="${home}#programme">Programme</a></li>
        <li class="nav__dropdown">
          <button class="nav__link nav__dropdown-btn${aboutActive}" type="button" aria-expanded="false" aria-controls="about-menu">
            About <span class="nav__caret" aria-hidden="true"></span>
          </button>
          <ul class="nav__submenu" id="about-menu">
            <li><a href="about-gcet.html"${current("about-gcet")}>About GCET</a></li>
            <li><a href="committee.html"${current("committee")}>Organising Committee</a></li>
          </ul>
        </li>
        <li><a class="nav__link" href="contact.html"${current("contact")}>Contact</a></li>
        <li><a class="btn btn--primary nav__cta" href="${SITE.event.registerUrl}" data-register>Register</a></li>
      </ul>
    </nav>
  </header>`;

  const socials = SITE.contact.socials
    .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}${s.handle ? ` · ${s.handle}` : ""}</a></li>`)
    .join("");

  const footer = `
  <footer class="site-footer">
    <div class="site-footer__skyline" aria-hidden="true">
      <img src="assets/images/skyline.png" alt="" width="880" height="212" loading="lazy" data-skyline>
    </div>
    <div class="site-footer__body">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <img src="assets/logos/hcipai.png" alt="HCIPAI" width="56" height="80" loading="lazy">
          <div>
            <p class="site-footer__title">${SITE.event.name}</p>
            <p class="site-footer__meta">${SITE.event.dates} · ${SITE.event.venueShort}</p>
            <p class="site-footer__tag">${SITE.event.subTagline}</p>
          </div>
        </div>
        <nav class="site-footer__col" aria-label="Footer">
          <h2 class="site-footer__heading">Explore</h2>
          <ul class="site-footer__links">
            <li><a href="${home}#programme">Programme</a></li>
            <li><a href="${home}#passes">Passes</a></li>
            <li><a href="about-gcet.html">About GCET</a></li>
            <li><a href="committee.html">Organising Committee</a></li>
          </ul>
        </nav>
        <div class="site-footer__col">
          <h2 class="site-footer__heading">Reach us</h2>
          <ul class="site-footer__links">
            <li><a href="mailto:${SITE.contact.email}">${SITE.contact.email}</a></li>
            <li>${SITE.contact.phone}</li>
            ${socials}
          </ul>
        </div>
        <div class="site-footer__col site-footer__cta">
          <h2 class="site-footer__heading">Seats are limited</h2>
          <a class="btn btn--light" href="${SITE.event.registerUrl}" data-register>Register now</a>
        </div>
      </div>
      <p class="site-footer__giant" aria-hidden="true"><span class="site-footer__giant-in"><span class="hci">HCI</span>PAI<span class="yr">’27</span></span></p>
      <div class="site-footer__bottom">
        <p>© 2027 HCIPAI Symposium</p>
        <a href="#main" class="site-footer__top-link">Back to top ↑</a>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Ornaments: any element with data-kolam gets a kolam corner drawn into it.
  document.querySelectorAll("[data-kolam]").forEach((el) => (el.innerHTML = ART.kolam(el.dataset.kolam)));
  document.querySelectorAll("[data-sparkle]").forEach((el) => el.insertAdjacentHTML("beforeend", ART.sparkle(el.dataset.sparkle)));

  // Stretch the footer wordmark to the full width of the page.
  const giant = document.querySelector(".site-footer__giant");
  const fit = () => {
    const inner = giant.firstElementChild;
    giant.style.fontSize = "";
    const size = parseFloat(getComputedStyle(giant).fontSize);
    giant.style.fontSize = `${(size * giant.clientWidth) / inner.getBoundingClientRect().width}px`;
  };
  fit();
  if (document.fonts) document.fonts.ready.then(fit);
  window.addEventListener("resize", fit);
})();
