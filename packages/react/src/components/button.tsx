import { type Assign, ark } from '@ark-ui/react'
import { type Transition, motion, useReducedMotion } from 'motion/react'

import { cn } from 'registry/utilities/cn'
import { type VariantProps, tv } from 'registry/utilities/tv'

type ButtonProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.button>,
  VariantProps<typeof buttonVariants>
>

const ButtonComponent = motion.create(ark.button)

const buttonVariants = tv({
  base: [
    [
      'not-disabled:inset-ring-1 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-xl transition-colors ease-out',
      'font-sans font-semibold tracking-normal',
      'disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
    ],
  ],
  variants: {
    variant: {
      primary: ['bg-brand text-fg-2', 'not-disabled:hover:bg-brand/90'],
      secondary: [
        'inset-ring-border bg-surface-2 text-fg-1',
        'not-disabled:hover:bg-fill-2',
      ],
      ghost: [
        'bg-transparent text-brand transition-[color_box-shadow]',
        'not-disabled:hover:inset-ring-2 not-disabled:hover:text-brand/90',
      ],
      destructive: [
        'inset-ring-transparent bg-danger text-fg-2',
        'not-disabled:hover:bg-danger/90',
      ],
    },
    size: {
      sm: 'h-9 gap-1 px-3 text-sm leading-5.5 [&_svg]:size-5',
      md: 'h-11 gap-2 px-4 text-base [&_svg]:size-6',
      lg: 'h-11 px-4 text-lg leading-7 [&_svg]:size-7',
      xl: 'h-14 px-6 text-xl leading-8 [&_svg]:size-8',
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
  },
  compoundVariants: [
    {
      variant: ['primary', 'ghost'],
      className: 'inset-ring-brand',
    },
    {
      size: ['lg', 'xl'],
      className: 'gap-3',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
  },
})

const MOTION_TRANSITION = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
} satisfies Transition

function Button({ variant, size, iconOnly, ...props }: ButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    /**
     * @NOTE: This approach was adopted to work around an incompatibility issue in prop merging
     * between Ark UI and Motion.
     */
    // @ts-ignore
    <ButtonComponent
      {...props}
      className={cn(
        buttonVariants({
          variant,
          size,
          iconOnly,
        }),
      )}
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.98,
            }
      }
      transition={MOTION_TRANSITION}
      data-scope="button"
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
