/*
 * Page behaviour: navigation, and rendering content from data.js into any page
 * that has the matching container. Everything here works without animation;
 * js/motion.js layers the scroll and hover effects on top.
 */
(function () {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const $ = (id) => document.getElementById(id);
  const isExternal = (url) => /^https?:/.test(url);

  /* ---------- Navigation ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = $("nav-menu");
  const dropBtn = document.querySelector(".nav__dropdown-btn");

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  };
  const setDrop = (open) => dropBtn.setAttribute("aria-expanded", String(open));

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  dropBtn.addEventListener("click", () => setDrop(dropBtn.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__dropdown")) setDrop(false);
    if (!e.target.closest(".nav")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (dropBtn.getAttribute("aria-expanded") === "true") {
      setDrop(false);
      dropBtn.focus();
    } else if (toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  // Header turns into a frosted bar once the page scrolls.
  const header = document.querySelector("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Early bird ---------- */
  const { currency, earlyBirdEnds, tiers, note } = SITE.pricing;
  const money = (n) => `${currency}${n.toLocaleString("en-IN")}`;
  const deadlineEnd = earlyBirdEnds ? new Date(`${earlyBirdEnds}T23:59:59+05:30`) : null;
  const earlyActive = !deadlineEnd || new Date() <= deadlineEnd;
  const deadlineText = earlyBirdEnds
    ? new Date(`${earlyBirdEnds}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })
    : "TBA";
  const lowest = Math.min(...tiers.map((t) => (t.flat != null ? t.flat : earlyActive ? t.earlyBird : t.regular)));

  document.querySelectorAll("[data-earlybird]").forEach((el) => {
    if (earlyActive && deadlineEnd) {
      const days = Math.ceil((deadlineEnd - new Date()) / 864e5);
      el.innerHTML = `<b>Early bird</b> till ${esc(deadlineText)} · ${days} day${days === 1 ? "" : "s"} left · from ${money(lowest)}`;
    } else {
      el.innerHTML = `<b>${esc(SITE.event.dates)}</b> · ${esc(SITE.event.venueShort)}`;
    }
  });
  document.querySelectorAll("[data-earlybird-lead]").forEach((el) => {
    el.textContent = earlyActive
      ? `Early-bird prices are open until ${deadlineText}.`
      : "Early-bird pricing has closed. Regular prices apply.";
  });

  /* ---------- Register links ---------- */
  document.querySelectorAll("[data-register]").forEach((a) => {
    a.href = SITE.event.registerUrl;
    if (isExternal(SITE.event.registerUrl)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  /* ---------- Marquee ---------- */
  document.querySelectorAll("[data-marquee]").forEach((el) => {
    const run = SITE.marquee.map((t, i) => `<span class="marquee__item${i % 2 ? " marquee__item--alt" : ""}">${esc(t)}</span>${ART.sparkle("marquee__star")}`).join("");
    el.innerHTML = `<div class="marquee__track"><div class="marquee__run">${run}</div><div class="marquee__run">${run}</div></div>`;
  });

  /* ---------- Icons (inline, stroke-based) ---------- */
  const icon = {
    Talks: '<path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    Workshops: '<path d="m14.5 6.5 3 3M4 20l6.5-6.5M13 4l7 7-3.5 3.5-7-7L13 4ZM7.5 13.5l3 3"/>',
    Expo: '<path d="M12 3 3 7.5 12 12l9-4.5L12 3Z"/><path d="M3 7.5v9L12 21l9-4.5v-9M12 12v9"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const svg = (name, cls = "icon") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon[name]}</svg>`;

  /* ---------- Experiences ---------- */
  const expEl = $("experiences-list");
  if (expEl) {
    expEl.innerHTML = SITE.experiences
      .map(
        (x) => `
      <article class="exp glass" data-tilt>
        <span class="exp__icon">${svg(x.title)}</span>
        <p class="exp__kicker">${esc(x.kicker)}</p>
        <h3 class="exp__title">${esc(x.title)}</h3>
        <p class="exp__text">${esc(x.text)}</p>
      </article>`
      )
      .join("");
  }

  /* ---------- Tracks ---------- */
  const tracksEl = $("tracks-list");
  if (tracksEl) {
    tracksEl.innerHTML = SITE.tracks
      .map(
        (t) => `
      <article class="track track--${esc(t.id.toLowerCase())}" tabindex="0" data-reveal>
        <p class="track__id" aria-hidden="true">${esc(t.id)}</p>
        <div class="track__body">
          <p class="track__label">Track ${esc(t.id)}</p>
          <h3 class="track__name">${esc(t.name)}</h3>
          <p class="track__text">${esc(t.text)}</p>
          <ul class="track__topics">${t.topics.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </article>`
      )
      .join("");
  }

  /* ---------- Pricing ---------- */
  const pricingEl = $("pricing-cards");
  if (pricingEl) {
    pricingEl.innerHTML = tiers
      .map((t) => {
        let badge, price, sub;
        if (t.flat != null) {
          badge = "Flat fee";
          price = money(t.flat);
          sub = "Same price until the event";
        } else if (earlyActive) {
          badge = `Early bird · till ${deadlineText.replace(/ \d{4}$/, "")}`;
          price = money(t.earlyBird);
          sub = `<s>${money(t.regular)}</s> after the deadline`;
        } else {
          badge = "Regular";
          price = money(t.regular);
          sub = "Early-bird pricing has closed";
        }
        return `
        <article class="price${t.featured ? " price--featured" : ""}" data-tilt>
          <h3 class="price__name">${esc(t.name)}</h3>
          <p class="price__badge">${esc(badge)}</p>
          <p class="price__amount">${price}</p>
          <p class="price__sub">${sub}</p>
          <ul class="price__perks">${t.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <a class="btn ${t.featured ? "btn--light" : "btn--primary"} price__cta" href="${esc(SITE.event.registerUrl)}"${
          isExternal(SITE.event.registerUrl) ? ' target="_blank" rel="noopener"' : ""
        }>Register</a>
        </article>`;
      })
      .join("");
    const noteEl = $("pricing-note");
    if (noteEl && note) noteEl.textContent = note;
  }

  /* ---------- Programme roadmap ---------- */
  const roadEl = $("roadmap");
  if (roadEl) {
    const kindLabel = { talk: "Talk", expo: "Expo", parallel: "Both tracks" };
    const lane = (id) => SITE.tracks.find((t) => t.id === id);
    let side = 0;

    const stopHtml = (s) => {
      if (s.kind === "pause") {
        return `<li class="stop stop--pause" data-mode="inherit">
          <span class="stop__node" aria-hidden="true"></span>
          <p class="stop__pause"><span>${esc(s.title)}</span><time>${esc(s.time)}</time></p>
        </li>`;
      }
      if (s.kind === "split") {
        return `<li class="stop stop--split" data-mode="split">
          <span class="stop__node stop__node--a" aria-hidden="true"></span>
          <span class="stop__node stop__node--b" aria-hidden="true"></span>
          <p class="stop__time"><time>${esc(s.time)}</time></p>
          <div class="stop__card stop__card--a" data-tilt>
            <p class="stop__tag">Track A · ${esc(lane("A").name)}</p>
            <h3 class="stop__title">${esc(s.title)}</h3>
            <p class="stop__topic">${esc(s.a)}</p>
          </div>
          <div class="stop__card stop__card--b" data-tilt>
            <p class="stop__tag">Track B · ${esc(lane("B").name)}</p>
            <h3 class="stop__title">${esc(s.title)}</h3>
            <p class="stop__topic">${esc(s.b)}</p>
          </div>
        </li>`;
      }
      const dir = side++ % 2 === 0 ? "up" : "down";
      const mode = s.kind === "parallel" ? "split" : "single";
      return `<li class="stop stop--${esc(s.kind)} stop--${dir}" data-mode="${mode}">
        <span class="stop__node${mode === "split" ? " stop__node--a" : ""}" aria-hidden="true"></span>
        ${mode === "split" ? '<span class="stop__node stop__node--b" aria-hidden="true"></span>' : ""}
        <p class="stop__time"><time>${esc(s.time)}</time></p>
        <div class="stop__card" data-tilt>
          ${kindLabel[s.kind] ? `<p class="stop__tag">${kindLabel[s.kind]}</p>` : ""}
          <h3 class="stop__title">${esc(s.title)}</h3>
          ${s.topic ? `<p class="stop__topic">${esc(s.topic)}</p>` : ""}
        </div>
      </li>`;
    };

    const days = SITE.schedule
      .map((d, i) => {
        side = 0;
        return `
        <li class="stop stop--day" data-mode="single" data-day="${i}" id="day-${i + 1}">
          <span class="stop__node stop__node--day" aria-hidden="true"></span>
          <div class="day">
            <p class="day__num">${esc(d.day)}</p>
            <p class="day__date">${esc(d.date)}</p>
            <h3 class="day__theme">${esc(d.theme)}</h3>
          </div>
        </li>
        ${d.stops.map(stopHtml).join("")}`;
      })
      .join("");

    roadEl.innerHTML = `
      <div class="roadmap__bar wrap">
        <div class="roadmap__days" role="group" aria-label="Jump to day">
          ${SITE.schedule.map((d, i) => `<button type="button" class="chip" data-jump="${i}" aria-pressed="${i === 0}">${esc(d.day)} <span>${esc(d.date)}</span></button>`).join("")}
        </div>
        <p class="roadmap__legend" aria-hidden="true"><span class="lg-item"><span class="lg lg--a"></span>Track A · ${esc(lane("A").name)}</span><span class="lg-item"><span class="lg lg--b"></span>Track B · ${esc(lane("B").name)}</span></p>
      </div>
      <div class="roadmap__viewport">
        <ol class="roadmap__track">
          ${days}
          <li class="stop stop--end" data-mode="single">
            <span class="stop__node stop__node--day" aria-hidden="true"></span>
            <div class="end">
              <p class="end__title">See you in Hyderabad</p>
              <a class="btn btn--primary" href="${esc(SITE.event.registerUrl)}"${isExternal(SITE.event.registerUrl) ? ' target="_blank" rel="noopener"' : ""}>Save your seat</a>
            </div>
          </li>
        </ol>
      </div>`;

    // Day buttons: motion.js overrides this when the roadmap scrolls sideways.
    roadEl.querySelectorAll("[data-jump]").forEach((b) =>
      b.addEventListener("click", () => {
        const target = $(`day-${+b.dataset.jump + 1}`);
        if (window.ROADMAP_JUMP) window.ROADMAP_JUMP(target);
        else target.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
  }

  /* ---------- People cards (speakers, committee) ---------- */
  const initials = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  const avatar = (p) =>
    p.photo
      ? `<img class="avatar" src="${esc(p.photo)}" alt="" loading="lazy">`
      : `<span class="avatar avatar--blank" aria-hidden="true">${p.name === "To be announced" ? ART.sparkle() : esc(initials(p.name))}</span>`;

  const speakerCard = (p) => `
    <article class="person glass" data-tilt>
      ${avatar(p)}
      <p class="person__session">${esc(p.session)}</p>
      <h3 class="person__name">${esc(p.name)}</h3>
      <p class="person__topic">${esc(p.topic)}</p>
    </article>`;

  const keynoteEl = $("keynote-speakers");
  if (keynoteEl) keynoteEl.innerHTML = SITE.speakers.keynote.map(speakerCard).join("");
  const workshopEl = $("workshop-facilitators");
  if (workshopEl) workshopEl.innerHTML = SITE.speakers.workshop.map(speakerCard).join("");

  // Committee: rows follow the group's `rows` pattern (e.g. 1 / 2 / 3 or 3 / 2 / 3), always centred.
  const committeeEl = $("committee");
  if (committeeEl) {
    committeeEl.innerHTML = SITE.committee
      .map((g) => {
        const pattern = g.rows && g.rows.length ? g.rows : [3];
        const rows = [];
        let i = 0;
        let r = 0;
        while (i < g.members.length) {
          const n = pattern[r % pattern.length];
          rows.push(g.members.slice(i, i + n));
          i += n;
          r++;
        }
        return `
        <section class="committee-group">
          <h2 class="committee-group__title" data-reveal>${esc(g.group)}</h2>
          ${rows
            .map(
              (row) => `<div class="committee-row" data-stagger>${row
                .map(
                  (m) => `
              <article class="member glass" data-tilt>
                ${avatar(m)}
                <h3 class="member__name">${esc(m.name)}</h3>
                <p class="member__role">${esc(m.role)}</p>
              </article>`
                )
                .join("")}</div>`
            )
            .join("")}
        </section>`;
      })
      .join("");
  }

  /* ---------- Carousel (About GCET) ---------- */
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector(".carousel__track");
    const slides = [...track.children];
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    const count = root.querySelector("[data-count-label]");
    const live = root.querySelector("[data-live]");
    let index = 0;

    slides.forEach((s, i) => {
      s.setAttribute("role", "group");
      s.setAttribute("aria-roledescription", "slide");
      s.setAttribute("aria-label", `${i + 1} of ${slides.length}`);
    });

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
      slides.forEach((s, n) => {
        s.classList.toggle("is-active", n === index);
        s.toggleAttribute("inert", n !== index);
      });
      const label = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      count.textContent = label;
      live.textContent = `Photo ${index + 1} of ${slides.length}`;
    };
    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    });
    // swipe
    let x0 = null;
    root.addEventListener("pointerdown", (e) => (x0 = e.clientX));
    root.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
  });

  /* ---------- Venue / contact text ---------- */
  document.querySelectorAll("[data-venue-name]").forEach((el) => (el.textContent = SITE.venue.name));
  document.querySelectorAll("[data-venue-address]").forEach((el) => (el.textContent = SITE.venue.address));
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.textContent = SITE.contact.email;
    el.href = `mailto:${SITE.contact.email}`;
  });
  const insta = SITE.contact.socials.find((s) => s.label === "Instagram");
  document.querySelectorAll("[data-contact-instagram]").forEach((el) => {
    if (!insta) return el.closest(".contact-card")?.remove();
    el.textContent = insta.handle || insta.url;
    el.href = insta.url;
  });
  document.querySelectorAll("[data-contact-phone]").forEach((el) => (el.textContent = SITE.contact.phone));

  const q = encodeURIComponent(SITE.venue.mapQuery);
  const mapEl = $("venue-map");
  if (mapEl) mapEl.src = `https://www.google.com/maps?q=${q}&output=embed`;
  const dirEl = $("directions");
  if (dirEl) dirEl.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
})();
