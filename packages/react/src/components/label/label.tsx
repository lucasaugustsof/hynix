import { ark } from '@ark-ui/react/factory'
import { Field as ArkField } from '@ark-ui/react/field'

import { RiInformation2Fill } from '@remixicon/react'
import { cn } from '@/utils/cn'

const LABEL_ROOT_NAME = 'Label.Root'
const LABEL_TEXT_NAME = 'Label.Text'
const LABEL_ASTERISK_NAME = 'Label.Asterisk'
const LABEL_SUB_TEXT_NAME = 'Label.SubText'
const LABEL_INFO_NAME = 'Label.Info'

////////////////////////////////////////////////////////////////////////////////////

interface LabelRootProps extends React.ComponentProps<typeof ArkField.Label> {}

export function LabelRoot({ className, ...props }: LabelRootProps) {
  return (
    <ArkField.Label
      {...props}
      className={cn(
        'group inline-flex items-center gap-x-1',
        'text-label-sm',
        '[&_[data-scope=link-button][data-part=root]]:ml-auto [&_[data-scope=link-button][data-part=root]]:text-fg-1/70',
        'data-disabled:cursor-not-allowed *:group-data-disabled:text-disabled',
        className
      )}
      data-scope="label"
      data-part="root"
    />
  )
}

LabelRoot.displayName = LABEL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LabelTextProps extends React.ComponentPropsWithoutRef<typeof ark.span> {}

export function LabelText({ children, className, ...props }: LabelTextProps) {
  return (
    <ark.span
      {...props}
      className={cn('font-medium text-fg-1', className)}
      data-scope="label"
      data-part="text"
    >
      {children}
    </ark.span>
  )
}

LabelText.displayName = LABEL_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface LabelAsteriskProps extends React.ComponentProps<typeof ArkField.RequiredIndicator> {}

export function LabelAsterisk({ className, ...props }: LabelAsteriskProps) {
  return (
    <ArkField.RequiredIndicator
      {...props}
      className={cn('font-medium text-danger', className)}
      data-scope="label"
      data-part="asterisk"
    />
  )
}

LabelAsterisk.displayName = LABEL_ASTERISK_NAME

////////////////////////////////////////////////////////////////////////////////////

interface LabelSubTextProps extends React.ComponentPropsWithoutRef<typeof ark.small> {}

export function LabelSubText({ className, ...props }: LabelSubTextProps) {
  return (
    <ark.small
      {...props}
      className={cn('text-paragraph-sm', className)}
      data-scope="label"
      data-part="subtext"
    />
  )
}

LabelSubText.displayName = LABEL_SUB_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface LabelInfoProps extends React.AriaAttributes {}

export function LabelInfo(props: LabelInfoProps) {
  return (
    <RiInformation2Fill
      {...props}
      className={cn('size-4 shrink-0 fill-fill-3', 'group-data-disabled:fill-disabled')}
      data-scope="label"
      data-part="info"
      aria-hidden
    />
  )
}

LabelInfo.displayName = LABEL_INFO_NAME
