import Image from "next/image";
import { BookOpen } from "lucide-react";
import { education } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 md:pb-40">
      <h2 id="education-title" className="flex items-center gap-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
        <span className="size-2 rounded-full bg-ice" aria-hidden="true" />
        Education
      </h2>
      <Reveal className="mt-10 rounded-3xl border border-[color-mix(in_srgb,var(--color-ice)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-ice)_4%,var(--color-surface))] p-6 md:mt-14 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Image src="/images/northwestern-seal.svg" alt="" width={64} height={64} className="size-14 shrink-0 md:size-16" />
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg md:text-2xl">{education.school}</h3>
              <p className="mt-1 text-muted">{education.degree}</p>
            </div>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted sm:pt-2">{education.graduation}</p>
        </div>

        <h4 className="mt-8 text-sm font-medium text-fg">Coursework</h4>
        <ul className="mt-4 flex flex-wrap gap-3">
          {education.coursework.map((course) => (
            <li
              key={course}
              className="flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--color-ice)_20%,transparent)] bg-ink/40 py-2 pl-2 pr-4 text-[15px] font-medium text-fg/90 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--color-ice)_45%,transparent)]"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-ice/15 text-ice">
                <BookOpen className="size-4" aria-hidden="true" />
              </span>
              {course}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
