import { site } from "@/data/site";

// Cached at build time so the page stays fully static (Cache Components forbids bare `new Date()`).
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-xs tracking-wider text-subtle">
          © {year} {site.name} · {site.location}
        </p>
        <p className="font-mono text-xs tracking-wider text-subtle">Built with Next.js, Tailwind CSS, Motion &amp; React Bits</p>
        <ul className="flex gap-6 text-sm text-muted">
          <li>
            <a className="link-underline pb-0.5 hover:text-fg" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link-underline pb-0.5 hover:text-fg" href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-underline pb-0.5 hover:text-fg" href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link-underline pb-0.5 hover:text-fg" href="#main">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
