---
description: Create Storybook stories for a component following project patterns and real-world use cases
---

You are a Storybook expert creating comprehensive, realistic stories for React components in a component library.

## Component to Create Stories For

The component is: #$ARGUMENTS

## Project Context

- **Storybook Version**: 10 with React Vite framework
- **TypeScript**: Fully typed components and stories
- **Story Location**: `packages/react/src/__stories__/{component-name}.stories.tsx`
- **Import Pattern**: `@/components/{component-name}`
- **Meta Type**: `Meta<ComponentRootProps>` from `@storybook/react-vite`
- **Story Type**: `StoryObj<ComponentRootProps>`

## Story Creation Principles

### 1. Real-World Use Cases Only

**DO:**
- ✅ Create stories that demonstrate actual usage patterns
- ✅ Show how the component solves real problems
- ✅ Include interactive examples with state management
- ✅ Demonstrate composition with other components
- ✅ Show accessibility features in action

**DON'T:**
- ❌ Create duplicate stories with only color/variant changes
- ❌ Show every possible prop combination
- ❌ Create fictional or contrived examples
- ❌ Make stories that users wouldn't actually implement

### 2. Story Types to Include

#### Required Stories

1. **Default** - Basic, most common usage (interactive with args)
2. **Real-world compositions** - How users actually use the component
3. **Interactive examples** - Controlled state, async operations, animations
4. **Accessibility demonstrations** - Show a11y features working

#### Optional Stories (Only if Meaningful)

5. **All Variants** - Only if variants represent different use cases
6. **All Sizes** - Only if sizes have specific semantic meaning
7. **Edge cases** - Loading states, errors, empty states (real scenarios only)

### 3. Story Naming

Use descriptive, purpose-driven names:

**Good Names:**
- `WithAnimation` - Shows animation capability
- `Controlled` - Demonstrates controlled state pattern
- `FormIntegration` - Shows form usage
- `AsyncLoading` - Demonstrates async operations
- `CheckboxWithLabel` - Complete composition pattern

**Bad Names:**
- `RedVariant` - Just a color change
- `Example1`, `Example2` - Non-descriptive
- `Test` - Not meaningful
- `AllPossibleCombinations` - Too exhaustive

## Storybook Configuration Patterns

### Meta Object Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions' // For event handlers

import { Component, type ComponentRootProps } from '@/components/component-name'

