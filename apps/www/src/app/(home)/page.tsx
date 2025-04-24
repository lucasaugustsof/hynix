import { cn } from '@/utilities/cn'

import { Header } from './parts/header'
import { ContentSection } from './parts/content.section'
import { ComponentsSection } from './parts/components.section'
import { Footer } from './parts/footer'

import { Separator } from '@/components/separator'

export default function Home() {
  return (
    <div className={cn('flex min-h-dvh w-[inherit] flex-col')}>
      <Header />

      <ContentSection />
      <Separator />

      <ComponentsSection />

      <Footer />
    </div>
  )
}
