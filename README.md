# CVForge v2

CVForge is a local-first CV / resume builder with live A4 preview, ATS-oriented templates, ATS readiness heuristics, and local job-description keyword matching.

## Core features

- **ATS Classic** — conservative single-column resume.
- **ATS Modern** — modern single-column layout with restrained accent styling.
- **Creative** — photo + sidebar layout with configurable professional color palettes.
- **ATS Readiness** — heuristic score for identity/contact completeness, content, measurable impact, and format.
- **Job Match** — paste a job description to compare relevant keywords against the current CV.
- **Section controls** — reorder or hide sections without deleting data.
- **Live A4 preview** — estimated page count and warning when the CV grows beyond two pages.
- **Local autosave** — CV data stays in browser localStorage.
- **Backup / Import** — export the complete CV as JSON and restore it later.
- **PDF workflow** — print/export using the browser's PDF dialog with an improved document filename.

## Privacy

The ATS readiness check and Job Match analyzer run entirely in the browser. CV data and pasted job descriptions are not sent to an API or backend.

The ATS score is a **heuristic guidance score**, not a score from a specific commercial Applicant Tracking System.

## v2 data migration

CVForge v2 stores data under `cvforge-data-v2`. When that key does not exist, the app can migrate the older `cv-builder-data-v1` browser data and deep-merge it with the new v2 defaults so newly introduced fields do not erase older CV content.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 3
- Lucide React
- No backend required

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Notes on ATS compatibility

For ATS-sensitive applications, prefer **ATS Classic** or **ATS Modern**. The Creative template intentionally uses a two-column sidebar and graphic elements, so CVForge applies a format penalty in the heuristic ATS score when Creative is selected.
