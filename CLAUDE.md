# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Dev: `npm run dev --turbopack`
- Lint: `npm run lint`
- Format: `npm run format`
- Test: `npm test` or `vitest`
- Test specific file: `vitest path/to/test.test.ts`
- E2E tests: `npm run test:e2e`
- E2E UI mode: `npm run test:e2e:ui`

## Code Style
- TypeScript with strict type checking
- Tabs for indentation (width: 2)
- Double quotes for strings
- Line width: 80 characters max
- Use React 19 features including compiler optimization
- Organize imports alphabetically
- Use class-variance-authority (CVA) for component variants
- Follow Next.js 15+ app router conventions
- Prefer server components when possible
- Use Biome for linting/formatting
- Use Tailwind CSS (v4) with `cn` utility for class merging
- Use Zod for form validation
- Use React Hook Form for form state management