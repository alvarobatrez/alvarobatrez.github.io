/* Renders a per-paper Markdown file into paper.html.
   Usage: paper.html?f=reading/<file>.md
   The .md file owns its own content: headings, lists, images, LaTeX ($...$). */

(function () {
  "use strict";

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  async function load() {
    const el = document.querySelector("[data-paper]");
    const file = new URLSearchParams(location.search).get("f");

    if (!file || file.includes("..") || !file.endsWith(".md")) {
      el.innerHTML = `<p class="empty-state">No paper specified. Go back to <a href="reading.html">Reading</a>.</p>`;
      return;
    }

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(res.status);
      const md = await res.text();

      if (typeof marked === "undefined") throw new Error("renderer unavailable");
      el.innerHTML = marked.parse(md);

      // page title from the first heading
      const h1 = el.querySelector("h1");
      if (h1) document.title = h1.textContent + " — Álvaro Bátrez";

      // images: resolve relative to site root, style figures
      el.querySelectorAll("img").forEach((img) => {
        img.loading = "lazy";
        if (img.nextSibling == null || img.nextSibling.nodeName !== "FIGCAPTION") {
          const alt = img.getAttribute("alt");
          if (alt && alt.trim()) {
            const fig = document.createElement("figure");
            fig.className = "entry-figure";
            img.replaceWith(fig);
            fig.appendChild(img);
            const cap = document.createElement("figcaption");
            cap.textContent = alt;
            fig.appendChild(cap);
          }
        }
      });

      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([el]).catch(() => {});
      }
    } catch (e) {
      el.innerHTML = `<p class="empty-state">Could not load <code>${esc(file)}</code>. Check that the file exists in the repository.</p>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
