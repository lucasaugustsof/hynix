# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library monorepo built with TypeScript, Tailwind CSS v4, and Storybook. The main package is `@ui/react` located in `packages/react/`, which contains reusable UI components with a focus on accessibility and theming.

## Development Commands

### Storybook
- **Start Storybook dev server**: `pnpm storybook` (runs on port 6006)
- **Build Storybook**: `pnpm build-storybook`

### Code Quality
- **Lint and format**: `pnpm --filter @ui/react check` (runs Biome check with auto-fix)
- **Format with Biome**: Uses Biome for linting and formatting (configured in `biome.json`)

### Git Workflow
- Commits must follow Conventional Commits format (enforced by commitlint via Husky)
- Main branch: `main`
- Development branch: `develop`

## Architecture

### Monorepo Structure
- **pnpm workspace**: Configured via `pnpm-workspace.yaml`
- **Primary package**: `packages/react/` contains the component library
- **Path alias**: `@/` maps to `packages/react/src/` (configured in `vite.config.ts` and `tsconfig.json`)

### Component Architecture

Components follow a **compound component pattern** with namespace exports:

```typescript
// Each component has three key files:
// 1. {component}.tsx - Component implementation
// 2. namespace.ts - Namespace exports for compound pattern
// 3. index.ts - Public exports

// Example usage:
import { Button } from '@/components/button'

<Button.Root>
  <Button.Icon />
  Button Text
</Button.Root>
```

#### Key Architectural Patterns

1. **Compound Components with Props Injection**
   - Parent components use `useCloneChildren` hook to inject shared props to child components
   - Children are targeted by their `displayName` property
   - Enables clean API while maintaining type safety

2. **Styling System**
   - **Tailwind Variants (`tv`)**: Components use `tailwind-variants` for variant-based styling
   - Recipe pattern with `slots` for multi-part components
   - Utility: `cn()` function combines `clsx` and `tailwind-merge` for className merging
   - Located in: `src/lib/tv.ts` and `src/lib/cn.ts`

3. **Base Components**
   - Built on top of **Ark UI** (`@ark-ui/react`) using `ark.{element}` factory
   - Provides accessible, unstyled primitives

4. **Polymorphic Components**
   - Some components support `as` prop for element polymorphism
   - Type definitions in `src/types/polymorphic.ts`

### Directory Structure

```
packages/react/src/
├── components/        # UI components (each in own directory)
│   ├── alert/
│   ├── avatar/
│   ├── badge/
│   ├── button/
│   ├── checkbox/
│   ├── content-label/
│   ├── field/
│   ├── hint-text/
│   ├── label/
│   ├── link-button/
│   └── switch/
├── __stories__/       # Storybook stories (*.stories.tsx)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions (cn, tv)
├── styles/           # Global CSS (Tailwind v4)
└── types/            # TypeScript type definitions
```

### Styling and Theming

- **Tailwind CSS v4**: Uses new `@import "tailwindcss"` syntax
- **Theme system**: Light/dark modes via `data-theme` attribute
- **CSS Variables**: Design tokens defined in `globals.css` using `light-dark()` function
- **Custom variants**: `@custom-variant dark` for dark mode styling
- **Design tokens**: Colors use `oklch` color space for better perceptual uniformity

### Dependencies

**Core UI Libraries:**
- `@ark-ui/react` - Accessible component primitives
- `@remixicon/react` - Icon library
- `motion` (Framer Motion) - Animation library
- `tailwind-variants` - Variant-based styling
- `usehooks-ts` - TypeScript React hooks

## Code Standards

### Biome Configuration
- **Line width**: 100 characters
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Semicolons**: As needed (not required)
- **Import organization**: Automatic with custom groups (Node → Packages → Aliases → Paths)
- **Unused imports/variables**: Error level
- **Type imports**: Must use `import type` syntax
- **Console statements**: Warning level
- **Explicit any**: Warning level (off in test files)

### Component Conventions

1. **Naming**
   - Component parts use `{COMPONENT}_{PART}_NAME` constants for displayNames
   - Example: `BUTTON_ROOT_NAME`, `BUTTON_ICON_NAME`

2. **Data Attributes**
   - Always add `data-scope` and `data-part` for component identification
   - Example: `data-scope="button" data-part="root"`

3. **Accessibility**
   - Include `aria-*` attributes where appropriate
   - Icon-only components should have `aria-hidden`
   - Disabled states should have `aria-disabled`

4. **Story Files**
   - Located in `src/__stories__/`
   - Use Storybook 9 with React Vite framework
   - Include a11y addon for accessibility testing

## TypeScript Configuration

- **Target**: ES2020
- **Module system**: ESNext with bundler resolution
- **JSX**: React JSX transform
- **Strict mode**: Enabled with unused locals/parameters checks
- **Composite**: Enabled for project references
- **Path mapping**: `@/*` → `src/*`

## Adding New Components

1. Create directory in `src/components/{component-name}/`
2. Implement component in `{component-name}.tsx` with:
   - Variant recipes using `tv()`
   - Compound components with displayNames
   - Props injection via `useCloneChildren` if needed
3. Create `namespace.ts` for compound component exports
4. Create `index.ts` for public API exports
5. Add story file in `src/__stories__/{component-name}.stories.tsx`
6. Follow existing patterns (reference `button` or `alert` components)
