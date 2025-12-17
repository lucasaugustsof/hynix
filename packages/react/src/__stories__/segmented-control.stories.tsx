import * as React from 'react'
import type { Assign } from '@ark-ui/react'
import { Format } from '@ark-ui/react/format'
import {
  Listbox as ArkListbox,
  type ListboxItemProps as ArkListboxItemProps,
  createListCollection,
} from '@ark-ui/react/listbox'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  RiArrowRightSLine,
  RiEqualizer3Fill,
  RiMoonLine,
  RiRefund2Line,
  RiSunLine,
} from '@remixicon/react'
import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { SegmentedControl, type SegmentedControlRootProps } from '@/components/segmented-control'
import { cn } from '@/lib/cn'

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl.Root,
} satisfies Meta

type SegmentedControlStory = StoryObj<SegmentedControlRootProps>

export const Default: SegmentedControlStory = {
  render: args => {
    return (
      <SegmentedControl.Root defaultValue="light" {...args}>
        <Label.Root className="mb-1.5">
          <Label.Text>Select Theme</Label.Text>
          <Label.SubText>(Optional)</Label.SubText>
        </Label.Root>

        <SegmentedControl.List>
          <SegmentedControl.Item value="light">
            <SegmentedControl.ItemIcon asChild>
              <RiSunLine />
            </SegmentedControl.ItemIcon>

            <SegmentedControl.ItemText>Light</SegmentedControl.ItemText>
          </SegmentedControl.Item>

          <SegmentedControl.Item value="dark">
            <SegmentedControl.ItemIcon asChild>
              <RiMoonLine />
            </SegmentedControl.ItemIcon>

            <SegmentedControl.ItemText>Dark</SegmentedControl.ItemText>
          </SegmentedControl.Item>

          <SegmentedControl.Item value="system">
            <SegmentedControl.ItemIcon asChild>
              <RiEqualizer3Fill />
            </SegmentedControl.ItemIcon>

            <SegmentedControl.ItemText>System</SegmentedControl.ItemText>
          </SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl.Root>
    )
  },
}

