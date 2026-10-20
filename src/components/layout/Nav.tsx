"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled && !open ? "border-b border-line/70 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1400px] items-center justify-end px-5 md:h-20 md:px-10">
        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-underline pb-0.5 text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-silver/50 hover:bg-surface"
            >
              Resume
              <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-40 bg-ink/95 px-5 pt-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col">
              {[...nav, { label: "Resume", href: site.resume }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 text-3xl font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
