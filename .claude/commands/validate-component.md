---
description: Validate component architecture and code standards compliance
---

You are a code quality expert validating React components against this project's architectural patterns and standards.

## Component to Validate

The component to validate is: #$ARGUMENTS

## Component Validation Framework

Perform a comprehensive validation of the component against the project standards defined in CLAUDE.md and existing component patterns.

### 1. File Structure & Organization

#### 1.1 Required Files
- [ ] **Component file**: `packages/react/src/components/{component-name}/{component-name}.tsx` exists
- [ ] **Namespace file**: `packages/react/src/components/{component-name}/namespace.ts` exists
- [ ] **Index file**: `packages/react/src/components/{component-name}/index.ts` exists
- [ ] **Story file**: `packages/react/src/__stories__/{component-name}.stories.tsx` exists

#### 1.2 Import Organization (Biome Config)
Check imports follow the order:
1. Node built-ins
2. External packages (React, Ark UI, etc.)
3. Aliases (`@/...`)
4. Relative paths

**Check for:**
```tsx
// ✅ Correct order
import React from 'react'
import { ark } from '@ark-ui/react'
import { tv } from 'tailwind-variants'
import { ComponentRoot } from '@/components/component/component'
import { cn } from '@/lib/cn'

// ❌ Wrong order
import { cn } from '@/lib/cn'
import React from 'react'
import { tv } from 'tailwind-variants'
```

### 2. Component Architecture Pattern

#### 2.1 Compound Component Pattern
- [ ] **Namespace exports**: Component uses compound pattern via namespace
- [ ] **DisplayName constants**: Each part has `{COMPONENT}_{PART}_NAME` constant
- [ ] **Proper naming**: Constants use SCREAMING_SNAKE_CASE

**Check for:**
```tsx
// ✅ Correct pattern
const BUTTON_ROOT_NAME = 'Button.Root'
const BUTTON_ICON_NAME = 'Button.Icon'

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    // ...
  }
)

ButtonRoot.displayName = BUTTON_ROOT_NAME

// ❌ Missing displayName or constant
export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    // ...
  }
)
```

#### 2.2 Props Injection with useCloneChildren
- [ ] **Parent component**: Uses `useCloneChildren` to inject props if has children parts
- [ ] **Target by displayName**: Children targeted by their `displayName` property
- [ ] **Type safety**: Props are properly typed in injection

**Check for:**
```tsx
// ✅ Correct usage
const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, iconOnly, ...props }, ref) => {
    const getIconProps = React.useCallback((): ButtonIconProps => {
      return { iconOnly }
    }, [iconOnly])

    const clonedChildren = useCloneChildren({
      children,
      props: {
        [BUTTON_ICON_NAME]: getIconProps,
      },
    })

    return (
      <ark.button ref={ref} {...props}>
        {clonedChildren}
      </ark.button>
    )
  }
)

// ❌ Not using useCloneChildren when needed
const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, iconOnly, ...props }, ref) => {
    return (
      <ark.button ref={ref} {...props}>
        {children} {/* Icon won't receive iconOnly prop */}
      </ark.button>
    )
  }
)
```

#### 2.3 Namespace File
- [ ] **Exports all parts**: namespace.ts exports all component parts
- [ ] **Correct structure**: Uses object with property assignments

**Check for:**
```tsx
// ✅ Correct namespace.ts
import { ButtonIcon as Icon } from './button'
import { ButtonRoot as Root } from './button'

export const Button = {
  Root,
  Icon,
}

// ❌ Wrong export pattern
export { ButtonRoot as Root, ButtonIcon as Icon }
```

#### 2.4 Index File
- [ ] **Exports namespace**: Exports the namespace object
- [ ] **Exports types**: Exports all TypeScript types
- [ ] **Clean API**: Only public API is exposed

**Check for:**
```tsx
// ✅ Correct index.ts
export { Button } from './namespace'
export type { ButtonRootProps, ButtonIconProps } from './button'

// ❌ Exporting implementation details
export { Button } from './namespace'
export { BUTTON_ROOT_NAME } from './button' // Internal constant
```

### 3. Styling System

