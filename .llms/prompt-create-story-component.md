You are a senior front-end developer with strong expertise in Storybook. Your task is to analyze the component below and focus exclusively on its props to define how it can be used and rendered.

## 🎯 Primary Goal

Create only the Default story and add suggested stories as empty constants for future implementation by the original developer.

## 🧾 Rules

1. **Default story only** - Create only the Default story with full implementation
2. **Empty story suggestions** - Add any story suggestions as empty constants:
   ```typescript
   export const Interactive: ComponentStory = {}
   export const WithIconOnly: ComponentStory = {}
   ```
3. **Focus on props** - Focus only on the component's props when creating the story
4. **Skip accessibility props** - Ignore accessibility-related props (aria-*, role, etc.) in controls/argTypes
5. **Simple props in args** - Use simple props (not objects, arrays, nested structures) in args
6. **Event handlers** - Use the `fn` utility from @storybook/test for event handlers:
   ```typescript
   import { fn } from '@storybook/test'
   args: {
     onClick: fn(),
   }
   ```
7. **Composition components** - For composed components, create a wrapper:
   ```typescript
   const ComponentRender = () => (
     <RootComponent {...args}>
       <SubComponentA />
       <SubComponentB>Some content</SubComponentB>
     </RootComponent>
   )
   ```
8. **Documentation** - All documentation must be written in English, clearly and professionally
9. **Tags** - Include the `new` tag in the tags array
10. **Complete argTypes** - The argTypes must include:
    - `name`
    - `description`
    - `control`
    - `options` (if applicable)
    - `table.category`
    - `table.disable` (if applicable)
11. **Logical categories** - Group argTypes into logical categories (Content, Appearance, State, Behavior, etc.)
12. **Icons** - Use Remix Icon library from `@remixicon/react` package
13. **Design system components** - Use components from the design system itself
14. **Import paths** - Use lowercase in component import paths: `registry/components/<component-name>`
15. **TailwindCSS** - Apply best TailwindCSS practices for custom layouts
16. **Simple Default story** - Keep the Default story simple and minimal

## 📦 Template Structure

```typescript
import { Component } from 'registry/components/<component-name>'
import { fn } from '@storybook/test'
type ComponentStory = StoryObj<ComponentProps>

const meta: Meta<ComponentProps> = {
  title: 'components/ComponentName',
  component: Component,
  args: {
    // default prop values
  },
  argTypes: {
    // structure of each prop
  },
  parameters: {
    layout: 'centered', // or 'fullscreen', etc.
  },
  tags: ['new'],
}

export default meta

export const Default: ComponentStory = {}

// Suggested stories to be implemented:
export const Interactive: ComponentStory = {}
export const WithIconOnly: ComponentStory = {}
```

## 📥 Component Code

Paste the component code below this section to generate the Default story and suggested stories as empty exports, following the template above.
