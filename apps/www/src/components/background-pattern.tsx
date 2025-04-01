'use client'

import { motion } from 'motion/react'

import { cn } from '@/utilities/cn'

export function BackgroundPattern() {
  const lines = [
    {
      key: 'v1',
      props: {
        x1: '256.4',
        x2: '256.4',
        y1: '0',
        y2: '1024',
      },
    },
    {
      key: 'v2',
      props: {
        x1: '1184.4',
        x2: '1184.4',
        y1: '0',
        y2: '1024',
      },
    },
    {
      key: 'h1',
      props: {
        x1: '0',
        x2: '1440',
        y1: '115.6',
        y2: '115.6',
      },
    },
    {
      key: 'h2',
      props: {
        x1: '0',
        x2: '1440',
        y1: '872.6',
        y2: '872.6',
      },
    },
  ]

  const paths = [
    {
      key: 'circle1',
      d: 'M1144 873C1144 895.091 1161.91 913 1184 913C1206.09 913 1224 895.091 1224 873C1224 850.909 1206.09 833 1184 833',
    },
    {
      key: 'circle2',
      d: 'M296 116C296 93.9086 278.091 76 256 76C233.909 76 216 93.9086 216 116C216 138.091 233.909 156 256 156',
    },
  ]

  return (
    <svg
      width="1440"
      height="1024"
      viewBox="0 0 1440 1024"
      fill="none"
      className={cn('-z-10 absolute hidden xl:block')}
    >
      <title>Animated Pattern</title>

      {lines.map((line, index) => (
        <motion.line
          key={line.key}
          {...line.props}
          stroke="var(--color-border)"
          strokeWidth="0.6"
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            delay: index * 0.15,
            duration: 0.4,
            ease: 'easeOut',
          }}
        />
      ))}

      {paths.map((path, index) => (
        <motion.path
          key={path.key}
          d={path.d}
          stroke="var(--color-border)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6 + index * 0.2,
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  )
}