#### 3.1 Tailwind Variants (tv)
- [ ] **Uses tv()**: Component uses `tailwind-variants` for styling
- [ ] **Recipe pattern**: Multi-part components use `slots` pattern
- [ ] **Variant definitions**: Variants are properly typed and named

**Check for:**
```tsx
// ✅ Correct usage
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  slots: {
    root: 'inline-flex items-center justify-center',
    icon: 'shrink-0',
  },
  variants: {
    variant: {
      primary: {
        root: 'bg-primary text-primary-foreground',
      },
      secondary: {
        root: 'bg-secondary text-secondary-foreground',
      },
    },
    size: {
      sm: {
        root: 'h-9 px-3 text-sm',
        icon: 'size-4',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

type ButtonVariantProps = VariantProps<typeof buttonVariants>

// ❌ Not using tv
const buttonStyles = 'inline-flex items-center' // Plain string
```

#### 3.2 Class Name Merging
- [ ] **Uses cn()**: Component uses `cn()` utility for className merging
- [ ] **Proper merging**: External className prop is merged correctly

**Check for:**
```tsx
// ✅ Correct usage
import { cn } from '@/lib/cn'

const { root, icon } = buttonVariants({ variant, size })
const rootClassName = cn(root(), className)

// ❌ Not merging properly
const rootClassName = `${root()} ${className}` // Won't dedupe Tailwind classes
```

#### 3.3 Ark UI Integration
- [ ] **Uses ark factory**: Built on `ark.{element}` if appropriate
- [ ] **Preserves accessibility**: Ark UI ARIA attributes are not overridden
- [ ] **Proper extension**: Extends Ark UI types correctly

**Check for:**
```tsx
// ✅ Correct Ark UI usage
import { ark } from '@ark-ui/react'

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    return <ark.button ref={ref} {...props} />
  }
)

// ❌ Not using Ark when available
export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    return <button ref={ref} {...props} /> // Missing Ark UI benefits
  }
)
```

### 4. Data Attributes

#### 4.1 Required Attributes
- [ ] **data-scope**: All parts have `data-scope="{component-name}"`
- [ ] **data-part**: All parts have `data-part="{part-name}"`
- [ ] **Consistent naming**: Uses kebab-case for values

**Check for:**
```tsx
// ✅ Correct data attributes
<ark.button
  ref={ref}
  data-scope="button"
  data-part="root"
  {...props}
/>

<span
  data-scope="button"
  data-part="icon"
  {...props}
/>

// ❌ Missing data attributes
<ark.button ref={ref} {...props} />
```

### 5. Accessibility (A11y)

#### 5.1 ARIA Attributes
- [ ] **Proper ARIA**: Uses appropriate `aria-*` attributes
- [ ] **Icon-only handling**: Icon-only elements have `aria-hidden` if decorative
- [ ] **Disabled states**: Uses `aria-disabled` when appropriate
- [ ] **Labels**: Interactive elements have accessible names

**Check for:**
```tsx
// ✅ Correct ARIA usage
<ButtonRoot iconOnly aria-label="Add item">
  <ButtonIcon aria-hidden />
</ButtonRoot>

// Icon is decorative
<ButtonIcon aria-hidden>
  <RiAddLine />
</ButtonIcon>

// ❌ Missing ARIA
<ButtonRoot iconOnly> {/* Missing aria-label */}
  <ButtonIcon> {/* Should be aria-hidden */}
    <RiAddLine />
  </ButtonIcon>
</ButtonRoot>
```

#### 5.2 Semantic HTML
- [ ] **Correct elements**: Uses semantic HTML elements
- [ ] **Button vs Link**: Buttons for actions, links for navigation
- [ ] **Headings**: Proper heading hierarchy if applicable

### 6. TypeScript Standards

#### 6.1 Type Imports
- [ ] **import type syntax**: Type-only imports use `import type`
- [ ] **No explicit any**: No `any` types (unless absolutely justified)
- [ ] **Proper typing**: All props, refs, and return types are typed

**Check for:**
```tsx
// ✅ Correct type imports
import type { ComponentPropsWithoutRef } from 'react'
import type { VariantProps } from 'tailwind-variants'

// ❌ Wrong import
import { ComponentPropsWithoutRef } from 'react' // Should be type import
```

