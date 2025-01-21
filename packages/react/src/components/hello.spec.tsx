import { render } from 'vitest-browser-react'

import { Hello } from './hello'

it('Hello', () => {
  const screen = render(<Hello />)

  expect(screen).toBeTruthy()
})
