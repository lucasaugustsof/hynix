import { Hello } from './hello'

import { render } from 'vitest-browser-react'

it('Hello', () => {
  const sut = render(<Hello />)
  expect(sut).toBeTruthy()
})
