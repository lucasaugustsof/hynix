import React from 'react'

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

function Slot({ children, ...props }: SlotProps) {
  if (React.isValidElement(children)) {
    const clonedElement = React.cloneElement(children, {
      ...props,
    })

    return clonedElement
  }

  return <>{children}</>
}

export { Slot }
export type { SlotProps }
