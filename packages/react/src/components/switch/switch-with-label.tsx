'use client'

import * as React from 'react'

import { Badge, type BadgeRootProps } from '@/components/badge'
import { Label } from '@/components/label'
import { LinkButton, type LinkButtonRootProps } from '@/components/link-button'
import { Switch, type SwitchRootProps } from '@/components/switch'
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

export interface SwitchWithLabelProps extends SwitchRootProps {
  /**
   * The main label text displayed next to the switch
   */
  labelText: string
  /**
   * Optional secondary text displayed below the main label
   */
  labelSubText?: string
  /**
   * Optional description text displayed below the label
   */
  description?: string
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

export function SwitchWithLabel({
  labelText,
  labelSubText,
  description,
  badgeProps,
  linkButtonProps,
  flip,
  ...switchProps
}: SwitchWithLabelProps) {
  const uniqueId = React.useId()

  const hasLabelSubText = labelSubText?.length
  const hasBadge = badgeProps?.enabled
  const hasDescription = description?.length
  const hasLinkButton = linkButtonProps?.enabled

  return (
    <div
      className={cn(
        'group grid grid-cols-[auto_1fr] items-start gap-x-2',
        flip && 'grid-cols-[1fr_auto]'
      )}
    >
      <Switch.Root
        {...switchProps}
        ids={{
          hiddenInput: uniqueId,
        }}
        className={cn(flip && 'order-2')}
        aria-describedby={hasDescription ? `${uniqueId}-description` : undefined}
      >
        <Switch.Control className="mt-1" />
      </Switch.Root>

      <div className={cn('flex flex-col gap-y-2.5')}>
        <div className="space-y-1">
          <Label.Root htmlFor={uniqueId} className="**:select-none">
            <Label.Text className={cn(!hasDescription && 'font-normal')}>{labelText}</Label.Text>

            <React.Activity mode={hasLabelSubText ? 'visible' : 'hidden'}>
              <Label.SubText>{labelSubText}</Label.SubText>
            </React.Activity>

            <React.Activity mode={hasBadge ? 'visible' : 'hidden'}>
              <Badge.Root {...badgeProps} size="sm" />
            </React.Activity>
          </Label.Root>

          <React.Activity mode={hasDescription ? 'visible' : 'hidden'}>
            <p
              id={`${uniqueId}-description`}
              className={cn('line-clamp-2 font-sans text-fg-1/70 text-xs/4')}
            >
              {description}
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

SwitchWithLabel.displayName = 'SwitchWithLabel'
