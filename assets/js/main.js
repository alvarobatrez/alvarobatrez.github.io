/* Shared behaviour: rendering content.js data, filters, reveal animation, hero canvas. */

(function () {
  "use strict";

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function fmtDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
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

  /* ---------- entry-list renderer (log, publications, reading, talks) ---------- */
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
      const tags = (it.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      const venue = it.venue ? `<p><em>${esc(it.venue)}</em>${it.authors ? " — " + esc(it.authors) : ""}</p>` : "";
      html += `
        <li class="entry" data-kind="${esc(it.kind || "")}">
          <span class="entry-date">${fmtDate(it.date)}</span>
          <div class="entry-body">
            <h3>${esc(it.title)}</h3>
            ${venue}
            ${it.body ? `<p>${esc(it.body)}</p>` : ""}
            ${linksHTML(it.links)}
            ${kindTag || tags ? `<div class="entry-tags">${kindTag}${tags}</div>` : ""}
          </div>
        </li>`;
    });
    el.innerHTML = html;
  }

  /* ---------- card-grid renderer (simulations) ---------- */
  function renderCardGrid(el, items, opts) {
    opts = opts || {};
    if (!items.length) {
      el.innerHTML = `<p class="empty-state">${esc(opts.empty || "Nothing here yet — coming soon.")}</p>`;
      return;
    }
    items = items.slice().sort(byDateDesc);
    el.innerHTML = items
      .map(
        (it) => `
      <article class="card">
        <span class="card-date">${fmtDate(it.date)}</span>
        <h3>${esc(it.title)}</h3>
        ${it.body ? `<p>${esc(it.body)}</p>` : ""}
        ${linksHTML(it.links)}
      </article>`
      )
      .join("");
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

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return;
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
    els.forEach((el) => {
      // hide only once JS guarantees an observer will reveal it
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.9) el.classList.add("js-armed");
      io.observe(el);
    });
  }

  /* ---------- hero canvas: slowly drifting particle graph ---------- */
  function initHeroCanvas() {
    const canvas = document.querySelector(".hero-canvas");
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w, h, nodes, raf;
    const N = 42;
    const LINK = 140;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = Math.floor(r.width * devicePixelRatio);
      h = canvas.height = Math.floor(r.height * devicePixelRatio);
    }
    function seed() {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(103, 232, 249, 0.20)";
      ctx.lineWidth = devicePixelRatio;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK * devicePixelRatio) {
            ctx.globalAlpha = 1 - d / (LINK * devicePixelRatio);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(74, 222, 128, 0.55)";
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    window.addEventListener("resize", () => { resize(); seed(); if (reduced) drawStatic(); });
    if (reduced) {
      // one static frame
      const drawStatic = () => { cancelAnimationFrame(raf); draw(); cancelAnimationFrame(raf); };
      drawStatic();
    } else {
      draw();
    }
  }

  /* ---------- page mounts ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initHeroCanvas();

    const logEl = document.querySelector("[data-render='log']");
    if (logEl && typeof LOG !== "undefined") {
      const opts = { yearMarkers: true, empty: "The log is empty — the first entry is being written." };
      renderEntryList(logEl, LOG, opts);
      initFilter(logEl, LOG, opts);
    }
    const latestEl = document.querySelector("[data-render='latest']");
    if (latestEl && typeof LOG !== "undefined") {
      renderEntryList(latestEl, LOG.slice().sort(byDateDesc).slice(0, 3), {
        empty: "No activity logged yet.",
      });
    }
    const pubsEl = document.querySelector("[data-render='publications']");
    if (pubsEl && typeof PUBLICATIONS !== "undefined") {
      renderEntryList(pubsEl, PUBLICATIONS, { yearMarkers: true, empty: "No publications yet — work in progress." });
    }
    const readEl = document.querySelector("[data-render='reading']");
    if (readEl && typeof READING !== "undefined") {
      renderEntryList(readEl, READING, { yearMarkers: true, empty: "Reading notes will appear here." });
    }
    const talksEl = document.querySelector("[data-render='talks']");
    if (talksEl && typeof TALKS !== "undefined") {
      renderEntryList(talksEl, TALKS, { yearMarkers: true, empty: "No talks yet." });
    }
    const simsEl = document.querySelector("[data-render='simulations']");
    if (simsEl && typeof SIMULATIONS !== "undefined") {
      renderCardGrid(simsEl, SIMULATIONS, { empty: "Simulations and experiments will be documented here." });
    }
  });
})();
