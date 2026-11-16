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
  // Shown on the home page under Overview. Update freely.
  focus: "Reading on fault-tolerant robot learning and trustworthy AI; setting up the research workflow and tooling.",
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
   Fields: date, title, authors, venue, file, tags, links. */
const READING = [
  {
    date: "2026-11-16",
    title: "FT-CPG: Learning Central Pattern Generators for Fault-Tolerant Quadruped Locomotion Under Multi-Joint Failures",
    authors: "Pei Zhang, Zhaobo Hua, Qiyu Qiu, and Jinliang Ding",
    venue: "IEEE RA-L, Vol. 10, No. 7, July 2025",
    summary: "FT-CPG enables quadrupeds to survive and track commands under complex, mixed joint failures by decoupling healthy and fault-specific control via a gated CPG architecture.",
    file: "reading/ft-cpg-zhang-2025.md",
    tags: ["fault tolerance", "quadruped locomotion", "CPG", "reinforcement learning"],
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
