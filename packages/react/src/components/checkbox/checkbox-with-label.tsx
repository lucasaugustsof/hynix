'use client'

import * as React from 'react'

import { Badge, type BadgeRootProps } from '@/components/badge'
import { Checkbox, type CheckboxRootProps } from '@/components/checkbox'
import { Label } from '@/components/label'
import { LinkButton, type LinkButtonRootProps } from '@/components/link-button'
import { cn } from '@/lib/cn'

type BadgeProps = {
  /*
   * Whether the badge should be displayed
   */
  enabled: boolean
} & BadgeRootProps

type LinkButtonProps = {
  /*
   * Whether the link button should be displayed
   */
  enabled: boolean
} & LinkButtonRootProps

export interface SwitchWithLabelProps extends CheckboxRootProps {
  /**
   * The main label text displayed next to the switch
   */
  editLabel: string
  /**
   * Optional secondary text displayed below the main label
   */
  editSublabel?: string
  /**
   * Optional description text displayed below the label
   */
  editDescription?: string
  /**
   * Optional badge configuration. Only displayed when enabled is true
   */
  badgeProps?: BadgeProps
  /**
   * Optional link button configuration. Only displayed when enabled is true
   */
  linkButtonProps?: LinkButtonProps
  /**
   * Whether to flip the layout, positioning the switch on the right side
   * @default false
   */
  flip?: boolean
}

export function CheckboxWithLabel({
  className,
  editLabel,
  editSublabel,
  editDescription,
  badgeProps,
  linkButtonProps,
  flip,
  ...switchProps
}: SwitchWithLabelProps) {
  const checkboxId = React.useId()
  const descriptionId = React.useId()

  const hasLabelSubText = Boolean(editSublabel)
  const hasDescription = Boolean(editDescription)

  const hasBadge = badgeProps?.enabled
  const hasLinkButton = linkButtonProps?.enabled

  return (
    <div
      className={cn(
        'group grid grid-cols-[auto_1fr] items-start gap-x-2',
        flip && 'grid-cols-[1fr_auto]',
        className
      )}
      data-scope="checkbox-with-label"
    >
      <Checkbox.Root
        {...switchProps}
        ids={{
          hiddenInput: checkboxId,
        }}
        className={cn(flip && 'order-2')}
        aria-describedby={hasDescription ? descriptionId : undefined}
      >
        <Checkbox.Control className="mt-1" />
      </Checkbox.Root>

      <div className={cn('flex flex-col gap-y-2.5')}>
        <div className="space-y-1">
          <Label.Root htmlFor={checkboxId} className="**:select-none">
            <Label.Text className={cn(!hasDescription && 'font-normal')}>{editLabel}</Label.Text>

            <React.Activity mode={hasLabelSubText ? 'visible' : 'hidden'}>
              <Label.SubText>{editSublabel}</Label.SubText>
            </React.Activity>

            <React.Activity mode={hasBadge ? 'visible' : 'hidden'}>
              <Badge.Root {...badgeProps} size="sm" />
            </React.Activity>
          </Label.Root>

          <React.Activity mode={hasDescription ? 'visible' : 'hidden'}>
            <p id={descriptionId} className={cn('line-clamp-2 font-sans text-fg-1/70 text-xs/4')}>
              {editDescription}
            </p>
          </React.Activity>
        </div>

        <React.Activity mode={hasLinkButton ? 'visible' : 'hidden'}>
          <LinkButton.Root {...linkButtonProps} size="sm" />
        </React.Activity>
      </div>
    </div>
  )
}

CheckboxWithLabel.displayName = 'CheckboxWithLabel'
