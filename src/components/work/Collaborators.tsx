import Image from "next/image";
import type { Collaborator } from "@/data/projects";

type Tone = "dark" | "light";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Avatar({ person, tone }: { person: Collaborator; tone: Tone }) {
  const ring = tone === "dark" ? "ring-ink" : "ring-paper";
  if (person.github) {
    return (
      <Image
        src={`/images/team/${person.github.toLowerCase()}.webp`}
        alt=""
        width={32}
        height={32}
        className={`size-8 rounded-full object-cover ring-2 ${ring}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 place-items-center rounded-full font-mono text-[0.6rem] ring-2 ${ring} ${
        tone === "dark" ? "bg-surface-2 text-silver" : "bg-paper-2 text-black/60"
      }`}
    >
      {initials(person.name)}
    </span>
  );
}

function Name({ person, tone }: { person: Collaborator; tone: Tone }) {
  const color = tone === "dark" ? "text-fg" : "text-paper-ink";
  const href = person.github ? `https://github.com/${person.github}` : person.linkedin;
  if (!href) return <span className={color}>{person.name}</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`link-underline pb-px ${color}`}>
      {person.name}
    </a>
  );
}

// "In collaboration with" row: stacked avatars, then names joined as a sentence.
export function Collaborators({ people, tone = "dark" }: { people?: Collaborator[]; tone?: Tone }) {
  if (!people?.length) return null;
  return (
    <div className={`relative z-10 flex items-center gap-3 text-sm ${tone === "dark" ? "text-muted" : "text-black/55"}`}>
      <div className="flex shrink-0 -space-x-2">
        {people.map((p) => (
          <Avatar key={p.name} person={p} tone={tone} />
        ))}
      </div>
      <p className="leading-snug">
        In collaboration with{" "}
        {people.map((p, i) => (
          <span key={p.name}>
            <Name person={p} tone={tone} />
            {i < people.length - 2 ? ", " : i === people.length - 2 ? " and " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
