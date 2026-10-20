import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");

// Inline text link with a drawn underline and a nudging arrow.
export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  const external = isExternal(href);
  const classes = `group inline-flex items-center gap-1.5 text-fg ${className}`;
  const inner = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
      />
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
