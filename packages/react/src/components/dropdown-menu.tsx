import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { cn } from '@r/utilities/cn'

//---------------------------------
// Root
//---------------------------------
type DropdownMenuProps = React.CustomComponentPropsWithRef<typeof ArkMenu.Root>

const Root = ArkMenu.Root

//---------------------------------
// Trigger
//---------------------------------

const Trigger = ArkMenu.Trigger

//---------------------------------
// Content
//---------------------------------

function Content({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ArkMenu.Content>) {
  return (
    <ArkMenu.Positioner>
      <ArkMenu.Content
        {...props}
        className={cn(
          'grid max-w-60 grid-cols-[auto_1fr] gap-y-0.5 overflow-hidden rounded-xl border bg-surface-1 p-2 shadow-black/8 shadow-xs outline-hidden dark:shadow-white/8',
          'data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:ease-out-quart',
          'data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:ease-out-quart',
          className,
        )}
      />
    </ArkMenu.Positioner>
  )
}

//---------------------------------
// ItemGroup
//---------------------------------

function ItemGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ArkMenu.ItemGroup>) {
  return (
    <ArkMenu.ItemGroup
      {...props}
      className={cn('grid grid-cols-[auto_1fr]', className)}
    />
  )
}

//---------------------------------
// ItemGroupLabel
//---------------------------------

const ItemGroupLabel = ArkMenu.ItemGroupLabel

//---------------------------------
// Item
//---------------------------------

type ItemProps = Omit<
  React.ComponentPropsWithRef<typeof ArkMenu.Item>,
  'prefix'
> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

function Item({ children, prefix, suffix, ...props }: ItemProps) {
  return (
    <ArkMenu.Item
      {...props}
      className={cn(
        'group col-span-2 grid h-10 cursor-auto grid-cols-subgrid items-center rounded-xl px-2',
        'hover:bg-fill-1',
      )}
    >
      <span
        className={cn(
          'not-empty:mr-2 inline-flex not-empty:pl-0.5 [&_svg]:size-4.5 [&_svg]:fill-fill-5',
        )}
      >
        {prefix}
      </span>

      <div
        className={cn(
          'col-start-2 flex items-center justify-between [&_svg]:size-4.5',
        )}
      >
        <span
          className={cn(
            'pointer-events-none whitespace-nowrap font-normal font-sans text-fg-1/70 text-sm/5.5 group-hover:text-fg-1',
          )}
        >
          {children}
        </span>

        <span className={cn('ml-2 shrink-0')}>{suffix}</span>
      </div>
    </ArkMenu.Item>
  )
}

//---------------------------------
// Separator
//---------------------------------

function Separator() {
  return <ArkMenu.Separator className="col-span-2 border-border" />
}

//---------------------------------
// Export
//---------------------------------

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  ItemGroup,
  ItemGroupLabel,
  Item,
  Separator,
}
export type { DropdownMenuProps }
