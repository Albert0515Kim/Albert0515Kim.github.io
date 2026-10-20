import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects, type GalleryImage, type Project } from "@/data/projects";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { ProjectLabel } from "@/components/work/ProjectMeta";
import { Collaborators } from "@/components/work/Collaborators";
import { CaseVisual } from "@/components/work/CaseVisual";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { LaptopFrame } from "@/components/visuals/LaptopFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

// Every slug is prerendered below; unknown slugs have no page in the static export.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title}: case study`,
    description: project.summary,
    // Unlisted: reachable by direct URL only, kept out of search results.
    robots: { index: false, follow: false },
  };
}

type Section = { id: string; title: string; render: () => ReactNode };

const prose = "text-lg leading-relaxed text-muted md:text-xl md:leading-[1.65]";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((t) => (
        <li key={t} className="flex gap-4 text-lg leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-silver/50" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Blocks({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
      {items.map((b) => (
        <div key={b.title} className="bg-ink p-6 md:p-8">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-fg">{b.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
        </div>
      ))}
    </div>
  );
}

function sectionsFor(c: CaseStudy): Section[] {
  const list: (Section | null)[] = [
    { id: "overview", title: "Overview", render: () => <p className={prose}>{c.overview}</p> },
    { id: "problem", title: "The Problem", render: () => <p className={prose}>{c.problem}</p> },
    { id: "role", title: "My Role", render: () => <Bullets items={c.role} /> },
    { id: "approach", title: "The Approach", render: () => <Blocks items={c.approach} /> },
    c.challenges ? { id: "challenges", title: "Engineering Challenges", render: () => <Blocks items={c.challenges!} /> } : null,
    c.testing ? { id: "testing", title: "Testing & Validation", render: () => <Bullets items={c.testing!} /> } : null,
    { id: "outcome", title: "Outcome", render: () => <Bullets items={c.outcome} /> },
    c.reflection ? { id: "reflection", title: "Reflection", render: () => <Bullets items={c.reflection!} /> } : null,
  ];
  return list.filter((s): s is Section => s !== null);
}

function GalleryItem({ g }: { g: GalleryImage }) {
  if (g.frame === "browser")
    return <BrowserFrame src={g.src} alt={g.alt} width={g.width} height={g.height} tone="light" sizes="(min-width: 768px) 50vw, 100vw" />;
  if (g.frame === "phone") return <PhoneFrame src={g.src} alt={g.alt} className="mx-auto max-w-[260px]" />;
  if (g.frame === "laptop") return <LaptopFrame src={g.src} alt={g.alt} sizes="(min-width: 768px) 50vw, 100vw" />;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-black">
      <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
    </div>
  );
}

const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length];

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  const sections = sectionsFor(study);
  const next = nextProject(project);
  // The lead visual already shows the phones (and pantry's volunteer screens), so only the remaining artifacts repeat here.
  const gallery =
    project.visual === "phone"
      ? []
      : project.gallery.slice(project.visual === "porta" ? 0 : 1).filter((g) => !(project.visual === "pantry" && g.frame === "phone"));
  const meta = [
    { k: "Role", v: project.roleTitle },
    { k: "Timeline", v: project.period },
    { k: "Team", v: project.team },
    { k: "Context", v: project.context ?? "Independent" },
  ];

  return (
    <article>
      <header className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-44">
        <Link href="/#experience" className="group mb-12 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
          <span className="link-underline pb-0.5">Back</span>
        </Link>
        <Reveal>
          <ProjectLabel project={project} />
          <h1 className="mt-8 text-[clamp(3.25rem,10vw,9rem)] font-medium leading-[0.9] tracking-[-0.055em]">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug tracking-[-0.02em] text-silver md:text-3xl">{project.tagline}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <p className={prose}>{project.summary}</p>
            <Collaborators people={project.credits} />
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 lg:col-span-6">
            {meta.map((m) => (
              <div key={m.k} className="border-t border-line pt-4">
                <dt className="eyebrow">{m.k}</dt>
                <dd className="mt-2 leading-snug text-fg/90">{m.v}</dd>
              </div>
            ))}
            <div className="col-span-2 border-t border-line pt-4">
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-2 font-mono text-sm leading-relaxed text-muted">{project.stack.join("  /  ")}</dd>
            </div>
          </dl>
        </Reveal>
        {project.links.length ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.links.map((l, i) => (
              <Button key={l.href} href={l.href} external variant={i === 0 ? "primary" : "ghost"} magnetic={i === 0}>
                {l.label} ↗
              </Button>
            ))}
          </div>
        ) : null}
      </header>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <CaseVisual project={project} />
        </Reveal>
        {project.metrics ? (
          <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col bg-ink p-6">
                <dt className="order-2 mt-1 text-sm text-muted">{m.label}</dt>
                <dd className="order-1 text-4xl font-medium tracking-[-0.04em]">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <nav aria-label="Case study sections" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 flex flex-col gap-3">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex gap-3 text-sm text-subtle transition-colors hover:text-fg">
                  <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                  <span className="link-underline pb-0.5">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex flex-col gap-20 md:gap-28 lg:col-span-9">
          {sections.map((s, i) => (
            <Reveal as="section" key={s.id}>
              <div id={s.id} className="scroll-mt-28">
                <h2 className="mb-8 flex items-baseline gap-4 text-3xl font-medium tracking-[-0.035em] md:text-5xl">
                  <span className="font-mono text-sm font-normal tracking-normal text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.render()}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {gallery.length ? (
        <section aria-labelledby="artifacts-title" className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
          <h2 id="artifacts-title" className="eyebrow mb-8">
            Artifacts
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {gallery.map((g) => (
              <li key={g.src}>
                <Reveal>
                  <figure>
                    <GalleryItem g={g} />
                    {g.caption ? <figcaption className="mt-3 font-mono text-xs tracking-wide text-subtle">{g.caption}</figcaption> : null}
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group mx-auto block max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <p className="eyebrow">Next project · {next.index}</p>
          <p className="mt-6 flex items-center gap-6 text-[clamp(2.5rem,8vw,7rem)] font-medium leading-none tracking-[-0.05em] text-muted transition-colors duration-500 group-hover:text-fg">
            {next.title}
            <ArrowRight aria-hidden="true" className="size-[0.6em] transition-transform duration-500 group-hover:translate-x-3" />
          </p>
        </Link>
      </nav>
    </article>
  );
}