export const UseCaseRecentTransactions: SegmentedControlStory = {
  name: '[Use Case] Recent Transactions',
  render: () => {
    type TransactionItemStatus = 'incoming' | 'outgoing'

    interface TransactionItemProps {
      id: string
      title: string
      description: string
      amount: number
      date: Date
      status: TransactionItemStatus
    }

    type TransactionItemPropsOmitted = Assign<
      Omit<TransactionItemProps, 'id' | 'status'>,
      ArkListboxItemProps
    >

    function TransactionItem({
      title,
      description,
      amount,
      date,
      ...props
    }: TransactionItemPropsOmitted) {
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date)

      const isoDate = date.toISOString().split('T')[0]
      const amountType = amount > 0 ? 'received' : 'paid'
      const amountAbsolute = Math.abs(amount)

      return (
        <ArkListbox.Item {...props} asChild>
          <button
            type="button"
            aria-label={`${title}, ${description}, ${amountType} ${amountAbsolute} dollars, ${formattedDate}`}
            className={cn(
              'inline-flex w-full cursor-pointer items-center gap-x-3 rounded-xl bg-surface-1 py-2 outline-hidden transition-[background-color,padding] ease-out',
              '[&:is([data-highlighted],:enabled:hover)]:bg-surface-2 [&:is([data-highlighted],:enabled:hover)]:px-2'
            )}
          >
            <hgroup className={cn('flex flex-1 flex-col items-start gap-y-1')}>
              <ArkListbox.ItemText className={cn('font-medium text-fg-1 text-sm/5')}>
                {title}
              </ArkListbox.ItemText>
              <p className={cn('font-normal text-fg-1/70 text-xs/4')} aria-hidden="true">
                {description}
              </p>
            </hgroup>

            <div className={cn('flex flex-col items-end gap-y-1')}>
              <p
                className={cn(
                  'font-medium text-fg-1 text-sm/5 tabular-nums',
                  amount > 0 ? 'text-success' : 'text-danger'
                )}
                aria-hidden="true"
              >
                <Format.Number currency="USD" style="currency" value={amount} />
              </p>

              <time
                dateTime={isoDate}
                className={cn('font-normal text-fg-1/70 text-xs/4')}
                aria-hidden="true"
              >
                {formattedDate}
              </time>
            </div>

            <span
              aria-hidden="true"
              className={cn('inline-flex shrink-0 p-0.5', '[&_svg]:size-4.5 [&_svg]:fill-fill-5')}
            >
              <RiArrowRightSLine />
            </span>
          </button>
        </ArkListbox.Item>
      )
    }

    const DEFAULT_TRANSACTIONS: TransactionItemProps[] = [
      {
        id: '1',
        title: 'Salary Deposit',
        description: 'Monthly salary payment',
        amount: 4500,
        date: new Date('2025-11-01'),
        status: 'incoming',
      },
      {
        id: '2',
        title: 'Refund',
        description: 'Amazon order refund #R-98234',
        amount: 89.99,
        date: new Date('2025-12-03'),
        status: 'incoming',
      },
      {
        id: '3',
        title: 'Client Payment',
        description: 'Invoice #INV-2024-001',
        amount: 1250,
        date: new Date('2025-11-05'),
        status: 'incoming',
      },
      {
        id: '4',
        title: 'Transfer Received',
        description: 'From John Doe',
        amount: 200,
        date: new Date('2025-11-08'),
        status: 'incoming',
      },
      {
        id: '5',
        title: 'Baroque Painting',
        description: 'Order No #234122',
        amount: -124,
        date: new Date('2025-11-02'),
        status: 'outgoing',
      },
      {
        id: '6',
        title: 'Mastercard Payment',
        description: 'Monthly Credit Card Payment',
        amount: -963.62,
        date: new Date('2025-11-04'),
        status: 'outgoing',
      },
      {
        id: '7',
        title: 'Transfer',
        description: 'Transfer to another account',
        amount: -640,
        date: new Date('2025-11-06'),
        status: 'outgoing',
      },
      {
        id: '8',
        title: 'Netflix Subscription',
        description: 'Monthly subscription fee',
        amount: -15.99,
        date: new Date('2025-11-07'),
        status: 'outgoing',
      },
      {
        id: '9',
        title: 'Grocery Store',
        description: 'Whole Foods Market',
        amount: -156.43,
        date: new Date('2025-11-09'),
        status: 'outgoing',
      },
      {
        id: '10',
        title: 'Rent Payment',
        description: 'Scheduled for Jan 15',
        amount: -1800,
        date: new Date('2025-12-15'),
        status: 'outgoing',
      },
      {
        id: '11',
        title: 'Pending Deposit',
        description: 'Wire transfer processing',
        amount: 3000,
        date: new Date('2025-12-12'),
        status: 'incoming',
      },
      {
        id: '12',
        title: 'Gas Station',
        description: 'Authorization hold',
        amount: 75,
        date: new Date('2025-12-10'),
        status: 'incoming',
      },
    ]

    const [selectedStatus, setSelectedStatus] = React.useState<TransactionItemStatus>('incoming')

    const collection = createListCollection({
      items: DEFAULT_TRANSACTIONS,
      itemToValue: item => item.id,
    }).filter((_, _index, item) => item.status === selectedStatus)

    const transactionCount = collection.items.length

    return (
      <ArkListbox.Root
        collection={collection}
        orientation="vertical"
        aria-label="Recent transactions list"
      >
        <div
          className={cn(
            'h-95 w-88 space-y-4 rounded-2xl border bg-surface-1 p-4 shadow-black/3 shadow-xs'
          )}
        >
          <header className={cn('flex items-center')}>
            <h2
              id="transactions-heading"
              className={cn(
                'inline-flex flex-1 gap-x-2 py-1',
                'font-medium font-sans text-base text-fg-1 tracking-[-0.011rem]'
              )}
            >
              <RiRefund2Line className={cn('size-6 shrink-0 fill-fill-5')} aria-hidden="true" />
              Recent Transactions
            </h2>

            <Button.Root size="xs" variant="secondary" aria-label="See all transactions">
              See more
            </Button.Root>
          </header>

          <main aria-labelledby="transactions-heading">
            <SegmentedControl.Root
              defaultValue={selectedStatus}
              onValueChange={({ value }) => setSelectedStatus(value as TransactionItemStatus)}
              aria-label="Filter transactions by type"
            >
              <SegmentedControl.List>
                <SegmentedControl.Item value="incoming">
                  <SegmentedControl.ItemText>Incoming</SegmentedControl.ItemText>
                </SegmentedControl.Item>

                <SegmentedControl.Item value="outgoing">
                  <SegmentedControl.ItemText>Outgoing</SegmentedControl.ItemText>
                </SegmentedControl.Item>
              </SegmentedControl.List>
            </SegmentedControl.Root>

            <div
              className={cn(
                'relative flex max-h-64 flex-col gap-y-2',
                'before:mask-b-from-10% before:mask-b-to-90% before:absolute before:inset-y-0 before:h-4 before:w-full before:bg-surface-1 before:content-[""]',
                'after:mask-t-from-10% after:mask-t-to-90% after:absolute after:bottom-0 after:h-4 after:w-full after:bg-surface-1 after:content-[""]'
              )}
            >
              <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                Showing {transactionCount} {selectedStatus} transaction
                {transactionCount !== 1 ? 's' : ''}
              </div>

              <ArkListbox.Content
                className={cn('scroll-hidden overflow-y-auto scroll-smooth py-3 outline-hidden')}
              >
                {collection.items.map(transaction => (
                  <TransactionItem
                    item={transaction}
                    key={transaction.id}
                    title={transaction.title}
                    description={transaction.description}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                ))}
              </ArkListbox.Content>
            </div>
          </main>
        </div>
      </ArkListbox.Root>
    )
  },
}
