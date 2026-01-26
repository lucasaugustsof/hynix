import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'
import { Field as ArkField } from '@ark-ui/react/field'

import type { RemixiconComponentType } from '@remixicon/react'
import type { PolymorphicProps } from '@/utils/polymorphic'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const INPUT_ROOT_NAME = 'Input.Root'
const INPUT_CONTROL_NAME = 'Input.Control'
const INPUT_TEXT_FIELD_NAME = 'Input.TextField'
const INPUT_ADDON_PREFIX_NAME = 'Input.AddonPrefix'
const INPUT_ADDON_INLINE_PREFIX_NAME = 'Input.AddonInlinePrefix'
const INPUT_ICON_NAME = 'Input.Icon'

const inputVariants = tv({
  slots: {
    root: [
      'group relative flex items-center overflow-hidden shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] motion-reduce:transition-none motion-safe:[transition:box-shadow_0.2s]',
      'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-border before:ring-inset before:[transition:box-shadow_0.2s]',
      // hover
      'not-focus-within:has-enabled:hover:border-fill-1 not-focus-within:has-enabled:hover:shadow-none',
      // focus
      'focus-within:ring-2 focus-within:ring-brand/16 focus-within:ring-offset-2 focus-within:ring-offset-surface-1 focus-within:before:ring-brand focus-within:has-data-invalid:ring-danger/16', // disabled
      'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:before:hidden has-[input:disabled]:**:cursor-not-allowed',
      // invalid
      'has-data-invalid:before:ring-danger',
    ],
    control: [
      'inline-flex size-full items-center bg-surface-2 [transition:background-color_0.2s]',
      // hover
      'group-not-focus-within:group-has-enabled:group-hover:bg-fill-1',
      // disabled
      'group-has-disabled:bg-fill-1',
    ],
    text: [
      'h-full flex-1 outline-hidden',
      'text-fg-1 text-paragraph-sm caret-brand',
      'placeholder:select-none placeholder:text-fg-1/40',
      // disabled
      'disabled:text-disabled disabled:placeholder:text-disabled',
    ],
    addonPrefix: [
      'inline-flex h-[inherit] shrink-0 items-center justify-center whitespace-nowrap border-e bg-surface-1 [transition:color_0.2s]',
      'text-fg-1/40 text-paragraph-sm',
      // focus
      'group-focus-within:text-fg-1/70',
      // disabled
      'group-has-disabled:bg-fill-1 group-has-disabled:text-disabled',
    ],
    addonInlinePrefix: [
      'text-nowrap',
      'text-fg-1/70 text-paragraph-sm',
      // disabled
      'group-has-disabled:text-disabled',
    ],
    icon: [
      'flex size-5 shrink-0 items-center justify-center fill-fill-4 [transition:fill_0.2s]',
      // hover
      'group-has-enabled:group-hover:fill-fill-5',
      // focus
      'group-focus-within:fill-fill-5',
      // disabled
      'group-has-disabled:fill-disabled',
    ],
  },
  variants: {
    size: {
      md: {
        root: 'h-10 rounded-[--spacing(2.5)]',
        control: 'gap-x-2 pr-2.5 pl-3',
        addonPrefix: 'px-3',
      },
      sm: {
        root: 'h-9 rounded-lg',
        control: 'gap-x-2 pr-2 pl-2.5',
        addonPrefix: 'px-2.5',
      },
      xs: {
        root: 'h-8 rounded-lg',
        control: 'gap-1.5 pr-1.5 pl-2',
        addonPrefix: 'px-2.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const {
  root: rootClasses,
  control: controlClasses,
  text: textClasses,
  addonPrefix: addonPrefixClasses,
  addonInlinePrefix: addonInlinePrefixClasses,
  icon: iconClasses,
} = inputVariants()

type InputSharedProps = VariantProps<typeof inputVariants>

////////////////////////////////////////////////////////////////////////////////////

interface InputRootProps extends Assign<React.ComponentProps<'div'>, InputSharedProps> {}

export function InputRoot({ children, className, size, ...props }: InputRootProps) {
  return (
    <div
      {...props}
      role="group"
      className={rootClasses({
        className,
        size,
      })}
      data-scope="input"
      data-part="root"
    >
      {renderChildren({
        children,
        props: {
          size,
        },
        displayNames: [INPUT_CONTROL_NAME, INPUT_ADDON_PREFIX_NAME],
      })}
    </div>
  )
}

InputRoot.displayName = INPUT_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface InputControlProps
  extends Assign<React.ComponentProps<typeof ark.label>, InputSharedProps> {}

export function InputControl({ className, ...props }: InputControlProps) {
  return (
    <ark.label
      {...props}
      className={controlClasses({
        className,
      })}
      data-scope="input"
      data-part="control"
    />
  )
}

InputControl.displayName = INPUT_CONTROL_NAME

////////////////////////////////////////////////////////////////////////////////////

interface InputTextFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {}

export function InputTextField({ className, autoComplete = 'off', ...props }: InputTextFieldProps) {
  return (
    <ArkField.Input
      autoComplete={autoComplete}
      {...props}
      type="text"
      className={textClasses({
        className,
      })}
      data-scope="input"
      data-part="text"
    />
  )
}

InputTextField.displayName = INPUT_TEXT_FIELD_NAME

////////////////////////////////////////////////////////////////////////////////////

interface InputAddonProps extends Assign<React.ComponentProps<'div'>, InputSharedProps> {}

export function InputAddonPrefix({ className, size, ...props }: InputAddonProps) {
  return (
    <div
      {...props}
      className={addonPrefixClasses({
        className,
        size,
      })}
      data-scope="input"
      data-part="addon-prefix"
      aria-hidden
    />
  )
}

InputAddonPrefix.displayName = INPUT_ADDON_PREFIX_NAME

////////////////////////////////////////////////////////////////////////////////////

interface InputAddonInlinePrefixProps extends React.ComponentProps<typeof ark.span> {}

export function InputAddonInlinePrefix({ className, ...props }: InputAddonInlinePrefixProps) {
  return (
    <ark.span
      {...props}
      className={addonInlinePrefixClasses({
        className,
      })}
      data-scope="input"
      data-part="addon-inline-prefix"
      aria-hidden
    />
  )
}

InputAddonInlinePrefix.displayName = INPUT_ADDON_INLINE_PREFIX_NAME

////////////////////////////////////////////////////////////////////////////////////

export function InputIcon<T extends React.ElementType = RemixiconComponentType>({
  as,
  className,
  size,
  ...props
}: PolymorphicProps<T, InputSharedProps>) {
  const Component = as || 'div'

  return (
    <Component
      {...props}
      className={iconClasses({
        className,
        size,
      })}
      aria-hidden
    />
  )
}

InputIcon.displayName = INPUT_ICON_NAME
