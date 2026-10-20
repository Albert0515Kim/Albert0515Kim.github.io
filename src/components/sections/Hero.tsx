"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileText, Mail } from "lucide-react";
import type { ReactNode } from "react";
import MoltenMetal from "@/components/reactbits/MoltenMetal";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[17px] fill-current">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const links: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Resume", href: site.resume, icon: <FileText aria-hidden="true" className="size-[18px]" /> },
  { label: "LinkedIn", href: site.linkedin, icon: <LinkedInIcon /> },
  { label: "GitHub", href: site.github, icon: <GitHubIcon /> },
  { label: "Email", href: `mailto:${site.email}`, icon: <Mail aria-hidden="true" className="size-[18px]" /> },
];

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex h-[100svh] min-h-[560px] items-center overflow-hidden">
      {/* Liquid-chrome field: the official React Bits Molten Metal background, tuned to silver. */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <MoltenMetal
          colors={["#1c1d21", "#6c7079", "#c9ccd2"]}
          coreColor="#fff4e2"
          colorMode="molten"
          speed={0.2}
          scale={2.6}
          detail={5}
          glow={2}
          thickness={0.9}
          swirl={1}
          turbulence={0.2}
          haze={0.7}
          brightness={1.45}
          drift={0.25}
          grain={0.035}
          offsetX={0.16}
          mouseStrength={0.4}
          flareOnClick={false}
          dpr={1.5}
        />
      </motion.div>

      {/* Contrast masks: keep the name crisp without flattening the metal. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,11,0.8)_0%,rgba(8,9,11,0.45)_45%,rgba(8,9,11,0)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-24">
        <motion.h1
          id="hero-title"
          className="text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-none tracking-[-0.045em] text-fg"
          {...enter(0.3)}
        >
          {site.name}
        </motion.h1>

        <motion.ul className="mt-8 flex flex-wrap gap-3" {...enter(0.55)}>
          {links.map((l) => {
            const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[0.95rem] font-medium text-fg backdrop-blur-md transition-colors duration-300 hover:border-white/35 hover:bg-white/10"
                >
                  {l.icon}
                  {l.label}
                  {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
