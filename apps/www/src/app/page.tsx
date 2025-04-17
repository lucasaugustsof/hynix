import { RiArrowRightUpLine, RiGithubFill } from '@remixicon/react'

import { Header } from '@/components/header'
import { ComponentPreviewCard } from '@/components/component-preview-card'
import { Footer } from '@/components/footer'

import { Button } from '@/components/ui/button'

import { cn } from '@/utilities/cn'

export default function Home() {
  // @TODO: Remove this later
  const components = [
    {
      title: 'Button',
      description:
        'A highly customizable button component with multiple appearances, sizes, and states.',
    },
    {
      title: 'Accordion',
      description:
        'An accessible accordion component to toggle content visibility in a structured way.',
    },
    {
      title: 'Input',
      description:
        'Input field with clear visual states, accessibility support, and optional icons or messages.',
    },
    {
      title: 'Checkbox',
      description:
        'Multi-select component with support for checked, indeterminate, and disabled states.',
    },
    {
      title: 'Radio',
      description:
        'Single-select component with accessible design and consistent visual feedback.',
    },
    {
      title: 'Alert',
      description:
        'Feedback component with support for success, error, and informational messages.',
    },
  ]

  return (
    <div
      className={cn(
        'mx-auto flex min-h-screen max-w-[58rem] flex-col border-black/12 border-x-[0.5px] dark:border-white/12',
      )}
    >
      <Header />

      <section className={cn('mt-20 flex-1 space-y-17 px-17')}>
        <main className={cn('max-w-lg space-y-8')}>
          <div>
            <h1 className={cn('mb-3 font-semibold text-3xl/10.5 text-fg-1')}>
              Speed for purposeful
              <br />
              developers
            </h1>

            <p
              className={cn(
                'font-normal text-base text-fg-1/70',
                '[&_strong]:font-medium [&_strong]:text-fg-1',
              )}
            >
              A minimalist <strong>React</strong> component library powered by{' '}
              <strong>TailwindCSS</strong> and <strong>Ark UI</strong> —
              accessible by default, themeable, and production-ready.
            </p>
          </div>

          <div className={cn('flex items-center gap-x-3 p-1')}>
            <Button size="sm">
              Get Started
              <RiArrowRightUpLine />
            </Button>

            <Button variant="secondary" size="sm">
              <RiGithubFill />
              GitHub
              <span
                className={cn(
                  'inline-block rounded-lg bg-fill-2 px-1.5 font-semibold text-fill-5 text-sm/5.5',
                )}
              >
                22
              </span>
            </Button>
          </div>
        </main>

        <div className={cn('grid grid-cols-3 gap-6')}>
          {components.map(({ title, description }) => (
            <ComponentPreviewCard
              key={title}
              title={title}
              description={description}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
