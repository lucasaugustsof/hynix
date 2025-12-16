import * as React from 'react'
import {
  Field as ArkField,
  type FieldTextareaProps as ArkFieldTextareaProps,
} from '@ark-ui/react/field'

import { cn } from '@/lib/cn'

const TEXTAREA_ROOT_NAME = 'Textarea.Root'
const TEXTAREA_CHAR_COUNTER_NAME = 'Textarea.CharCounter'
const TEXTAREA_RESIZE_HANDLE_NAME = 'Textarea.ResizeHandle'

////////////////////////////////////////////////////////////////////////////////////

/**
 * Props for the Textarea root component.
 */
export interface TextareaRootProps extends ArkFieldTextareaProps {
  /**
   * Whether the textarea can be resized by the user.
   * @default true
   */
  allowResize?: boolean
}

/**
 * Textarea root component with styled container and accessibility support.
 * Should be used inside Field.Root for proper form integration.
 *
 * @example
 * ```tsx
 * <Textarea.Root placeholder="Type something...">
 *   <Textarea.CharCounter current={value.length} max={200} />
 * </Textarea.Root>
 * ```
 */
export const TextareaRoot = React.forwardRef<HTMLTextAreaElement, TextareaRootProps>(
  ({ children, className, allowResize: isAllowResize = true, ...props }, ref) => {
    return (
      <div
        role="group"
        className={cn(
          'group relative flex min-w-xs cursor-text flex-col rounded-xl border bg-surface-1 py-2.5 pr-2.5 pl-3 shadow-black/3 shadow-xs',
          'transition motion-reduce:transition-none',
          'ring-brand/10 ring-offset-2 ring-offset-surface-1',
          // hover
          'hover:[&:not(:has(textarea:disabled,textarea:focus-within))]:border-transparent hover:[&:not(:has(textarea:disabled,textarea:focus-within))]:bg-fill-1',
          // focus-within
          'focus-within:border-brand focus-within:ring-2',
          // disabled
          'has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:border-transparent has-[textarea:disabled]:bg-fill-1',
          // invalid
          'has-[textarea[data-invalid]]:border-danger has-[textarea[data-invalid]]:ring-danger/10',
          className
        )}
        data-scope="textarea"
        data-part="root"
      >
        <div className="grid">
          <div
            className={cn(
              'pointer-events-none relative z-10 flex flex-col gap-y-2 [grid-area:1/1]'
            )}
          >
            <ArkField.Textarea
              ref={ref}
              {...props}
              className={cn(
                'pointer-events-auto min-h-18 flex-1 resize-none bg-transparent outline-hidden',
                'font-normal text-fg-1 text-sm/5 tracking-[-0.00525rem]',
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
)

TextareaRoot.displayName = TEXTAREA_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Props for the character counter component.
 */
export interface TextareaCharCounterProps {
  /**
   * Current number of characters in the textarea.
   */
  current: number
  /**
   * Maximum number of characters allowed.
   */
  max: number
}

/**
 * Displays character count with screen reader support.
 * Shows "X/Y" visually and announces "X of Y characters used" to screen readers.
 *
 * @example
 * ```tsx
 * <Textarea.CharCounter current={value.length} max={200} />
 * ```
 */
export function TextareaCharCounter({ current = 0, max = 200 }: TextareaCharCounterProps) {
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
          'block select-none font-medium text-fg-1/40 text-xs/3 uppercase tabular-nums tracking-[0.01375rem]',
          // disabled
          'group-has-[textarea:disabled]:text-disabled'
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

/**
 * Internal resize handle component.
 * Displays a visual indicator for textarea resizing (decorative only).
 *
 * @internal
 */
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
