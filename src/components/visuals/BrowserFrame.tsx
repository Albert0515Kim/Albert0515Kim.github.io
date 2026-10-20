import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  url?: string;
  width: number;
  height: number;
  className?: string;
  tone?: "dark" | "light";
  sizes?: string;
};

export function BrowserFrame({ src, alt, url, width, height, className = "", tone = "dark", sizes = "(min-width: 1024px) 50vw, 100vw" }: BrowserFrameProps) {
  const chrome = tone === "dark" ? "bg-[#16181d] border-white/10" : "bg-[#f4f4f2] border-black/10";
  return (
    <figure className={`overflow-hidden rounded-xl border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] ${chrome} ${className}`}>
      <div className="flex h-8 items-center gap-1.5 px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        {url ? (
          <span className={`ml-3 truncate rounded-md px-3 py-0.5 font-mono text-[0.6rem] ${tone === "dark" ? "bg-white/5 text-muted" : "bg-black/5 text-black/50"}`}>
            {url}
          </span>
        ) : null}
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="block h-auto w-full" />
    </figure>
  );
}
