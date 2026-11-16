/* Shared behaviour: rendering content.js data, filters, reveal animation,
   hero particle field, cursor spotlight, animated counters, scroll progress. */

(function () {
  "use strict";

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fmtDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
  }
  function fmtDateShort(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]}`;
  }
  function byDateDesc(a, b) { return a.date < b.date ? 1 : -1; }

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function linksHTML(links) {
    if (!links || !links.length) return "";
    const items = links
      .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
      .join("");
    return `<div class="card-links">${items}</div>`;
  }

  /* search-domain chips (full domain names — never the "D" id) */
  function domainsHTML(it) {
    if (!it.domains || !it.domains.length) return "";
    return it.domains.map((d) => `<span class="tag tag-domain">${esc(d)}</span>`).join("");
  }

  /* ---------- entry-list renderer (log, publications, talks) ---------- */
  function renderEntryList(el, items, opts) {
    opts = opts || {};
    if (!items.length) {
      el.innerHTML = `<p class="empty-state">${esc(opts.empty || "Nothing here yet — coming soon.")}</p>`;
      return;
    }
    items = items.slice().sort(byDateDesc);
    let html = "";
    let lastYear = null;
    items.forEach((it) => {
      const year = it.date.slice(0, 4);
      if (opts.yearMarkers && year !== lastYear) {
        html += `</ul><div class="year-marker">${year}</div><ul class="entry-list">`;
        lastYear = year;
      }
      const kindTag = it.kind ? `<span class="tag" data-kind="${esc(it.kind)}">${esc(it.kind)}</span>` : "";
      const domains = domainsHTML(it);
      const tags = (it.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      const venue = it.venue ? `<p><em>${esc(it.venue)}</em>${it.authors ? " — " + esc(it.authors) : ""}</p>` : "";
      const points = it.points
        ? `<ul class="entry-points">${it.points
            .map((pt) => `<li><strong>${esc(pt.label)}:</strong> ${esc(pt.text)}</li>`)
            .join("")}</ul>`
        : "";
      const figure = it.image
        ? `<figure class="entry-figure"><img src="${esc(it.image.src)}" alt="${esc(it.image.caption || it.title)}" loading="lazy" />${
            it.image.caption ? `<figcaption>${esc(it.image.caption)}</figcaption>` : ""
          }</figure>`
        : "";
      const titleHTML = it.file
        ? `<a href="paper.html?f=${encodeURIComponent(it.file)}">${esc(it.title)}</a>`
        : esc(it.title);
      html += `
        <li class="entry" data-kind="${esc(it.kind || "")}">
          <span class="entry-date">${fmtDate(it.date)}</span>
          <div class="entry-body">
            <h3>${titleHTML}</h3>
            ${venue}
            ${it.body ? `<p>${esc(it.body)}</p>` : it.summary ? `<p>${esc(it.summary)}</p>` : ""}
            ${points}
            ${figure}
            ${linksHTML(it.links)}
            ${it.file ? `<a class="more-link read-notes" href="paper.html?f=${encodeURIComponent(it.file)}">Read notes</a>` : ""}
            ${kindTag || domains || tags ? `<div class="entry-tags">${kindTag}${domains}${tags}</div>` : ""}
          </div>
        </li>`;
    });
    el.innerHTML = html;
  }

  /* ---------- card-grid renderer (reading, simulations) ---------- */
  function renderCardGrid(el, items, opts) {
    opts = opts || {};
    if (!items.length) {
      el.innerHTML = `<p class="empty-state">${esc(opts.empty || "Nothing here yet — coming soon.")}</p>`;
      return;
    }
    items = items.slice().sort(byDateDesc);
    el.innerHTML = items
      .map((it) => {
        const title = it.file
          ? `<a href="paper.html?f=${encodeURIComponent(it.file)}">${esc(it.title)}</a>`
          : esc(it.title);
        const venue = it.venue
          ? `<p class="card-venue">${esc(it.venue)}${it.authors ? " · " + esc(it.authors) : ""}</p>`
          : "";
        const notes = it.file
          ? `<a href="paper.html?f=${encodeURIComponent(it.file)}">Read notes →</a>`
          : "";
        return `
      <article class="card">
        <span class="card-date">${fmtDate(it.date)}</span>
        <h3>${title}</h3>
        ${venue}
        ${it.summary ? `<p>${esc(it.summary)}</p>` : it.body ? `<p>${esc(it.body)}</p>` : ""}
        ${domainsHTML(it) ? `<div class="entry-tags">${domainsHTML(it)}</div>` : ""}
        ${(notes || (it.links && it.links.length)) ? `<div class="card-links">${notes}${(it.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
      </article>`;
      })
      .join("");
  }

  /* ---------- compact feed renderer (home activity tile) ---------- */
  function renderMiniFeed(el, items, opts) {
    opts = opts || {};
    if (!items.length) {
      el.innerHTML = `<p class="empty-state">${esc(opts.empty || "No activity logged yet.")}</p>`;
      return;
    }
    el.innerHTML = items
      .slice()
      .sort(byDateDesc)
      .slice(0, opts.limit || 3)
      .map((it) => {
        const title = it.file
          ? `<a href="paper.html?f=${encodeURIComponent(it.file)}">${esc(it.title)}</a>`
          : esc(it.title);
        return `
          <li class="mini-entry">
            <span class="mini-date">${fmtDateShort(it.date)}</span>
            <div>
              <h4>${title}</h4>
              <span class="tag" data-kind="${esc(it.kind || "note")}">${esc(it.kind || "note")}</span>
            </div>
          </li>`;
      })
      .join("");
  }

  /* ---------- featured reading tile (home) ---------- */
  function renderLatestReading(el) {
    const items = (typeof READING !== "undefined" ? READING : []).slice().sort(byDateDesc);
    const it = items[0];
    if (!it) {
      const tile = el.closest(".tile");
      if (tile) tile.style.display = "none";
      return;
    }
    const media = it.image
      ? `<figure class="tile-media"><img src="${esc(it.image.src)}" alt="${esc(it.image.caption || it.title)}" />${
          it.image.caption ? `<figcaption>${esc(it.image.caption)}</figcaption>` : ""
        }</figure>`
      : "";
    el.innerHTML = `
      <div class="tile-reading-inner">
        <div class="tile-copy">
          <span class="tile-label">Latest reading</span>
          <h3><a href="paper.html?f=${encodeURIComponent(it.file || "")}">${esc(it.title)}</a></h3>
          <p class="venue">${esc(it.venue || "")} · ${fmtDate(it.date)}</p>
          <p class="summary">${esc(it.summary || "")}</p>
          <div class="entry-tags">${domainsHTML(it)}</div>
          ${it.file ? `<a class="more-link" href="paper.html?f=${encodeURIComponent(it.file)}">Read notes</a>` : ""}
        </div>
        ${media}
      </div>`;
    // if no image was defined on the item, fall back to any figure already inside
    if (!it.image) {
      const img = el.querySelector(".tile-media img");
      if (!img) {
        const m = el.querySelector(".tile-media");
        if (m) m.remove();
        el.querySelector(".tile-reading-inner").style.gridTemplateColumns = "1fr";
      }
    }
  }

  /* ---------- kind filter bar (research log page) ---------- */
  function initFilter(listEl, items, opts) {
    const bar = document.querySelector("[data-filter-bar]");
    if (!bar) return;
    const kinds = ["all", ...new Set(items.map((i) => i.kind).filter(Boolean))];
    bar.innerHTML = kinds
      .map(
        (k, i) =>
          `<button class="filter-btn" data-filter="${esc(k)}" aria-pressed="${i === 0}">${esc(k)}</button>`
      )
      .join("");
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const k = btn.dataset.filter;
      const filtered = k === "all" ? items : items.filter((i) => i.kind === k);
      renderEntryList(listEl, filtered, opts);
    });
  }

  /* ---------- reveal on scroll (with stagger support) ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      [...group.children].forEach((child, i) => {
        child.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      // hide only once JS guarantees an observer will reveal it
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.9) el.classList.add("js-armed");
      io.observe(el);
    });
  }

  /* ---------- cursor spotlight on tiles & cards ---------- */
  function initSpotlight() {
    document.addEventListener("pointermove", (e) => {
      const t = e.target.closest(".tile, .card");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ---------- animated counters ---------- */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    const animate = (el) => {
      const target = Number(el.dataset.count) || 0;
      if (REDUCED || target === 0) { el.textContent = String(target); return; }
      const t0 = performance.now();
      const dur = 1100;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(animate); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => { el.textContent = "0"; io.observe(el); });
  }

  /* ---------- scroll progress bar ---------- */
  function initProgress() {
    const bar = document.querySelector("[data-progress]");
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- hero canvas: drifting knowledge-graph particle field ---------- */
  function initHeroCanvas() {
    const canvas = document.querySelector(".hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w, h, nodes, raf;
    const N = 46;
    const LINK = 150;
    const COLORS = [
      [34, 211, 238],   // cyan
      [34, 211, 238],
      [167, 139, 250],  // violet
      [167, 139, 250],
      [52, 211, 153],   // emerald
    ];
    let pointer = null;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = Math.floor(r.width * devicePixelRatio);
      h = canvas.height = Math.floor(r.height * devicePixelRatio);
    }
    function seed() {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.22 * devicePixelRatio,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        r: (1.2 + Math.random() * 1.3) * devicePixelRatio,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          const L = LINK * devicePixelRatio;
          if (d < L) {
            ctx.globalAlpha = (1 - d / L) * 0.22;
            ctx.strokeStyle = "rgba(140, 180, 255, 1)";
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      // nodes
      nodes.forEach((n) => {
        // gentle pointer attraction
        if (pointer) {
          const dx = pointer.x - n.x, dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d > 20 * devicePixelRatio && d < 260 * devicePixelRatio) {
            const f = 0.012 * (1 - d / (260 * devicePixelRatio));
            n.vx += dx * f * 0.02;
            n.vy += dy * f * 0.02;
          }
        }
        // clamp speed
        const sp = Math.hypot(n.vx, n.vy);
        const max = 0.55 * devicePixelRatio;
        if (sp > max) { n.vx = (n.vx / sp) * max; n.vy = (n.vy / sp) * max; }

        ctx.fillStyle = `rgba(${n.c[0]}, ${n.c[1]}, ${n.c[2]}, 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    const onResize = () => { resize(); seed(); if (REDUCED) drawStatic(); };
    window.addEventListener("resize", onResize);
    if (!REDUCED) {
      const hero = canvas.parentElement;
      hero.addEventListener("pointermove", (e) => {
        const r = canvas.getBoundingClientRect();
        pointer = { x: (e.clientX - r.left) * devicePixelRatio, y: (e.clientY - r.top) * devicePixelRatio };
      });
      hero.addEventListener("pointerleave", () => { pointer = null; });
      draw();
    } else {
      const drawStatic = () => { cancelAnimationFrame(raf); draw(); cancelAnimationFrame(raf); };
      drawStatic();
    }
  }

  /* ---------- combined activity feed: everything, tagged by kind ---------- */
  function allActivity() {
    const items = [];
    const push = (arr, kind) => {
      if (typeof arr !== "undefined") {
        arr.forEach((it) => items.push(Object.assign({}, it, { kind: it.kind || kind })));
      }
    };
    push(typeof LOG !== "undefined" ? LOG : [], "note");
    push(typeof READING !== "undefined" ? READING : [], "reading");
    push(typeof TALKS !== "undefined" ? TALKS : [], "talk");
    push(typeof PUBLICATIONS !== "undefined" ? PUBLICATIONS : [], "publication");
    push(typeof SIMULATIONS !== "undefined" ? SIMULATIONS : [], "simulation");
    return items;
  }

  /* ---------- page mounts ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initSpotlight();
    initCounters();
    initProgress();
    initHeroCanvas();

    const activity = allActivity();
    const logEl = document.querySelector("[data-render='log']");
    if (logEl) {
      const opts = { yearMarkers: true, empty: "The log is empty — the first entry is being written." };
      renderEntryList(logEl, activity, opts);
      initFilter(logEl, activity, opts);
    }
    const latestEl = document.querySelector("[data-render='latest']");
    if (latestEl) {
      renderMiniFeed(latestEl, activity, { limit: 3, empty: "No activity logged yet." });
    }
    const latestReadingEl = document.querySelector("[data-render='latest-reading']");
    if (latestReadingEl) renderLatestReading(latestReadingEl);

    /* ---------- home: live stats with counters ---------- */
    const statsEl = document.querySelector("[data-render='stats']");
    if (statsEl) {
      const stats = [
        { n: typeof READING !== "undefined" ? READING.length : 0, label: "papers read" },
        { n: activity.length, label: "log entries" },
        { n: typeof PUBLICATIONS !== "undefined" ? PUBLICATIONS.length : 0, label: "publications" },
        { n: typeof SIMULATIONS !== "undefined" ? SIMULATIONS.length : 0, label: "experiments" },
      ];
      statsEl.innerHTML = stats
        .map(
          (s) => `
        <div class="stat">
          <span class="stat-n" data-count="${s.n}">${s.n}</span>
          <span class="stat-label">${s.label}</span>
        </div>`
        )
        .join("");
      initCounters();
    }
    const focusEl = document.querySelector("[data-render='focus']");
    if (focusEl && typeof SITE !== "undefined" && SITE.focus) {
      focusEl.textContent = SITE.focus;
    }
    const pubsEl = document.querySelector("[data-render='publications']");
    if (pubsEl && typeof PUBLICATIONS !== "undefined") {
      renderEntryList(pubsEl, PUBLICATIONS, { yearMarkers: true, empty: "No publications yet — work in progress. This page will fill up as the doctorate advances." });
    }
    const readEl = document.querySelector("[data-render='reading']");
    if (readEl && typeof READING !== "undefined") {
      renderCardGrid(readEl, READING, { empty: "Reading notes will appear here — one card per paper, each linking to the full note." });
    }
    const talksEl = document.querySelector("[data-render='talks']");
    if (talksEl && typeof TALKS !== "undefined") {
      renderEntryList(talksEl, TALKS, { yearMarkers: true, empty: "No talks yet — seminars and presentations will be listed here." });
    }
    const simsEl = document.querySelector("[data-render='simulations']");
    if (simsEl && typeof SIMULATIONS !== "undefined") {
      renderCardGrid(simsEl, SIMULATIONS, { empty: "Simulations and experiments will be documented here — setup, observations, code." });
    }
  });
})();
