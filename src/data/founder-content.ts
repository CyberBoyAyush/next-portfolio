/**
 * Founder-mode content source of truth.
 * All copy, metrics, and ordering for the founder view live here.
 */

export type Accent = "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan";

export interface OutcomeTile {
  id: string;
  /** Headline figure / phrase. Designed to be the dominant visual element. */
  metric: string;
  /** Smaller caption underneath the metric. */
  caption: string;
  /** Detail line that explains the receipt in one sentence. */
  detail: string;
  /** Optional tag rendered as a pill above the metric. */
  tag?: string;
  /** Grid span on md+ screens. Defaults to 1 col / 1 row. */
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  /** Visual accent (used in gradients and pill colors). */
  accent: Accent;
  /** Optional supporting items shown as small chips. */
  chips?: string[];
}

export interface PhilosophyCard {
  id: string;
  /** Tabler icon name (without `Icon` prefix). */
  icon: string;
  headline: string;
  body: string;
  accent: Accent;
}

export interface ShippedItem {
  id: string;
  title: string;
  /** e.g. "7 days", "5 days", "11 months" */
  timeToShip: string;
  /** Distribution / status. e.g. "live on npm", "memcontext.in", "cappychat.com". */
  channel: string;
  /** Single line, founder-friendly: what this thing does for whom. */
  outcome: string;
  /** Optional emphasis: is this a custom plugin, full product, or work output. */
  kind: "plugin" | "product" | "work";
  image: string;
  href: string;
  /** Highlights shown as 1-3 short pills under the title. */
  highlights?: string[];
  /** Flagship treatment — large landscape card / extra prominence. */
  flagship?: boolean;
  /** Inline status label override, e.g. "Free forever", "Live", "Production-ready". */
  statusLabel?: string;
  /**
   * Optional. When set, the flagship card renders these as a metric panel
   * instead of a screenshot. Used for work like Kakiyo where the brand logo
   * is weak but the impact numbers are strong.
   */
  flagshipMetrics?: Array<{ value: string; label: string; accent: Accent }>;
}

export interface ServiceTile {
  id: string;
  icon: string;
  title: string;
  body: string;
  accent: Accent;
}

export interface BeyondCodeItem {
  id: string;
  icon: string;
  headline: string;
  body: string;
  accent: Accent;
}

// -----------------------------------------------------------------------------
// Outcomes wall — kept exactly as user signed off on it (Image 14).
// No MRR claims; "production-ready" is the strongest revenue-related framing.
// -----------------------------------------------------------------------------

export const outcomeTiles: OutcomeTile[] = [
  {
    id: "latency",
    tag: "Performance",
    metric: "140× faster",
    caption: "P50 latency at Kakiyo",
    detail: "Cut response times from 2.8s to 20ms (P90: 90ms). Same product, completely different feel.",
    accent: "blue",
    colSpan: 2,
    rowSpan: 1,
    chips: ["2.8s → 20ms", "P90: 90ms"],
  },
  {
    id: "cost",
    tag: "Infra",
    metric: "−50%",
    caption: "Infrastructure cost",
    detail: "Rearchitected the stack at Kakiyo, halved the monthly cloud bill.",
    accent: "emerald",
  },
  {
    id: "features",
    tag: "Ownership",
    metric: "End-to-end",
    caption: "Full feature ownership at Kakiyo",
    detail: "Spec → backend → frontend → infra → ship. No handoffs, no waiting on someone else's queue.",
    accent: "purple",
  },
  {
    id: "migration",
    tag: "Scale",
    metric: "Millions",
    caption: "Rows migrated, zero downtime",
    detail: "Moved live production data from Appwrite to PlanetScale without dropping a single request.",
    accent: "cyan",
  },
  {
    id: "cto",
    tag: "Trajectory",
    metric: "0 → CTO",
    caption: "in 11 months",
    detail: "Full Stack Dev → Lead Developer → Chief Technology Officer. Promoted twice in under a year.",
    accent: "amber",
  },
  {
    id: "production-ready",
    tag: "Production",
    metric: "Live by default",
    caption: "Every product I ship runs in production",
    detail: "Not demoware. Auth, infra, monitoring, payment rails ready. Plug into real users on day one.",
    accent: "rose",
    colSpan: 2,
    rowSpan: 1,
    chips: ["Auth", "Infra", "Monitoring", "Payment rails"],
  },
  {
    id: "packages",
    tag: "OSS",
    metric: "4+",
    caption: "NPM packages live",
    detail: "Plnr · Zenox · MemContext · and counting. Built, published, maintained — used by real developers.",
    accent: "purple",
  },
];

// -----------------------------------------------------------------------------
// How I work — Tabler icons for a less generic look.
// -----------------------------------------------------------------------------

