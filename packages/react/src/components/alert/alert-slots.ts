import { tv } from '@/lib/tv'

const alertSlots = tv({
  slots: {
    root: 'inline-flex items-center rounded-lg',
    icon: 'size-4 shrink-0',
    title: 'flex-1 font-sans',
    close: 'shrink-0 cursor-pointer [&_svg]:size-4',
    linkButton: 'cursor-pointer font-medium font-sans text-xs/4 underline underline-offset-2',
  },
  variants: {
    status: {
      information: {},
    },
    variant: {
      filled: {},
      light: {
        root: 'bg-blue-200 dark:bg-blue-900',
        icon: 'stroke-blue-600 dark:stroke-blue-400',
        title: 'text-fg-1',
        close: 'opacity-40 [&_svg]:stroke-fg-1',
        linkButton: 'text-fg-1',
      },
      lighter: {
        root: 'bg-blue-50 dark:bg-blue-950',
        icon: 'stroke-blue-600 dark:stroke-blue-400',
        title: 'text-fg-1',
        close: 'opacity-40 [&_svg]:stroke-fg-1',
        linkButton: 'text-fg-1',
      },
      stroke: {
        root: 'inset-ring-1 inset-ring-border/50 bg-surface-2',
        icon: 'stroke-blue-600 dark:stroke-blue-500',
        title: 'text-fg-1',
        close: 'opacity-40 [&_svg]:stroke-fg-1',
        linkButton: 'text-fg-1',
      },
    },
    size: {
      xs: {
        root: 'gap-x-2 p-2',
        icon: '',
        title: 'text-xs/4',
      },
      sm: {},
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      status: 'information',
      className: {
        root: 'bg-blue-600 dark:bg-blue-500',
        icon: 'stroke-fg-2',
        title: 'text-fg-2',
        close: '[&_svg]:stroke-fg-2 [&_svg]:opacity-72',
        linkButton: 'text-fg-2',
      },
    },
  ],
  defaultVariants: {
    style: 'filled',
    status: 'information',
    size: 'xs',
  },
})

export const alert = alertSlots()
