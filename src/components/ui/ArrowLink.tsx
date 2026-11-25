import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");

// Inline text link with a drawn underline.
export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  const external = isExternal(href);
  const classes = `group inline-flex items-center gap-1.5 text-fg ${className}`;
  const inner = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
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
