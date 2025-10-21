import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import type * as ArkFieldTypes from '@ark-ui/react/field'
import { Field as ArkField } from '@ark-ui/react/field'

import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const FIELD_ROOT_NAME = 'Field.Root'
const FIELD_CONTROL_NAME = 'Field.Control'
const FIELD_INPUT_NAME = 'Field.Input'
const FIELD_ICON_NAME = 'Field.Icon'

const createFieldRecipe = tv({
  slots: {
    root: 'flex flex-col gap-y-1',
    control: [
      'group inset-ring-1 inset-ring-border flex w-80 cursor-text items-center gap-x-2 overflow-hidden rounded-[0.625rem] bg-surface-2 py-2.5 pr-2.5 pl-3 shadow-xs',
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
      'size-5 shrink-0 fill-fill-4 group-not-has-placeholder-shown:first:fill-fill-5',
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
      xs: {},
      sm: {},
      md: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const fieldRecipe = createFieldRecipe()

interface FieldRootProps
  extends ArkFieldTypes.FieldRootProps,
    VariantProps<typeof createFieldRecipe> {}

export function FieldRoot(props: FieldRootProps) {
  return <ArkField.Root {...props} className={fieldRecipe.root()} />
}

FieldRoot.displayName = FIELD_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface FieldWrapperProps extends React.ComponentProps<'label'> {
  children: React.ReactNode
}

export function FieldControl({ children, ...props }: FieldWrapperProps) {
  return (
    <label {...props} className={fieldRecipe.control()}>
      {children}
    </label>
  )
}

FieldControl.displayName = FIELD_CONTROL_NAME

////////////////////////////////////////////////////////////////////////////////////

interface FieldInputProps extends ArkFieldTypes.FieldInputProps {}

export const FieldInput = React.forwardRef<
  React.ComponentRef<typeof ArkField.Input>,
  FieldInputProps
>(({ ...props }, ref) => {
  return <ArkField.Input {...props} ref={ref} className={fieldRecipe.input()} />
})

FieldInput.displayName = FIELD_INPUT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function FieldIcon<T extends React.ElementType = typeof ark.span>({
  as,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || ark.span
  return <Component {...props} className={fieldRecipe.icon()} />
}

FieldIcon.displayName = FIELD_ICON_NAME
