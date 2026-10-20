import { skills } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Toolbox() {
  return (
    <section aria-labelledby="tools-title" className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 md:pb-40">
      <SectionHeading
        id="tools-title"
        eyebrow="Toolbox"
        title="Tools of the Trade."
        lede="Only what I've used in shipped work, client projects, and coursework."
      />
      <Reveal className="mt-16 md:mt-20">
        <dl className="border-t border-line">
          {skills.map((s) => (
            <div key={s.group} className="group grid gap-3 border-b border-line py-6 transition-colors duration-500 hover:bg-surface/40 md:grid-cols-12 md:gap-8 md:py-7">
              <dt className="eyebrow md:col-span-3 md:pt-1.5 group-hover:text-silver">{s.group}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg tracking-[-0.01em] text-fg/90 md:text-xl">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
