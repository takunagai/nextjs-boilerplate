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
  - `accessibility/` - WCAG compliant accessibility components
  - `effects/` - Animation and visual effect components
  - `sections/` - Page section components
  - `home/`, `services/`, `contact/` - Feature-specific components
  - `background/constellation/` - Modular 3D background effect components

- `/src/hooks/` - Custom React hooks for shared logic:
  - `use-form-submission.ts` - Unified form submission with error handling
  - `use-hero-height.ts` - Dynamic hero section height calculation
  - `use-constellation-*.ts` - 3D background effect hooks
  - `use-header-*.ts` - Header state and style management
  - `use-announcement-bar.ts` - Announcement bar visibility

- `/src/lib/` - Utilities and configurations:
  - `auth/` - Auth.js (NextAuth v5) configuration with JWT strategy
  - `constants/` - Application-wide constants and configurations
  - `server/` - Server-side utilities for API responses and validation
  - `validation/` - Zod schemas for form and API validation
  - `accessibility/` - Accessibility utilities and helpers

- `/src/constants/` - Centralized constants:
  - `ui.ts` - UI magic numbers and timing constants
  - `constellation.ts` - 3D effect configuration

- `/src/types/` - TypeScript type definitions

### Key Technical Decisions

1. **Authentication**: Auth.js v5 with JWT strategy (no database required initially)
2. **Styling**: Tailwind CSS v4 with CVA for component variants
3. **Forms**: React Hook Form + Zod for type-safe validation
4. **Testing**: Vitest for unit tests, Playwright for E2E tests
5. **Performance**: React 19 Compiler enabled for automatic optimizations
6. **Security**: Middleware-based CSRF protection and rate limiting
7. **Accessibility**: WCAG 2.1 AA compliance as standard

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

## Development Workflow

### Before Implementation

1. **Task Planning**: Use TodoWrite tool for complex tasks (3+ steps)
2. **Code Search**: Use Agent tool to search for existing patterns
3. **Constants Check**: Check `UI_CONSTANTS` for reusable values
4. **Accessibility First**: Consider WCAG requirements from the start

### During Development

- Follow atomic commits with conventional commit format
- Test with screen readers and keyboard navigation
- Use existing hooks and components when available
- Maintain consistent error handling patterns
- Extract magic numbers to constants
- Use TypeScript strict mode throughout

### Code Organization

- Group related functionality in feature directories
- Extract reusable logic into custom hooks
- Split large components (>200 lines) into smaller modules
- Document complex logic with JSDoc comments

## Performance Patterns

### Component Optimization

- **Large Component Refactoring**: Split 600+ line components into modules
  - Example: Digital Constellation split from 604 lines to 13 files
- **Custom Hooks**: Create hooks for shared logic patterns
  - `useFormSubmission` - Centralized form handling
  - `useHeroHeight` - Dynamic height calculations
- **Constants Management**: Use `UI_CONSTANTS` to eliminate magic numbers
- **Lazy Loading**: Use dynamic imports for heavy components

### Animation Performance

- Prefer CSS animations over JavaScript animations
- Use `transform` and `opacity` for smooth animations
- Avoid animation property conflicts (shorthand vs longhand)
- Use GPU-accelerated properties when possible

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

- **Required for all components**: Keyboard navigation, screen reader support
- **Available Components**:
  ```tsx
  // Form inputs with built-in accessibility
  <AccessibleInput label="Email" error={errors.email} />
  <AccessibleTextarea label="Message" />
  <AccessibleSelect options={options} />
  
  // Status announcements
  <SuccessAnnouncement message="Form submitted" />
  <ErrorAnnouncement errors={["Invalid email"]} />
  
  // Navigation helpers
  <SkipLink href="#main-content" />
  <FocusIndicator />
  ```

### Development Tools

- **Accessibility Check**: Run `accessibility.checkPage()` in development
- **Keyboard Testing**: Test all interactive elements with Tab key
- **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
- **Color Contrast**: Use `colorContrast.meetsWCAG()` utility

## Common Patterns

### Form Handling

```typescript
// Use unified form submission logic
const { handleSubmit, isLoading, error } = useFormSubmission({
  form,
  submitFn: async (data) => submitContactForm(data),
  onSuccess: () => router.push('/thank-you')
});
```

### Hero Sections

```typescript
// Use consistent hero height management
const { paddingTop, heroStyle } = useHeroHeight();

<section style={heroStyle}>
  <HeroContainer>
    {/* Content */}
  </HeroContainer>
</section>
```

### Error Handling

```typescript
// Use standardized server responses
import { createResponse, createError } from "@/lib/server";

// Success response
return createResponse({ message: "Success" });

// Error response
return createError("Validation failed", 400, { fieldErrors });
```

### Visual Effects

```typescript
// Add background effects
<FlowingComments maxComments={25} />
<DigitalConstellation nodeCount={150} />
```

## Common Issues & Solutions

### React Hooks Errors

- ❌ Don't: Call hooks in object literals
  ```typescript
  const refs = { mesh: useRef() }; // Wrong
  ```
- ✅ Do: Call hooks at top level
  ```typescript
  const meshRef = useRef();
  const refs = { mesh: meshRef }; // Correct
  ```

### Animation Conflicts

- ❌ Don't: Mix shorthand and longhand properties
  ```typescript
  animation: "slide 1s linear",
  animationFillMode: "both" // Conflict
  ```
- ✅ Do: Use complete shorthand
  ```typescript
  animation: "slide 1s linear both"
  ```

### TypeScript JSX Errors

- Import React when using JSX namespace
  ```typescript
  import React from "react";
  type Element = keyof React.JSX.IntrinsicElements;
  ```

### SSR Window Errors

- Always check for client-side execution
  ```typescript
  if (typeof window === 'undefined') return;
  ```

## Testing Guidelines

### Unit Tests

- Test custom hooks in isolation
- Mock external dependencies
- Focus on business logic, not implementation
- Use Testing Library best practices

### E2E Tests

- Test critical user journeys
- Use page objects pattern
- Test responsive behavior
- Include accessibility checks

## Development Notes

- Test users are defined in `src/lib/auth/test-data.ts` (remove in production)
  - User: `user@example.com` / `password123`
  - Admin: `admin@example.com` / `password123`
- Example pages can be hidden with `SHOW_EXAMPLES=false` in production
- Server-side utilities provide standardized API responses and error handling
- SEO components handle meta tags, JSON-LD, and breadcrumbs automatically
- Theme system supports light/dark modes with localStorage persistence
- Accessibility utilities provide WCAG compliance checking in development

## Important Reminders

- Always run `npm run lint` before committing
- Test with both light and dark themes
- Verify mobile responsiveness
- Check accessibility with screen readers
- Use semantic HTML elements
- Keep components under 200 lines
- Extract repeated logic to hooks
- Document complex algorithms