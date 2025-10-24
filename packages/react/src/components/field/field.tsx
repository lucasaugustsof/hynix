import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import type * as ArkFieldTypes from '@ark-ui/react/field'
import { Field as ArkField } from '@ark-ui/react/field'

import { useCloneChildren } from '@/hooks/use-clone-children'
import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const FIELD_ROOT_NAME = 'Field.Root'
const FIELD_CONTROL_NAME = 'Field.Control'
const FIELD_INPUT_NAME = 'Field.Input'
const FIELD_ICON_NAME = 'Field.Icon'

const createFieldRecipe = tv({
  slots: {
    root: 'flex flex-col space-y-1',
    control: [
      'group inset-ring-1 inset-ring-border flex h-fit cursor-text items-center gap-x-2 overflow-hidden rounded-[0.625rem] bg-surface-2 shadow-xs transition-[background-color]',
      // hover
      'not-has-data-[invalid]:not-focus-within:has-enabled:hover:inset-ring-transparent not-has-data-[invalid]:not-focus-within:has-enabled:hover:bg-fill-1 not-has-data-[invalid]:not-focus-within:has-enabled:hover:shadow-none',
      // focus
      'focus-within:focus-outline focus-within:inset-ring-brand',
      // disabled
      'has-disabled:inset-ring-transparent has-disabled:cursor-not-allowed has-disabled:bg-fill-1 has-disabled:shadow-none',
      // invalid
      'has-data-[invalid]:inset-ring-danger has-data-[invalid]:[--focus-outline-color:var(--color-danger)]',
    ],
    input: [
      'flex-1 outline-0',
      'font-sans text-fg-1 text-sm/5 tracking-[-0.00525rem] caret-brand placeholder:text-fg-1/40',
      // disabled
      'disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled',
    ],
    icon: [
      'size-5 shrink-0 fill-fill-4 transition-colors duration-100 group-not-has-[:is(:disabled,:placeholder-shown)]:first:fill-fill-5',
      // hover
      'group-has-enabled:group-hover:first:fill-fill-5',
      // focus
      'group-focus-within:first:fill-fill-5',
      // disabled
      'group-has-disabled:fill-disabled',
      // invalid
      'group-has-data-[invalid]:first:fill-fill-5',
    ],
  },
  variants: {
    size: {
      xs: {
        control: 'py-1.5 pr-1.5 pl-2',
      },
      sm: {
        control: 'py-2 pr-2 pl-2.5',
      },
      md: {
        control: 'py-2.5 pr-2.5 pl-3',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const fieldRecipe = createFieldRecipe()

type FieldSharedProps = VariantProps<typeof createFieldRecipe>

export interface FieldRootProps extends ArkFieldTypes.FieldRootProps, FieldSharedProps {}

export function FieldRoot({ children, className, size, ...props }: FieldRootProps) {
  const { cloneChildren, id } = useCloneChildren({
    targets: [FIELD_CONTROL_NAME],
    props: {
      size,
    },
    idPrefix: 'field',
    children,
  })

  return (
    <ArkField.Root
      {...props}
      className={fieldRecipe.root({
        size,
        className,
      })}
      id={id}
    >
      {cloneChildren()}
    </ArkField.Root>
  )
}

FieldRoot.displayName = FIELD_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface FieldControlProps extends React.ComponentProps<'label'>, FieldSharedProps {
  children: React.ReactNode
}

export function FieldControl({ children, className, size, ...props }: FieldControlProps) {
  return (
    <label
      {...props}
      className={fieldRecipe.control({
        size,
        className,
      })}
    >
      {children}
    </label>
  )
}

FieldControl.displayName = FIELD_CONTROL_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface FieldInputProps extends ArkFieldTypes.FieldInputProps {}

export const FieldInput = React.forwardRef<
  React.ComponentRef<typeof ArkField.Input>,
  FieldInputProps
>(({ className, ...props }, ref) => {
  return (
    <ArkField.Input
      {...props}
      ref={ref}
      className={fieldRecipe.input({
        className,
      })}
    />
  )
})

FieldInput.displayName = FIELD_INPUT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function FieldIcon<T extends React.ElementType = typeof ark.span>({
  as,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || ark.span
  return <Component {...props} className={fieldRecipe.icon()} aria-hidden />
}

FieldIcon.displayName = FIELD_ICON_NAME
