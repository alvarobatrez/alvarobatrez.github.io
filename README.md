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

Open `assets/js/content.js` and add an object to the matching array (`READING`, `TALKS`, `PUBLICATIONS`, `SIMULATIONS`). Each entry appears on its own page **and automatically in the Research Log** (tagged by type, filterable there). The `LOG` array is only for free-form notes and milestones. Dates use `"YYYY-MM-DD"`; entries are sorted automatically. Then commit and push — GitHub Pages serves the result.
