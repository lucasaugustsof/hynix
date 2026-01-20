import { ark } from '@ark-ui/react/factory'
import { Field as ArkField } from '@ark-ui/react/field'

import { RiInformation2Fill } from '@remixicon/react'
import { cn } from '@/lib/cn'

const LABEL_ROOT_NAME = 'Label.Root'
const LABEL_TEXT_NAME = 'Label.Text'
const LABEL_ASTERISK_NAME = 'Label.Asterisk'
const LABEL_SUB_TEXT_NAME = 'Label.SubText'
const LABEL_INFO_NAME = 'Label.Info'

////////////////////////////////////////////////////////////////////////////////////

export interface LabelRootProps extends React.ComponentProps<typeof ArkField.Label> {}

export function LabelRoot({ className, ...props }: LabelRootProps) {
  return (
    <ArkField.Label
      className={cn(
        'group inline-flex items-center gap-x-1',
        'font-sans text-sm/5 tracking-[-0.00525rem]',
        // scoped:link-button
        '[&_[data-scope=link-button][data-part=root]]:ml-auto [&_[data-scope=link-button][data-part=root]]:text-fg-1/70',
        // disabled
        'data-disabled:cursor-not-allowed *:group-data-disabled:text-disabled',
        className
      )}
      data-scope="label"
      data-part="root"
      {...props}
    />
  )
}

LabelRoot.displayName = LABEL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelTextProps extends React.ComponentPropsWithoutRef<typeof ark.span> {}

export function LabelText({ children, className, ...props }: LabelTextProps) {
  return (
    <ark.span
      className={cn('font-medium text-fg-1', className)}
      data-scope="label"
      data-part="text"
      {...props}
    >
      {children}
    </ark.span>
  )
}

LabelText.displayName = LABEL_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelAsteriskProps
  extends React.ComponentProps<typeof ArkField.RequiredIndicator> {}

export function LabelAsterisk(props: LabelAsteriskProps) {
  return (
    <ArkField.RequiredIndicator
      className={cn('font-medium text-information')}
      data-scope="label"
      data-part="asterisk"
      {...props}
    />
  )
}

LabelAsterisk.displayName = LABEL_ASTERISK_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelSubTextProps extends React.ComponentPropsWithoutRef<typeof ark.small> {}

export function LabelSubText({ children, className, ...props }: LabelSubTextProps) {
  return (
    <ark.small
      className={cn('font-normal text-fg-1/40 text-xs/4', className)}
      data-scope="label"
      data-part="subtext"
      {...props}
    >
      {children}
    </ark.small>
  )
}

LabelSubText.displayName = LABEL_SUB_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelInfoProps extends React.AriaAttributes {}

export function LabelInfo(props: LabelInfoProps) {
  return (
    <RiInformation2Fill
      className={cn('size-4 shrink-0 fill-fill-3', 'group-data-disabled:fill-disabled')}
      data-scope="label"
      data-part="info"
      {...props}
    />
  )
}

LabelInfo.displayName = LABEL_INFO_NAME