const meta = {
  title: 'Components/ComponentName',
  component: Component.Root,

  // ArgTypes: Document meaningful props only
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Clear description of what this does',
      table: {
        category: 'Appearance', // or 'State', 'Events', 'Content'
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    onEvent: {
      action: 'eventName',
      description: 'Event handler description',
      table: {
        category: 'Events',
        type: { summary: '(data: Type) => void' },
      },
    },
    // Use control: false to hide from controls but keep in docs
    iconOnly: {
      control: false,
      description: 'This is set automatically',
    },
  },

  // Default args for interactive Default story
  args: {
    variant: 'primary',
    onEvent: action('eventName'),
  },

  // Optional decorator for layout/styling
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ComponentRootProps>

export default meta

type ComponentStory = StoryObj<ComponentRootProps>
```

### Story Patterns

#### 1. Default Interactive Story

```tsx
export const Default: ComponentStory = {
  render(args) {
    return (
      <Component.Root {...args}>
        {/* Basic usage */}
      </Component.Root>
    )
  },
}
```

#### 2. Showcase Multiple Variants (Only if Meaningful)

```tsx
export const AllVariants: ComponentStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Component.Root variant="primary">Primary</Component.Root>
      <Component.Root variant="secondary">Secondary</Component.Root>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // Not interactive
  },
}
```

#### 3. Controlled State Example

```tsx
export const Controlled: ComponentStory = {
  render(args) {
    const [value, setValue] = React.useState(false)

    return (
      <div className="space-y-4">
        <Component.Root
          {...args}
          checked={value}
          onCheckedChange={() => setValue(!value)}
        >
          Current state: {value ? 'checked' : 'unchecked'}
        </Component.Root>

        <Button.Root
          variant="secondary"
          size="xs"
          onClick={() => setValue(!value)}
        >
          Toggle from outside
        </Button.Root>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
}
```

#### 4. Real Composition Example

```tsx
export const ComponentWithLabel: ComponentStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ComponentWithLabel
        editLabel="Email notifications"
        editSublabel="(Recommended)"
        editDescription="Receive updates about your account activity."
        badgeProps={{
          enabled: true,
          children: 'New',
          color: 'green',
        }}
        linkButtonProps={{
          enabled: true,
          children: 'Manage preferences',
        }}
        defaultChecked
      />

      {/* More realistic examples... */}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
}
```

#### 5. Interactive/Async Example

```tsx
export const WithAnimation: ComponentStory = {
  render() {
    function CopyButton() {
      const [isCopied, setIsCopied] = React.useState(false)

      function handleCopyText() {
        navigator.clipboard.writeText('Hello World')
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }

      return (
        <Button.Root
          onClick={handleCopyText}
          className={cn(isCopied && 'pointer-events-none')}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <Button.Icon
              as={motion.span}
              key={isCopied ? 'copied' : 'copy'}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </Button.Icon>
          </AnimatePresence>
          Copy
        </Button.Root>
      )
    }

    return <CopyButton />
  },
  parameters: {
    controls: { disable: true },
  },
}
```

### Parameter Patterns

```tsx
// Disable controls for non-interactive stories
parameters: {
  controls: { disable: true },
}

// Disable actions/events for specific stories
parameters: {
  actions: { disable: true },
}

// Show only specific controls
parameters: {
  controls: { include: ['variant', 'size'] },
}

// Exclude specific controls
parameters: {
  controls: { exclude: ['className', 'as'] },
}
```

### ArgTypes Categories

Organize props into logical categories:

- **Appearance**: `variant`, `size`, `color`
- **State**: `checked`, `disabled`, `loading`, `required`
- **Content**: `children`, `label`, `description`
- **Events**: `onClick`, `onChange`, `onSubmit`

## Guidelines for Specific Component Types

### Form Components (Checkbox, Switch, Input)

**Required Stories:**
1. `Default` - Interactive with args
2. `Checked` - Default checked state (if applicable)
3. `Disabled` - All disabled states
4. `Controlled` - Controlled state example with external toggle
5. `ComponentWithLabel` - Full composition with label, description, etc.

**Optional:**
- `Indeterminate` - Only for checkbox
- Form integration example if relevant

### Button Components

**Required Stories:**
1. `Default` - Interactive with args
2. `AllVariants` - If variants have semantic meaning (primary, danger)
3. `AllSizes` - If sizes are commonly used together
4. `IconOnly` - If supported

**Optional:**
- `WithAnimation` - If animation is a key feature
- Loading state example if relevant

### Display Components (Badge, Avatar, Alert)

**Required Stories:**
1. `Default` - Interactive with args
2. Real composition examples

**Optional:**
- `AllVariants` / `AllColors` - Only if helps understand options
- Different states if semantically meaningful

### Complex Components (Dialog, Dropdown, Tabs)

**Required Stories:**
1. `Default` - Basic usage
2. Real-world example with typical content
3. Controlled example if relevant
4. Accessibility demonstration

**Avoid:**
- Exhaustive prop combinations
- Every possible size/variant combination

## Anti-Patterns to Avoid

### ❌ Don't: Create Stories for Every Prop Combination

```tsx
// BAD: Too many similar stories
export const PrimarySmall: Story = {}
export const PrimaryMedium: Story = {}
export const PrimaryLarge: Story = {}
export const SecondarySmall: Story = {}
export const SecondaryMedium: Story = {}
// ... etc
```

### ❌ Don't: Duplicate Similar Examples

```tsx
// BAD: Just showing different text/colors
export const Example1: Story = {
  render: () => <Badge color="blue">Badge 1</Badge>
}
export const Example2: Story = {
  render: () => <Badge color="red">Badge 2</Badge>
}
```

### ❌ Don't: Create Fictional Scenarios

```tsx
// BAD: Not a real use case
export const UnicornMode: Story = {
  render: () => (
    <Button variant="rainbow" sparkles="maximum">
      This doesn't exist
    </Button>
  )
}
```

### ✅ Do: Focus on Real Usage

```tsx
// GOOD: Shows actual use case
export const FormSubmitButton: Story = {
  render() {
    const [isLoading, setIsLoading] = React.useState(false)

    async function handleSubmit() {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsLoading(false)
    }

    return (
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Form'}
      </Button>
    )
  }
}
```

## Accessibility in Stories

### Include ARIA Attributes

```tsx
export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button.Root iconOnly aria-label="Add item">
        <Button.Icon as={AddIcon} />
      </Button.Root>
      <Button.Root iconOnly aria-label="Delete item">
        <Button.Icon as={DeleteIcon} />
      </Button.Root>
    </div>
  )
}
```

### Document Keyboard Navigation

Add comments showing keyboard interactions:

```tsx
export const Dropdown: Story = {
  render: () => (
    // Keyboard: Tab to focus, Enter/Space to open,
    // Arrow keys to navigate, Escape to close
    <Dropdown.Root>
      <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
      <Dropdown.Content>
        {/* ... */}
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
```

## Import Organization

Follow Biome configuration order:

```tsx
// 1. React
import React from 'react'

// 2. External dependencies
import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

// 3. Icons (if needed)
import { RiAddLine, RiDeleteBinLine } from '@remixicon/react'

// 4. Motion (if needed)
import { AnimatePresence, motion } from 'motion/react'

// 5. Internal components
import { Component, type ComponentRootProps } from '@/components/component-name'
import { OtherComponent } from '@/components/other-component'

// 6. Utilities
import { cn } from '@/lib/cn'
```

## Output Instructions

1. **Read the component** implementation first
2. **Understand its API**: Props, variants, composition pattern
3. **Identify real use cases**: How would developers actually use this?
4. **Create minimal, meaningful stories**: Quality over quantity
5. **Follow existing patterns**: Match the style of other story files
6. **Include TypeScript types**: Properly type all stories
7. **Add proper documentation**: Use argTypes descriptions
8. **Test accessibility**: Include `aria-label` where needed

## Story File Template

```tsx
import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { Component, type ComponentRootProps } from '@/components/component-name'

const meta = {
  title: 'Components/ComponentName',
  component: Component.Root,
  argTypes: {
    // Document key props with descriptions
  },
  args: {
    // Set sensible defaults
  },
} satisfies Meta<ComponentRootProps>

export default meta

type ComponentStory = StoryObj<ComponentRootProps>

// 1. Default interactive story
export const Default: ComponentStory = {
  render(args) {
    return <Component.Root {...args}>Content</Component.Root>
  },
}

// 2-N. Real-world use cases only
// Focus on showing HOW to use the component, not EVERY way

```

---

## Execution Steps

1. **Analyze the component**:
   - Read component implementation
   - Identify compound parts
   - Understand props and variants
   - Check for existing similar stories for patterns

2. **Plan stories** (tell the user your plan):
   - List realistic use cases
   - Identify which stories are essential
   - Skip unnecessary variant showcase stories

3. **Create story file**:
   - Follow the template
   - Use proper TypeScript types
   - Add meaningful argTypes descriptions
   - Include only necessary stories

4. **Review**:
   - Does each story serve a purpose?
   - Are examples realistic?
   - Is accessibility demonstrated?
   - Does it follow project patterns?

Focus on creating **fewer, better stories** that genuinely help developers understand how to use the component effectively.