#### 6.2 Props Interface
- [ ] **Extends correctly**: Extends appropriate base types
- [ ] **Variant props**: Includes variant props from `tv()`
- [ ] **Omits conflicts**: Omits props that are overridden

**Check for:**
```tsx
// ✅ Correct props type
type ButtonRootProps = ComponentPropsWithoutRef<'button'> &
  ButtonVariantProps & {
    iconOnly?: boolean
  }

// ❌ Missing variant props
type ButtonRootProps = ComponentPropsWithoutRef<'button'> & {
  iconOnly?: boolean
  // Missing variant, size, etc.
}
```

#### 6.3 Ref Forwarding
- [ ] **Uses React.forwardRef**: Components forward refs properly
- [ ] **Correct ref type**: Ref type matches element type

**Check for:**
```tsx
// ✅ Correct ref forwarding
export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    return <ark.button ref={ref} {...props} />
  }
)

// ❌ Missing ref forwarding
export const ButtonRoot = (props: ButtonRootProps) => {
  return <ark.button {...props} /> // No ref support
}
```

### 7. Code Quality (Biome)

#### 7.1 Formatting
- [ ] **Line width**: Lines ≤ 100 characters
- [ ] **Quotes**: Single quotes for JS/TS, double quotes for JSX
- [ ] **Semicolons**: Used as needed (ASI compatible)

#### 7.2 Code Cleanliness
- [ ] **No unused imports**: All imports are used
- [ ] **No unused variables**: All variables are used
- [ ] **No console statements**: No `console.log` (unless justified)
- [ ] **Proper naming**: camelCase for variables, PascalCase for components

**Verify with:**
```bash
pnpm --filter @ui/react check
```

### 8. Story File Validation

#### 8.1 Story Structure
- [ ] **Located correctly**: In `src/__stories__/` directory
- [ ] **Proper imports**: Uses `@storybook/react-vite`
- [ ] **Meta type**: Uses `Meta<ComponentRootProps>`
- [ ] **Story type**: Uses `StoryObj<ComponentRootProps>`

#### 8.2 Story Content
- [ ] **Default story**: Has interactive Default story with args
- [ ] **Real use cases**: Stories show realistic usage patterns
- [ ] **Proper argTypes**: Key props documented in argTypes
- [ ] **No duplication**: Doesn't duplicate similar stories unnecessarily

**Check for:**
```tsx
// ✅ Good story file
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonRootProps } from '@/components/button'

const meta = {
  title: 'Components/Button',
  component: Button.Root,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style of the button',
    },
  },
  args: {
    variant: 'primary',
  },
} satisfies Meta<ButtonRootProps>

export default meta

type ButtonStory = StoryObj<ButtonRootProps>

export const Default: ButtonStory = {
  render(args) {
    return <Button.Root {...args}>Click me</Button.Root>
  },
}
```

### 9. Component-Specific Patterns

#### 9.1 Check Reference Components
Compare against established patterns:
- **Button**: Icon injection, iconOnly prop, compound pattern
- **Alert**: Slots pattern, variant-based styling, close trigger
- **Checkbox**: Ark UI integration, controlled state, label composition
- **Switch**: Similar to checkbox but different semantics

### 10. Common Anti-Patterns

#### 10.1 Things to Avoid
- [ ] **No inline styles**: Avoid `style` prop unless absolutely necessary
- [ ] **No string concatenation**: Use `cn()` for className merging
- [ ] **No prop drilling**: Use composition and context when appropriate
- [ ] **No missing displayName**: All forwardRef components need displayName
- [ ] **No hardcoded colors**: Use Tailwind classes and CSS variables

**Check for:**
```tsx
// ❌ Anti-patterns
style={{ color: 'red' }} // Use Tailwind classes
className={`${base} ${variant}`} // Use cn()
<Icon iconOnly={props.iconOnly} /> // Use useCloneChildren
export const Comp = React.forwardRef() // Missing displayName
```

## Validation Methodology

