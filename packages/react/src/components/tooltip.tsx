// @NOTE: In Next.js, add 'use client' to enable client-side features

import { Tooltip as ArkTooltip, useTooltipContext } from '@ark-ui/react/tooltip'
import { AnimatePresence, type Variants, motion } from 'motion/react'

import { cn } from 'registry/utilities/cn'

// Tooltip ↴

type TooltipProps = React.CustomComponentPropsWithRef<typeof ArkTooltip.Root>

const Tooltip = (props: TooltipProps) => <ArkTooltip.Root {...props} present />

// TooltipContent ↴

type TooltipContentProps = React.CustomComponentPropsWithRef<
  typeof ArkTooltip.Content
>

function TooltipContent({
  className,
  children,
  ...props
}: TooltipContentProps) {
  const { open } = useTooltipContext()

  const tooltipMotionMap: Variants = {
    open: {
      opacity: 1,
      scale: 1,
    },
    close: {
      opacity: 0,
      scale: 0.95,
    },
  }

  return (
    <ArkTooltip.Positioner>
      <AnimatePresence>
        {open && (
          <ArkTooltip.Content
            {...props}
            className={cn(
              'block rounded-xl border border-border bg-surface-1 px-4 py-2 shadow-xs dark:shadow-white/5',
              className,
            )}
            asChild
          >
            <motion.div
              variants={tooltipMotionMap}
              initial="close"
              animate="open"
              exit="close"
              transition={{
                type: 'tween',
                duration: 0.15,
                ease: 'easeOut',
              }}
            >
              {children}
            </motion.div>
          </ArkTooltip.Content>
        )}
      </AnimatePresence>
    </ArkTooltip.Positioner>
  )
}

const TooltipTrigger = ArkTooltip.Trigger
const TooltipContext = ArkTooltip.Context

export { Tooltip, TooltipTrigger, TooltipContext, TooltipContent }
export type { TooltipProps, TooltipContentProps }
