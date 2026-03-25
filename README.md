# BizSim — Course Edition

AI-powered project management simulation for **YCBS 288 — Strategic Project Leadership** at McGill School of Continuing Studies.

## Overview

Students play as CEO/PM of a tech project, making weekly decisions on budget, schedule, scope, quality, and team management across a 12-week project lifecycle. AI coach **Anna** provides guidance throughout.

### 4 Industry Scenarios
- **Tech Startup** (Standard) — SaaS platform launch at Nexus Technologies
- **Live Entertainment** (Advanced) — Touring show production at Stellar Productions
- **Construction** (Standard) — Commercial building at UrbanCore Construction
- **R&D Innovation** (Expert) — Quantum sensor development at FutureTech Labs

### Scoring
4 dimensions (Budget, Schedule, Scope, Quality) + team process + consistency bonuses. Letter grades A+ through F on a 1000-point scale.

## Stack
- **Frontend**: Vite + React 18 (single-file SPA)
- **Backend**: Vercel Serverless Functions
- **Database**: Neon PostgreSQL via `@vercel/postgres`
- **Auth**: JWT (email/password only)
- **AI Coach**: Anthropic Claude API

## Course Edition Differences
This is a stripped-down fork of [BizSimHub](https://bizsimlive.com) for classroom use:
- ✅ All scenarios unlocked (no paywall)
- ✅ Simple email/password registration (no Google OAuth)
- ✅ McGill white/red theme
- ✅ Individual play (not team-based)
- ❌ No Stripe / payments
- ❌ No admin dashboard
- ❌ No PM tools catalog

## Environment Variables (Vercel)
```
POSTGRES_URL=<neon-connection-string>
JWT_SECRET=<random-secret>
ANTHROPIC_API_KEY=<anthropic-key>
```

## Deploy
1. Push to GitHub
2. Import in Vercel → link to Neon database
3. Set environment variables
4. Hit `/api/init-db` once to create tables
5. Share URL with students via myCourses

## Session Mapping
- **Session 6 (Apr 28)** — Agile/Hybrid PM Methodology → BizSim Workshop

## Instructor
Sylvain Gauthier — Course Lecturer, McGill SCS
