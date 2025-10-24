import type * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import { Field as ArkField } from '@ark-ui/react/field'

import { RiInformation2Fill } from '@remixicon/react'
import { cn } from '@/lib/cn'

const LABEL_ROOT_NAME = 'Label.Root'
const LABEL_TEXT_NAME = 'Label.Text'
const LABEL_ASTERISK_NAME = 'Label.Asterisk'
const LABEL_SUB_TEXT_NAME = 'Label.SubText'
const LABEL_INFO_NAME = 'Label.Info'
const LABEL_BUTTON_NAME = 'Label.Button'

export interface LabelRootProps extends React.ComponentProps<typeof ArkField.Label> {}

export function LabelRoot(props: LabelRootProps) {
  return (
    <ArkField.Label
      {...props}
      className={cn(
        'group inline-flex items-center gap-x-1',
        'font-sans text-sm/5 tracking-[-0.00525rem]',
        'data-disabled:cursor-not-allowed [&>*]:group-data-disabled:text-disabled'
      )}
    />
  )
}

LabelRoot.displayName = LABEL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelTextProps {
  children: React.ReactNode
}

export function LabelText({ children }: LabelTextProps) {
  return <span className={cn('font-medium text-fg-1')}>{children}</span>
}

LabelText.displayName = LABEL_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelAsteriskProps
  extends React.ComponentProps<typeof ArkField.RequiredIndicator> {}

export function LabelAsterisk(props: LabelAsteriskProps) {
  return <ArkField.RequiredIndicator {...props} className={cn('font-medium text-information')} />
}

LabelAsterisk.displayName = LABEL_ASTERISK_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelSubTextProps {
  children: React.ReactNode
}

export function LabelSubText({ children }: LabelSubTextProps) {
  return <span className={cn('font-normal text-fg-1/40')}>{children}</span>
}

LabelSubText.displayName = LABEL_SUB_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelInfoProps extends React.AriaAttributes {}

export function LabelInfo(props: LabelInfoProps) {
  return (
    <RiInformation2Fill
      {...props}
      className={cn('size-4 shrink-0 fill-fill-3', 'group-data-disabled:fill-disabled')}
    />
  )
}

LabelInfo.displayName = LABEL_INFO_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelButtonProps extends React.ComponentProps<typeof ark.button> {}

export function LabelButton(props: LabelButtonProps) {
  return (
    <ark.button
      type="button"
      {...props}
      className={cn(
        'ml-auto cursor-pointer',
        'font-medium text-fg-1/70 text-xs/4',
        'group-data-disabled:cursor-not-allowed'
      )}
    />
  )
}

LabelButton.displayName = LABEL_BUTTON_NAME
