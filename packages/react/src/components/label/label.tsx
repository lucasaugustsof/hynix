import { Field as ArkField } from '@ark-ui/react/field'

import { RiInformation2Fill } from '@remixicon/react'
import { cn } from '@/lib/cn'

const LABEL_ROOT_NAME = 'Label.Root'
const LABEL_TEXT_NAME = 'Label.Text'
const LABEL_ASTERISK_NAME = 'Label.Asterisk'
const LABEL_SUB_TEXT_NAME = 'Label.SubText'
const LABEL_INFO_NAME = 'Label.Info'

////////////////////////////////////////////////////////////////////////////////////

/**
 * Label root component that wraps the entire label composition.
 * Built on Ark UI Field.Label with proper form integration and accessibility.
 * Automatically handles disabled state propagation to child components.
 * Supports nested components like text, asterisk, subtext, and info icons.
 *
 * @example
 * ```tsx
 * <Label.Root>
 *   <Label.Text>Email</Label.Text>
 * </Label.Root>
 *
 * <Label.Root>
 *   <Label.Text>Password</Label.Text>
 *   <Label.Asterisk />
 *   <Label.SubText>Required</Label.SubText>
 * </Label.Root>
 *
 * <Label.Root htmlFor="username">
 *   <Label.Text>Username</Label.Text>
 *   <Label.Info aria-label="Additional information" />
 * </Label.Root>
 * ```
 */
export interface LabelRootProps extends React.ComponentProps<typeof ArkField.Label> {}

export function LabelRoot({ className, ...props }: LabelRootProps) {
  return (
    <ArkField.Label
      {...props}
      className={cn(
        'group inline-flex items-center gap-x-1',
        'font-sans text-sm/5 tracking-[-0.00525rem]',
        // scoped:link-button
        '[&_[data-scope=link-button][data-part=root]]:ml-auto [&_[data-scope=link-button][data-part=root]]:text-fg-1/70',
        // disabled
        'data-disabled:cursor-not-allowed [&>*]:group-data-disabled:text-disabled',
        className
      )}
      data-scope="label"
      data-part="root"
    />
  )
}

LabelRoot.displayName = LABEL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Label text component that displays the main label text.
 * Renders as a span element with medium font weight.
 * Typically used as the primary text within a Label.Root.
 *
 * @example
 * ```tsx
 * <Label.Root>
 *   <Label.Text>Full Name</Label.Text>
 * </Label.Root>
 *
 * <Label.Root>
 *   <Label.Text>Email Address</Label.Text>
 *   <Label.Asterisk />
 * </Label.Root>
 * ```
 */
export interface LabelTextProps extends React.ComponentPropsWithoutRef<'span'> {}

export function LabelText({ children, className }: LabelTextProps) {
  return (
    <span className={cn('font-medium text-fg-1', className)} data-scope="label" data-part="text">
      {children}
    </span>
  )
}

LabelText.displayName = LABEL_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Label asterisk component that displays a required field indicator.
 * Built on Ark UI Field.RequiredIndicator for automatic visibility control.
 * Shows an asterisk (*) in information color when field is required.
 * Automatically hidden when field is not required.
 *
 * @example
 * ```tsx
 * <Label.Root>
 *   <Label.Text>Email</Label.Text>
 *   <Label.Asterisk />
 * </Label.Root>
 *
 * <Field.Root required>
 *   <Label.Root>
 *     <Label.Text>Password</Label.Text>
 *     <Label.Asterisk />
 *   </Label.Root>
 *   <Field.Control>
 *     <Field.Input type="password" />
 *   </Field.Control>
 * </Field.Root>
 * ```
 */
export interface LabelAsteriskProps
  extends React.ComponentProps<typeof ArkField.RequiredIndicator> {}

export function LabelAsterisk(props: LabelAsteriskProps) {
  return (
    <ArkField.RequiredIndicator
      {...props}
      className={cn('font-medium text-information')}
      data-scope="label"
      data-part="asterisk"
    />
  )
}

LabelAsterisk.displayName = LABEL_ASTERISK_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Label subtext component that displays secondary information.
 * Renders as a small element with reduced opacity for visual hierarchy.
 * Typically used to show optional status, formatting hints, or additional context.
 *
 * @example
 * ```tsx
 * <Label.Root>
 *   <Label.Text>Phone Number</Label.Text>
 *   <Label.SubText>Optional</Label.SubText>
 * </Label.Root>
 *
 * <Label.Root>
 *   <Label.Text>Date of Birth</Label.Text>
 *   <Label.SubText>MM/DD/YYYY</Label.SubText>
 * </Label.Root>
 * ```
 */
export interface LabelSubTextProps extends React.ComponentPropsWithoutRef<'span'> {}

export function LabelSubText({ children, className }: LabelSubTextProps) {
  return (
    <small
      className={cn('font-normal text-fg-1/40 text-xs/4', className)}
      data-scope="label"
      data-part="subtext"
    >
      {children}
    </small>
  )
}

LabelSubText.displayName = LABEL_SUB_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Label info component that displays an information icon.
 * Renders an information circle icon that adapts to disabled state.
 * Supports ARIA attributes for accessibility (e.g., aria-label, aria-describedby).
 * Typically used to provide additional context or help information.
 *
 * @example
 * ```tsx
 * <Label.Root>
 *   <Label.Text>API Key</Label.Text>
 *   <Label.Info aria-label="Your unique API identifier" />
 * </Label.Root>
 *
 * <Label.Root>
 *   <Label.Text>Webhook URL</Label.Text>
 *   <Label.Info aria-describedby="webhook-help" />
 * </Label.Root>
 * ```
 */
export interface LabelInfoProps extends React.AriaAttributes {}

export function LabelInfo(props: LabelInfoProps) {
  return (
    <RiInformation2Fill
      {...props}
      className={cn('size-4 shrink-0 fill-fill-3', 'group-data-disabled:fill-disabled')}
      data-scope="label"
      data-part="info"
    />
  )
}

LabelInfo.displayName = LABEL_INFO_NAME
