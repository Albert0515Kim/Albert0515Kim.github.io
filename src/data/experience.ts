// Accessibility role + skills. Sourced from the resume and project repos only.

export const accessibility = {
  org: "Northwestern University",
  role: "Front-End Developer · Web Accessibility (Work-Study)",
  period: "Oct 2025 – Present",
  location: "Evanston, IL",
  points: [
    "Resolved approximately 500 accessibility issue occurrences flagged by Siteimprove across Northwestern websites.",
    "Corrected link text, image alternatives, iframe titles, and heading structure in HTML, CSS, and JavaScript across multiple pages.",
    "Reran Siteimprove scans after each round of fixes to confirm that flagged issues were actually cleared.",
  ],
  tools: ["HTML", "CSS", "JavaScript", "Siteimprove", "Semantic markup"],
};

// The four issue types from the accessibility role, and why each one matters.
export const accessibilityFixes = [
  {
    fix: "Link text",
    impact: "Screen reader users often jump from link to link. “Click here” tells them nothing; descriptive text tells them where a link goes.",
  },
  {
    fix: "Image alternatives",
    impact: "Alt text is the image for someone who can't see it. Decorative images should stay silent, and meaningful ones need a description.",
  },
  {
    fix: "Iframe titles",
    impact: "Embedded maps, videos, and forms need a title, or assistive tech announces an unlabeled frame with no hint of what's inside.",
  },
  {
    fix: "Heading structure",
    impact: "Headings are how many users skim a page with assistive tech. A logical hierarchy turns a wall of content into a table of contents.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Swift", "C", "C++", "C#", "SQL", "HTML/CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Vite", "Responsive UI"] },
  { group: "Backend & APIs", items: ["Node.js", "Express", "FastAPI", "REST APIs", "Prisma", "Stripe API"] },
  { group: "Mobile", items: ["React Native", "Expo", "EAS", "RevenueCat", "Apple Vision", "App Store releases"] },
  { group: "Databases & Infrastructure", items: ["PostgreSQL", "MySQL", "Supabase", "Firebase", "Railway", "Vercel"] },
  { group: "Developer Tools", items: ["Git", "GitHub", "Figma", "Claude Code", "Codex"] },
  {
    group: "Accessibility & Testing",
    items: ["Siteimprove", "Semantic HTML", "Alt text & link purpose", "Stripe test mode", "RevenueCat sandbox", "Cross-device QA"],
  },
];
