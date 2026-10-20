import Image from "next/image";
import type { Project } from "@/data/projects";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import { LaptopFrame } from "@/components/visuals/LaptopFrame";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { CargolineBlueprint } from "@/components/visuals/CargolineBlueprint";
import { DendriticNetwork } from "@/components/visuals/DendriticNetwork";

// Lead visual for a case study page, one treatment per project.
export function CaseVisual({ project: p }: { project: Project }) {
  switch (p.visual) {
    case "phone":
      return (
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-4 py-12 sm:px-10 sm:py-16">
          <div aria-hidden="true" className="absolute left-1/2 top-[-40%] h-[120%] w-[80%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(201,204,210,0.14),transparent)]" />
          <ul className="relative grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-6">
            {p.gallery.map((g, i) => (
              <li key={g.src} className={i % 2 ? "lg:translate-y-10" : ""}>
                <figure>
                  <PhoneFrame src={g.src} alt={g.alt} priority={i < 3} sizes="(min-width: 1024px) 14vw, 30vw" />
                  {g.caption ? <figcaption className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">{g.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      );
    case "pantry":
      return (
        <div className="rounded-[28px] bg-paper px-4 pb-12 pt-12 sm:px-12 sm:pt-16">
          <LaptopFrame src={p.gallery[0].src} alt={p.gallery[0].alt} priority className="mx-auto max-w-4xl" sizes="(min-width: 1024px) 900px, 100vw" />
          <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
            {p.gallery
              .filter((g) => g.frame === "phone")
              .map((g) => (
                <li key={g.src}>
                  <figure>
                    <PhoneFrame src={g.src} alt={g.alt} sizes="(min-width: 640px) 200px, 30vw" />
                    <figcaption className="mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/45">{g.caption}</figcaption>
                  </figure>
                </li>
              ))}
          </ul>
        </div>
      );
    case "cargoline":
      return (
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-[#0b0e13] p-4 sm:p-10">
          <div aria-hidden="true" className="hairline-grid absolute inset-0" />
          <CargolineBlueprint className="relative mx-auto h-auto w-full max-w-4xl" />
        </div>
      );
    case "dendritic": {
      const lead = p.gallery[0];
      return (
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-black">
          <DendriticNetwork className="absolute -left-10 -top-10 z-10 hidden h-80 w-80 opacity-60 md:block" />
          <Image src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} priority sizes="100vw" className="mx-auto h-auto w-full max-w-5xl" />
        </div>
      );
    }
    case "subsplit": {
      const lead = p.gallery[0];
      return (
        <div className="rounded-[28px] border border-line bg-surface p-4 sm:p-10">
          <BrowserFrame src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} url="sub-split-xi.vercel.app" tone="light" sizes="(min-width: 1280px) 1200px, 100vw" />
        </div>
      );
    }
    case "porta": {
      const wrist = p.gallery.find((g) => g.src.includes("final-components"))!;
      const sketch = p.gallery.find((g) => g.src.includes("sketches"))!;
      return (
        <div className="grid gap-3 md:grid-cols-5">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-black md:col-span-2 md:aspect-auto">
            <Image src={wrist.src} alt={wrist.alt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-[50%_60%]" />
          </figure>
          <figure className="overflow-hidden rounded-[28px] bg-white p-4 md:col-span-3">
            <Image src={sketch.src} alt={sketch.alt} width={sketch.width} height={sketch.height} sizes="(min-width: 768px) 60vw, 100vw" className="h-auto w-full" />
          </figure>
        </div>
      );
    }
  }
}
