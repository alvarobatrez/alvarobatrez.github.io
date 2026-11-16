# alvarobatrez.github.io

Personal research site — doctoral work at the Trustworthy and General Artificial Intelligence Laboratory, Westlake University.

## Structure

- `index.html` — home: intro, research interests, latest activity
- `log.html` — research log (dated, filterable working diary)
- `publications.html` — publications and preprints
- `reading.html` — papers read, with notes
- `talks.html` — talks and presentations
- `simulations.html` — simulations and experiments
- `assets/js/content.js` — **all content lives here**; edit this file to add entries
- `assets/css/style.css`, `assets/js/main.js` — design and rendering

## Adding content

**A reading note (paper):**
1. Create a Markdown file in `reading/` (e.g. `reading/ft-cpg-zhang-2025.md`) — headings, lists, images and LaTeX (`$...$`) all work. Images go in `assets/img/` and are referenced as `assets/img/<file>.png`.
2. Add one index entry to the `READING` array in `assets/js/content.js` with `date`, `title`, `authors`, `venue`, `file`, `tags`.
3. Commit and push.

The note appears on the Reading page (as a compact card linking to its own page), in the Research Log, and on the home page. Talks, publications and simulations work the same way with their own arrays (`TALKS`, `PUBLICATIONS`, `SIMULATIONS`); the `LOG` array is only for free-form notes and milestones.