export const philosophy: PhilosophyCard[] = [
  {
    id: "ai-first",
    icon: "Sparkles", // IconSparkles
    headline: "AI-first, not AI-enabled.",
    body: "I don't just use AI tools — I build the plugins, agents, and CLIs that extend them. Zenox for OpenCode, Plnr for codebase planning, MemContext for any MCP client. If a tool I use is missing something, I ship the extension myself.",
    accent: "purple",
  },
  {
    id: "ship-first",
    icon: "Rocket", // IconRocket — shipping metaphor
    headline: "Ship first. Polish in production.",
    body: "I'd rather have it live and rough than perfect and unreleased. Real users teach you more than planning sessions ever will. Iterate against feedback, not against assumptions.",
    accent: "amber",
  },
  {
    id: "no-tickets",
    icon: "Target", // IconTarget — definition of done
    headline: "No tickets. Just outcomes.",
    body: "Tell me the user problem and the constraints. I'll handle scope, architecture, and trade-offs. Skip the JIRA ceremony — give me a definition of done and I'll get there.",
    accent: "blue",
  },
  {
    id: "full-stack",
    icon: "Stack2", // IconStack2 — layered stack
    headline: "I own the whole stack.",
    body: "Frontend, backend, infra, AI integrations, code review, hiring. I work like a founding engineer because that's how startups actually win. Specialization slows founders down.",
    accent: "emerald",
  },
];

// -----------------------------------------------------------------------------
// Beyond the code — better wording + better Tabler icons.
// -----------------------------------------------------------------------------

export const beyondCode: BeyondCodeItem[] = [
  {
    id: "internal-tools",
    icon: "Tool", // IconTool — actual tool, not a wrench
    headline: "I build the team's tools.",
    body: "Admin dashboards, hiring pipelines, code review workflows, deploy scripts, internal APIs. If something is slowing the team down, I'll automate it before anyone files a ticket.",
    accent: "blue",
  },
  {
    id: "team-player",
    icon: "UsersGroup", // IconUsersGroup — group of people, stronger than Users
    headline: "I lift the team.",
    body: "I review code, mentor juniors, write docs that don't suck, unblock teammates daily. I work like a co-founder, not a contractor — your team becomes my team.",
    accent: "emerald",
  },
  {
    id: "people-first",
    icon: "HeartHandshake", // IconHeartHandshake — relational
    headline: "People over frameworks.",
    body: "Users, teammates, founders — they matter more than the framework du jour. I optimize for what actually works for them, not what trends on Twitter this week.",
    accent: "rose",
  },
];

// -----------------------------------------------------------------------------
// Shipped fast — accurate descriptions scraped from memcontext.in and npm pages.
// MemContext is the flagship and shown first (user wants it front and center).
// No MRR badges; "Live" / "Production-ready" / "Free forever" labels instead.
// -----------------------------------------------------------------------------

export const shippedItems: ShippedItem[] = [
  // MemContext is the sole flagship. Kakiyo metrics are intentionally NOT
  // duplicated here — they live in OutcomesWall (numbers) and Experience
  // (detailed bullets). This section is strictly "what I built".
  {
    id: "memcontext",
    title: "MemContext",
    timeToShip: "Flagship",
    channel: "memcontext.in · MCP + REST API",
    outcome:
      "Persistent, evolving memory layer for AI. Hybrid search, auto-expiring temporal facts, feedback-driven ranking, version history. Plugs into Claude, Cursor, Windsurf, Copilot, Cline, Codex — any MCP client — or any custom app via REST.",
    kind: "plugin",
    image: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPuFUBv7VILjGC7RxNs1WqaPXeldA0nz3E968k",
    href: "/projects/memcontext",
    highlights: ["MCP + REST", "Hybrid retrieval", "Auto-TTL memories", "Feedback ranking"],
    flagship: true,
    statusLabel: "Free to start · Live",
  },
  // Rest in 3-col grid: Zenox, Plnr, CappyChat. TuduAI removed.
  {
    id: "zenox",
    title: "Zenox",
    timeToShip: "5 days",
    channel: "npm · v1.6.2 · 39★ GitHub",
    outcome:
      "OpenCode plugin that ships a team of AI agents instead of one. Explorer, Librarian, Oracle, UI Planner — each with the right model, background tasks, keyword triggers, and auto-updating project docs.",
    kind: "plugin",
    image: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1768073623/ZENOX_e4boob.png",
    href: "/projects/zenox",
    highlights: ["4 specialized agents", "Parallel background tasks", "Auto-docs AGENTS.md"],
    statusLabel: "Live on npm",
  },
  {
    id: "plnr",
    title: "Plnr",
    timeToShip: "7 days",
    channel: "npm · v1.1.5",
    outcome:
      "AI CLI for the phase before code. Reads your codebase, detects the framework, gathers context, and outputs concrete step-by-step plans. Also runs OWASP-style security audits and exports plans as markdown PRDs.",
    kind: "plugin",
    image: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPipbvM9fLSeCsIaE1NktK9ur3Tyv6x4QMqg8z",
    href: "/projects/plnr",
    highlights: ["Plan + Chat modes", "OWASP audit", "MCP-powered", "Multi-model"],
    statusLabel: "Live on npm",
  },
  {
    id: "cappychat",
    title: "CappyChat",
    timeToShip: "15 days",
    channel: "cappychat.com",
    outcome:
      "Production-ready AI chat workspace. 30+ models, realtime sync, tool calling, image generation, voice, artifacts. Local-first UX with the rails to monetize the moment it's needed.",
    kind: "product",
    image: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png",
    href: "/projects/cappychat",
    highlights: ["30+ models", "Realtime sync", "Tool calling"],
    statusLabel: "Live · Production-ready",
  },
];

