import type { TokenBaseItem } from '../tokens-schema'

export async function fetchLocalTextStyles(): Promise<TokenBaseItem[]> {
  const localTextStyles = await figma.getLocalTextStylesAsync()

  const textStylesMap = new Map<string, TokenBaseItem>()

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
        fontWeight: fontName.style,
        lineHeight: formatMeasurementValue(lineHeight),
        letterSpacing: formatMeasurementValue(letterSpacing),
      },
    })
  }

  return Array.from(textStylesMap.values())
}
