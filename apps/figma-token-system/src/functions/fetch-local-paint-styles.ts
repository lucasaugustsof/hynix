import type { TokenBaseItem } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'
import { toRGB } from '../utilities/to-rgb'

export async function fetchLocalPaintStyles(): Promise<TokenBaseItem[]> {
  const localPaintStyles = await figma.getLocalPaintStylesAsync()

  const paintStylesMap = new Map<string, TokenBaseItem>()

  for (const { id, name, description, paints } of localPaintStyles) {
    const primaryPaint = paints.find(
      paint => paint.type === 'SOLID' || paint.type === 'GRADIENT_LINEAR',
    )

    if (!primaryPaint) continue

    let value: {
      [key: string]: string | number
    } = {}

    if (primaryPaint.type === 'SOLID') {
      const rgb = toRGB(primaryPaint.color as RGBA)
      value = {
        [BASE_MODE]: rgb,
      }
    }

    if (primaryPaint.type === 'GRADIENT_LINEAR') {
      const stops = primaryPaint.gradientStops
        .map(stop => `${toRGB(stop.color)} ${Math.round(stop.position * 100)}%`)
        .join(', ')

      const transform = primaryPaint.gradientTransform

      const angle = Math.round(
        (Math.atan2(transform[1][0], transform[0][0]) * 180) / Math.PI,
      )

      value = {
        [BASE_MODE]: `linear-gradient(${angle}deg, ${stops})`,
      }
    }

    const paintName = name.toLowerCase()

    paintStylesMap.set(id, {
      name: paintName,
      path: paintName.split('/'),
      description: description || '',
      kind: 'gradient',
      collection: 'paints',
      value,
    })
  }

  return Array.from(paintStylesMap.values())
}
