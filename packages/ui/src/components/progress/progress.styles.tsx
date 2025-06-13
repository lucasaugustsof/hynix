import { tv } from '@r/utilities/tv'

const progressStyles = tv({
  slots: {
    root: 'inline-flex min-w-84 items-center',
    valueText: 'font-medium text-fg-1 tabular-nums',
    track: 'w-full overflow-hidden rounded-full bg-fill-1',
    range: 'h-full bg-brand transition-[width] duration-200 ease-linear',
  },
  variants: {
    size: {
      sm: {
        track: 'h-1',
        valueText: 'text-xs/4.5',
      },
      md: {
        track: 'h-2',
        valueText: 'text-sm/5.5',
      },
      lg: {
        root: 'gap-x-2.5',
        track: 'h-3',
        valueText: 'text-base',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: {
        root: 'gap-x-2',
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
})

export const {
  root: rootStyles,
  valueText: valueTextStyles,
  track: trackStyles,
  range: rangeStyles,
} = progressStyles()
