import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'
import { Field as ArkField } from '@ark-ui/react/field'

import type { RemixiconComponentType } from '@remixicon/react'
import type { PolymorphicProps } from '@/utils/polymorphic'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const INPUT_ROOT_NAME = 'Input.Root'
const INPUT_CONTROL_NAME = 'Input.Control'
const INPUT_TEXT_INPUT_NAME = 'Input.TextInput'
const INPUT_PREFIX_NAME = 'Input.Prefix'
const INPUT_ICON_NAME = 'Input.Icon'

const inputVariants = tv({
  slots: {
    root: [
      'group relative overflow-hidden shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] [transition:box-shadow_0.2s]',
      'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-border before:ring-inset before:[transition:box-shadow_0.2s]',
      // hover
      'not-focus-within:has-enabled:hover:border-fill-1 not-focus-within:has-enabled:hover:shadow-none',
      // focus
      'focus-within:ring-2 focus-within:ring-brand/16 focus-within:ring-offset-2 focus-within:ring-offset-surface-1 focus-within:before:ring-brand focus-within:has-data-invalid:ring-danger/16',
      // disabled
      'has-disabled:cursor-not-allowed has-disabled:**:cursor-not-allowed group-has-disabled:before:hidden',
      // invalid
      'has-data-invalid:before:ring-danger',
    ],
    control: [
      'inline-flex size-full items-center gap-x-2 bg-surface-2 [transition:background-color_0.2s]',
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
    prefix: '',
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
        control: 'pr-2.5 pl-3',
      },
      sm: {
        root: 'h-9 rounded-lg',
        control: 'pr-2 pl-2.5',
      },
      xs: {
        root: 'h-8 rounded-lg',
        control: 'pr-1.5 pl-2',
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
  prefix: prefixClasses,
  icon: iconClasses,
} = inputVariants()

type InputSharedProps = VariantProps<typeof inputVariants>

////////////////////////////////////////////////////////////////////////////////////

interface InputRootProps extends Assign<React.ComponentProps<'div'>, InputSharedProps> {}

export function InputRoot({ children, className, size, ...props }: InputRootProps) {
  return (
    <div
      {...props}
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
        displayNames: [INPUT_CONTROL_NAME],
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

interface InputTextInputProps extends React.ComponentProps<'input'> {}

export function InputTextInput({ className, ...props }: InputTextInputProps) {
  return (
    <ArkField.Input
      autoComplete="off"
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

InputTextInput.displayName = INPUT_TEXT_INPUT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface InputPrefixProps extends React.ComponentProps<'div'> {}

export function InputPrefix({ className }: InputPrefixProps) {
  return (
    <div
      className={prefixClasses({
        className,
      })}
    />
  )
}

InputPrefix.displayName = INPUT_PREFIX_NAME

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
    />
  )
}

InputIcon.displayName = INPUT_ICON_NAME
