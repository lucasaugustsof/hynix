import { cn } from '@/utilities/cn'

import { CardComponent } from '@/components/card-component'

import ButtonSvg from '@/assets/thumbnails/button.svg'
import AccordionSvg from '@/assets/thumbnails/accordion.svg'
import InputSvg from '@/assets/thumbnails/input.svg'
import CheckboxSvg from '@/assets/thumbnails/checkbox.svg'
import RadioSvg from '@/assets/thumbnails/radio.svg'
import CircleDashedTopLeftCutSvg from '@/assets/circle-dashed-top-left-cut.svg'

export function GridComponents() {
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
    <div className={cn('grid grid-cols-[1fr_var(--layout-content-max)_1fr]')}>
      <div
        className={cn('border-r-(length:--hairline-width) border-r-border')}
      />

      <div className={cn('relative grid grid-cols-3 gap-6 px-17 pt-2 pb-20')}>
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
            />
          )
        })}

        <CircleDashedTopLeftCutSvg
          className={cn(
            'absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2',
          )}
        />
      </div>

      <div
        className={cn('border-l-(length:--hairline-width) border-l-border')}
      />
    </div>
  )
}
