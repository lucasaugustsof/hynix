---
description: Validate that a component follows project patterns and standards
---

You are validating a React component to ensure it follows the established patterns in this project.

## Component to Validate

Ask the user which component they want to validate (e.g., "button", "alert", "my-new-component").

## Validation Checklist

Perform a thorough review of the component and check for the following:

### 1. File Structure
- [ ] Component directory exists in `packages/react/src/components/{component-name}/`
- [ ] Has main component file: `{component-name}.tsx`
- [ ] Has namespace export file: `namespace.ts`
- [ ] Has public API file: `index.ts`
- [ ] Has corresponding story file: `src/__stories__/{component-name}.stories.tsx`

### 2. Component Implementation (`{component-name}.tsx`)

**Display Names:**
- [ ] Component parts have `displayName` constants (e.g., `COMPONENT_ROOT_NAME`, `COMPONENT_ICON_NAME`)
- [ ] displayName is assigned to component: `Component.displayName = COMPONENT_ROOT_NAME`

**Styling with Tailwind Variants:**
- [ ] Uses `tv()` from `@/lib/tv` for variant-based styling
- [ ] Recipe uses `slots` pattern for multi-part components
- [ ] Variants are properly typed with `VariantProps<typeof createComponentRecipe>`
- [ ] Has `defaultVariants` defined in recipe

**Base Components:**
- [ ] Built on Ark UI using `ark.{element}` factory (e.g., `ark.button`, `ark.div`)
- [ ] Or uses appropriate semantic HTML via ark factory

**Data Attributes:**
- [ ] Includes `data-scope="{component-name}"` attribute
- [ ] Includes `data-part="{part-name}"` attribute for each component part

**Props Pattern:**
- [ ] Root component accepts `className` and merges it with recipe classes
- [ ] Props extend `React.ComponentProps<typeof ark.{element}>`
- [ ] Shared variant props defined in separate type (e.g., `ComponentSharedProps`)

**Props Injection (for compound components):**
- [ ] Uses `useCloneChildren` hook to inject props to child components
- [ ] Targets child components by their displayNames
- [ ] Passes variant props to children correctly

**Accessibility:**
- [ ] Icon components have `aria-hidden` attribute
- [ ] Disabled states use `aria-disabled` when appropriate
- [ ] Interactive elements have proper ARIA attributes
- [ ] Meets accessibility best practices

### 3. Namespace File (`namespace.ts`)
- [ ] Exports compound components with clean naming (e.g., `Root`, `Icon`, `Title`)
- [ ] Uses pattern: `export { ComponentRoot as Root, ComponentIcon as Icon }`
- [ ] Follows existing component patterns

### 4. Public API File (`index.ts`)
- [ ] Exports type definitions (e.g., `export type { ComponentRootProps }`)
- [ ] Exports namespace: `export * as Component from './namespace'`
- [ ] Clean, minimal API surface

### 5. Story File (`{component-name}.stories.tsx`)
- [ ] Located in `src/__stories__/`
- [ ] Uses `@storybook/react-vite` types
- [ ] Has proper meta configuration with title and component
- [ ] Includes diverse story examples demonstrating variants
- [ ] Shows compound component usage if applicable

### 6. Code Quality

**Import Organization:**
- [ ] Imports organized per Biome config (Node → Packages → Aliases → Paths)
- [ ] Uses `import type` for type-only imports
- [ ] No unused imports

**TypeScript:**
- [ ] No `any` types (or justified with comment if necessary)
- [ ] Proper type exports and imports
- [ ] Props interfaces properly defined and exported

**Formatting:**
- [ ] Follows Biome formatting rules (100 char line width, single quotes, etc.)
- [ ] Proper indentation (2 spaces)
- [ ] No console statements (or intentional warnings)

### 7. Consistency with Existing Components

Compare the component with reference implementations (`button`, `alert`, `checkbox`):
- [ ] Follows same naming conventions
- [ ] Uses same styling patterns
- [ ] Implements similar prop patterns
- [ ] Matches code organization structure

## Output Format

Provide a detailed report with:

1. **Summary**: Overall assessment (✅ Passes / ⚠️ Needs improvements / ❌ Issues found)
2. **Checklist Results**: Go through each item and mark pass/fail
3. **Issues Found**: List specific problems with file paths and line numbers
4. **Recommendations**: Concrete steps to fix issues
5. **Code Examples**: Show correct patterns if fixes are needed

Be thorough but constructive. Highlight what's done well and provide clear guidance for improvements.
