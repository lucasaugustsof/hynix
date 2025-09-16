import type { Item } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'
import { toRGB } from '../utilities/to-rgb'

export async function fetchLocalPaintStyles(): Promise<Item[]> {
  const localPaintStyles = await figma.getLocalPaintStylesAsync()

  const paintStylesMap = new Map<string, Item>()

  for (const { id, name, description, paints } of localPaintStyles) {
    const processedPaints = paints
      .filter(
        paint => paint.type === 'SOLID' || paint.type === 'GRADIENT_LINEAR',
      )
      .map(paint => {
        if (paint.type === 'SOLID') {
          return {
            kind: 'solid' as const,
            color: toRGB(paint.color as RGBA),
          }
        }

        if (paint.type === 'GRADIENT_LINEAR') {
          return {
            kind: 'gradientLinear' as const,
            stops: paint.gradientStops.map(stop => ({
              position: stop.position,
              color: toRGB(stop.color),
            })),
            gradientTransform: paint.gradientTransform,
          }
        }

        throw new Error(`Unsupported paint type: ${paint.type}`)
      })

    paintStylesMap.set(id, {
      id,
      name,
      path: name.split('/'),
      description,
      type: 'paintStyle',
      kind: 'STYLE',
      collection: 'paints',
      modes: {
        [BASE_MODE]: {
          paints: processedPaints,
        },
      },
    })
  }

  return Array.from(paintStylesMap.values())
}