1. **File Structure Check**: Verify all required files exist
2. **Code Review**: Read component implementation line by line
3. **Pattern Matching**: Compare against reference components
4. **Type Analysis**: Verify TypeScript types and imports
5. **Style Check**: Run Biome and verify styling patterns
6. **Story Validation**: Check story file completeness
7. **Cross-reference**: Compare with similar components in codebase

## Output Format

Provide a comprehensive validation report:

### Executive Summary
- **Overall Status**: ✅ Compliant / ⚠️ Needs Improvement / ❌ Non-Compliant
- **Critical Issues**: Count of blocking issues
- **Warnings**: Count of non-blocking issues
- **Architecture Score**: A (Excellent) / B (Good) / C (Fair) / D (Poor) / F (Failing)

### Detailed Findings

#### ✅ Strengths
List what the component does well according to project standards.

#### 🔴 Critical Issues (Must Fix)
Blocking issues that violate core architectural patterns:
- **Issue**: Description
- **Category**: Architecture / TypeScript / Accessibility / Code Quality
- **Impact**: Why this matters
- **Location**: `file:line` reference
- **Fix**: Specific code changes needed with examples

#### 🟡 Warnings (Should Fix)
Non-blocking issues that should be addressed:
- **Issue**: Description
- **Best Practice**: Which standard is violated
- **Impact**: How it affects code quality
- **Location**: `file:line` reference
- **Recommendation**: Suggested improvement

#### 🔵 Suggestions (Nice to Have)
Optional improvements for code polish.

### Compliance Matrix

| Standard | Status | Notes |
|----------|--------|-------|
| File structure | ✅/⚠️/❌ | ... |
| Compound pattern | ✅/⚠️/❌ | ... |
| DisplayNames | ✅/⚠️/❌ | ... |
| Props injection | ✅/⚠️/❌ | ... |
| Tailwind variants | ✅/⚠️/❌ | ... |
| Data attributes | ✅/⚠️/❌ | ... |
| Accessibility | ✅/⚠️/❌ | ... |
| TypeScript types | ✅/⚠️/❌ | ... |
| Import organization | ✅/⚠️/❌ | ... |
| Biome compliance | ✅/⚠️/❌ | ... |
| Story file | ✅/⚠️/❌ | ... |

### Code Examples

#### ❌ Current Implementation (if issues found)
```tsx
// Show problematic code with file:line references
```

#### ✅ Recommended Implementation
```tsx
// Show corrected code following project patterns
```

### Comparison with Reference Components

Compare against similar components:
- **Similar to**: `button`, `alert`, etc.
- **Follows same patterns**: ✅ / ❌
- **Key differences**: List any deviations

### Biome Check Results

Run and report Biome check:
```bash
pnpm --filter @ui/react check
```

Include any errors, warnings, or formatting issues.

### File Checklist

- [ ] `packages/react/src/components/{component}/{component}.tsx`
  - [ ] Compound component pattern
  - [ ] DisplayName constants
  - [ ] Props injection (if applicable)
  - [ ] Tailwind variants
  - [ ] Data attributes
  - [ ] TypeScript types
  - [ ] Accessibility attributes

- [ ] `packages/react/src/components/{component}/namespace.ts`
  - [ ] Correct export structure
  - [ ] All parts exported

- [ ] `packages/react/src/components/{component}/index.ts`
  - [ ] Namespace export
  - [ ] Type exports
  - [ ] No internal exports

- [ ] `packages/react/src/__stories__/{component}.stories.tsx`
  - [ ] Proper imports and types
  - [ ] Default interactive story
  - [ ] Real-world examples
  - [ ] ArgTypes documentation

### Next Steps

Prioritized action items:

1. **Critical (Must Fix Before Merge)**:
   - List blocking issues

2. **Important (Should Fix Soon)**:
   - List warnings

3. **Optional (Future Improvements)**:
   - List suggestions

### Resources

- **CLAUDE.md**: Project standards and patterns
- **Reference components**: `button`, `alert`, `checkbox`
- **Biome config**: `biome.json`
- **TypeScript config**: `tsconfig.json`

---

Be thorough, constructive, and educational. Explain WHY each issue matters for code quality, maintainability, and user experience. Reference specific files and line numbers. Provide concrete code examples for fixes.
