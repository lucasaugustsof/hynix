import { cn } from '@/utilities/cn'

import { CardComponent } from '@/components/card-component'

import ButtonSvg from '@/assets/thumbnails/button.svg'
import AccordionSvg from '@/assets/thumbnails/accordion.svg'
import InputSvg from '@/assets/thumbnails/input.svg'
import CheckboxSvg from '@/assets/thumbnails/checkbox.svg'
import RadioSvg from '@/assets/thumbnails/radio.svg'

export function ComponentsSection() {
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
    <section className={cn('grid-layout')}>
      <div
        className={cn('border-r-(length:--hairline-width) border-r-border')}
      />

      <div
        className={cn(
          'no-scrollbar relative flex snap-x snap-mandatory items-center gap-6 overflow-x-scroll px-8 pt-2 pb-24',
          'lg:grid lg:grid-cols-3 lg:px-17',
        )}
      >
        {demoComponents.map(({ thumbnail, title, description }) => {
          return (
            <CardComponent
              key={title}
              data={{
                thumbnail,
                title,
                description,
                to: '/',
              }}
              className={cn('snap-center')}
            />
          )
        })}
      </div>

      <div
        className={cn('border-l-(length:--hairline-width) border-l-border')}
      />
    </section>
  )
}
