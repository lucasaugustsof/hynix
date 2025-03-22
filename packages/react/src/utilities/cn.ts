import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export const cn = (...input: ClassValue[]) => twMerge(clsx(...input))
