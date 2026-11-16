/* ============================================================
   CONTENT — edit this file to update the site.
   Each array below feeds one page/section. Add new items at the
   TOP of an array (or anywhere; items are sorted by date).
   Date format: "YYYY-MM-DD". Kind is used for filtering on the
   Research Log page.
   ============================================================ */

const SITE = {
  name: "Álvaro Bátrez",
  affiliation: "Trustworthy and General Artificial Intelligence Laboratory",
  university: "Westlake University",
  email: "batrezdelapazalvarooctavio@westlake.edu.cn",
  github: "https://github.com/alvarobatrez",
  scholar: "",          // Google Scholar URL, e.g. "https://scholar.google.com/citations?user=..."
  orcid: "",            // e.g. "https://orcid.org/0000-0000-0000-0000"
  // Shown on the home page in the "Current focus" tile. Update freely.
  focus: "Running the literature review across the eight search domains of the thesis compass — from evolved plasticity rules to damage benchmarks — while setting up the research workflow and tooling.",
};

/* ---- Research log: free-form notes and milestones only.
   Reading, talks, publications and simulations appear in the log
   AUTOMATICALLY from their own arrays below — do not duplicate them here.
   kind: "milestone" | "note" (or leave your own; it becomes a filter) */
const LOG = [];

/* ---- Publications ---- */
const PUBLICATIONS = [
  // {
  //   date: "2027-03-01",
  //   title: "Paper title",
  //   venue: "Conference / Journal",
  //   authors: "A. Batrez, et al.",
  //   body: "One or two sentences on the contribution.",
  //   links: [{ label: "PDF", url: "..." }, { label: "Code", url: "..." }],
  // },
];

/* ---- Reading: index of papers read.
   Each paper is its own Markdown file in reading/ — this array is just
   the index. To add a paper: create reading/<slug>.md, then add a line here.
   Fields: date, title, authors, venue, file, image, domains, links.

   `domains` — the search domain(s) of the thesis compass the paper belongs to.
   Always the FULL domain name (never the "D" id). The eight domains:
     D1  Evolution of local plasticity rules / SNN architectures
     D2  BTSP, three-factor rules, R-STDP
     D3  Homeostasis and post-lesion cortical rewiring
     D4  SNNs in continuous control and locomotion
     D5  Structural damage and adaptation in legged robots
     D6  Continual learning and forgetting metrics (embedded)
     D7  Damage benchmarks in locomotion
     D8  Modularity and topology in neural controllers */
const READING = [
  {
    date: "2026-11-16",
    title: "FT-CPG: Learning Central Pattern Generators for Fault-Tolerant Quadruped Locomotion Under Multi-Joint Failures",
    authors: "Pei Zhang, Zhaobo Hua, Qiyu Qiu, and Jinliang Ding",
    venue: "IEEE RA-L, Vol. 10, No. 7, July 2025",
    summary: "FT-CPG enables quadrupeds to survive and track commands under complex, mixed joint failures by decoupling healthy and fault-specific control via a gated CPG architecture.",
    file: "reading/ft-cpg-zhang-2025.md",
    image: { src: "assets/img/ding2-3572772-large.gif", caption: "FT-CPG architecture overview" },
    domains: ["Modularity and topology in neural controllers"],
    links: [{ label: "Paper (IEEE Xplore)", url: "https://ieeexplore.ieee.org/abstract/document/11012730" }],
  },
];

/* ---- Talks & presentations ---- */
const TALKS = [
  // {
  //   date: "2027-01-15",
  //   title: "Talk title",
  //   venue: "Lab seminar / Conference",
  //   body: "What it was about.",
  //   links: [{ label: "Slides", url: "..." }],
  // },
];

/* ---- Simulations & experiments ---- */
const SIMULATIONS = [
  // {
  //   date: "2026-12-01",
  //   title: "Experiment name",
  //   body: "Setup, what was measured, and the main observation.",
  //   links: [{ label: "Code", url: "..." }, { label: "Notebook", url: "..." }],
  // },
];
