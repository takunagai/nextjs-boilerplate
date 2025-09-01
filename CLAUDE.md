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

This project follows Next.js 15 App Router best practices with comprehensive error handling, security middleware, and optimized loading states.

### Directory Structure

- `/docs/` - Unified documentation (industry standard compliant):
  - `development/` - Development process (plans, reports, tasks, archive)
  - `guides/` - Implementation guides (authentication, deployment, components, hooks, migration, tips)
  - `operations/` - Operations & DevOps (performance management)
  - `examples/` - Sample code (components, forms, testing)
  - `reference/` - Technical specifications & reference (specifications, features, business)

- `/src/app/` - Next.js App Router pages with parallel route groups:
  - `(site)` - Public pages (home, about, services, etc.) with site-specific error/loading
  - `(auth)` - Authentication pages (login, register) with auth-specific error/loading
  - `(app)` - Protected application area (dashboard) with app-specific error/loading
  - `(examples)` - Development sample pages with dev-focused error/loading (hidden in production via env var)
  - `api/` - API routes including auth endpoints
  - `actions/` - Server Actions for forms and data mutations
  - `error.tsx` - Root error boundary with user-friendly error handling
  - `global-error.tsx` - Global error boundary for critical system errors
  - `loading.tsx` - Root loading component with branded loading UI
  - `robots.ts` - Enhanced SEO robots.txt with comprehensive crawling rules
  - `sitemap.ts` - Dynamic sitemap generation with service pages and news

- `/src/components/` - Reusable components organized by feature:
  - `ui/` - Base UI components (shadcn/ui based)
  - `auth/` - Authentication forms and user menu
  - `layout/` - Header, footer, navigation components
  - `seo/` - SEO optimization components (meta tags, JSON-LD)
  - `theme/` - Dark mode theme system components
  - `accessibility/` - WCAG compliant accessibility components
  - `effects/` - Animation and visual effect components
  - `sections/` - Page section components
  - `home/`, `contact/` - Feature-specific components
  - `services/` - Service page components with shared architecture:
    - `shared/` - Shared components (`ServiceHeroSection`, `ServiceFinalCTA`)
    - `web-development/`, `creative/`, `consulting/` - Service-specific implementations
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
6. **Security**: Comprehensive middleware with Auth.js v5 integration:
   - CSRF protection with token validation
   - Rate limiting for API endpoints
   - Security headers (CSP, HSTS, etc.)
   - Request sanitization and validation
7. **Error Handling**: Route-specific error boundaries with graceful degradation
8. **Loading States**: Suspense-based loading with route-specific optimizations
9. **SEO**: Enhanced robots.txt and dynamic sitemap generation
10. **Component Architecture**: Shared component patterns for DRY principles
11. **Accessibility**: WCAG 2.1 AA compliance as standard

### Security Architecture

The project implements a comprehensive security layer through consolidated middleware:

- **Authentication Integration**: Auth.js v5 with Next.js 15 middleware
- **CSRF Protection**: Token-based validation for all state-changing operations
- **Rate Limiting**: Configurable limits for API endpoints and form submissions
- **Security Headers**: Automatic injection of CSP, HSTS, X-Frame-Options, etc.
- **Request Validation**: Input sanitization and XSS prevention

### Error Handling System

Route-specific error boundaries provide graceful error handling:

- **Root Error Boundary** (`error.tsx`): User-friendly error pages with retry functionality
- **Global Error Boundary** (`global-error.tsx`): Critical system errors with inline styles
- **Route Group Errors**: Specialized error handling for:
  - `(auth)/error.tsx`: Authentication-specific errors and recovery
  - `(app)/error.tsx`: Dashboard and protected area errors
  - `(site)/error.tsx`: Public site errors with navigation guidance
  - `(examples)/error.tsx`: Developer-focused errors with debugging info

### Loading State System

Suspense-based loading states optimized for each route group:

