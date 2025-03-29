# Tailwind CSS v3 to v4 Migration Guide

This document provides a comprehensive guide to help you understand and migrate from Tailwind CSS v3 to v4. It focuses on code-level changes with clear examples showing both v3 and v4 equivalents.

> **Browser Compatibility Note**: Tailwind CSS v4.0 is designed for Safari 16.4+, Chrome 111+, and Firefox 128+. If you need to support older browsers, stick with v3.4 until your browser support requirements change.

## Installation Changes

### Simplified Installation (v3 vs v4)

**v3 - PostCSS Plugin with Dependencies:**

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**v4 - Dedicated PostCSS Package:**

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Vite Integration

**v3 - Generic PostCSS Use:**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Using postcss config file
});
```

**v4 - Dedicated Vite Plugin:**

```js
// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

## Content Path

**v3**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
```

**v4**

```css
/* styles.css */
@import "tailwindcss";
/* 自動検出されるため、コンテンツパスの指定が不要 */

/* 特定のソースを明示的に追加する場合 */
@source "../node_modules/@my-company/ui-lib";
```

## CSS Structure Changes

### CSS Import Structure

**v3 - Using @tailwind Directives:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 - Using Standard CSS Import:**

```css
@import "tailwindcss";
```

### Theme Configuration

**v3 - JavaScript Config:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      avocado: {
        100: "#f9fff0",
        200: "#efffd9",
        300: "#e4ffbf",
        400: "#d6ffa6",
        500: "#b8e676",
        600: "#86a33f",
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    transitionTimingFunction: {
      fluid: "cubic-bezier(0.3, 0, 0, 1)",
      snappy: "cubic-bezier(0.2, 0, 0, 1)",
    },
  },
}
```

**v4 - CSS-based Theme:**

```css
@theme {
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --font-sans: "Inter", sans-serif;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

### Accessing Theme Values in JavaScript

**v3 - Using resolveConfig:**

```js
// v3 - resolve theme values in JavaScript
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
const blue500 = fullConfig.theme.colors.blue[500] // #3b82f6
```

**v4 - Using CSS Variables:**

```js
// v4 - access CSS variables directly
const styles = getComputedStyle(document.documentElement)
const blue500 = styles.getPropertyValue('--color-blue-500') // #3b82f6
```

### CSS Variables & Theme Configuration

**v3 - CSS Variables in Base Layer:**

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
  }
}
```

**v4 - Root Variables with Theme Directive:**

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

### Dynamic Utility Values

**v3 - Fixed utility values:**

```html
<!-- In v3, you need to know what values exist in your config -->
<div class="p-4 mt-6 text-lg"></div>
```

**v4 - Dynamic value lookup:**

```html
<!-- In v4, you can use any value in your theme -->
<div class="p-[--spacing-4] mt-[--spacing-6] text-[--text-lg]"></div>
```

## Class Naming Changes

### Renamed Utilities

| v3 | v4 | Note |
|----|----|----|
| `shadow-sm` | `shadow-xs` | Size adjustments |
| `shadow` | `shadow-sm` | Size adjustments |
| `drop-shadow-sm` | `drop-shadow-xs` | Size adjustments |
| `drop-shadow` | `drop-shadow-sm` | Size adjustments |
| `blur-sm` | `blur-xs` | Size adjustments |
| `blur` | `blur-sm` | Size adjustments |
| `backdrop-blur-sm` | `backdrop-blur-xs` | Size adjustments |
| `backdrop-blur` | `backdrop-blur-sm` | Size adjustments |
| `rounded-sm` | `rounded-xs` | Size adjustments |
| `rounded` | `rounded-sm` | Size adjustments |
| `outline-none` | `outline-hidden` | Name change (functionality same) |
| `ring` | `ring-3` | Default ring width changed from 3px to 1px |

### Default Behavior Changes

**v3 - Default ring is 3px blue:**

```html
<button class="focus:ring ...">Button</button>
```

**v4 - Ring defaults to 1px currentColor:**

```html
<button class="focus:ring-3 focus:ring-blue-500 ...">Button</button>
```

### Removed Deprecated Utilities

