import { createTV, type VariantProps } from 'tailwind-variants'
import { twMergeConfig } from './cn'

export const tv = createTV({
  twMergeConfig,
})

export type { VariantProps }
