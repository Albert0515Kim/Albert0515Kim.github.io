// Project content. Every claim here is sourced from Albert's
// resume, the project repositories/docs, the Devpost submission, or the
// Porta Arm final report. Keep it that way: if it isn't verified, leave it out.

export type ProjectVisual = "phone" | "pantry" | "cargoline" | "dendritic" | "subsplit" | "porta";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "appstore" | "live" | "devpost" | "docs" | "github";
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  frame: "phone" | "browser" | "laptop" | "photo";
};

export type Collaborator = {
  name: string;
  // GitHub username; its avatar lives at public/images/team/<username>.webp
  github?: string;
  // Used when there is no GitHub profile.
  linkedin?: string;
};

export type Project = {
  slug: string;
  index: string;
  label: string;
  category: string[];
  title: string;
  tagline: string;
  summary: string;
  contribution: string;
  roleTitle: string;
  period: string;
  team: string;
  credits?: Collaborator[];
  context?: string;
  stack: string[];
  metrics?: { value: string; label: string }[];
  highlight: string;
  links: ProjectLink[];
  visual: ProjectVisual;
  gallery: GalleryImage[];
};

const phone = (src: string, alt: string, caption?: string): GalleryImage => ({
  src,
  alt,
  caption,
  width: 900,
  height: 1951,
  frame: "phone",
});

