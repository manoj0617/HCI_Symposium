/*
 * Shared header (nav) and footer, injected into every page so they are
 * edited in one place. Each page marks itself with <body data-page="...">.
 */
(function () {
  const page = document.body.dataset.page || "";
  const current = (name) => (page === name ? ' aria-current="page"' : "");
  const aboutActive = page === "about-gcet" || page === "committee" ? " is-active" : "";

  const header = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav container" aria-label="Main">
      <a class="nav__brand" href="index.html" aria-label="HCIPAI Symposium 2027 — Home">
        <span class="brand-mark" aria-hidden="true">HCI<b>PAI</b></span>
        <span class="nav__brand-year">Symposium 2027</span>
      </a>

      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
        <span class="sr-only">Menu</span>
        <span class="nav__toggle-bar" aria-hidden="true"></span>
      </button>

      <ul class="nav__menu" id="nav-menu">
        <li><a class="nav__link" href="index.html"${current("home")}>Home</a></li>
        <li class="nav__dropdown">
          <button class="nav__link nav__dropdown-btn${aboutActive}" type="button" aria-expanded="false" aria-controls="about-menu">
            About <span class="nav__caret" aria-hidden="true"></span>
          </button>
          <ul class="nav__submenu" id="about-menu">
            <li><a href="about-gcet.html"${current("about-gcet")}>About GCET</a></li>
            <li><a href="committee.html"${current("committee")}>Organising Committee</a></li>
          </ul>
        </li>
        <li><a class="nav__link" href="contact.html"${current("contact")}>Contact Us</a></li>
        <li><a class="btn btn--primary nav__cta" href="${SITE.event.registerUrl}" data-register>Register Now</a></li>
      </ul>
    </nav>
  </header>`;

  const socials = SITE.contact.socials
    .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`)
    .join("");

  const footer = `
  <footer class="site-footer">
    <div class="skyline" aria-hidden="true"></div>
    <div class="container site-footer__grid">
      <div>
        <p class="brand-mark brand-mark--light" aria-hidden="true">HCI<b>PAI</b></p>
        <p class="site-footer__title">${SITE.event.name}</p>
        <p>${SITE.event.dates} · ${SITE.event.venueShort}</p>
      </div>
      <div>
        <h2 class="site-footer__heading">Explore</h2>
        <ul class="site-footer__links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about-gcet.html">About GCET</a></li>
          <li><a href="committee.html">Organising Committee</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h2 class="site-footer__heading">Contact</h2>
        <ul class="site-footer__links">
          <li><a href="mailto:${SITE.contact.email}">${SITE.contact.email}</a></li>
          <li>${SITE.contact.phone}</li>
          ${socials}
        </ul>
      </div>
    </div>
    <p class="site-footer__copy container">© HCIPAI Symposium 2027</p>
  </footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
})();