| Deprecated (v3) | Replacement (v4) |
|----|----|
| `bg-opacity-50` | `bg-black/50` |
| `text-opacity-50` | `text-black/50` |
| `border-opacity-50` | `border-black/50` |
| `divide-opacity-50` | `divide-black/50` |
| `ring-opacity-50` | `ring-black/50` |
| `placeholder-opacity-50` | `placeholder-black/50` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |

### Outline Utilities

**v3 - Outline requires both classes:**

```html
<input class="outline outline-2" />
```

**v4 - Simplified outline:**

```html
<input class="outline-2" />
```

### Space Between Changes

**v3 - Uses ~ selector:**

```css
/* Generated CSS in v3 */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}
```

**v4 - Uses :not(:last-child):**

```css
/* Generated CSS in v4 */
.space-y-4 > :not(:last-child) {
  margin-bottom: 1rem;
}
```

**Recommendation for v4:**

```html
<!-- Instead of space utilities, prefer gap: -->
<div class="flex flex-col gap-4">
  <!-- Children -->
</div>
```

## CSS Variables in Arbitrary Values

**v3 - Square brackets:**

```html
<div class="bg-[--brand-color]"></div>
```

**v4 - Parentheses:**

```html
<div class="bg-(--brand-color)"></div>
```

## Container Changes

**v3 - JavaScript config for container:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
```

**v4 - CSS-based container customization:**

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

## Default Values Changes

### Default Border Color

**v3 - Gray-200 by default:**

```html
<!-- In v3, borders default to gray-200 -->
<div class="border px-2 py-3"></div>
```

**v4 - currentColor by default:**

```html
<!-- In v4, must specify border color -->
<div class="border border-gray-200 px-2 py-3"></div>
```

### Default Placeholder Color

**v3 - Gray-400 placeholder:**

```css
/* Generated CSS in v3 */
::placeholder {
  color: var(--color-gray-400);
}
```

**v4 - Current text color at 50% opacity:**

```css
/* v4 automatically handles this with opacity */
/* If you want v3 behavior, add this CSS: */
@layer base {
  input::placeholder,
  textarea::placeholder {
    color: var(--color-gray-400);
  }
}
```

### Default Cursor on Buttons

**v3 - Pointer cursor:**

```css
/* Generated CSS in v3 */
button:not(:disabled) {
  cursor: pointer;
}
```

**v4 - Default cursor:**

```css
/* If you want v3 behavior, add this CSS: */
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Custom Utilities

**v3 - Using @layer utilities:**

```css
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}
```

**v4 - Using @utility directive:**

```css
@utility tab-4 {
  tab-size: 4;
}
```

### Component Utilities

**v3 - Using @layer components:**

```css
@layer components {
  .btn {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: ButtonFace;
  }
}
```

**v4 - Using @utility for components:**

```css
@utility btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ButtonFace;
}
```

> Note: In v4, utilities are sorted by specificity, so single-property utilities will override multi-property component utilities if they come after them in your HTML.

## Gradient Changes

**v3 - Gradient overrides reset values:**

```html
<div class="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500">
  <!-- In v3 dark mode, "to" is reset to transparent -->
</div>
```

**v4 - Gradient values preserved across variants:**

```html
<div class="bg-linear-to-r from-red-500 to-yellow-400 dark:from-blue-500">
  <!-- In v4 dark mode, "to" remains yellow-400 -->
</div>

<!-- To explicitly reset a gradient value in v4: -->
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
</div>
```

### Gradient Opacity

**v3**

```css
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-blue-500 {
  --tw-gradient-from: #3b82f6;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0));
}
.from-blue-500\/50 {
  --tw-gradient-from: rgba(59, 130, 246, 0.5);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0));
}
```

**v4**

```css
/* Gradient opacity (use of color-mix()) */
.bg-linear-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-blue-500 {
  --tw-gradient-from: var(--color-blue-500);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, transparent);
}
.from-blue-500\/50 {
  --tw-gradient-from: color-mix(in oklab, var(--color-blue-500) 50%, transparent);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, transparent);
}
```

## Variant Changes

### Variant Stacking Order

**v3 - Right to left application:**

```html
<ul class="py-4 first:*:pt-0 last:*:pb-0">
  <!-- Applies variants from right to left -->
</ul>
```

**v4 - Left to right application:**

