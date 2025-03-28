'use client'

import { AnimatePresence, type Variants, motion } from 'motion/react'

import { cn } from '@/utilities/cn'

type AnimatedUnderlinedTextProps = {
  children: React.ReactNode
}

export function AnimatedUnderlinedText({
  children,
}: AnimatedUnderlinedTextProps) {
  function Line() {
    const pathVariants: Variants = {
      initial: {
        d: 'M0 1C78 1 116.5 6.33333 126 9',
        pathLength: 0,
      },
      animate: {
        pathLength: 1,
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
          delay: 0.2,
        },
      },
      hover: {
        d: 'M0 1C20 10 106.5 -3 126 9',
        transition: {
          type: 'spring',
          duration: 0.6,
          bounce: 0,
        },
      },
    }

    return (
      <motion.svg
        height="10"
        viewBox="0 0 127 10"
        fill="none"
        className={cn('-bottom-2 absolute right-0 w-full')}
        initial="initial"
        animate="animate"
        whileHover="hover"
        exit="initial"
      >
        <title>{children?.toString()}</title>
        <motion.path
          stroke="var(--color-fg-1)"
          strokeWidth={2}
          variants={pathVariants}
        />
      </motion.svg>
    )
  }

  return (
    <div className={cn('relative inline w-fit')}>
      {children}

      <AnimatePresence>
        <Line />
      </AnimatePresence>
    </div>
  )
}
