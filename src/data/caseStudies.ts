// Case-study write-ups for /work/[slug]. These pages are built but not linked
// from the site and are marked noindex; share a URL directly if you want one seen.
// Same sourcing rule as projects.ts: only verified claims.

export type Block = { title: string; body: string };

export type CaseStudy = {
  overview: string;
  problem: string;
  role: string[];
  approach: Block[];
  challenges?: Block[];
  testing?: string[];
  outcome: string[];
  reflection?: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "willies-wallet": {
    overview:
      "Willie's Wallet is a coupon app for Northwestern students. Students browse deals from local Evanston businesses, save the ones they like, and redeem them at the register. Access is sold as a quarter pass that lines up with Northwestern's academic calendar. The app ships on iOS through the App Store, with a React Native/Expo client and a Python FastAPI backend on top of Supabase.",
    problem:
      "Willie's Wallet collects student deals from local businesses in one place and makes redemption quick. The student taps the coupon at the register, and it stays valid for two minutes so the cashier can see it. The engineering problem was building that as a real product: verified accounts, paid access, and releases through App Store review.",
    role: [
      "Led App Store releases: production builds, submissions, and the review cycle.",
      "Built mobile UI across the app's tabs and flows.",
      "Implemented Supabase OAuth sign-in on the client.",
      "Implemented JWT verification for the FastAPI REST API, so every user-facing route checks the Supabase access token on the server.",
      "Built the RevenueCat subscription paywall and maintained payments in production.",
    ],
    approach: [
      {
        title: "Gated app shell",
        body: "The root layout wraps the app in Auth, Subscription, and Usage providers. It checks access in a fixed order: signed in, then Northwestern account, then active quarter pass, then the main tab navigator. Because each step has one place in the tree, adding a gate or debugging one doesn't spread through every screen.",
      },
      {
        title: "Server-verified identity",
        body: "The client talks to Supabase with the anon key. Privileged work goes through FastAPI, which validates the Supabase JWT on every user-facing route and holds the service-role key for admin operations. These include account deletion, which cancels billing, removes usage records, and deletes the auth user.",
      },
      {
        title: "Billing that follows the academic calendar",
        body: "Quarter dates live in a database table, not in app code, so access windows and renewal timing change without an App Store release. A re-anchoring script re-dates subscribers' next charges from that table and supports a dry run.",
      },
      {
        title: "Nearby deal alerts without a server",
        body: "An opt-in feature registers OS geofences around partner businesses and fires a local notification on entry. It is rate-limited per spot and overall, and it works within iOS's 20-region cap by grouping businesses that sit close together.",
      },
    ],
    challenges: [
      {
        title: "Two ways to pay, one source of truth",
        body: "Students can buy through Apple in-app purchase (RevenueCat) or Stripe web checkout. Both write to a single subscriptions row that only the backend can modify. Checkout never opens a second subscription. An existing subscriber gets the billing portal instead, and a student who already paid but whose webhook hasn't arrived is unlocked straight from Stripe.",
      },
      {
        title: "Getting through App Review",
        body: "The app is limited to Northwestern accounts and sits behind a paywall, so Apple's reviewers couldn't reach it the normal way. Review builds include a dedicated reviewer sign-in that skips both gates, while the gates stay in place for everyone else.",
      },
      {
        title: "Fair free trials",
        body: "A free trial is claimed once per email and recorded as a hash that survives account deletion, so deleting and re-creating an account doesn't produce unlimited trials.",
      },
    ],
    testing: [
      "Ran purchase flows against RevenueCat sandbox and Stripe test mode before production.",
      "Tested on iOS simulators and physical devices across releases.",
      "Every release went through Apple's App Store review.",
    ],
    outcome: ["Live on the Apple App Store.", "100+ downloads and 20+ partner businesses."],
    reflection: [
      "Automated tests and CI around billing are the next investment. Payments are where a regression costs the most and where manual testing is slowest.",
      "Northwestern-domain enforcement currently happens on the client. Moving it to the API and database policies would make the rule hold no matter which client calls in.",
    ],
  },
  "food-pantry": {
    overview:
      "A web app that tracks what the New Trier Township Food Pantry has in stock and who changed it. Owners manage inventory, check items out to clients, and review activity. Volunteers scan new donations in from their phones. They join a live session with a shared code, so they don't need an account.",
    problem:
      "The pantry tracked stock in spreadsheets, which fall behind the moment a shelf changes. The goal was a system that updates as items move: barcode scan-in on donation days, low-stock and out-of-stock flags, expiration tracking, and an audit trail of every addition and removal. Volunteers needed to start in seconds without signing up for anything.",
    role: [
      "Turned weekly client meetings into requirements and Figma designs with the team, then shipped them as React/Express features.",
      "Built the volunteer flow end to end: session-code entry, anonymous auth, session state, and the volunteer pages.",
      "Built backend controllers and routes for categories and reworked item-batch CRUD.",
      "Built the activity page, frontend and backend, so owners can review what changed.",
      "Implemented atomic PostgreSQL upserts for scan-in quantities and transactional row locking for checkout.",
      "Fixed a missing-authentication path that bypassed volunteer-session validation.",
    ],
    approach: [
      {
        title: "Two roles, one auth system",
        body: "Firebase Auth separates owners, who sign in with email or Google, from volunteers, who verify a session code and then sign in anonymously. An Express middleware chain checks the Firebase ID token and the role on every protected route.",
      },
      {
        title: "Stock as batches, not counts",
        body: "Inventory is stored as batches keyed by item and expiration date, not as one number per item. That lets the pantry see what expires when, edit quantities by month in an expiration grid, and check items out in expiration order.",
      },
      {
        title: "Camera-first scan-in",
        body: "Volunteers scan barcodes with a phone camera in the browser. A known barcode pre-fills the item, and an unknown one opens a short manual form. Every save returns an activity-log id, so a volunteer can fix or undo their own entries during the session.",
      },
      {
        title: "Deployed on managed infrastructure",
        body: "The React/Vite frontend runs on Firebase Hosting. The Express API runs as a Firebase Cloud Function, and the data lives in Supabase PostgreSQL. A student team can operate that without running servers.",
      },
    ],
    challenges: [
      {
        title: "Concurrent scan-ins",
        body: "Several volunteers can scan the same product at once. Check-in resolves the item, attaches the barcode, and merges the batch in one transaction. It uses INSERT … ON CONFLICT upserts, so a race becomes a merge, not a duplicate row or a unique-violation error.",
      },
      {
        title: "Checkout under contention",
        body: "Checkout selects an item's batches in first-expired-first-out order with SELECT … FOR UPDATE, decrements them, and commits. Locking the rows means two checkouts of the same item queue behind each other instead of overselling stock.",
      },
      {
        title: "Volunteer sessions that end cleanly",
        body: "Without accounts, a volunteer's access depends on a live session code. I found and fixed a path that skipped session validation entirely. Volunteer profiles also clean themselves up: a row that no longer maps to a live session is removed the next time it's read.",
      },
      {
        title: "Side effects that shouldn't roll back",
        body: "Activity logging and volunteer counters run after the inventory transaction commits. If logging fails, the check-in still stands, because an audit-log error shouldn't erase a real donation.",
      },
    ],
    outcome: [
      "Deployed for the pantry, tracking 50,000+ inventory units for a pantry that supports 500+ households.",
      "Replaced the spreadsheet workflow with live inventory, expiration tracking, printable barcode labels, and an auditable activity log.",
    ],
    reflection: [
      "Multi-item checkout runs as one transaction per line, so a failure partway through leaves earlier lines committed. A single cart-level transaction would make checkout all-or-nothing.",
    ],
  },
  cargoline: {
    overview:
      "Cargoline Express depended on a CRM whose QuickBooks integration had failed, cutting off the connection between operations and accounting. I rebuilt the CRM as a React front end on a Node.js REST API backed by MySQL, and reconnected it to QuickBooks.",
    problem:
      "When the integration broke, employees had to re-enter CRM records into QuickBooks by hand. That took time and opened the door to transcription errors in the records accountants rely on. The business needed its everyday workflow back, not a new product to learn.",
    role: [
      "Rebuilt the legacy CRM end to end with React, Node.js, MySQL, and RESTful APIs.",
      "Redesigned the backend data models.",
      "Automated the transfer of CRM data into QuickBooks form fields, replacing manual re-entry.",
    ],
    approach: [
      {
        title: "Restore the workflow first",
        body: "The success bar was concrete: employees and accountants doing their jobs again, the way they already worked. The rebuild pairs a React front end with a Node.js REST API and a relational MySQL store.",
      },
      {
        title: "Data models built around the handoff",
        body: "Redesigning the backend models around the records that flow into QuickBooks is what made automated transfer possible. Each field maps to a known destination instead of being copied over by a person.",
      },
    ],
    outcome: [
      "Restored employee and accountant workflows after the original integration failed.",
      "Eliminated manual re-entry of CRM records into QuickBooks.",
    ],
  },
  dendritic: {
    overview:
      "Dendritic Learning is a study app for iPad. Flashcards usually present facts as a flat stack. Dendritic arranges a study set as a flowchart, so related concepts sit next to each other. Students answer by writing by hand, and the app uses Apple's Vision framework to read the handwriting and compare it to the expected answer.",
    problem:
      "Dendritic is built around two ideas. Students should produce answers by hand instead of picking from options, and they should see how concepts connect instead of studying them one card at a time.",
    role: [
      "Built the app in Swift with Firebase as part of a five-person team.",
      "Integrated Apple Vision text recognition to read handwritten answers and check them against expected responses.",
      "Released the app to the School App Store.",
      "Presented the project at the District 214 App Showcase, where it won, and at Apple Michigan Avenue.",
    ],
    approach: [
      {
        title: "Study sets as graphs",
        body: "A set is made of nodes and connections, not an ordered list, so a topic like the American Revolution can branch into causes and consequences that a student sees as a map.",
      },
      {
        title: "Handwriting as input",
        body: "The answer area takes handwriting. Vision converts it to text on-device, and the app compares the result with the expected answer, so practice stays pen-first while grading stays automatic.",
      },
      {
        title: "Firebase as the backend",
        body: "The app uses Firebase as its backend, so it needs no server of its own.",
      },
    ],
    outcome: [
      "Released on the School App Store.",
      "Won the District 214 App Showcase.",
      "Presented at Apple Michigan Avenue.",
    ],
  },
  subsplit: {
    overview:
      "SubSplit is an API-first platform for splitting group costs. Users form a group, attach a real family or team plan from a seeded catalog, and each member pays their share through Stripe Checkout. A marketplace lets people find open groups instead of needing a full friend group already on the same plan.",
    problem:
      "Family and team plans assume you already have a stable group to split with. Coordinating recurring payments among people who may not fully trust each other usually means Venmo requests and spreadsheets. Building for the Stripe track meant treating the API as the product: stateful, predictable, and well documented.",
    role: [
      "Owned documentation and wrote feature requirements before implementation, so the team built against a shared spec.",
      "Contributed frontend design.",
      "Integrated Stripe Checkout, webhooks, refunds, and prorations, working with Claude Code and using Codex for bug fixes.",
      "Validated payment flows in Stripe test mode and manually tested subscription-sharing flows across devices against the documented requirements.",
    ],
    approach: [
      {
        title: "Thin handlers, service layer",
        body: "Next.js route handlers authenticate, validate input with Zod, call a service, and return a predictable JSON shape. Business logic, including transactional group creation, lives in services.",
      },
      {
        title: "Money as integers",
        body: "Every amount is stored in integer cents. Split rules (equal, percentage, or custom) are validated so shares always add up to the exact plan cost.",
      },
      {
        title: "Payments as a state machine",
        body: "Each payment moves through explicit states, and Stripe webhooks finalize them. Signatures are verified against the raw request body before any state changes.",
      },
    ],
    challenges: [
      {
        title: "Retries without double charges",
        body: "Webhooks can arrive more than once and clients can retry. Webhook processing is idempotent, and mutating payment endpoints accept an Idempotency-Key and return the stored response on repeat.",
      },
      {
        title: "Scope under a deadline",
        body: "Documenting requirements before building kept a three-person team pointed at the same flows during a weekend, and gave us a checklist to test against at the end.",
      },
    ],
    testing: [
      "Ran checkout, webhook, refund, and proration flows in Stripe test mode.",
      "Manually tested group and payment flows across devices against the written requirements.",
    ],
    outcome: [
      "Shipped a working, deployed product and a standalone documentation site within the hackathon.",
      "Submitted to HackIllinois 2026's Stripe Best Web API track.",
    ],
  },
  "porta-arm": {
    overview:
      "Porta Arm is a phone holder for people recovering from stroke who live with hemiplegia, weakness or paralysis on one side of the body. It straps to the wrist like a watch and holds the phone on a magnetic mount, so a hand without the strength to grip a phone can still support one.",
    problem:
      "Our project partner, a physical therapist, saw that existing phone holders either didn't engage the patient's affected side or were hard to put on and uncomfortable to wear for long. Patients fell back on propping phones against surfaces or doing everything with one hand.",
    role: [
      "One of four designers on a Design Thinking & Communication team.",
      "Took part in patient observation, partner interviews, mockup testing, and prototyping.",
      "Co-authored the final design report, including measurable requirements, testing results, and instructions for use and construction.",
    ],
    approach: [
      {
        title: "Observe before building",
        body: "We started by observing patients and interviewing our partner, then turned what we saw into requirements with metrics: setup time, comfort, ease of cleaning, wrist size range, and how much a user can do without help.",
      },
      {
        title: "Prototype, then listen",
        body: "Our first prototype mounted the phone on an adjustable stand with tactile buttons at the base. At our second meeting, our partner told us it wasn't the direction they had in mind, because it didn't help patients use their affected side.",
      },
      {
        title: "Choose the right level of complexity",
        body: "We dropped the electronics and designed a wrist mount: an adjustable watch-style strap with the same magnetic mount, which a user can put on with one hand. Less technology produced a better fit for the people using it.",
      },
    ],
    testing: [
      "Setup without assistance: 20 seconds (target 30 seconds or less).",
      "Comfort after 5 minutes of wear: 9/10 (target 6 or higher).",
      "Writing a name in the Notes app: 15 seconds, the same as with the phone lying on a table.",
      "Cleaning with disinfectant wipes: 30 seconds (target 60 or less).",
      "Fits wrists from 5 to 9 inches (target 6 to 7.5).",
    ],
    outcome: [
      "Delivered a working prototype, instructions for use, and construction instructions to our partner at Ascension Alexian Brothers Rehabilitation Hospital.",
      "Met or exceeded every requirement we measured.",
    ],
    reflection: [
      "The next iteration would build the watch body from sturdier material such as aluminum and keep the padded silicone backing for comfort and easy disinfection.",
      "My biggest takeaway as an engineer was that we only found the right answer by removing technology.",
    ],
  },
};
