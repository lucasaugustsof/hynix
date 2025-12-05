import * as React from 'react'
import { ark } from '@ark-ui/react/factory'

import { Label } from '@/components/label'
import { cn } from '@/lib/cn'

/**
 * Content label component that displays rich labeled content with slots.
 * Combines a main label, optional sublabel, description text, and customizable start/end slots.
 * Supports polymorphic rendering and two size variants.
 * Includes proper ARIA attributes for accessibility with labelledby and describedby.
 *
 * @example
 * ```tsx
 * <ContentLabel
 *   editLabel="Profile Settings"
 *   editDescription="Manage your account information and preferences"
 * />
 *
 * <ContentLabel
 *   size="lg"
 *   editLabel="Avatar"
 *   editSublabel="JPG, PNG (max 2MB)"
 *   editDescription="Upload a profile picture to personalize your account"
 *   startSlot={<Avatar.Root><Avatar.Image src="/avatar.jpg" /></Avatar.Root>}
 *   endSlot={<Button.Root>Upload</Button.Root>}
 * />
 * ```
 */
export interface ContentLabelProps extends React.ComponentProps<typeof ark.div> {
  /**
   * Additional CSS classes to apply to the root element
   */
  className?: string
  /**
   * The size of the label
   * @default 'md'
   */
  size?: 'md' | 'lg'
  /**
   * The main label text
   */
  editLabel: string
  /**
   * Optional secondary label text
   */
  editSublabel?: string
  /**
   * The description text for the label
   */
  editDescription: string
  /**
   * Content to render before the label
   */
  startSlot?: React.ReactNode
  /**
   * Content to render after the label
   */
  endSlot?: React.ReactNode
}

export function ContentLabel({
  className,
  size = 'md',
  editLabel,
  editSublabel,
  editDescription,
  startSlot,
  endSlot,
}: ContentLabelProps) {
  const hasSublabel = !!editSublabel

  const labelId = React.useId()
  const descriptionId = React.useId()

  return (
    <ark.div
      role="group"
      className={cn('inline-flex w-fit items-center gap-x-3.5', className)}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      data-scope="content-label"
    >
      {startSlot}

      <div className={cn('flex-1 space-y-1')}>
        <Label.Root>
          <Label.Text
            id={labelId}
            className={cn(size === 'lg' && 'text-base tracking-[-0.011rem]')}
          >
            {editLabel}
          </Label.Text>

          <React.Activity mode={hasSublabel ? 'visible' : 'hidden'}>
            <Label.SubText>{editSublabel}</Label.SubText>
          </React.Activity>
        </Label.Root>

        <p
          className={cn(
            'line-clamp-2 font-normal font-sans text-fg-1/70 text-xs/4',
            size === 'lg' && 'text-sm/5 tracking-[-0.00525rem]'
          )}
          id={descriptionId}
        >
          {editDescription}
        </p>
      </div>

      {endSlot}
    </ark.div>
  )
}

ContentLabel.displayName = 'ContentLabel'