- **Root Loading** (`loading.tsx`): Branded loading UI with progress indicators
- **Route Group Loading**: Specialized loading states for:
  - `(auth)/loading.tsx`: Authentication process indicators
  - `(app)/loading.tsx`: Dashboard data loading with progress
  - `(site)/loading.tsx`: Public page loading with performance info
  - `(examples)/loading.tsx`: Development-focused loading with technical details

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
- **Apply DRY Principle**: Extract common logic into reusable functions
- **Use Validation Factories**: Create dynamic schemas with factory patterns
- **Implement Unified Error Handling**: Use centralized error management
- **Optimize Type Definitions**: Use schema inference for type safety

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

### Service Page Components

Shared component architecture for service pages reduces code duplication:

```typescript
// Use shared hero component with customization options
import { ServiceHeroSection } from "../shared";

export function WebDevHeroSection() {
  return (
    <ServiceHeroSection
      title={<>AI × 15年の制作経験で、<br />高品質なのに<span className="text-primary">お手頃価格</span>を実現</>}
      description={<p>最新の AI 技術を駆使してリサーチ・コンテンツ作成・コーディングを効率化。</p>}
      contactButtonText="無料相談を予約"
      backgroundGradient="from-blue-600/10 via-blue-400/5 to-background"
    />
  );
}

// Use shared CTA component with variant support
import { ServiceFinalCTA } from "../shared";

export function CreativeFinalCTASection() {
  return (
    <ServiceFinalCTA
      variant="complex"
      title="AI × 人の力で、あなたのクリエイティブを加速させます"
      features={<div>Custom feature grid...</div>}
      statistics={<div>Performance stats...</div>}
    />
  );
}
```

### DRY Refactoring Patterns

```typescript
// Use validation factories for flexible schema generation
const profileSchema = createProfileSchemaWithFactory({
  requireName: true,
  maxBioLength: 500,
  allowEmptyWebsite: true
});

// Unified error handling in Server Actions
const result = await handleServerActionError(async () => {
  return await updateProfile(data);
});

// Type-safe inference from schemas
export type UserProfile = z.infer<typeof profileDataSchema>;
export type ProfileFormValues = z.infer<typeof profileEditSchema>;
```

### Cache Management

```typescript
// Automatic cache invalidation after updates
import { revalidateTag, revalidatePath } from "next/cache";

export async function updateProfile(data: ProfileFormValues) {
  // ... update logic
  
  // Invalidate relevant caches
  revalidateTag("user-profile");
  revalidatePath("/profile");
  
  return { success: true, data: updatedProfile };
}
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

- **Documentation**: All docs unified in `/docs/` following industry standards (Single Source of Truth)
  - Implementation guides in `guides/` (authentication, deployment, components, etc.)
  - Development process in `development/` (plans, reports, tasks)
  - Sample code in `examples/` for learning and reference
- **Security**: Consolidated middleware at project root with comprehensive protection
  - CSRF tokens, rate limiting, security headers
  - Auth.js v5 integration with Next.js 15 middleware
- **Error Handling**: Route-specific error boundaries with graceful UX
  - User-friendly error pages with retry functionality
  - Developer-focused error details in examples route group
- **Loading States**: Suspense-based loading optimized for each route group
  - Branded loading UI with progress indicators
  - Route-specific loading optimizations
- **SEO**: Enhanced robots.txt and dynamic sitemap generation
  - Comprehensive crawling rules for public/private content
  - Dynamic news and service page inclusion
- **Component Architecture**: Shared service components reduce code duplication
  - `ServiceHeroSection` and `ServiceFinalCTA` shared components
  - 50-80% code reduction in service-specific implementations
- Test users are defined in `src/lib/auth/test-data.ts` (remove in production)
  - User: `user@example.com` / `password123`
  - Admin: `admin@example.com` / `password123`
- Example pages can be hidden with `SHOW_EXAMPLES=false` in production
- Server-side utilities provide standardized API responses and error handling
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