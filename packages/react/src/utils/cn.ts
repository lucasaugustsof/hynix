import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

type TwMergeConfig = Parameters<typeof extendTailwindMerge>[0]

const typographyVariants = {
  title: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  label: ['xl', 'lg', 'md', 'sm', 'xs'],
  paragraph: ['xl', 'lg', 'md', 'sm', 'xs'],
  subheading: ['md', 'sm', 'xs', '2xs'],
}

const typographyClasses = Object.entries(typographyVariants).flatMap(([type, sizes]) => {
  return sizes.map(size => `${type}-${size}`)
})

export const twMergeConfig: TwMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: typographyClasses,
        },
      ],
    },
  },
}

const customTwMerge = extendTailwindMerge(twMergeConfig)

export const cn = (...input: ClassValue[]) => customTwMerge(clsx(...input))
