# Tailwind CSS v4 new features

## 3D Transform Utilities

**v3 - Limited 3D transform support:**

```html
<!-- In v3, 3D transforms required custom CSS or multiple utilities -->
<div class="transform rotate-12 scale-110">
  <!-- Limited to 2D transforms without custom CSS -->
</div>
```

```css
/* Custom CSS needed for 3D transforms in v3 */
.my-3d-element {
  transform: perspective(500px) rotateX(45deg) rotateY(30deg);
}
```

**v4 - Comprehensive 3D transform utilities:**

```html
<!-- 3D rotation in v4 with built-in utilities -->
<div class="rotate-x-45 rotate-y-30 perspective-500">
  <!-- Element rotated in 3D space -->
</div>

<!-- Combined 3D transformations -->
<div class="perspective-1000 rotate-x-15 rotate-y-30 rotate-z-10 translate-z-20 scale-z-110">
  <!-- Complex 3D transformation with multiple properties -->
</div>

<!-- 3D transform origin -->
<div class="rotate-y-45 origin-right">
  <!-- 3D rotation with specified transform origin -->
</div>

<!-- 3D transforms with hover state -->
<div class="rotate-x-0 hover:rotate-x-45 transition-transform duration-300">
  <!-- Element that rotates on hover with smooth transition -->
</div>
```

### Complete List of 3D Transform Utilities

| Utility | CSS Property | Example |
|---------|-------------|---------|
| `perspective-{value}` | `perspective: {value}px` | `perspective-500` |
| `rotate-x-{angle}` | `transform: rotateX({angle}deg)` | `rotate-x-45` |
| `rotate-y-{angle}` | `transform: rotateY({angle}deg)` | `rotate-y-30` |
| `translate-z-{value}` | `transform: translateZ({value}px)` | `translate-z-10` |
| `scale-z-{value}` | `transform: scaleZ({value})` | `scale-z-150` |
| `transform-style-3d` | `transform-style: preserve-3d` | `transform-style-3d` |
| `backface-visible` | `backface-visibility: visible` | `backface-visible` |
| `backface-hidden` | `backface-visibility: hidden` | `backface-hidden` |

## Gradient Utilities

### Linear Gradients

**v3 - Basic linear gradient:**

```html
<!-- Linear gradient in v3 -->
<div class="bg-gradient-to-r from-red-500 to-blue-500">
  <!-- Basic linear gradient from left to right -->
</div>

<!-- Linear gradient with via color -->
<div class="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
  <!-- Linear gradient with middle stop -->
</div>
```

**v4 - Enhanced linear gradient:**

```html
<!-- Linear gradient in v4 -->
<div class="bg-linear-to-r from-red-500 to-blue-500">
  <!-- Basic linear gradient using new syntax -->
</div>

<!-- Linear gradient with interpolation mode -->
<div class="bg-linear-to-r from-red-500 to-blue-500 interpolate-hue">
  <!-- Linear gradient that interpolates through hue space -->
</div>

<!-- Linear gradient with multiple color stops and positions -->
<div class="bg-linear-to-r from-red-500 from-10% via-purple-500 via-40% to-blue-500 to-90%">
  <!-- Linear gradient with positioned color stops -->
</div>
```

### Radial Gradients (New in v4)

**v3 - Required custom CSS:**

```css
/* Custom CSS needed for radial gradients in v3 */
.radial-gradient {
  background-image: radial-gradient(circle, #ff0000, #0000ff);
}
```

**v4 - Built-in radial gradient utilities:**

```html
<!-- Basic radial gradient -->
<div class="bg-radial from-yellow-300 to-orange-500">
  <!-- Circular radial gradient from center -->
</div>

<!-- Elliptical radial gradient -->
<div class="bg-radial-ellipse from-green-300 to-blue-500">
  <!-- Elliptical radial gradient -->
</div>

<!-- Positioned radial gradient -->
<div class="bg-radial-at-tl from-pink-400 to-purple-600">
  <!-- Radial gradient from top-left corner -->
</div>

<!-- Custom position radial gradient -->
<div class="bg-radial-at-[30%_40%] from-amber-200 to-orange-600">
  <!-- Radial gradient from specific position -->
</div>

<!-- Sized radial gradient -->
<div class="bg-radial-[circle_at_center] from-blue-400 to-indigo-800">
  <!-- Radial gradient with specific size -->
</div>
```

### Conic Gradients (New in v4)

**v3 - Required custom CSS:**

```css
/* Custom CSS needed for conic gradients in v3 */
.conic-gradient {
  background-image: conic-gradient(from 45deg, #ff0000, #00ff00, #0000ff, #ff0000);
}
```

**v4 - Built-in conic gradient utilities:**

