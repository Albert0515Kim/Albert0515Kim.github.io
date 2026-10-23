import { accessibility, accessibilityFixes } from "@/data/experience";
import { StackLine } from "@/components/work/ProjectMeta";

export function AccessibilityCard() {
  const e = accessibility;
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-line bg-surface">
      <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(168,199,250,0.14),transparent)]" />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div>
            <h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">{e.org}</h3>
            <p className="mt-2 text-lg text-silver">{e.role}</p>
            <p className="mt-1 font-mono text-xs tracking-wide text-subtle">
              {e.period} · {e.location}
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {e.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ice/60" />
                {pt}
              </li>
            ))}
          </ul>
          <StackLine stack={e.tools} label="Tools" />
        </div>

        <dl className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-6">
          {accessibilityFixes.map((f) => (
            <div key={f.fix} className="bg-surface p-5">
              <dt className="text-[0.95rem] font-medium text-fg">{f.fix}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{f.impact}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
