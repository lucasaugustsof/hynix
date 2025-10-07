import { cn } from '@/utilities/cn'

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className={cn('bg-blue-500 text-white px-4 py-2 rounded')}>
      {children}
    </button>
  )
}
