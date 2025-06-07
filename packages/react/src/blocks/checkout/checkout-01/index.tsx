import { cn } from '@r/utilities/cn'

import { CheckoutForm } from './components/checkout-form'
import { CardProduct } from './components/card-product'
import { OrderSummary } from './components/order-summary'

export function Checkout01() {
  return (
    <div className={cn('grid max-w-[75rem] grid-cols-2')}>
      <CheckoutForm />
      <div className={cn('space-y-8 px-16 py-8')}>
        <h3 className={cn('font-semibold text-fg-1 text-lg/5.5')}>
          Order summary
        </h3>

        {mockProducts.map(({ id, ...data }) => {
          return <CardProduct key={id} {...data} />
        })}

        <OrderSummary />
      </div>
    </div>
  )
}

const mockProducts = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'MacBook Air M2',
    price: 1099.0,
    color: 'Silver',
    quantity: 1,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2559&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Apple Watch Series 9',
    price: 399.0,
    color: 'Silver',
    quantity: 2,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?q=80&w=3704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'iPhone 12 128GB',
    price: 599.0,
    color: 'Midnight',
    quantity: 1,
  },
]
