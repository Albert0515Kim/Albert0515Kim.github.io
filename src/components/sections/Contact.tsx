import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute bottom-[-50%] left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(201,204,210,0.10),transparent)]" />
        <div className="absolute bottom-[-30%] left-[60%] h-[60%] w-[40%] bg-[radial-gradient(closest-side,rgba(232,162,92,0.07),transparent)]" />
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
            Contact
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">Let&apos;s build something great.</p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              I&apos;m always interested in meaningful projects, interesting engineering challenges, and opportunities to learn
              from great people.
            </p>
            <a href={`mailto:${site.email}`} className="link-underline mt-6 inline-block pb-0.5 font-mono text-sm text-silver hover:text-fg">
              {site.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Button href={`mailto:${site.email}`} magnetic external>
              <Mail aria-hidden="true" className="size-4" />
              Email Me
            </Button>
            <Button href={site.github} variant="ghost" external>
              GitHub <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href={site.linkedin} variant="ghost" external>
              LinkedIn <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href={site.resume} variant="ghost" download>
              Download Resume <ArrowDownToLine aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
