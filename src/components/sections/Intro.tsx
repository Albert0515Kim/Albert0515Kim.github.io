import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="about" aria-labelledby="intro-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-24">
      <Reveal className="grid items-center gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        <div className="relative aspect-square w-full max-w-[20rem] overflow-hidden rounded-[24px] border border-line bg-surface">
          {site.portrait ? (
            <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill sizes="320px" className="object-cover" />
          ) : (
            <div aria-hidden="true" className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,#2a2d33,#111318_70%)]">
              <span className="text-chrome text-7xl font-semibold tracking-[-0.05em]">{site.initials}</span>
            </div>
          )}
        </div>

        <div className="max-w-2xl">
          <h2 id="intro-title" className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
            Hey there! <span aria-hidden="true">👋</span>
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted md:text-xl">
            <p>I&apos;m Albert, a Computer Science student at Northwestern University.</p>
            <p>
              I build mobile apps and full-stack web products, most recently Willie&apos;s Wallet, a student discount app on the
              App Store. I also work on web accessibility for Northwestern&apos;s websites.
            </p>
            <p>See some of my work and experience below!</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
