import BlurText from "@/components/reactbits/BlurText";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
};

// The visible heading is BlurText (a <p>), so a screen-reader-only <h2> carries the semantics.
export function SectionHeading({ id, eyebrow, title, lede, className = "" }: SectionHeadingProps) {
  return (
    <header className={`max-w-4xl ${className}`}>
      <p className="eyebrow mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="sr-only">
        {title}
      </h2>
      <div aria-hidden="true">
        <BlurText
          text={title}
          animateBy="words"
          direction="bottom"
          delay={70}
          stepDuration={0.4}
          blur={12}
          distance={28}
          className="font-display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-fg"
        />
      </div>
      {lede ? <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{lede}</p> : null}
    </header>
  );
}
