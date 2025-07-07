import { Format } from '@ark-ui/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import * as Table from '@r/components/table'
import type { TableProps } from '@r/components/table'

import { Badge } from '@r/components/badge'

const meta: Meta<TableProps> = {
  title: 'components/Table',
  component: Table.Root,
  tags: ['autodocs'],
}

export default meta

type TableStory = StoryObj<TableProps>

export const Basic: TableStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story:
          'Displays a simple invoice table using `Table` components and `Badge` to highlight payment status.',
      },
    },
  },
  render: () => {
    const invoices = [
      {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: 250,
        paymentMethod: 'Credit Card',
      },
      {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: 150,
        paymentMethod: 'PayPal',
      },
      {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: 350,
        paymentMethod: 'Bank Transfer',
      },
      {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: 450,
        paymentMethod: 'Credit Card',
      },
      {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: 550,
        paymentMethod: 'PayPal',
      },
      {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: 200,
        paymentMethod: 'Bank Transfer',
      },
      {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: 300,
        paymentMethod: 'Credit Card',
      },
    ]

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-28">Invoice</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Method</Table.Head>
            <Table.Head className="w-2xs text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {invoices.map(
            ({ invoice, paymentStatus, paymentMethod, totalAmount }) => (
              <Table.Row key={invoice}>
                <Table.Cell>{invoice}</Table.Cell>

                <Table.Cell>
                  <Badge
                    className="pointer-events-none transition-none"
                    appearance={
                      paymentStatus === 'Paid'
                        ? 'success'
                        : paymentStatus === 'Pending'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {paymentStatus}
                  </Badge>
                </Table.Cell>

                <Table.Cell>{paymentMethod}</Table.Cell>

                <Table.Cell className="text-right">
                  <Format.Number
                    value={totalAmount}
                    style="currency"
                    currency="USD"
                  />
                </Table.Cell>
              </Table.Row>
            ),
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3} className="font-medium text-fg-1">
              Total
            </Table.Cell>

            <Table.Cell className="text-right font-medium text-fg-1">
              <Format.Number value={2_500} style="currency" currency="USD" />
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    )
  },
}
