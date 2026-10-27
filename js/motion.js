/*
 * Motion layer (GSAP + ScrollTrigger, vendored in js/vendor).
 * Everything is progressive: if GSAP fails to load or the visitor prefers
 * reduced motion, the page stays fully readable with no hidden content.
 */
(function () {
  const root = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  gsap.registerPlugin(ScrollTrigger);
  root.classList.add("has-motion");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  /* ---------- Text splitting helpers ---------- */
  const splitWords = (el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true"><span class="w__i">${w}</span></span>`).join(" ");
    return $$(".w__i", el);
  };
  const splitChars = (el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = [...text].map((c) => `<span class="ch" aria-hidden="true"><span class="ch__i">${c === " " ? "&nbsp;" : c}</span></span>`).join("");
    return $$(".ch__i", el);
  };

  /* ---------- Hero: intro, pointer depth, scroll depth ---------- */
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".lockup__year span", { yPercent: -140, opacity: 0, stagger: 0.09, duration: 0.9, ease: "back.out(1.7)" })
      .from(".lockup__hci", { xPercent: -18, opacity: 0, duration: 0.9 }, 0.15)
      .from(".lockup__pai", { yPercent: 70, opacity: 0, duration: 0.9 }, 0.3)
      .from(".lockup__date", { x: -24, opacity: 0, duration: 0.7 }, 0.5)
      .from(".lockup__sym", { letterSpacing: "0.45em", opacity: 0, duration: 1.3, ease: "expo.out" }, 0.45)
      .from(".lockup__o .sparkle", { scale: 0, rotation: -180, duration: 1, ease: "back.out(2)" }, 1)
      .from("[data-hero-in]", { y: 26, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.6);
    // Kolam corners and the skyline stay still on purpose.

    // Twinkle
    gsap.to(".lockup__o .sparkle", { rotation: 90, scale: 1.15, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

    // Pointer depth: each [data-depth] layer drifts by its depth; the lockup also tilts in 3D.
    if (finePointer) {
      const layers = $$("[data-depth]", hero).map((el) => ({
        d: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      }));
      const lockup = hero.querySelector(".lockup");
      gsap.set(lockup, { transformPerspective: 1100 });
      const rx = gsap.quickTo(lockup, "rotationX", { duration: 1, ease: "power3" });
      const ry = gsap.quickTo(lockup, "rotationY", { duration: 1, ease: "power3" });
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(px * l.d * 50);
          l.y(py * l.d * 30);
        });
        ry(px * 9);
        rx(-py * 7);
      });
      hero.addEventListener("pointerleave", () => {
        layers.forEach((l) => (l.x(0), l.y(0)));
        rx(0);
        ry(0);
      });
    }

    // Scroll depth: layers leave at different speeds.
    const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero__inner", { yPercent: -22, opacity: 0.15, ease: "none", scrollTrigger: scrub });
  }

  /* ---------- Headings: words rise from below ---------- */
  $$("[data-split]").forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.06,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  /* ---------- Bottom-up character reveal (A+, Tier-1) ---------- */
  $$("[data-rise]").forEach((el) => {
    const chars = splitChars(el);
    gsap.from(chars, {
      yPercent: 115,
      opacity: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  /* ---------- Generic reveals ---------- */
  const revealIn = (els, from) => {
    gsap.set(els, from);
    ScrollTrigger.batch(els, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }),
    });
  };
  revealIn($$("[data-reveal]"), { opacity: 0, y: 36 });
  revealIn(
    $$("[data-stagger]").flatMap((g) => [...g.children]),
    { opacity: 0, y: 60, scale: 0.96 }
  );

  /* ---------- Count-up numbers ---------- */
  $$("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const group = el.hasAttribute("data-group");
    const fmt = (n) => (group ? Math.round(n).toLocaleString("en-IN") : String(Math.round(n))) + suffix;
    const state = { n: 0 };
    el.textContent = fmt(0);
    gsap.to(state, {
      n: target,
      duration: target > 500 ? 2.4 : 1.6,
      ease: "power2.out",
      onUpdate: () => (el.textContent = fmt(state.n)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  /* ---------- 3D tilt + glare on cards ---------- */
  if (finePointer) {
    $$("[data-tilt]").forEach((card) => {
      gsap.set(card, { transformPerspective: 900 });
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 12);
        rx(-(py - 0.5) * 10);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      });
      card.addEventListener("pointerleave", () => (rx(0), ry(0)));
    });
  }

  /* ---------- Programme roadmap ---------- */
  const roadmap = document.getElementById("roadmap");
  if (roadmap) {
    roadmap.classList.add("rm-anim");
    const track = roadmap.querySelector(".roadmap__track");
    const stops = $$(".stop", track);
    const dayBtns = $$("[data-jump]", roadmap);
    const day2 = document.getElementById("day-2");
    const setDay = (i) => dayBtns.forEach((b, n) => b.setAttribute("aria-pressed", String(n === i)));
    const NS = "http://www.w3.org/2000/svg";

    // Resolve each stop's lane mode (pauses inherit from the stop before them).
    const modes = [];
    stops.forEach((s, i) => modes.push(s.dataset.mode === "inherit" ? modes[i - 1] || "single" : s.dataset.mode));
    stops.forEach((s, i) => (s.dataset.lane = modes[i]));

    const mm = gsap.matchMedia();

    // Wide screens: the road runs sideways while the section is pinned.
    mm.add("(min-width: 1024px) and (min-height: 760px)", () => {
      roadmap.classList.add("roadmap--h");
      const svg = document.createElementNS(NS, "svg");
      svg.classList.add("road");
      svg.setAttribute("aria-hidden", "true");
      track.prepend(svg);
      let drawA, drawB, width = 0, pts = [];

      const build = () => {
        width = track.scrollWidth;
        const h = track.offsetHeight;
        const c = h / 2;
        const lane = parseFloat(getComputedStyle(track).getPropertyValue("--lane")) || 70;
        svg.setAttribute("viewBox", `0 0 ${width} ${h}`);
        svg.style.width = `${width}px`;
        svg.style.height = `${h}px`;

        pts = stops.map((s, i) => ({ x: s.offsetLeft + s.offsetWidth / 2, split: modes[i] === "split" }));
        const path = (sign) => {
          const y = (p) => (p.split ? c + sign * lane : c);
          let d = `M0 ${y(pts[0])} L${pts[0].x} ${y(pts[0])}`;
          for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1];
            const b = pts[i];
            if (y(a) === y(b)) d += ` L${b.x} ${y(b)}`;
            else {
              const m = (a.x + b.x) / 2;
              d += ` C${m} ${y(a)} ${m} ${y(b)} ${b.x} ${y(b)}`;
            }
          }
          return d; // the road ends at the last stop
        };
        const dA = path(-1);
        const dB = path(1);
        svg.innerHTML = `
          <path class="road__ghost" d="${dB}"/><path class="road__ghost" d="${dA}"/>
          <path class="road__line road__line--b" pathLength="1" d="${dB}"/>
          <path class="road__line road__line--a" pathLength="1" d="${dA}"/>`;
        drawA = svg.querySelector(".road__line--a");
        drawB = svg.querySelector(".road__line--b");
      };

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const update = () => {
        const x = -gsap.getProperty(track, "x");
        const head = x + window.innerWidth * 0.62; // where the road is "drawn" up to
        const end = pts.length ? pts[pts.length - 1].x : width;
        const p = Math.min(1, head / end);
        if (drawA) {
          drawA.style.strokeDashoffset = 1 - p;
          drawB.style.strokeDashoffset = 1 - p;
        }
        stops.forEach((s) => s.classList.toggle("is-passed", s.offsetLeft + s.offsetWidth * 0.3 < head));
        setDay(day2 && x + window.innerWidth / 2 > day2.offsetLeft ? 1 : 0);
      };

      build();
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: roadmap,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onRefresh: () => (build(), update()),
        },
        onUpdate: update,
      });
      update();

      window.ROADMAP_JUMP = (target) => {
        const st = tween.scrollTrigger;
        const x = Math.min(distance(), Math.max(0, target.offsetLeft - 48));
        window.scrollTo({ top: st.start + x, behavior: "smooth" });
      };

      return () => {
        svg.remove();
        roadmap.classList.remove("roadmap--h");
        stops.forEach((s) => s.classList.remove("is-passed"));
        window.ROADMAP_JUMP = null;
      };
    });

    // Narrow screens: a vertical rail that fills as you scroll.
    mm.add("(max-width: 1023px), (max-height: 759px)", () => {
      const fill = ScrollTrigger.create({
        trigger: track,
        start: "top 70%",
        end: "bottom 70%",
        onUpdate: (self) => track.style.setProperty("--fill", self.progress.toFixed(4)),
      });
      const passes = stops.map((s) =>
        ScrollTrigger.create({ trigger: s, start: "top 72%", onToggle: (self) => s.classList.toggle("is-passed", self.isActive || self.progress > 0), end: "max" })
      );
      const dayWatch = day2 && ScrollTrigger.create({ trigger: day2, start: "top 60%", end: "max", onToggle: (self) => setDay(self.isActive ? 1 : 0) });
      return () => {
        fill.kill();
        passes.forEach((p) => p.kill());
        dayWatch && dayWatch.kill();
        track.style.removeProperty("--fill");
      };
    });
  }

  /* ---------- Footer ---------- */
  const giant = document.querySelector(".site-footer__giant");
  if (giant) {
    gsap.from(giant, {
      yPercent: 45,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: { trigger: giant, start: "top 98%" },
    });
  }

  // Layout shifts (fonts, map) can move trigger points.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