```html
<ul class="py-4 *:first:pt-0 *:last:pb-0">
  <!-- Applies variants from left to right -->
</ul>
```

### Hover on Mobile

**v3 - Hover applies on tap on mobile:**

```css
/* Generated CSS in v3 */
.hover\:underline:hover {
  text-decoration: underline;
}
```

**v4 - Hover only applies on hover-capable devices:**

```css
/* Generated CSS in v4 */
@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration: underline;
  }
}
```

**To revert to v3 behavior:**

```css
@custom-variant hover (&:hover);
```

## Prefix Changes

**v3 - Prefix added to utility names:**

```html
<div class="twflex twhover:bg-blue-500"></div>
```

**v4 - Prefix as a variant:**

```html
<div class="tw:flex tw:hover:bg-blue-500"></div>
```

## Import in CSS Modules

**v3 - Using @tailwind in main CSS:**

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 - Using @reference for CSS modules:**

```css
/* button.module.css */
@reference "../globals.css";

.button {
  @apply px-4 py-2 rounded-md bg-blue-500 text-white;
}
```

## shadcn/ui Specific Changes

### Component Structure Changes

**v3 - Using forwardRef:**

```tsx
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"
```

**v4 - Function component with data-slot:**

```tsx
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}
```

### Chart Color Handling

**v3 - Using hsl function for CSS variables:**

```ts
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}
```

**v4 - Direct CSS variable usage:**

```ts
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}
```

### Size Utility Optimization

**v3 - Separate width and height utilities:**

```html
<div class="w-4 h-4"></div>
```

**v4 - Unified size utility:**

```html
<div class="size-4"></div>
```

## New Features in v4

### not-* Variant

**v4 - New not-* variant:**

```html
<!-- Style only when not matching another condition -->
<div class="not-dark:bg-white dark:bg-black">
  <!-- White in light mode, black in dark mode -->
</div>

<!-- Style only when an element doesn't match a selector -->
<div class="not-[.special]:opacity-50">
  <!-- 50% opacity unless it has the 'special' class -->
</div>
```

### @starting-style Support

**v4 - CSS transitions without JavaScript:**

```css
/* Define a transition */
.fade-in {
  opacity: 1;
  transition: opacity 300ms;
}

/* Define a starting style */
@starting-style {
  .fade-in {
    opacity: 0;
  }
}
```

```html
<!-- Element will fade in when added to the DOM -->
<div class="fade-in">Hello world</div>
```

### Container Queries

**v4 - Style based on container size:**

```html
<!-- Define a container -->
<div class="@container">
  <!-- Elements that respond to container size -->
  <div class="@md:text-lg @lg:text-xl">
    <!-- Text size changes based on container width -->
  </div>
</div>
```

### 3D Transform Utilities

**v4 - Direct 3D transforms:**

```html
<!-- 3D rotation in v3 required custom CSS -->
<div class="rotate-x-45 rotate-y-30 perspective-500">
  <!-- Element rotated in 3D space -->
</div>
```

### Color Features

**v4 - color-mix() Support:**

```html
<!-- Mix colors with transparency -->
<div class="bg-blue-500/50">
  <!-- Generated with color-mix in v4 -->
</div>
```

**v4 - OKLCH Color Palette:**

```css
@theme {
  /* Colors automatically use OKLCH color space */
  --color-blue-500: #3b82f6; /* Converted to OKLCH internally */
}
```

### More New Features

**v4 - color-scheme Support:**

```html
<div class="color-scheme-dark">
  <!-- Tells the browser to use dark mode UI elements -->
</div>
```

**v4 - field-sizing Support:**

```html
<input class="field-sizing-content" />
```

**v4 - Complex Shadows:**

```html
<div class="shadow-[0_0_10px_5px_rgba(0,0,0,0.1),inset_0_0_5px_rgba(0,0,0,0.2)]">
  <!-- Multiple shadows in one utility -->
</div>
```

**v4 - inert Support:**

```html
<div class="inert">
  <!-- Element and its children are excluded from the accessibility tree -->
</div>
```

## Animation Changes

**v3 - Using tailwindcss-animate plugin:**

```css
@plugin 'tailwindcss-animate';
```

**v4 - Using tw-animate-css package:**

```css
@import "tw-animate-css";
```
