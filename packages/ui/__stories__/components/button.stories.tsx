import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, type ButtonProps } from '@/components/button'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowUpLine,
} from '@remixicon/react'

export default {
  title: 'components/Button',
} satisfies Meta<ButtonProps>

type ButtonStory = StoryObj<ButtonProps>

const VARIANTS = {
  primary: 'primary',
  danger: 'danger',
} as const

const MODES = {
  filled: 'filled',
  stroke: 'stroke',
  lighter: 'lighter',
  ghost: 'ghost',
} as const

const SIZES = ['2xs', 'xs', 'sm', 'md'] as const

export const Modes: ButtonStory = {
  render: () => {
    return (
      <div className="grid w-fit grid-cols-4 gap-8">
        {Object.entries(VARIANTS).flatMap(([variantKey, variant]) =>
          Object.entries(MODES).map(([modeKey]) => (
            <Button
              key={`${variantKey}-${modeKey}`}
              mode={modeKey as keyof typeof MODES}
              variant={variant}
            >
              <RiArrowLeftSLine />
              Button
              <RiArrowRightSLine />
            </Button>
          )),
        )}
      </div>
    )
  },
}

export const Sizes: ButtonStory = {
  render: () => {
    return (
      <div className="grid w-fit grid-cols-4 items-center gap-8">
        {Object.entries(VARIANTS).flatMap(([variantKey, variant]) =>
          Object.entries(MODES).flatMap(([modeKey]) =>
            SIZES.map(size => (
              <Button
                key={`${variantKey}-${modeKey}-${size}`}
                mode={modeKey as keyof typeof MODES}
                size={size}
                variant={variant}
              >
                Button
              </Button>
            )),
          ),
        )}
      </div>
    )
  },
}

export const IconOnly: ButtonStory = {
  render: () => {
    return (
      <div className="grid w-fit grid-cols-4 items-center gap-8">
        {Object.entries(VARIANTS).flatMap(([variantKey, variant]) =>
          Object.entries(MODES).flatMap(([modeKey]) =>
            SIZES.map(size => (
              <Button
                iconOnly
                key={`${variantKey}-${modeKey}-${size}`}
                mode={modeKey as keyof typeof MODES}
                size={size}
                variant={variant}
              >
                <RiArrowUpLine />
              </Button>
            )),
          ),
        )}
      </div>
    )
  },
}

export const Disabled: ButtonStory = {
  render: () => {
    return (
      <div className="grid w-fit grid-cols-4 items-center gap-8">
        {SIZES.map(size => (
          <Button disabled key={size} mode="filled" size={size}>
            Button
          </Button>
        ))}
        {SIZES.map(size => (
          <Button
            disabled
            iconOnly
            key={`icon-${size}`}
            mode="filled"
            size={size}
          >
            <RiArrowUpLine />
          </Button>
        ))}
      </div>
    )
  },
}
