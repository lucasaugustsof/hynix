# Architecture
*last updated: 2025-11-03*

## Overview

This document provides a comprehensive description of the project's architecture, including tools, technologies, design decisions, and development patterns.

## Foundation

The project is built on a modern stack of technologies carefully selected to ensure performance, maintainability, and exceptional developer experience.

### Core Technologies

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with enhanced IDE support
- **[React 19](https://react.dev)** - Component-based UI library with latest features
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework with native variable support
- **[Ark UI](https://ark-ui.com/)** - Headless, accessible UI component primitives
- **[Motion](https://motion.dev)** - Declarative animation library for React
- **[Remixicon](https://remixicon.com/)** - Icon library with over 2000 icons

### Development Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Storybook](https://storybook.js.org/)** - Interactive component documentation and testing
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter for code quality
- **[pnpm](https://pnpm.io/)** - Efficient package manager with workspace support

## Design Patterns

### Component Composition

Components follow a **slot-based composition pattern** using Tailwind Variants. Each component consists of multiple sub-components (slots) that work together to create a cohesive UI element.

#### Folder Structure

Each component follows a consistent folder structure:

```
component/
├── component.tsx       # Component implementation
├── index.ts           # Public exports
└── namespace.ts       # Namespace for dot notation syntax
```

**Example structure for Button component:**

```typescript
// button/button.tsx
export function ButtonRoot({ ... }) { ... }
export function ButtonIcon({ ... }) { ... }

// button/index.ts
export type { ButtonRootProps } from './button'
export * as Button from './namespace'

// button/namespace.ts
export { ButtonRoot as Root, ButtonIcon as Icon } from './button'
```

#### Component Anatomy

Every component is built with these key elements:

**1. Display Name Constants**

Used for prop injection targeting and debugging:

```typescript
const BUTTON_ROOT_NAME = 'Button.Root'
const BUTTON_ICON_NAME = 'Button.Icon'
```

**2. Style Recipe with Slots**

Defines styling for each component part using Tailwind Variants:

```typescript
const createButtonRecipe = tv({
  slots: {
    root: ['base-classes...'],
    icon: ['icon-classes...'],
  },
  variants: {
    variant: {
      primary: { root: ['...'] },
      secondary: { root: ['...'] },
    },
    size: {
      sm: { root: ['...'] },
      md: { root: ['...'] },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
```

**3. Shared Props Type**

Extracts variant types for consistent prop typing:

```typescript
type ButtonSharedProps = VariantProps<typeof createButtonRecipe>
```

**4. Root Component**

Main component that orchestrates composition:

```typescript
export function ButtonRoot({
  children,
  variant,
  size,
  ...props
}: ButtonRootProps) {
  const { id, cloneChildren } = useCloneChildren({
    targets: [BUTTON_ICON_NAME],
    props: { variant, size },
    children,
    idPrefix: 'button',
  })

  return (
    <ark.button
      {...props}
      className={buttonRecipe.root({ variant, size })}
      id={id}
      data-scope="button"
      data-part="root"
    >
      {cloneChildren()}
    </ark.button>
  )
}

ButtonRoot.displayName = BUTTON_ROOT_NAME
```

**5. Sub-components**

Additional parts that compose the full component:

```typescript
export function ButtonIcon<T extends React.ElementType = typeof ark.span>({
  as,
  variant,
  size,
  ...props
}: PolymorphicProps<T> & ButtonSharedProps) {
  const Component = as || ark.span

  return (
    <Component
      {...props}
      className={buttonRecipe.icon({ variant, size })}
      data-scope="button"
      data-part="icon"
      aria-hidden
    />
  )
}

ButtonIcon.displayName = BUTTON_ICON_NAME
```

#### Usage Pattern

Components use **dot notation** for intuitive composition:

```tsx
// Simple usage
<Button.Root variant="primary" size="md">
  Click me
</Button.Root>

// With icon composition
<Button.Root variant="primary">
  <Button.Icon as={IconLeft} />
  Button Text
  <Button.Icon as={IconRight} />
</Button.Root>

// Icon-only button
<Button.Root iconOnly>
  <Button.Icon as={AddIcon} />
</Button.Root>
```

#### Prop Injection

The `useCloneChildren` hook automatically injects shared props (like `variant`, `size`, `status`) from the Root component to specified child components:

```typescript
// Parent declares shared props
const { cloneChildren } = useCloneChildren({
  targets: ['Button.Icon'], // Only inject into these components
  props: { variant, size },
  children,
})

// Children receive props automatically - no manual prop passing needed!
```

#### Complex Component Example

The Alert component demonstrates advanced composition with multiple slots:

```tsx
<Alert.Root variant="filled" status="danger" size="sm">
  <Alert.Icon />  {/* Auto-selects icon based on status */}
  <Alert.Title>Error occurred</Alert.Title>
  <Alert.Description>Something went wrong</Alert.Description>
  <Alert.Close />  {/* Close button with icon */}
</Alert.Root>
```

**Key features:**
- **Automatic icon selection** - `Alert.Icon` chooses the right icon based on `status` prop
- **Compound variants** - Different combinations of `variant` and `status` create unique styles
- **Flexible composition** - All sub-components are optional
- **Type-safe** - Full TypeScript support with IntelliSense
