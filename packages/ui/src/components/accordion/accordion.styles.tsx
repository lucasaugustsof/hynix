import { tv } from '@r/utilities/tv'

const accordionStyles = tv({
  slots: {
    root: [],
    item: [],
    trigger: [],
    content: [],
  },
  variants: {
    appearance: {
      default: {
        root: ['min-w-90 space-y-3'],
        item: [
          'group inset-ring-1 inset-ring-border flex flex-col items-start overflow-hidden rounded-xl bg-surface-2 shadow-black/8 shadow-xs dark:shadow-white/8',
          'has-focus-visible:inset-ring-2 has-focus-visible:inset-ring-brand',
        ],
        trigger: [
          'flex w-full cursor-pointer items-center justify-between outline-hidden',
          'text-start font-medium text-fg-1',
        ],
        content: ['font-normal text-base text-fg-1/70'],
      },
    },
    size: {
      sm: {
        trigger: ['gap-x-3 py-4 pr-3 pl-4', 'text-base', '**:[&_svg]:size-6'],
      },
      md: {
        trigger: ['gap-x-4 py-5 pr-4 pl-5', 'text-lg/5.5', '**:[&_svg]:size-7'],
      },
    },
  },
  defaultVariants: {
    appearance: 'default',
    size: 'sm',
  },
})

export const {
  root: rootStyles,
  item: itemStyles,
  trigger: triggerStyles,
  content: contentStyles,
} = accordionStyles()
