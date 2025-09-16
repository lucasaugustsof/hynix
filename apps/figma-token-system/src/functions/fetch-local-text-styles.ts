import type { Item } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'

export async function fetchLocalTextStyles(): Promise<Item[]> {
  const localTextStyles = await figma.getLocalTextStylesAsync()

  const textStylesMap = new Map<string, Item>()

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

    textStylesMap.set(id, {
      id,
      name,
      path: name.split('/'),
      description,
      type: 'textStyle',
      kind: 'STYLE',
      collection: 'typographies',
      modes: {
        [BASE_MODE]: {
          fontName,
          fontSize,
          lineHeight,
          letterSpacing,
        },
      },
    })
  }

  return Array.from(textStylesMap.values())
}
