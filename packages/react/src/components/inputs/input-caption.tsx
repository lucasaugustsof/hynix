// Hynix: InputCaption [v0.1.0]

import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformation2Fill,
  RiLock2Fill,
} from '@remixicon/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { AnimatePresence, motion } from 'motion/react'

import { cx } from '@/registry/utils/cx'
import { getDocumentVariable } from '@/registry/utils/get-document-variable'

type _VariantProps = Pick<VariantProps<typeof inputCaptionStyles>, 'size'>

export type InputCaptionProps =
  | (_VariantProps & {
      type: 'default' | 'success' | 'info' | 'requirements' | 'error'
      children: React.ReactNode
      securityLevel?: never
      stepMessages?: never
    })
  | (_VariantProps & {
      type: 'password'
      children?: never
      securityLevel: 0 | 1 | 2 | 3 | 4
      stepMessages: [string, string, string]
    })

const inputCaptionStyles = cva(['inline-flex items-center'], {
  variants: {
    type: {
      default: '*:text-fg-1/70',
      success: '*:text-success',
      info: '*:text-fg-1/70 [&_svg]:fill-fill-4',
      requirements: '*:text-fg-1/70 [&_svg]:fill-fill-4',
      error: '*:text-danger',
      password: null,
    },
    size: {
      sm: 'gap-x-1 text-xs leading-[1.125rem] [&_svg]:size-5',
      md: 'gap-2.5 text-sm leading-normal [&_svg]:size-6',
      lg: 'gap-3 text-base [&_svg]:size-7',
    },
  },
  defaultVariants: {
    type: 'success',
    size: 'sm',
  },
  compoundVariants: [
    {
      type: 'password',
      size: 'sm',
      class: 'gap-x-2',
    },
  ],
})

export function InputCaption({
  children,
  type,
  size,
  securityLevel,
  stepMessages,
}: InputCaptionProps) {
  const PREFIX_ICONS = {
    success: <RiCheckboxCircleFill />,
    info: <RiInformation2Fill />,
    requirements: <RiLock2Fill />,
    error: <RiErrorWarningFill />,
  } as const

  return (
    <div
      className={cx(
        inputCaptionStyles({
          type,
          size,
        }),
      )}
    >
      {type && type in PREFIX_ICONS
        ? PREFIX_ICONS[type as keyof typeof PREFIX_ICONS]
        : null}

      {type === 'password' ? (
        <StepPassword
          size={size}
          securityLevel={securityLevel}
          stepMessages={stepMessages}
        />
      ) : (
        <span
          className={cx(
            'inline-block max-w-60 truncate text-nowrap font-display font-medium',
          )}
        >
          {children}
        </span>
      )}
    </div>
  )
}

type StepPasswordProps = Pick<
  InputCaptionProps,
  'size' | 'securityLevel' | 'stepMessages'
>

export function StepPassword({
  size = 'md',
  securityLevel = 0,
  stepMessages,
}: StepPasswordProps) {
  const STEP_CONFIG = {
    containerSize: {
      sm: 'gap-x-2',
      md: 'gap-x-2.5',
      lg: 'gap-x-3',
    },
    stepSize: {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2',
    },
    labelSize: {
      sm: 'text-xs leading-[1.125rem]',
      md: 'text-sm leading-normal',
      lg: 'text-base',
    },
  } as const

  const TOTAL_STEP = 4

  const { stepColor, labelColor } =
    getSecurityLevelColors({ securityLevel }) ?? {}

  const labelContent = getStepMessage({
    securityLevel,
    stepMessages,
  })

  return (
    <motion.div
      layout="position"
      className={cx(
        'grid grid-flow-col place-items-center',
        STEP_CONFIG.containerSize[size!],
      )}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >
      <div className="inline-flex min-w-[7.5rem] gap-x-1">
        {[...Array(TOTAL_STEP)].map((_, idx) => (
          <span
            key={`step-${idx + 1}`}
            className={cx(
              'flex-1 overflow-hidden rounded-base bg-fill-2',
              STEP_CONFIG.stepSize[size!],
            )}
          >
            <motion.span
              className={cx('block h-full', securityLevel && stepColor)}
              animate={{
                width: idx < securityLevel ? '100%' : '0%',
              }}
              transition={{
                ease: 'linear',
                duration: 0.25,
              }}
            />
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={labelContent}
          layout
          initial={{
            width: 0,
            opacity: 0,
            filter: `blur(calc(${getDocumentVariable('--blur-xs')} - 2px))`,
          }}
          animate={{
            width: 'auto',
            opacity: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            width: 0,
            opacity: 0,
            filter: `blur(calc(${getDocumentVariable('--blur-xs')} - 2px))`,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
          }}
          className={cx(
            'inline-block flex-grow font-display font-medium',
            labelColor,
            STEP_CONFIG.labelSize[size!],
          )}
        >
          {labelContent}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

// Utilities

function getStepMessage({
  securityLevel,
  stepMessages,
}: Pick<InputCaptionProps, 'securityLevel' | 'stepMessages'>) {
  const STEP_MESSAGE_FIRST = 0
  const STEP_MESSAGE_SECOND = 1
  const STEP_MESSAGE_THIRD = 2

  if (!securityLevel || !stepMessages) return ''

  if (securityLevel <= 2) {
    return stepMessages[STEP_MESSAGE_FIRST]
  }

  if (securityLevel === 3) {
    return stepMessages[STEP_MESSAGE_SECOND]
  }

  return stepMessages[STEP_MESSAGE_THIRD]
}

type SecurityLevelColors = {
  stepColor: string
  labelColor: string
}

function getSecurityLevelColors({
  securityLevel,
}: Pick<InputCaptionProps, 'securityLevel'>): SecurityLevelColors {
  const STEP_COLORS = {
    weak: {
      stepColor: 'bg-rose-500 dark:bg-rose-200',
      labelColor: 'text-rose-500 dark:text-rose-200',
    },
    medium: {
      stepColor: 'bg-yellow-500 dark:bg-yellow-200',
      labelColor: 'text-yellow-500 dark:text-yellow-200',
    },
    strong: {
      stepColor: 'bg-success',
      labelColor: 'text-success',
    },
  } as const

  const SECURITY_LEVEL_COLORS: Record<number, SecurityLevelColors> = {
    1: STEP_COLORS.weak,
    2: STEP_COLORS.weak,
    3: STEP_COLORS.medium,
    4: STEP_COLORS.strong,
  }

  return SECURITY_LEVEL_COLORS[securityLevel ?? 1]
}