```html
<!-- Basic conic gradient -->
<div class="bg-conic from-red-500 via-green-500 to-blue-500">
  <!-- Conic gradient from center -->
</div>

<!-- Conic gradient with angle -->
<div class="bg-conic-[from_45deg] from-yellow-400 via-orange-500 to-red-600">
  <!-- Conic gradient starting from 45 degrees -->
</div>

<!-- Positioned conic gradient -->
<div class="bg-conic-at-br from-pink-500 via-purple-500 to-indigo-500">
  <!-- Conic gradient from bottom-right -->
</div>

<!-- Custom position conic gradient -->
<div class="bg-conic-at-[25%_75%] from-green-400 via-blue-500 to-purple-600">
  <!-- Conic gradient from specific position -->
</div>
```

### Gradient Variants Behavior Change

**v3 - Variants reset unspecified properties:**

```html
<div class="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500">
  <!-- In v3 dark mode, "to" is reset to transparent -->
</div>
```

**v4 - Values preserved across variants:**

```html
<div class="bg-linear-to-r from-red-500 to-yellow-400 dark:from-blue-500">
  <!-- In v4 dark mode, "to" remains yellow-400 -->
</div>

<!-- To explicitly reset a gradient value in v4: -->
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
  <!-- Explicitly resetting "via" in dark mode -->
</div>
```

### Full Gradient Syntax Reference

| Feature | v3 | v4 |
|---------|----|----|
| Linear | `bg-gradient-to-{direction}` | `bg-linear-to-{direction}` |
| Radial | Not built-in | `bg-radial` |
| Radial ellipse | Not built-in | `bg-radial-ellipse` |
| Radial positioned | Not built-in | `bg-radial-at-{position}` |
| Conic | Not built-in | `bg-conic` |
| Conic positioned | Not built-in | `bg-conic-at-{position}` |
| From color | `from-{color}` | `from-{color}` |
| Via color | `via-{color}` | `via-{color}` |
| To color | `to-{color}` | `to-{color}` |
| From position | Not built-in | `from-{percentage}` |
| Via position | Not built-in | `via-{percentage}` |
| To position | Not built-in | `to-{percentage}` |
| Interpolation | Not built-in | `interpolate-{mode}` |

## Cascade Layers

**v3 - Simulated layers with custom processing:**

```css
@layer base {
  /* Base styles */
}

@layer components {
  /* Component styles */
}

@layer utilities {
  /* Utility styles */
}
```

**v4 - Native CSS cascade layers:**

```css
/* v4 uses native CSS cascade layers */
@layer theme, base, components, utilities;

@layer base {
  /* Base styles - higher specificity than theme */
}

@layer components {
  /* Component styles - higher specificity than base */
}
```

## Custom Selector Variants

**v3 - Limited to predefined variants:**

```html
<div class="hover:bg-blue-500 focus:underline">
  <!-- Limited to built-in variants -->
</div>
```

**v4 - Custom variant definition:**

```css
/* Define custom variants in CSS */
@custom-variant highlighted (.highlighted &);
@custom-variant open ([open] &);
@custom-variant between-sm-and-md (@media (min-width: 640px) and (max-width: 767px) &);
```

```html
<!-- Use custom variants -->
<div class="highlighted:bg-yellow-200 open:text-blue-500 between-sm-and-md:grid-cols-2">
  <!-- Custom variants applied when conditions match -->
</div>
```

## Scroll-Driven Animations

**v3 - Required JavaScript for scroll animations:**

```js
// v3 needed JavaScript for scroll effects
document.addEventListener('scroll', () => {
  // Calculate position and apply styles
});
```

**v4 - Native scroll-driven animation variants:**

```html
<!-- Element fades in when it enters viewport -->
<div class="view-timeline:opacity-100 opacity-0 transition-opacity duration-700">
  <!-- Animates based on viewport position -->
</div>

<!-- Element scales up based on scroll position -->
<div class="scroll-timeline:scale-110 transition-transform duration-1000">
  <!-- Scales while scrolling -->
</div>
```

## Dynamic Data Attribute Variants

**v3 - Required configuration for data attributes:**

```js
// tailwind.config.js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['data-open', 'data-active'],
    },
  },
}
```

**v4 - Dynamic attribute variants:**

```html
<!-- No configuration needed for data attributes -->
<div class="data-[open=true]:bg-blue-500 data-[active=true]:text-white">
  <!-- Styled based on data attributes -->
</div>

<!-- Works with any attribute -->
<div class="aria-[expanded=true]:rotate-180 aria-[pressed=true]:bg-slate-200">
  <!-- Styled based on aria attributes -->
</div>
```

## Enhanced Typing Utilities

**v3 - Basic typography utilities:**

```html
<p class="text-lg leading-relaxed tracking-wide">
  <!-- Basic typography controls -->
</p>
```

**v4 - Expanded typography features:**

```html
<!-- Text wrap balance -->
<h1 class="text-wrap-balance">
  <!-- Balances text for better readability -->
</h1>

<!-- Text wrap pretty -->
<p class="text-wrap-pretty">
  <!-- Prevents orphans and improves appearance -->
</p>

<!-- Hanging punctuation -->
<p class="hanging-punctuation-first">
  <!-- Hanging punctuation for better typography -->
</p>

<!-- Hyphenation control -->
<p class="hyphens-auto">
  <!-- Automatic hyphenation -->
</p>

<!-- Text spacing trim -->
<p class="text-spacing-trim">
  <!-- Removes spacing around text -->
</p>
```

