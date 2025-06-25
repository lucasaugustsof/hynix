import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'

import { scan } from 'react-scan'

export const withReactScan: Decorator = (Story, ...context) => {
  React.useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return (
    <>
      <Story {...context} />
    </>
  )
}
