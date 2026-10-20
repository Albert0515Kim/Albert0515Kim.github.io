# Albert Kim — Portfolio

Personal portfolio built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Motion, and React Bits.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (every page is prerendered)
npm run lint
```

## Editing content

All copy lives in `src/data/`. The components only render what is there.

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Name, email, GitHub, LinkedIn, resume path, nav, education |
| `src/data/projects.ts` | Project cards and every `/work/[slug]` case study |
| `src/data/experience.ts` | Experience timeline, accessibility notes, skills |

Add a project by appending to `projects`. Its case study page is generated automatically. Optional case-study sections (`challenges`, `testing`, `reflection`) are skipped when absent. Every claim in these files came from the resume, the project repos and docs, the Devpost page, or the Porta Arm report. Please keep it that way.

Images live in `public/images/<project>/` and the resume is `public/albert-kim-resume.pdf`.

## React Bits

`src/components/reactbits/` holds the official React Bits sources, copied unmodified from the upstream repo (`src/ts-tailwind`):

- `MoltenMetal.tsx`: hero background (WebGL2, no dependencies)
- `BlurText.tsx`: hero and section heading reveals
- `Magnet.tsx`: magnetic primary CTAs

ESLint ignores this folder so the files can stay identical to upstream.

## Deploy

The site is Vercel-ready with no configuration. Set `NEXT_PUBLIC_SITE_URL` to the production URL so Open Graph metadata resolves absolute links.
