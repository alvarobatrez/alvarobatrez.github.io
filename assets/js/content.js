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
};

/* ---- Research log: free-form notes and milestones only.
   Reading, talks, publications and simulations appear in the log
   AUTOMATICALLY from their own arrays below — do not duplicate them here.
   kind: "milestone" | "note" (or leave your own; it becomes a filter) */
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

/* ---- Reading: papers read, with short notes.
   Fields: date, title, authors, venue, body (prose), points (list of
   {label, text}), image ({src, caption} — put files in assets/img/),
   links ([{label, url}]). Only `date` and `title` are required. */
const READING = [
  {
    date: "2026-11-16",
    title: "FT-CPG: Learning Central Pattern Generators for Fault-Tolerant Quadruped Locomotion Under Multi-Joint Failures",
    authors: "Pei Zhang, Zhaobo Hua, Qiyu Qiu, and Jinliang Ding",
    venue: "IEEE Robotics and Automation Letters (RA-L), Vol. 10, No. 7, July 2025",
    points: [
      { label: "Motivations", text: "Quadruped robots in rescue/exploration face sudden joint failures (locking or power loss) that cause falls and damage. Existing learning-based methods handle simple, single-type faults but struggle with multi-joint, mixed-type failures within one leg while maintaining full omnidirectional control (x, y, yaw)." },
      { label: "Proposed Solution", text: "FT-CPG is a model-free RL framework using a biomimetic Central Pattern Generator (CPG). It employs section-wise training: a healthy policy π^h generates nominal gaits, and a fault policy π^f adjusts CPG parameters and adds bounded residual offsets Δq ∈ [-0.5, 0.5] rad. A Transformer discriminator detects joint states from proprioception to gate π^f." },
      { label: "Evaluation", text: "In simulation (Unitree Go1), FT-CPG achieves 100% survival across all 27 single-leg fault states. It outperforms baselines in tracking accuracy, with a total average RMSE of 0.1758 versus 0.3893 for standard RL PD. Zero-shot sim-to-real transfer demonstrates distinct fault-tolerant gaits on hardware." },
      { label: "Contributions", text: "Introduces a decomposition strategy separating healthy and faulty gait distributions to avoid \"homogeneous\" failure modes. Provides the first robust solution for multi-joint, mixed-fault tolerance with full omnidirectional command tracking without hand-tuned joint constraints or curriculum learning." },
      { label: "Future Directions", text: "Develop unified policies for multi-leg failures (currently requires per-leg experts). Quantify real-world performance metrics (recovery time, fall rates) and test robustness against gradual/partial faults and discriminator misclassification." },
      { label: "One-line takeaway", text: "FT-CPG enables quadrupeds to survive and track commands under complex, mixed joint failures by decoupling healthy and fault-specific control via a gated CPG architecture." },
    ],
    // To add an image: save the file in assets/img/ and uncomment the next line.
    // image: { src: "assets/img/ft-cpg-architecture.png", caption: "Figure 2 — FT-CPG architecture" },
    tags: ["fault tolerance", "quadruped locomotion", "CPG", "reinforcement learning"],
    links: [],
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
