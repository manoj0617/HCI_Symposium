/*
 * Page behaviour: navigation menus, and rendering content from data.js
 * into any page that has the matching container.
 */
(function () {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const initials = (name) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  const avatar = (person) =>
    person.photo
      ? `<img class="avatar" src="${esc(person.photo)}" alt="" loading="lazy">`
      : `<span class="avatar avatar--initials" aria-hidden="true">${esc(initials(person.name))}</span>`;

  /* ---------- Navigation ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const dropBtn = document.querySelector(".nav__dropdown-btn");

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  };
  const setDrop = (open) => dropBtn.setAttribute("aria-expanded", String(open));

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  dropBtn.addEventListener("click", () => setDrop(dropBtn.getAttribute("aria-expanded") !== "true"));

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

  /* ---------- Register links ---------- */
  document.querySelectorAll("[data-register]").forEach((a) => {
    a.href = SITE.event.registerUrl;
    if (/^https?:/.test(SITE.event.registerUrl)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  /* ---------- Pricing ---------- */
  const pricingEl = document.getElementById("pricing-cards");
  if (pricingEl) {
    const { currency, earlyBirdEnds, tiers, note } = SITE.pricing;
    const money = (n) => `${currency}${n.toLocaleString("en-IN")}`;
    // Early bird runs until the end of the deadline day (IST). No deadline set = still early bird.
    const earlyActive = !earlyBirdEnds || new Date() <= new Date(`${earlyBirdEnds}T23:59:59+05:30`);
    const deadline = earlyBirdEnds
      ? new Date(`${earlyBirdEnds}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "TBA";

    pricingEl.innerHTML = tiers
      .map((t) => {
        let badge, price, sub;
        if (t.flat != null) {
          badge = "Flat fee";
          price = money(t.flat);
          sub = "Same price throughout · no deadline";
        } else if (earlyActive) {
          badge = `Early Bird · ends ${deadline}`;
          price = money(t.earlyBird);
          sub = `Regular <s>${money(t.regular)}</s>`;
        } else {
          badge = "Regular";
          price = money(t.regular);
          sub = "Early-bird pricing has ended";
        }
        return `
        <article class="price-card${t.featured ? " price-card--featured" : ""}">
          ${t.featured ? '<p class="price-card__flag">Most popular</p>' : ""}
          <h3 class="price-card__name">${esc(t.name)}</h3>
          <p class="price-card__badge">${esc(badge)}</p>
          <p class="price-card__price">${price}</p>
          <p class="price-card__sub">${sub}</p>
          <ul class="price-card__perks">${t.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <a class="btn ${t.featured ? "btn--light" : "btn--primary"} price-card__cta" href="${esc(SITE.event.registerUrl)}" data-register>Register</a>
        </article>`;
      })
      .join("");

    const noteEl = document.getElementById("pricing-note");
    if (noteEl && note) noteEl.textContent = note;

    pricingEl.querySelectorAll("[data-register]").forEach((a) => {
      if (/^https?:/.test(SITE.event.registerUrl)) {
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
  }

  /* ---------- Schedule (tabs per day) ---------- */
  const scheduleEl = document.getElementById("schedule");
  if (scheduleEl) {
    const typeLabel = { keynote: "Keynote", panel: "Panel", workshop: "Workshop", zone: "Interactive Zone", break: "Break", general: "" };

    const tabs = SITE.schedule
      .map(
        (d, i) => `
        <button class="tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
          <span class="tab__day">${esc(d.day)}</span>
          <span class="tab__date">${esc(d.date)}</span>
        </button>`
      )
      .join("");

    const panels = SITE.schedule
      .map(
        (d, i) => `
        <div class="tab-panel" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" tabindex="0"${i === 0 ? "" : " hidden"}>
          <ol class="timeline">
            ${d.sessions
              .map(
                (s) => `
              <li class="session session--${esc(s.type)}">
                <span class="session__time">${esc(s.time)}</span>
                <div class="session__body">
                  ${typeLabel[s.type] ? `<span class="tag tag--${esc(s.type)}">${typeLabel[s.type]}</span>` : ""}
                  <h3 class="session__title">${esc(s.title)}</h3>
                  ${s.speaker ? `<p class="session__speaker">${esc(s.speaker)}</p>` : ""}
                </div>
              </li>`
              )
              .join("")}
          </ol>
        </div>`
      )
      .join("");

    scheduleEl.innerHTML = `<div class="tabs" role="tablist" aria-label="Symposium days">${tabs}</div>${panels}`;

    const tabEls = [...scheduleEl.querySelectorAll('[role="tab"]')];
    const select = (idx) => {
      tabEls.forEach((t, i) => {
        const on = i === idx;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(`panel-${i}`).hidden = !on;
      });
      tabEls[idx].focus();
    };
    tabEls.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select((i + 1) % tabEls.length);
        if (e.key === "ArrowLeft") select((i - 1 + tabEls.length) % tabEls.length);
      });
    });
  }

  /* ---------- People cards (speakers, committee) ---------- */
  const personCard = (p, withBio) => `
    <article class="person">
      ${avatar(p)}
      <h3 class="person__name">${esc(p.name)}</h3>
      <p class="person__role">${esc(p.designation || p.role)}</p>
      ${withBio && p.bio ? `<p class="person__bio">${esc(p.bio)}</p>` : ""}
    </article>`;

  const keynoteEl = document.getElementById("keynote-speakers");
  if (keynoteEl) keynoteEl.innerHTML = SITE.speakers.keynote.map((p) => personCard(p, true)).join("");

  const workshopEl = document.getElementById("workshop-facilitators");
  if (workshopEl) workshopEl.innerHTML = SITE.speakers.workshop.map((p) => personCard(p, true)).join("");

  const committeeEl = document.getElementById("committee");
  if (committeeEl) {
    committeeEl.innerHTML = SITE.committee
      .map(
        (g) => `
        <section class="committee-group">
          <h2 class="section-title section-title--sm">${esc(g.group)}</h2>
          <div class="people-grid">${g.members.map((m) => personCard(m, false)).join("")}</div>
        </section>`
      )
      .join("");
  }

  /* ---------- Venue / contact text ---------- */
  document.querySelectorAll("[data-venue-name]").forEach((el) => (el.textContent = SITE.venue.name));
  document.querySelectorAll("[data-venue-address]").forEach((el) => (el.textContent = SITE.venue.address));
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.textContent = SITE.contact.email;
    el.href = `mailto:${SITE.contact.email}`;
  });
  document.querySelectorAll("[data-contact-phone]").forEach((el) => (el.textContent = SITE.contact.phone));

  const mapEl = document.getElementById("venue-map");
  if (mapEl) {
    mapEl.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.venue.mapQuery)}&output=embed`;
  }
})();
