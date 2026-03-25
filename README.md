# BizSim — Course Edition (No Database)

AI-powered project management simulation for **YCBS 288 — Strategic Project Leadership** at McGill School of Continuing Studies.

## How It Works

Students click the link from myCourses → land on scenario selection → play. No login, no registration. Scores are shown at end of session but not persisted.

### 4 Industry Scenarios
- **Tech Startup** (Standard) — SaaS platform launch
- **Live Entertainment** (Advanced) — Touring show production
- **Construction** (Standard) — Commercial building project
- **R&D Innovation** (Expert) — Quantum sensor development

### Features
- 12-week project lifecycle with weekly decisions
- HBP-inspired causal model (stress → morale → productivity)
- AI coach **Anna** (Claude-powered, real-time advice)
- 4-dimension scoring (Budget, Schedule, Scope, Quality)
- Bilingual EN/FR
- McGill white/red theme

## Stack
- **Frontend**: Vite + React 18 (single-file SPA)
- **Backend**: 1 Vercel serverless function (`/api/ai-advisor`)
- **No database required**

## Environment Variables (Vercel)
```
ANTHROPIC_API_KEY=<your-key>
```

That's it. One env var.

## Deploy
1. Push to GitHub
2. Import in Vercel
3. Set `ANTHROPIC_API_KEY`
4. Share URL with students via myCourses

## Session Mapping
**Session 6 (Apr 28)** — Agile/Hybrid PM Methodology → BizSim Workshop

## Instructor
Sylvain Gauthier — Course Lecturer, McGill SCS