export const projects: Project[] = [
  {
    slug: "willies-wallet",
    roleTitle: "Software Engineer",
    index: "01",
    label: "Shipped product",
    category: ["Mobile app", "Payments", "Product engineering"],
    title: "Willie's Wallet",
    tagline: "Good deals, right around the corner.",
    summary:
      "A student discount app that puts deals from Evanston businesses in Northwestern students' pockets, live on the Apple App Store and backed by The Garage, Northwestern's startup incubator.",
    contribution:
      "Led App Store releases and built across mobile UI, authentication, and payments: Supabase OAuth, JWT verification for the FastAPI backend, and the RevenueCat subscription paywall.",
    period: "Mar 2026 – Present",
    team: "Startup team",
    context: "Northwestern Garage incubator-backed startup",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Python", "FastAPI", "RevenueCat", "Stripe"],
    metrics: [
      { value: "100+", label: "Downloads" },
      { value: "20+", label: "Partner businesses" },
      { value: "iOS", label: "Live on the App Store" },
    ],
    highlight:
      "Two payment paths, Apple in-app purchase and Stripe web checkout, resolve to a single access record so a student never pays twice.",
    links: [
      { label: "Available on the App Store", href: "https://apps.apple.com/us/app/willies-wallet/id6759897367", kind: "appstore" },
    ],
    visual: "phone",
    gallery: [
      phone("/images/willies-wallet/discover.webp", "Willie's Wallet Discover tab listing deals from Animal Records, Club Pilates Evanston, and Crave Cookies", "Discover: deals filtered by category"),
      phone("/images/willies-wallet/coupon-sheet.webp", "Coupon sheet for Animal Records with expiration date, uses left, and a Use this coupon button", "Redemption: tap at the register"),
      phone("/images/willies-wallet/saved.webp", "Saved tab showing hearted deals", "Saved deals"),
      phone("/images/willies-wallet/used.webp", "Used tab listing coupons already redeemed", "Redemption history"),
      phone("/images/willies-wallet/profile.webp", "Profile screen with coupons used, saved, quarter pass status, and a nearby deal alerts toggle", "Profile & nearby alerts"),
      phone("/images/willies-wallet/paywall.webp", "Quarter pass paywall reading Make Evanston a little more affordable, with a $4.99 one-time pass", "Quarter pass paywall"),
    ],
  },
  {
    slug: "food-pantry",
    roleTitle: "Full-Stack Software Engineer",
    index: "02",
    label: "Social impact",
    category: ["Social impact", "Full-stack", "Community"],
    title: "Food Pantry",
    tagline: "Inventory that keeps up with the people moving it.",
    summary:
      "An inventory platform for the New Trier Township Food Pantry. It replaces a spreadsheet process with barcode scan-in, expiration-aware checkout, and a full activity log.",
    contribution:
      "Full-stack engineer on a six-person team. Built volunteer session auth, category and item-batch CRUD, and the activity log. Implemented atomic upserts and row-locked checkout in PostgreSQL, and closed an authentication bypass.",
    period: "Jan – Jun 2026",
    team: "Six-person student team",
    credits: [
      { name: "Jinwoo Oh", github: "starJin2003" },
      { name: "Fay Ma", github: "FayMa331" },
      { name: "Cameron Lam", github: "c-lameron" },
      { name: "Jennifer Lee", github: "jennifer-yoonji" },
      { name: "Anthony Cui", github: "AnthonyCui7" },
    ],
    context: "Northwestern student club project (DISC)",
    stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Supabase", "Firebase Auth", "Figma"],
    metrics: [
      { value: "50,000+", label: "Inventory units tracked" },
      { value: "500+", label: "Households served by the pantry" },
      { value: "6", label: "Engineers on the team" },
    ],
    highlight:
      "Checkout locks an item's batches and draws stock first-expired-first-out inside one transaction, so two volunteers can't take the same can twice.",
    links: [],
    visual: "pantry",
    gallery: [
      { src: "/images/food-pantry/inventory.webp", alt: "Inventory page design: search, All / Food / Non-Food tabs, and category tables with out-of-stock and low-stock rows highlighted", width: 1600, height: 1531, frame: "laptop", caption: "Inventory" },
      { src: "/images/food-pantry/activity.webp", alt: "Activity log design: monthly visit and checkout statistics, an hourly traffic chart, and per-day tables of items added and removed", width: 1600, height: 2372, frame: "laptop", caption: "Activity log & statistics" },
      { src: "/images/food-pantry/checkout.webp", alt: "Checkout design: scan items or add them manually into a dated cart, then finish checking out", width: 1600, height: 1040, frame: "laptop", caption: "Checkout" },
      { src: "/images/food-pantry/volunteer-code.webp", alt: "Volunteer check-in screen asking for a session code", width: 402, height: 874, frame: "phone", caption: "Enter session code" },
      { src: "/images/food-pantry/volunteer-scan.webp", alt: "Volunteer screen: scan your item to begin, or add items manually", width: 402, height: 874, frame: "phone", caption: "Scan to begin" },
      { src: "/images/food-pantry/volunteer-item.webp", alt: "Volunteer item form with recognized item, category, expiration date, and quantity", width: 402, height: 874, frame: "phone", caption: "Confirm & add" },
    ],
  },
  {
    slug: "cargoline",
    roleTitle: "Full-Stack Software Engineer",
    index: "03",
    label: "Client systems",
    category: ["Full-stack", "Systems", "Client work"],
    title: "Cargoline",
    tagline: "Rebuilding the system a business runs on.",
    summary:
      "A rebuilt CRM for Cargoline Express, a cargo company whose legacy system broke when its QuickBooks integration failed. The rebuild restored employee and accountant workflows.",
    contribution:
      "Full-stack engineer. Rebuilt the CRM with React, Node.js, and MySQL behind REST APIs, redesigned the backend data models, and automated the transfer of CRM records into QuickBooks form fields.",
    period: "Jul 2024 – Aug 2025",
    team: "Client project",
    context: "Cargoline Express",
    stack: ["React", "Node.js", "MySQL", "REST APIs", "QuickBooks"],
    highlight:
      "Records that employees used to re-type by hand now go from the CRM into QuickBooks automatically.",
    links: [],
    visual: "cargoline",
    gallery: [],
  },
  {
    slug: "dendritic",
    roleTitle: "Developer",
    index: "04",
    label: "Technical exploration",
    category: ["iOS", "Computer vision", "EdTech"],
    title: "Dendritic",
    tagline: "Study sets that branch the way ideas do.",
    summary:
      "Dendritic Learning, an iPad study app built in Swift and Firebase. Study sets are flowcharts, and Apple's Vision framework reads handwritten answers to check them.",
    contribution:
      "Built the app with a team of five and released it to the School App Store. It won the District 214 App Showcase and was presented at Apple Michigan Avenue.",
    period: "Apr 2024",
    team: "Team of five · high school",
    credits: [
      { name: "Matthew Lundeen", github: "decentishDev" },
      { name: "Efe Ozalp", github: "efe-ozalp" },
      { name: "Tirth Patel", github: "TirthP12" },
      // Name read from the LinkedIn URL; confirm spelling.
      { name: "Christopher Monev", linkedin: "https://www.linkedin.com/in/christophermonev/" },
    ],
    stack: ["Swift", "Firebase", "Apple Vision"],
    metrics: [
      { value: "Winner", label: "District 214 App Showcase" },
      { value: "Apple", label: "Presented at Michigan Avenue" },
    ],
    highlight:
      "Handwritten answers are recognized on-device with Apple Vision and checked against the expected response.",
    links: [],
    visual: "dendritic",
    gallery: [
      { src: "/images/dendritic/ipad.webp", alt: "Dendritic Learning running on an iPad, showing a flowchart study set", width: 1600, height: 1200, frame: "photo", caption: "A flowchart study set on iPad" },
      { src: "/images/dendritic/flowchart.webp", alt: "A flowchart study set on the American Revolution with connected concept nodes", width: 578, height: 431, frame: "photo", caption: "Concepts connect as a graph, not a list" },
      { src: "/images/dendritic/sets.webp", alt: "The Your sets screen listing study sets such as Trivia, Italian Clothes, and Trig Derivatives", width: 549, height: 455, frame: "photo", caption: "Study sets library" },
      { src: "/images/dendritic/write.webp", alt: "Handwriting practice screen prompting for the word Pants with a writing area below", width: 582, height: 429, frame: "photo", caption: "Write the answer by hand" },
    ],
  },
  {
    slug: "subsplit",
    roleTitle: "Documentation, frontend design & Stripe integration",
    index: "05",
    label: "Hackathon",
    category: ["Hackathon", "Payments API", "Product building"],
    title: "SubSplit",
    tagline: "Everyone's splitting subscriptions. Most are doing it wrong.",
    summary:
      "A subscription-sharing marketplace built at HackIllinois 2026 for the Stripe Best Web API track. Groups pick a family or team plan from a catalog of 90+ and each member pays their share through Stripe.",
    contribution:
      "Owned documentation and wrote feature requirements before implementation, contributed frontend design, integrated Stripe checkout, webhooks, refunds, and prorations, and tested payment flows end to end.",
    period: "HackIllinois 2026",
    team: "Team of three",
    credits: [{ name: "Pranav Kota", github: "PranavK178" }, { name: "Sabona Abdi", github: "sabonaoabdi" }],
    context: "HackIllinois 2026 · Stripe track",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    metrics: [
      { value: "90+", label: "Plans in the catalog" },
      { value: "1", label: "Weekend" },
    ],
    highlight:
      "Webhook handling is idempotent, and every mutating payment endpoint honors an Idempotency-Key, so retries never double-charge anyone.",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/subsplit-b3r9xz", kind: "devpost" },
      { label: "Live demo", href: "https://sub-split-xi.vercel.app", kind: "live" },
      { label: "API docs", href: "https://sub-split-documentation.vercel.app", kind: "docs" },
    ],
    visual: "subsplit",
    gallery: [
      { src: "/images/subsplit/landing.webp", alt: "SubSplit landing page with the headline Everyone's splitting subscriptions. Most are doing it wrong.", width: 1800, height: 1165, frame: "browser", caption: "Landing page" },
      { src: "/images/subsplit/marketplace.webp", alt: "SubSplit marketplace listing open groups with monthly price and open slots", width: 1800, height: 1165, frame: "browser", caption: "Marketplace of open groups" },
      { src: "/images/subsplit/group-detail.webp", alt: "Group detail page showing the join code, selected plan, a donut chart of the group pot, and member payments", width: 1800, height: 1165, frame: "browser", caption: "Group pot and member payments" },
      { src: "/images/subsplit/docs.webp", alt: "SubSplit documentation site overview page", width: 1800, height: 1165, frame: "browser", caption: "Documentation site" },
    ],
  },
  {
    slug: "porta-arm",
    roleTitle: "Designer, team of four",
    index: "06",
    label: "Human-centered design",
    category: ["Human-centered design", "Prototyping", "Collaboration"],
    title: "Porta Arm",
    tagline: "The right solution isn't always the most technical one.",
    summary:
      "A wrist-worn phone holder for post-stroke patients with hemiplegia, designed with a physical therapist at Ascension Alexian Brothers Rehabilitation Hospital.",
    contribution:
      "One of four designers. Observed patients, interviewed our partner, prototyped, and tested against measurable requirements, including deciding to drop electronics when they didn't serve the users.",
    period: "Spring 2026",
    team: "Team of four",
    credits: [{ name: "Lizbeth Perez Ruiz" }, { name: "Edenya Misgina" }, { name: "Pedro Paniagua" }],
    context: "Northwestern Design Thinking & Communication",
    stack: ["User research", "Rapid prototyping", "Usability testing", "Technical writing"],
    metrics: [
      { value: "20 s", label: "Setup without help (target ≤ 30)" },
      { value: "9/10", label: "Comfort after 5 min (target ≥ 6)" },
      { value: "5–9 in", label: "Wrist range (target 6–7.5)" },
    ],
    highlight:
      "Our first prototype added electronics. Our partner told us it wasn't what patients needed, so the final design is simpler and easier to put on with one hand.",
    links: [],
    visual: "porta",
    gallery: [
      { src: "/images/porta-arm/sketches.webp", alt: "Hand-drawn concept sketches of phone mounts for a wheelchair, bed, and table", width: 1061, height: 685, frame: "photo", caption: "Early concepts across contexts of use" },
      { src: "/images/porta-arm/first-prototype.webp", alt: "First prototype: a phone on an adjustable stand with four tactile buttons on the base", width: 861, height: 2048, frame: "photo", caption: "Prototype 1: stand with tactile buttons" },
      { src: "/images/porta-arm/mockup.webp", alt: "Low-fidelity glove mockup made of fabric, binder clips, and pipe cleaners on a forearm", width: 1200, height: 1600, frame: "photo", caption: "Low-fidelity wearable mockup" },
      { src: "/images/porta-arm/final-wrist.webp", alt: "Final Porta Arm worn on the wrist like a watch, with a magnetic ring mount", width: 518, height: 290, frame: "photo", caption: "Final: watch-style wrist mount" },
      { src: "/images/porta-arm/final-components.webp", alt: "Final Porta Arm components: watch strap, magnetic ring, and mount", width: 1400, height: 1867, frame: "photo", caption: "Final components" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
