import { Tooltip as ArkTooltip, useTooltipContext } from '@ark-ui/react/tooltip'
import { AnimatePresence, type Variants, motion } from 'motion/react'

import { cn } from 'registry/utilities/cn'

// TooltipRoot ↴

type TooltipProps = React.CustomComponentPropsWithRef<typeof ArkTooltip.Root>

const TooltipRoot = (props: TooltipProps) => (
  <ArkTooltip.Root {...props} present />
)

const TooltipTrigger = ArkTooltip.Trigger
const TooltipContext = ArkTooltip.Context

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
                type: 'spring',
                duration: 0.4,
                bounce: 0.2,
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

export { TooltipRoot, TooltipTrigger, TooltipContext, TooltipContent }
export type { TooltipProps, TooltipContentProps }
