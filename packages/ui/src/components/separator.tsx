import { cn } from '@r/utilities/cn'

type SeparatorTypes = 'default' | 'label-left' | 'label-center' | 'label-right'

export type SeparatorProps = React.ComponentPropsWithRef<'div'> & {
  type?: SeparatorTypes
  labelText?: string
  direction?: 'vertical' | 'horizontal'
}

function SeparatorLine({
  direction,
}: { direction: 'vertical' | 'horizontal' }) {
  return (
    <div
      className={cn(
        'flex-1 bg-border',
        direction === 'vertical' ? 'w-px' : 'h-px',
      )}
    />
  )
}

export function Separator({
  className,
  type = 'default',
  labelText,
  direction = 'horizontal',
  ...props
}: SeparatorProps) {
  const baseClasses = cn(
    'flex min-w-80 items-center gap-2',
    'text-nowrap font-medium font-sans text-fg-1/70 text-sm/5.5 tracking-normal',
    direction === 'vertical' && 'min-h-80 flex-col',
    className,
  )

  const renderContent = () => {
    const line = <SeparatorLine direction={direction} />

    switch (type) {
      case 'label-left':
        return (
          <>
            <span>{labelText}</span>
            {line}
          </>
        )
      case 'label-center':
        return (
          <>
            {line}
            <span>{labelText}</span>
            {line}
          </>
        )
      case 'label-right':
        return (
          <>
            {line}
            <span>{labelText}</span>
          </>
        )

      default:
        return line
    }
  }

  return (
    <div
      role="separator"
      className={baseClasses}
      data-scope="divider"
      {...props}
    >
      {renderContent()}
    </div>
  )
}

Separator.displayName = 'Separator'
