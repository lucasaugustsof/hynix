import type { Meta, StoryObj } from '@storybook/react'
import { RiUserLine, RiMailLine } from '@remixicon/react'

import { Input, type InputProps } from '@r/components/input'

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    size: 'md',
    isInvalid: false,
    placeholder: 'Enter your email',
    disabled: false,
  },
  argTypes: {
    size: {
      description: 'Controls the size of the input.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
    },
    isInvalid: {
      description: 'Marks the input as invalid and applies error styles.',
      table: {
        category: 'Validation',
      },
      control: {
        type: 'boolean',
      },
    },
    placeholder: {
      description: 'Placeholder text displayed inside the input.',
      table: {
        category: 'Content',
      },
      control: {
        type: 'text',
      },
    },
    prefix: {
      description:
        'Element displayed at the beginning of the input (e.g. icon).',
      table: {
        category: 'Addon',
      },
      control: false,
    },
    suffix: {
      description: 'Element displayed at the end of the input (e.g. icon).',
      table: {
        category: 'Addon',
      },
      control: false,
    },
    prefixStyling: {
      description:
        'Applies additional background and text color to the prefix.',
      table: {
        category: 'Addon',
      },
      control: false,
    },
    suffixStyling: {
      description:
        'Applies additional background and text color to the suffix.',
      table: {
        category: 'Addon',
      },
      control: false,
    },
    disabled: {
      description: 'Disables the input field.',
      table: {
        category: 'State',
      },
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

type InputStory = StoryObj<InputProps>

export const Basic: InputStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A standard input field with default styling and placeholder.',
      },
    },
  },
}

export const WithPrefixIcon: InputStory = {
  name: 'With prefix icon',
  args: {
    placeholder: 'Username',
    prefix: <RiUserLine aria-hidden="true" />,
    prefixStyling: true,
  },
  parameters: {
    controls: {
      exclude: ['prefix'],
    },
    docs: {
      description: {
        story:
          'Use a prefix icon to clarify the expected content, such as a username or email field.',
      },
    },
  },
}

export const WithSuffixIcon: InputStory = {
  name: 'With suffix icon',
  args: {
    placeholder: 'Enter your email',
    suffix: <RiMailLine aria-hidden="true" />,
    suffixStyling: true,
  },
  parameters: {
    controls: {
      exclude: ['suffix'],
    },
    docs: {
      description: {
        story:
          'Use a suffix icon to indicate the input type or possible action, like validation or input mode.',
      },
    },
  },
}

export const WithPlainPrefixIcon: InputStory = {
  name: 'With plain prefix icon',
  args: {
    placeholder: 'Search',
    prefix: <RiUserLine aria-hidden="true" />,
    prefixStyling: false,
  },
  parameters: {
    controls: {
      exclude: ['prefix'],
    },
    docs: {
      description: {
        story:
          'Prefix icon without background or muted styling. Useful when integrating tightly with clean UIs.',
      },
    },
  },
}

export const WithPlainSuffixIcon: InputStory = {
  name: 'With plain suffix icon',
  args: {
    placeholder: 'Email',
    suffix: <RiMailLine aria-hidden="true" />,
    suffixStyling: false,
  },
  parameters: {
    controls: {
      exclude: ['suffix'],
    },
    docs: {
      description: {
        story:
          'Suffix icon with no styling applied. Use this when the icon should visually match the input field.',
      },
    },
  },
}

export const InvalidInput: InputStory = {
  name: 'Invalid input',
  args: {
    isInvalid: true,
    placeholder: 'Invalid email address',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An invalid input field used for displaying error states in forms.',
      },
    },
  },
}

export const DisabledInput: InputStory = {
  name: 'Disabled input',
  args: {
    disabled: true,
    placeholder: 'Field is disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the disabled state to prevent interaction with the input.',
      },
    },
  },
}
