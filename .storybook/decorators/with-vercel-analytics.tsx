import type { Decorator } from '@storybook/react-vite'
import { Analytics } from '@vercel/analytics/react'

export const withVercelAnalytics: Decorator = (Story, ...context) => {
  return (
    <>
      <Story {...context} />
      <Analytics />
    </>
  )
}
