import type { Assign } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

type TextareaSharedProps = VariantProps<typeof textareaVariants>

type TextareaProps = Assign<
  React.ComponentPropsWithRef<'textarea'>,
  TextareaSharedProps
>

const textareaVariants = tv({
  base: [
    'peer inline-flex resize rounded-xl bg-surface-1 outline-none ring-1 ring-border',
    'transition-[background-color,box-shadow] duration-150 ease-in-out',
    'font-medium font-sans text-fg-1 tracking-normal caret-brand placeholder:select-none',
    // hover
    'not-focus-visible:enabled:hover:ring-2',
    // focus
    'focus-visible:bg-surface-2 focus-visible:ring-2 focus-visible:ring-brand',
    // disabled
    'disabled:cursor-not-allowed disabled:resize-none disabled:bg-fill-1 disabled:text-disabled disabled:ring-0 disabled:placeholder:text-disabled',
  ],
  variants: {
    size: {
      sm: 'min-h-14 min-w-60 pt-2 pr-2.5 pl-3 text-sm/5.5',
      md: 'min-h-18 min-w-66 pt-2.5 pr-3 pl-4 text-base',
      lg: [
        'min-h-20 min-w-80 pt-3 pr-4 pl-5 text-lg/7',
        // focus
        'focus-visible:ring-3',
      ],
    },
    invalid: {
      true: 'bg-surface-2 ring-2 ring-danger',
    },
  },

  defaultVariants: {
    size: 'lg',
    invalid: false,
  },
})

function ResizeHandler() {
  return (
    <svg
      className={cn(
        'absolute right-1.5 bottom-3 size-2.5 shrink-0 fill-fill-4',
        'peer-disabled:fill-disabled',
      )}
      viewBox="0 0 9 9"
      fill="none"
      data-scope="textarea"
      data-part="resize-handler"
      aria-hidden
    >
      <title>Resize Handle</title>
      <path d="M4 4L7.2929 0.707105C7.92286 0.0771402 9 0.523309 9 1.41421V6C9 7.65685 7.65685 9 6 9H1.41421C0.523309 9 0.077142 7.92286 0.707107 7.29289L4 4Z" />
    </svg>
  )
}

function Textarea({ className, size, invalid, ...props }: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        {...props}
        className={cn(
          textareaVariants({
            className,
            size,
            invalid,
          }),
        )}
        data-scope="textarea"
        data-part="root"
        aria-invalid={invalid}
      />
      <ResizeHandler />
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
