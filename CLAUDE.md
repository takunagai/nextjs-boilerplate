# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `npm run build`
- Dev: `npm run dev --turbopack`
- Lint: `npm run lint`
- Format: `npm run format`
- Test: `npm test` or `vitest`
- Test specific file: `vitest path/to/test.test.ts`
- Test watch mode: `npm run test:watch`
- Test coverage: `npm run test:coverage`
- E2E tests: `npm run test:e2e`
- E2E UI mode: `npm run test:e2e:ui`
- E2E Chromium only: `npm run test:e2e:chromium`
- E2E debug: `npm run test:e2e:debug`
- E2E report: `npm run test:e2e:report`

## Architecture Overview

### Directory Structure

- `/src/app/` - Next.js App Router pages with parallel route groups:
  - `(site)` - Public pages (home, about, services, etc.)
  - `(auth)` - Authentication pages (login, register)
  - `(app)` - Protected application area (dashboard)
  - `(examples)` - Development sample pages (hidden in production via env var)
  - `api/` - API routes including auth endpoints
  - `actions/` - Server Actions for forms and data mutations

- `/src/components/` - Reusable components organized by feature:
  - `ui/` - Base UI components (shadcn/ui based)
  - `auth/` - Authentication forms and user menu
  - `layout/` - Header, footer, navigation components
  - `seo/` - SEO optimization components (meta tags, JSON-LD)
  - `theme/` - Dark mode theme system components

- `/src/lib/` - Utilities and configurations:
  - `auth/` - Auth.js (NextAuth v5) configuration with JWT strategy
  - `constants/` - Application-wide constants and configurations
  - `server/` - Server-side utilities for API responses and validation
  - `validation/` - Zod schemas for form and API validation

### Key Technical Decisions

1. **Authentication**: Auth.js v5 with JWT strategy (no database required initially)
2. **Styling**: Tailwind CSS v4 with CVA for component variants
3. **Forms**: React Hook Form + Zod for type-safe validation
4. **Testing**: Vitest for unit tests, Playwright for E2E tests
5. **Performance**: React 19 Compiler enabled for automatic optimizations
6. **Security**: Middleware-based CSRF protection and rate limiting

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
- No manual memo/useCallback/useMemo (React Compiler handles it)

## Development Notes

- Test users are defined in `src/lib/auth/test-data.ts` (remove in production)
  - User: `user@example.com` / `password123`
  - Admin: `admin@example.com` / `password123`
- Example pages can be hidden with `SHOW_EXAMPLES=false` in production
- Server-side utilities provide standardized API responses and error handling
- SEO components handle meta tags, JSON-LD, and breadcrumbs automatically
- Theme system supports light/dark modes with localStorage persistence
