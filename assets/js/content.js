/* ============================================================
   CONTENT — edit this file to update the site.
   Each array below feeds one page/section. Add new items at the
   TOP of an array (or anywhere; items are sorted by date).
   Date format: "YYYY-MM-DD". Kind is used for filtering on the
   Research Log page.
   ============================================================ */

const SITE = {
  name: "Álvaro Batrez",
  affiliation: "Trustworthy and General Artificial Intelligence Laboratory",
  university: "Westlake University",
  email: "batrez@westlake.edu.cn",
  github: "https://github.com/alvarobatrez",
  scholar: "",          // Google Scholar URL, e.g. "https://scholar.google.com/citations?user=..."
  orcid: "",            // e.g. "https://orcid.org/0000-0000-0000-0000"
};

/* ---- Research log: diary-style entries, newest first.
   kind: "milestone" | "experiment" | "simulation" | "note" | "reading" | "talk" | "conference" | "publication" */
const LOG = [
  {
    date: "2026-11-16",
    kind: "milestone",
    title: "Research site goes online",
    tags: ["meta"],
    body: "Set up this site as a living record of the doctoral work: readings, experiments, simulations, talks and publications. Everything from here on gets logged as it happens.",
    links: [],
  },
];

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

/* ---- Reading: papers read, with short notes ---- */
const READING = [
  // {
  //   date: "2026-11-10",
  //   title: "Attention Is All You Need",
  //   authors: "Vaswani et al.",
  //   venue: "NeurIPS 2017",
  //   body: "Notes on what I took from it and why it matters for my work.",
  //   links: [{ label: "Paper", url: "https://arxiv.org/abs/1706.03762" }],
  // },
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
