import { cn } from 'registry/utilities/cn'

type DividerTypes = 'default' | 'label-left' | 'label-center' | 'label-right'

type DividerProps = React.ComponentPropsWithRef<'div'> & {
  type?: DividerTypes
  labelText?: string
  direction?: 'vertical' | 'horizontal'
}

function Divider({
  type = 'default',
  labelText,
  direction = 'horizontal',
}: DividerProps) {
  const Line = () => (
    <div
      className={cn(
        'flex-1 bg-border',
        direction === 'vertical' ? 'w-px' : 'h-px',
      )}
    />
  )

  const renderMap: Record<DividerTypes, React.ReactElement> = {
    default: <Line />,
    'label-left': (
      <>
        <Line />
        {labelText}
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
        {labelText}
        <Line />
      </>
    ),
  }

  return (
    <div
      role="separator"
      className={cn(
        'flex min-w-80 items-center gap-2',
        'text-nowrap font-medium font-sans text-fg-1/70 leading-5.5 tracking-normal',
        direction === 'vertical' && 'min-h-80 flex-col',
      )}
    >
      {renderMap[type]}
    </div>
  )
}

export { Divider }
export type { DividerProps }
