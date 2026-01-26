import type * as React from 'react'
import { Field as ArkField } from '@ark-ui/react/field'

import { cn } from '@/utils/cn'

const TEXTAREA_ROOT_NAME = 'Textarea.Root'
const TEXTAREA_CHAR_COUNTER_NAME = 'Textarea.CharCounter'
const TEXTAREA_RESIZE_HANDLE_NAME = 'Textarea.ResizeHandle'

////////////////////////////////////////////////////////////////////////////////////

export interface TextareaRootProps extends React.ComponentPropsWithRef<typeof ArkField.Textarea> {
  allowResize?: boolean
}

export function TextareaRoot({
  ref,
  children,
  className,
  allowResize: isAllowResize = true,
  ...props
}: TextareaRootProps) {
  return (
    <div
      role="group"
      className={cn(
        'group relative flex min-w-xs cursor-text flex-col rounded-xl bg-surface-2 py-2.5 pr-2.5 pl-3 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] ring-brand/16 ring-offset-2 ring-offset-surface-1 [transition:background-color_0.2s,box-shadow_0.2s] motion-reduce:transition-none',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-border before:ring-inset before:transition-shadow before:duration-200',
        // hover
        'hover:[&:not(:has(textarea:disabled,textarea:focus-within))]:bg-fill-1 hover:[&:not(:has(textarea:disabled,textarea:focus-within))]:before:ring-transparent',
        // focus-within
        'focus-within:ring-2 focus-within:before:ring-brand',
        // disabled
        'has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:bg-fill-1 has-[textarea:disabled]:before:ring-transparent',
        // invalid
        'has-[textarea[data-invalid]]:border-danger has-[textarea[data-invalid]]:ring-danger/10',
        className
      )}
      data-scope="textarea"
      data-part="root"
    >
      <div className="grid">
        <div
          className={cn('pointer-events-none relative z-10 flex flex-col gap-y-2 [grid-area:1/1]')}
        >
          <ArkField.Textarea
            ref={ref}
            {...props}
            className={cn(
              'pointer-events-auto min-h-18 flex-1 resize-none bg-transparent outline-hidden',
              'text-fg-1 text-paragraph-sm',
              // disabled
              'disabled:pointer-events-none disabled:placeholder:text-disabled'
            )}
          />

          <footer className={cn('pointer-events-none flex items-center justify-end gap-x-1.5')}>
            {children}

            {isAllowResize && <TextareaResizeHandle />}
          </footer>
        </div>

        <div
          role="presentation"
          className={cn(
            'min-h-full resize-y overflow-hidden opacity-0 [grid-area:1/1] group-has-[textarea:disabled]:resize-none',
            !isAllowResize && 'hidden'
          )}
          aria-hidden
        />
      </div>
    </div>
  )
}

TextareaRoot.displayName = TEXTAREA_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface TextareaCharCounterProps {
  current: number
  max: number
  invalid?: boolean
}

export function TextareaCharCounter({
  current = 0,
  max = 200,
  invalid: isInvalid = false,
}: TextareaCharCounterProps) {
  return (
    <div
      role="status"
      data-scope="textarea"
      data-part="char-counter"
      aria-live="polite"
      aria-atomic
    >
      <span
        className={cn(
          'block select-none text-fg-1/40 text-subheading-2xs uppercase tabular-nums',
          // disabled
          'group-has-[textarea:disabled]:text-disabled',
          // invalid
          isInvalid && 'text-danger'
        )}
        aria-hidden
      >
        {current}/{max}
      </span>

      <span className="sr-only">
        {current} of {max} characters used
      </span>
    </div>
  )
}

TextareaCharCounter.displayName = TEXTAREA_CHAR_COUNTER_NAME

////////////////////////////////////////////////////////////////////////////////////

function TextareaResizeHandle() {
  return (
    <div
      className={cn('shrink-0 cursor-ns-resize')}
      data-scope="textarea"
      data-part="resize-handle"
      aria-hidden
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        focusable={false}
        className={cn(
          'size-3 stroke-fill-4',
          // disabled
          'group-has-[textarea:disabled]:stroke-disabled'
        )}
      >
        <path d="M9.11111 2L2 9.11111M10 6.44444L6.44444 10" />
      </svg>
    </div>
  )
}

TextareaResizeHandle.displayName = TEXTAREA_RESIZE_HANDLE_NAME
