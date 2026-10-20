// Single source for identity, links, and navigation.
// Edit here; every section and page reads from this file.

export const site = {
  name: "Albert Kim",
  initials: "AK",
  role: "Software Engineer",
  school: "Northwestern University",
  location: "Evanston / Chicago, IL",
  email: "albertkim@u.northwestern.edu",
  github: "https://github.com/Albert0515Kim",
  linkedin: "https://www.linkedin.com/in/albert-kim123",
  resume: "/albert-kim-resume.pdf",
  // Drop a photo in public/images/ and set its path here (e.g. "/images/portrait.jpg").
  portrait: "/images/portrait.webp" as string,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Albert Kim is a Computer Science student at Northwestern University building thoughtful software, shipped products, and accessible interfaces.",
} as const;

export const nav = [
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const education = {
  school: "Northwestern University",
  degree: "BS Computer Science",
  graduation: "Expected 2028/2029",
  gpa: "Major GPA 3.67",
  coursework: [
    "Data Structures & Algorithms",
    "Intro to Computer Systems",
    "Programming in Systems-Level Languages",
    "Applied Data Management",
    "Computer Game Design and Development",
  ],
} as const;
