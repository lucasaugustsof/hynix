import { Tooltip as ArkTooltip, useTooltip } from '@ark-ui/react/tooltip'
import type * as ArkTooltipDefs from '@ark-ui/react/tooltip'

import { cn } from '@r/utilities/cn'

// Tooltip ↴

type TooltipProps = ArkTooltipDefs.TooltipRootProps

const Tooltip = (props: TooltipProps) => <ArkTooltip.Root {...props} />

// TooltipContent ↴

function TooltipContent({
  className,
  ...props
}: ArkTooltipDefs.TooltipContentProps) {
  return (
    <ArkTooltip.Positioner>
      <ArkTooltip.Content
        {...props}
        className={cn(
          'block rounded-xl border border-border bg-surface-1 px-4 py-2 shadow-xs duration-200 ease-out-quart dark:shadow-white/8',
          'data-[state=open]:fade-in-50 data-[state=open]:zoom-in-95 data-[state=open]:animate-in',
          'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out',
          className,
        )}
      />
    </ArkTooltip.Positioner>
  )
}

const TooltipTrigger = ArkTooltip.Trigger
const TooltipContext = ArkTooltip.Context

export { Tooltip, TooltipTrigger, TooltipContext, TooltipContent, useTooltip }
export type { TooltipProps }
