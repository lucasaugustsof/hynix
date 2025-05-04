import { cn } from '@r/utilities/cn'

//---------------------------------
// Types
//---------------------------------

type SeparatorTypes = 'default' | 'label-left' | 'label-center' | 'label-right'

type SeparatorProps = React.ComponentPropsWithRef<'div'> & {
  type?: SeparatorTypes
  labelText?: string
  direction?: 'vertical' | 'horizontal'
}

//---------------------------------
// Separator
//---------------------------------

function Separator({
  className,
  type = 'default',
  labelText,
  direction = 'horizontal',
}: SeparatorProps) {
  const Line = () => (
    <div
      className={cn(
        'flex-1 bg-border',
        direction === 'vertical' ? 'w-px' : 'h-px',
      )}
    />
  )

  const renderMap: Record<SeparatorTypes, React.ReactElement> = {
    default: <Line />,
    'label-left': (
      <>
        {labelText}
        <Line />
      </>
    ),
    'label-center': (
      <>
        <Line />
        {labelText}
        <Line />
      </>
    ),
    'label-right': (
      <>
        <Line />
        {labelText}
      </>
    ),
  }

  return (
    <div
      role="separator"
      className={cn(
        'flex min-w-80 items-center gap-2',
        'text-nowrap font-medium font-sans text-fg-1/70 text-sm/5.5 tracking-normal',
        direction === 'vertical' && 'min-h-80 flex-col',
        className,
      )}
      data-scope="divider"
    >
      {renderMap[type]}
    </div>
  )
}

//---------------------------------
// Exports
//---------------------------------

export { Separator }
export type { SeparatorProps }
