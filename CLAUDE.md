# CLAUDE.md
We 're building the app descibed in @SPEC.MD. Read that file for general architectural tasks or to double-check the 
exact database structure, tech stack or application architecture.
Keep your replies extremely concise and focus on conveying the key information. No necessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Note-taking web app with TipTap rich text editor, built on Next.js 16 App Router. See `SPEC.md` for full technical specification.

## Commands

- `bun dev` — start dev server (localhost:3000)
- `bun run build` — production build
- `bun run lint` — ESLint (flat config with next core-web-vitals + typescript)
- `bun run start` — start production server

## Tech Stack

- **Runtime:** Bun
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Auth:** better-auth (email/password, manages its own tables: user, session, account, verification)
- **Editor:** TipTap v3 (content stored as JSON)
- **Database:** SQLite via Bun SQL client — raw SQL only, no ORM
- **Validation:** Zod v4

## Architecture

- Uses `@/*` path alias mapping to project root
- App Router file conventions: `app/` directory with `layout.tsx`, `page.tsx`, etc.
- Fonts: Geist Sans + Geist Mono via `next/font/google`

## Key Decisions from Spec

- Notes stored as TipTap JSON in SQLite
- Database accessed with raw SQL through Bun's built-in SQLite client
- better-auth tables must not be manually modified — use `npx auth@latest migrate`
- Editor supports: bold, italic, H1-H3, paragraph, inline code, code blocks, bullet lists, horizontal rules
- Notes support public sharing via share tokens

## Environment Variables

Copy `.env.example` to `.env`:
- `BETTER_AUTH_SECRET` — auth secret (must be 32+ chars)
- `DB_PATH` — SQLite database file path (default: `data/app.db`)
