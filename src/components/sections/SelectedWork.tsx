import Image from "next/image";
import { getProject, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneStage } from "@/components/work/PhoneStage";
import { LaptopFrame } from "@/components/visuals/LaptopFrame";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import { ProjectActions, StackLine } from "@/components/work/ProjectMeta";
import { Collaborators } from "@/components/work/Collaborators";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { CargolineBlueprint } from "@/components/visuals/CargolineBlueprint";
import { DendriticNetwork } from "@/components/visuals/DendriticNetwork";
import { AccessibilityCard } from "@/components/sections/Experience";

const card = "group relative isolate h-full overflow-hidden rounded-[28px] border";

function Metrics({ project, tone = "dark" }: { project: Project; tone?: "dark" | "light" }) {
  if (!project.metrics) return null;
  return (
    <dl className={`grid grid-cols-3 gap-4 border-t pt-6 ${tone === "dark" ? "border-line" : "border-black/10"}`}>
      {project.metrics.map((m) => (
        <div key={m.label} className="flex flex-col">
          <dt className={`order-2 mt-1 text-xs leading-snug ${tone === "dark" ? "text-muted" : "text-black/55"}`}>{m.label}</dt>
          <dd className={`order-1 text-2xl font-medium tracking-[-0.03em] md:text-3xl ${tone === "dark" ? "text-fg" : "text-paper-ink"}`}>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function WilliesWallet({ p }: { p: Project }) {
  const shots = ["/images/willies-wallet/discover.webp", "/images/willies-wallet/coupon-sheet.webp", "/images/willies-wallet/paywall.webp"].map(
    (src) => p.gallery.find((g) => g.src === src)!,
  );
  return (
    <article className={`${card} border-line bg-surface`}>
      {/* Studio spotlight */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-30%] h-[130%] w-[75%] bg-[radial-gradient(closest-side,rgba(201,204,210,0.16),transparent)]" />
        <div className="absolute bottom-[-40%] right-[10%] h-[70%] w-[50%] bg-[radial-gradient(closest-side,rgba(232,162,92,0.08),transparent)]" />
      </div>
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div>
            <h3 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{p.summary}</p>
            <Collaborators people={p.credits} />
          </div>
          <Metrics project={p} />
          <StackLine stack={p.stack} />
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <a
              href={p.links[0].href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-fg pl-4 pr-5 text-ink transition-colors hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 384 512" className="size-5 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[0.6rem] uppercase tracking-wider opacity-70">Available on the</span>
                <span className="text-[0.95rem] font-semibold tracking-tight">App Store</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="relative order-first lg:order-none lg:col-span-7 lg:min-h-[560px]">
          <PhoneStage shots={shots} />
        </div>
      </div>
    </article>
  );
}

function FoodPantry({ p }: { p: Project }) {
  return (
    <article className={`${card} border-black/5 bg-paper text-paper-ink`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_100%_0%,rgba(232,162,92,0.22),transparent_60%)]" />
      <div className="flex h-full flex-col gap-10 p-6 sm:p-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-7">
            <h3 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
            <p className="text-lg leading-relaxed text-black/65">{p.summary}</p>
            <Collaborators people={p.credits} tone="light" />
          </div>
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
            <div className="relative pb-6 pr-[12%]">
              <LaptopFrame src={p.gallery[0].src} alt={p.gallery[0].alt} sizes="(min-width: 1024px) 45vw, 90vw" />
              <PhoneFrame
                src={p.gallery[4].src}
                alt={p.gallery[4].alt}
                className="!absolute bottom-0 right-0 w-[22%] rotate-[4deg]"
                sizes="(min-width: 1024px) 10vw, 22vw"
              />
            </div>
          </div>
        </div>
        <Metrics project={p} tone="light" />
        <StackLine stack={p.stack} tone="light" />
        <ProjectActions project={p} tone="light" />
      </div>
    </article>
  );
}

function Cargoline({ p }: { p: Project }) {
  return (
    <article className={`${card} border-line bg-[#0b0e13]`}>
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent)]" />
      <div className="flex h-full flex-col gap-8 p-6 sm:p-10">
        <h3 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
        <div className="rounded-2xl border border-ice/15 bg-ink/50 p-2">
          <CargolineBlueprint className="h-auto w-full" />
        </div>
        <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
        <Collaborators people={p.credits} />
        <div className="mt-auto flex flex-col gap-6">
          <StackLine stack={p.stack} />
          <ProjectActions project={p} />
        </div>
      </div>
    </article>
  );
}

function Dendritic({ p }: { p: Project }) {
  const ipad = p.gallery[0];
  return (
    <article className={`${card} border-line bg-[#0a0d0c]`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_80%_10%,rgba(127,214,168,0.12),transparent)]" />
      <div className="flex h-full flex-col gap-8 p-6 sm:p-10">
        <div className="relative">
          <DendriticNetwork className="absolute -right-4 -top-24 h-44 w-44 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <h3 className="relative text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
        </div>
        <p className="relative text-lg leading-relaxed text-muted">{p.summary}</p>
        <Collaborators people={p.credits} />
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black">
          <Image
            src={ipad.src}
            alt={ipad.alt}
            width={ipad.width}
            height={ipad.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>
        <Metrics project={p} />
        <div className="mt-auto flex flex-col gap-6">
          <StackLine stack={p.stack} />
          <ProjectActions project={p} />
        </div>
      </div>
    </article>
  );
}

function SubSplit({ p }: { p: Project }) {
  const [landing, market, detail, docs] = p.gallery;
  return (
    <article className={`${card} border-line bg-surface`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_100%,rgba(168,199,250,0.10),transparent)]" />
      <div className="flex h-full flex-col gap-8 p-6 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-6">
            <h3 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
            <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
            <Collaborators people={p.credits} />
          </div>
          <div className="relative pb-10 pr-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
            <BrowserFrame src={landing.src} alt={landing.alt} width={landing.width} height={landing.height} url="sub-split-xi.vercel.app" tone="light" sizes="(min-width: 1024px) 30vw, 90vw" />
            <BrowserFrame
              src={market.src}
              alt={market.alt}
              width={market.width}
              height={market.height}
              tone="light"
              className="absolute -bottom-2 right-0 w-[62%]"
              sizes="(min-width: 1024px) 20vw, 60vw"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[detail, docs].map((g) => (
            <figure key={g.src}>
              <BrowserFrame src={g.src} alt={g.alt} width={g.width} height={g.height} tone="light" sizes="(min-width: 1024px) 25vw, 50vw" />
              <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-subtle">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <StackLine stack={p.stack} />
          <ProjectActions project={p} />
        </div>
      </div>
    </article>
  );
}

function PortaArm({ p }: { p: Project }) {
  const byName = (s: string) => p.gallery.find((g) => g.src.includes(s))!;
  const steps = [
    { k: "Observe", v: "Watched patients and interviewed a physical therapist." },
    { k: "Prototype", v: "Built a stand with tactile buttons." },
    { k: "Listen", v: "Our partner said it wasn't what patients needed." },
    { k: "Simplify", v: "Removed the electronics and moved to a watch-style wrist mount." },
  ];
  return (
    <article className={`${card} border-line bg-[#0e0f12]`}>
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <h3 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.title}</h3>
          <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
          <Collaborators people={p.credits} />
          <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {steps.map((s, i) => (
              <li key={s.k} className="bg-[#0e0f12] p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-subtle">0{i + 1} · {s.k}</p>
                <p className="mt-2 text-sm leading-snug text-muted">{s.v}</p>
              </li>
            ))}
          </ol>
          <Metrics project={p} />
          <ProjectActions project={p} />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-rows-[auto_1fr]">
          {[byName("first-prototype"), byName("mockup"), byName("final-wrist")].map((g, i) => (
            <figure key={g.src} className={`relative overflow-hidden rounded-2xl ${i === 2 ? "col-span-2 aspect-[16/10] bg-white" : "aspect-[3/4] bg-black"}`}>
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${i === 0 ? "object-contain py-4" : i === 2 ? "object-contain p-6" : "object-cover"}`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-silver">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const p = (slug: string) => getProject(slug)!;
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
      <h2 id="experience-title" className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
        Experience
      </h2>

      <div className="mt-10 flex flex-col gap-5 md:mt-14 md:gap-6">
        <Reveal>
          <WilliesWallet p={p("willies-wallet")} />
        </Reveal>
        <Reveal>
          <AccessibilityCard />
        </Reveal>
        <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-7">
            <FoodPantry p={p("food-pantry")} />
          </Reveal>
          <Reveal className="h-full lg:col-span-5" delay={0.08}>
            <Cargoline p={p("cargoline")} />
          </Reveal>
        </div>
        <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-5">
            <Dendritic p={p("dendritic")} />
          </Reveal>
          <Reveal className="h-full lg:col-span-7" delay={0.08}>
            <SubSplit p={p("subsplit")} />
          </Reveal>
        </div>
        <Reveal>
          <PortaArm p={p("porta-arm")} />
        </Reveal>
      </div>
    </section>
  );
}
