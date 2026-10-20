"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Magnet from "@/components/reactbits/Magnet";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  magnetic?: boolean;
  external?: boolean;
  download?: boolean;
  className?: string;
};

const styles = {
  primary:
    "bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_-12px_rgba(201,204,210,0.45)]",
  ghost: "border border-line bg-ink/40 text-fg backdrop-blur-md hover:border-silver/50 hover:bg-surface/70",
};

// Pill CTA. Primary CTAs get the React Bits Magnet pull on pointer devices.
export function Button({ href, children, variant = "primary", magnetic = false, external, download, className = "" }: ButtonProps) {
  const classes = `group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const anchor =
    external || download ? (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" download={download || undefined}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  if (!magnetic) return anchor;
  return (
    <Magnet padding={60} magnetStrength={4} maxOffset={14}>
      {anchor}
    </Magnet>
  );
}
