'use client'

import { Badge, type BadgeRootProps } from '@/components/badge'
import { Checkbox, type CheckboxRootProps } from '@/components/checkbox'
import { Label } from '@/components/label'
import { LinkButton, type LinkButtonRootProps } from '@/components/link-button'
import { cn } from '@/lib/cn'

/**
 * Props for the CheckboxLabel component.
 * Extends CheckboxRootProps to inherit all checkbox functionality.
 */
export interface CheckboxLabelProps extends CheckboxRootProps {
  /**
   * The main text label displayed next to the checkbox.
   * @example "Email notifications"
   */
  labelText: string

  /**
   * Optional secondary text displayed after the main label, typically in a muted style.
   * Commonly used for additional context like "(Optional)" or "(Recommended)".
   * @example "(Recommended)"
   */
  labelSubText?: string

  /**
   * Optional descriptive text displayed below the label.
   * Provides additional context or explanation about the checkbox option.
   * Limited to 2 lines with text truncation.
   * @example "Receive updates about your account activity and security alerts."
   */
  description?: string

  /**
   * Configuration for an optional badge displayed next to the label.
   * Use to highlight special states like "New", "Beta", or "Suggested".
   *
   * @property {boolean} enabled - Whether to show the badge
   * @property {React.ReactNode} content - The content to display inside the badge
   *
   * @example
   * badgeProps={{
   *   enabled: true,
   *   content: 'New',
   *   color: 'blue'
   * }}
   */
  badgeProps?: {
    enabled: boolean
    content: React.ReactNode
  } & Omit<BadgeRootProps, 'children'>

  /**
   * Configuration for an optional link button displayed below the description.
   * Use for contextual actions like "Learn more" or "Manage preferences".
   *
   * @property {boolean} enabled - Whether to show the link button
   * @property {React.ReactNode} content - The content to display inside the link button
   *
   * @example
   * linkButtonProps={{
   *   enabled: true,
   *   content: 'Learn more',
   *   href: '/docs'
   * }}
   */
  linkButtonProps?: {
    enabled: boolean
    content: React.ReactNode
  } & Omit<LinkButtonRootProps, 'children'>
}

/**
 * A composed checkbox component with integrated label, description, badge, and link button support.
 *
 * This component provides a rich checkbox experience by combining multiple UI elements
 * in a single, cohesive component. It's ideal for settings pages, forms, and preference panels
 * where checkboxes need additional context or actions.
 *
 * @example
 * // Basic usage with label and description
 * <CheckboxLabel
 *   labelText="Email notifications"
 *   description="Receive updates about your account"
 * />
 *
 * @example
 * // Full-featured usage with all options
 * <CheckboxLabel
 *   labelText="Beta features"
 *   labelSubText="(Experimental)"
 *   description="Access experimental features before they're released"
 *   badgeProps={{
 *     enabled: true,
 *     content: 'Beta'
 *   }}
 *   linkButtonProps={{
 *     enabled: true,
 *     content: 'Learn more'
 *   }}
 *   defaultChecked
 * />
 */
export function CheckboxLabel({
  className,
  labelText,
  labelSubText,
  description,
  badgeProps,
  linkButtonProps,
  ...props
}: CheckboxLabelProps) {
  const { enabled: badgeEnabled, content: badgeContent, ...restBadgeProps } = badgeProps ?? {}
  const { enabled: linkEnabled, content: linkContent, ...restLinkProps } = linkButtonProps ?? {}

  return (
    <Checkbox.Root
      {...props}
      className={cn('grid grid-cols-[auto_1fr] items-start gap-x-2', className)}
    >
      <Checkbox.Control className="mt-1" />

      <div>
        <Label.Root asChild>
          <Checkbox.Label>
            <Label.Text>{labelText}</Label.Text>
            {labelSubText && <Label.SubText>{labelSubText}</Label.SubText>}

            {badgeEnabled && (
              <Badge.Root variant="lighter" color="blue" size="sm" {...restBadgeProps}>
                {badgeContent}
              </Badge.Root>
            )}
          </Checkbox.Label>
        </Label.Root>

        {description && (
          <p
            className={cn('mt-1 mb-2.5 line-clamp-2 font-normal font-sans text-fg-1/70 text-xs/4')}
          >
            {description}
          </p>
        )}

        {linkEnabled && (
          <LinkButton.Root
            className="text-information hover:text-information/90"
            {...restLinkProps}
          >
            {linkContent}
          </LinkButton.Root>
        )}
      </div>
    </Checkbox.Root>
  )
}
