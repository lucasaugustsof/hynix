import { RiArrowRightUpLine, RiGithubFill } from '@remixicon/react'

import { SiteHeader } from '@/components/site-header'
import { CardComponent } from '@/components/card-component'
import { SiteFooter } from '@/components/site-footer'

import { Button } from '@/components/ui/button'

import ButtonSvg from '@/assets/thumbnails/button.svg'
import AccordionSvg from '@/assets/thumbnails/accordion.svg'
import InputSvg from '@/assets/thumbnails/input.svg'
import CheckboxSvg from '@/assets/thumbnails/checkbox.svg'
import RadioSvg from '@/assets/thumbnails/radio.svg'

import { cn } from '@/utilities/cn'

export default function Home() {
  const demoComponents = [
    {
      title: 'Button',
      description:
        'A highly customizable button component with multiple appearances, sizes, and states.',
      thumbnail: ButtonSvg,
    },
    {
      title: 'Accordion',
      description:
        'An accessible accordion component to toggle content visibility in a structured way.',
      thumbnail: AccordionSvg,
    },
    {
      title: 'Input',
      description:
        'Input field with clear visual states, accessibility support, and optional icons or messages.',
      thumbnail: InputSvg,
    },
    {
      title: 'Checkbox',
      description:
        'Multi-select component with support for checked, indeterminate, and disabled states.',
      thumbnail: CheckboxSvg,
    },
    {
      title: 'Radio',
      description:
        'Single-select component with accessible design and consistent visual feedback.',
      thumbnail: RadioSvg,
    },
  ]

  return (
    <div
      className={cn(
        'mx-auto flex min-h-screen max-w-[58rem] flex-col border-black/12 border-x-[0.5px] dark:border-white/12',
      )}
    >
      <SiteHeader />

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
          {demoComponents.map(({ title, description, thumbnail }) => (
            <CardComponent
              key={title}
              data={{
                thumbnail,
                title,
                description,
              }}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
