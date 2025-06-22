import { cn } from '@r/utilities/cn'

////////////////////////////////////////////////////////////////////////////////////

type TableRootProps = React.ComponentProps<'table'>

const TableRoot = ({ className, ...props }: TableRootProps) => {
  return (
    <div
      className={cn('relative max-w-full overflow-x-auto rounded-xl border')}
      data-scope="table"
      data-part="root"
    >
      <table
        {...props}
        className={cn(
          'w-full table-auto divide-y whitespace-nowrap',
          className,
        )}
      />
    </div>
  )
}

TableRoot.displayName = 'Table'

////////////////////////////////////////////////////////////////////////////////////

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<'thead'>) => {
  return (
    <thead
      {...props}
      className={cn(className)}
      data-scope="table"
      data-part="header"
    />
  )
}

TableHeader.displayName = 'TableHeader'

////////////////////////////////////////////////////////////////////////////////////

const TableBody = ({ ...props }: React.ComponentProps<'tbody'>) => {
  return (
    <tbody
      {...props}
      className={cn('divide-y bg-surface-1')}
      data-scope="table"
      data-part="body"
    />
  )
}

TableBody.displayName = 'TableBody'

////////////////////////////////////////////////////////////////////////////////////

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr
      {...props}
      className={cn('transition-colors ease-out hover:bg-fill-1', className)}
      data-scope="table"
      data-part="row"
    />
  )
}

TableRow.displayName = 'TableRow'

////////////////////////////////////////////////////////////////////////////////////

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th
      {...props}
      className={cn(
        'bg-surface-2 px-3 pt-4 pb-3',
        'text-start font-medium text-fg-1 text-sm/4.5',
        className,
      )}
      data-scope="table"
      data-part="head"
    />
  )
}

TableHead.displayName = 'TableHead'

////////////////////////////////////////////////////////////////////////////////////

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  return (
    <td
      {...props}
      className={cn(
        'p-3 align-middle',
        'font-normal text-fg-1/70 text-sm/4.5',
        className,
      )}
      data-scope="table"
      data-part="cell"
    />
  )
}

TableCell.displayName = 'TableCell'

////////////////////////////////////////////////////////////////////////////////////

const TableFooter = ({
  className,
  ...props
}: React.ComponentProps<'tfoot'>) => {
  return (
    <tfoot
      {...props}
      className={cn('bg-surface-2', className)}
      data-scope="table"
      data-part="footer"
    />
  )
}

TableFooter.displayName = 'TableFooter'

////////////////////////////////////////////////////////////////////////////////////

export {
  TableRoot as Root,
  TableHeader as Header,
  TableBody as Body,
  TableRow as Row,
  TableHead as Head,
  TableCell as Cell,
  TableFooter as Footer,
}

export type { TableRootProps as TableProps }
