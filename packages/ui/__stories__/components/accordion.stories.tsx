import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'

import { Accordion, type AccordionProps } from '@r/components/accordion'

const meta: Meta<AccordionProps> = {
  title: 'components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs', 'beta'],
  decorators: [
    Story => (
      <div className="w-90">
        <Story />
      </div>
    ),
  ],
  args: {
    collapsible: true,
    multiple: false,
    disabled: false,
    size: 'md',
    onValueChange: fn(),
  },
  argTypes: {
    collapsible: {
      description:
        'Allows all accordion items to be collapsed. If false, at least one item must remain open.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'boolean',
      },
    },
    multiple: {
      description: 'Allows multiple accordion items to be expanded at once.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      description: 'Disables all user interaction with the accordion.',
      table: {
        category: 'State',
      },
      control: {
        type: 'boolean',
      },
    },
    size: {
      description: 'Visual size of the accordion elements.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md'],
    },
    value: {
      description: 'Controls which item(s) are expanded (controlled mode).',
      table: {
        category: 'Data',
      },
      control: false,
    },
    defaultValue: {
      description: 'Sets the default expanded item(s) (uncontrolled mode).',
      table: {
        category: 'Data',
      },
      control: false,
    },
    onValueChange: {
      description: 'Callback fired when the expanded item(s) change.',
      table: {
        category: 'Events',
      },
      control: false,
    },
  },
}

export default meta

type AccordionStory = StoryObj<AccordionProps>

export const Basic: AccordionStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the Accordion with collapsible behavior and multiple sections.',
      },
    },
  },
  render: args => (
    <Accordion.Root {...args}>
      <Accordion.Item value="tokens">
        <Accordion.Trigger>Design Tokens</Accordion.Trigger>
        <Accordion.Content>
          Design tokens are semantic values (such as colors, spacing,
          typography) used to ensure visual consistency and enable scalable
          design systems.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="components">
        <Accordion.Trigger>Components</Accordion.Trigger>
        <Accordion.Content>
          Components are reusable UI elements that follow design principles like
          accessibility, responsiveness, and visual consistency defined by the
          system.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="themes">
        <Accordion.Trigger>Theming & Branding</Accordion.Trigger>
        <Accordion.Content>
          Themes allow the customization of a product’s visual identity based on
          brand guidelines, light/dark modes, or different usage contexts.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="documentation">
        <Accordion.Trigger>Documentation</Accordion.Trigger>
        <Accordion.Content>
          Design system documentation should be clear and concise, including
          usage guidelines, prop definitions, visual examples, and best
          practices for both designers and developers.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="versioning">
        <Accordion.Trigger>Versioning & Governance</Accordion.Trigger>
        <Accordion.Content>
          A reliable design system adopts semantic versioning (semver) and a
          governance model that defines how changes are proposed, reviewed, and
          released.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}