// -----------------------------------------------------------------------------
// Roles I take — ordered so Fractional CTO leads (idx 0 = featured/large tile).
// Every card describes a way the same person plugs into a team, not a menu of
// freelance services.
// -----------------------------------------------------------------------------

export const services: ServiceTile[] = [
  {
    id: "fractional",
    icon: "Crown", // IconCrown — leadership
    title: "Fractional CTO / Founding Engineer",
    body: "The default engagement. I take ownership of the engineering function — architecture, hiring, reviews, AI direction, infra. Deeply embedded, long-term. Your team treats me like a co-founder.",
    accent: "rose",
  },
  {
    id: "mvp",
    icon: "RocketLaunch", // IconRocket
    title: "Zero-to-MVP",
    body: "First engineer in. Idea → live product in weeks, not quarters. Full stack, AI included, shipped to real users. No deck. Just code.",
    accent: "blue",
  },
  {
    id: "ai-layer",
    icon: "Sparkles", // IconSparkles
    title: "Build your AI layer",
    body: "Own the AI surface end-to-end. Agents, RAG, tool calling, MCP, the observable infra around models. Production-grade, not demoware.",
    accent: "purple",
  },
  {
    id: "rescue",
    icon: "Lifebuoy", // IconLifebuoy — rescue metaphor
    title: "Take over a stalled engineering function",
    body: "When shipping has stopped, I come in, find what's broken, kill the dead weight, and get the team moving again in weeks.",
    accent: "emerald",
  },
  {
    id: "plugins",
    icon: "Puzzle", // IconPuzzle
    title: "Strategic plugin & integration work",
    body: "When the leverage is high enough to justify it — MCP servers, CLIs, IDE plugins. I've shipped Zenox, Plnr, and MemContext on this pattern.",
    accent: "amber",
  },
];

// -----------------------------------------------------------------------------
// Accent map (shared visual tokens).
// -----------------------------------------------------------------------------

export interface AccentClasses {
  text: string;
  textLight: string;
  bg: string;
  bgLight: string;
  border: string;
  borderLight: string;
  glow: string;
  ring: string;
  gradient: string;
}

export const accentMap: Record<Accent, AccentClasses> = {
  blue: {
    text: "text-blue-400",
    textLight: "text-blue-600",
    bg: "bg-blue-500/10",
    bgLight: "bg-blue-50",
    border: "border-blue-500/20",
    borderLight: "border-blue-200",
    glow: "shadow-blue-500/10",
    ring: "ring-blue-500/30",
    gradient: "from-blue-500/15 via-transparent to-transparent",
  },
  purple: {
    text: "text-purple-400",
    textLight: "text-purple-600",
    bg: "bg-purple-500/10",
    bgLight: "bg-purple-50",
    border: "border-purple-500/20",
    borderLight: "border-purple-200",
    glow: "shadow-purple-500/10",
    ring: "ring-purple-500/30",
    gradient: "from-purple-500/15 via-transparent to-transparent",
  },
  emerald: {
    text: "text-emerald-400",
    textLight: "text-emerald-600",
    bg: "bg-emerald-500/10",
    bgLight: "bg-emerald-50",
    border: "border-emerald-500/20",
    borderLight: "border-emerald-200",
    glow: "shadow-emerald-500/10",
    ring: "ring-emerald-500/30",
    gradient: "from-emerald-500/15 via-transparent to-transparent",
  },
  amber: {
    text: "text-amber-400",
    textLight: "text-amber-600",
    bg: "bg-amber-500/10",
    bgLight: "bg-amber-50",
    border: "border-amber-500/20",
    borderLight: "border-amber-200",
    glow: "shadow-amber-500/10",
    ring: "ring-amber-500/30",
    gradient: "from-amber-500/15 via-transparent to-transparent",
  },
  rose: {
    text: "text-rose-400",
    textLight: "text-rose-600",
    bg: "bg-rose-500/10",
    bgLight: "bg-rose-50",
    border: "border-rose-500/20",
    borderLight: "border-rose-200",
    glow: "shadow-rose-500/10",
    ring: "ring-rose-500/30",
    gradient: "from-rose-500/15 via-transparent to-transparent",
  },
  cyan: {
    text: "text-cyan-400",
    textLight: "text-cyan-600",
    bg: "bg-cyan-500/10",
    bgLight: "bg-cyan-50",
    border: "border-cyan-500/20",
    borderLight: "border-cyan-200",
    glow: "shadow-cyan-500/10",
    ring: "ring-cyan-500/30",
    gradient: "from-cyan-500/15 via-transparent to-transparent",
  },
};
