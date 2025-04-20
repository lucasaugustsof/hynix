import { cn } from '@/utilities/cn'

import { GridHeader } from './parts/grid-header'
import { GridContent } from './parts/grid-content'
import { GridComponents } from './parts/grid-components'
import { GridFooter } from './parts/grid-footer'

import { Separator } from '@/components/separator'

export default function Home() {
  return (
    <div className={cn('min-h-dvh w-[inherit]')}>
      <GridHeader />

      <section className={cn('flex flex-col')}>
        <GridContent />
        <Separator />
        <GridComponents />
      </section>

      <GridFooter />
    </div>
  )
}