## CSS Nesting Support

**v3 - Limited nesting through PostCSS:**

```css
/* Required PostCSS nesting plugin */
.card {
  @apply bg-white p-4;

  & .card-title {
    @apply text-xl font-bold;
  }
}
```

**v4 - Native CSS nesting:**

```css
@utility card {
  background-color: white;
  padding: 1rem;

  /* Native CSS nesting */
  & .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &:hover {
    background-color: var(--color-gray-100);
  }
}
```

## Font Face Handling

**v3 - Required JavaScript config for fonts:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
    },
  },
}
```

**v4 - CSS-based font definitions:**

```css
@font-face {
  font-family: 'Inter var';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

@theme {
  --font-sans: 'Inter var', sans-serif;
}
```

## Complex Media Query Support

**v3 - Limited responsive variants:**

```html
<div class="md:grid lg:grid-cols-3">
  <!-- Limited to predefined breakpoints -->
</div>
```

**v4 - Complex media feature queries:**

```html
<!-- Min and max width combined -->
<div class="min-[400px]:max-[600px]:grid-cols-2">
  <!-- Applied between 400px and 600px -->
</div>

<!-- Media features beyond width -->
<div class="media-[prefers-color-scheme:dark]:bg-gray-900">
  <!-- System dark mode preference -->
</div>

<!-- Dynamic media queries with CSS variables -->
<div class="min-[--breakpoint-custom]:flex">
  <!-- Using theme variables in media queries -->
</div>
```

## Parent/Sibling Selector Support

**v3 - Limited ancestral selectors:**

```html
<div class="group">
  <span class="group-hover:underline">
    <!-- Limited to predefined "group" class -->
  </span>
</div>
```

**v4 - Flexible has-* selectors:**

```html
<!-- Style based on child elements -->
<div class="has-[img]:p-0 has-[.special]:bg-blue-50">
  <!-- Styled if contains matching elements -->
</div>

<!-- Style based on adjacent elements -->
<div class="siblings-[.active]:opacity-50">
  <!-- Reduced opacity for siblings of active element -->
</div>

<!-- Combining selectors -->
<div class="group has-[[data-state=open]]:bg-slate-100">
  <!-- Complex conditional styling -->
</div>
```

## Logical Properties Support

**v3 - Physical direction properties:**

```html
<div class="pl-4 pr-4 pt-2 pb-2 ml-auto mr-auto">
  <!-- Direction-specific properties -->
</div>
```

**v4 - Logical properties:**

```html
<div class="ps-4 pe-4 pt-2 pb-2 ms-auto me-auto">
  <!-- Start/end properties for better RTL support -->
</div>

<div class="border-inline-4 padding-block-2 margin-inline-auto">
  <!-- Full logical property support -->
</div>

<div class="float-start text-start">
  <!-- Logical float and text alignment -->
</div>
```

## Preflight Changes

**v3 - Default preflight reset:**

```css
/* v3 base styles */
button, [role="button"] {
  cursor: pointer;
}

dialog {
  margin: auto;
}
```

**v4 - Updated preflight:**

```css
/* v4 base styles */
button, [role="button"] {
  cursor: default; /* Changed from pointer */
}

dialog {
  margin: 0; /* Changed from auto */
}

/* Placeholder color changed from gray-400 to current color at 50% opacity */
```

## Animation Extensions

**v3 - Using tailwindcss-animate plugin:**

```css
@plugin 'tailwindcss-animate';
```

```html
<div class="animate-fade-in">
  <!-- Basic animations -->
</div>
```

**v4 - Enhanced animation with tw-animate-css:**

```css
@import "tw-animate-css";
```

```html
<!-- Keyframe animations -->
<div class="animate-fade-up animate-duration-500 animate-delay-300 animate-ease-in-out">
  <!-- Customizable animations -->
</div>

<!-- View transition animations -->
<div class="view-transition-name-[hero]">
  <!-- Smooth transitions between views -->
</div>

<!-- Animation control -->
<div class="animation-paused hover:animation-running">
  <!-- Controllable animations -->
</div>
```

## :is() and :where() Selector Support

**v3 - Limited selector composition:**

```css
.dark .btn, .dark .card, .dark .nav {
  background-color: #1f2937;
}
```

**v4 - :is() and :where() selectors:**

```css
:is(.dark) :is(.btn, .card, .nav) {
  background-color: #1f2937;
}
```

```html
<!-- Apply styles to multiple elements with single class -->
<div class="is-[.card,.btn,.nav]:bg-gray-800">
  <!-- Applied if element matches any of the selectors -->
</div>
```

## Auto-Detected Content and More Powerful Content Config

**v3 - Explicit content configuration:**

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
}
```

**v4 - Automatic content detection with optional refinements:**

```css
/* No configuration needed by default! */

/* Optional content filtering */
@content {
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
  ];
  exclude: [
    './src/deprecated/**/*.{js,jsx,ts,tsx}',
  ];
}
```
