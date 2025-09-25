import type { TokenBaseItem } from '../tokens-schema'

export async function fetchLocalTextStyles(): Promise<TokenBaseItem[]> {
  const localTextStyles = await figma.getLocalTextStylesAsync()

  const textStylesMap = new Map<string, TokenBaseItem>()

  const fontWeightMap: Record<string, string> = {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }

  function formatMeasurementValue(
    measurement: LineHeight | LetterSpacing,
  ): string | number {
    if (measurement.unit === 'PERCENT') {
      return `${measurement.value}%`
    }

    if (measurement.unit === 'PIXELS') {
      return measurement.value
    }

    return 'auto'
  }

  for (const style of localTextStyles) {
    const {
      id,
      name,
      description,
      fontName,
      fontSize,
      lineHeight,
      letterSpacing,
    } = style

    const textName = name.toLowerCase()

    textStylesMap.set(id, {
      name: textName,
      path: textName.split('/'),
      description,
      kind: 'text',
      collection: 'typographies',
      value: {
        fontSize,
        fontFamily: fontName.family,
        fontWeight: fontWeightMap[fontName.style.toLowerCase()],
        lineHeight: formatMeasurementValue(lineHeight),
        letterSpacing: formatMeasurementValue(letterSpacing),
      },
    })
  }

  return Array.from(textStylesMap.values())
}
