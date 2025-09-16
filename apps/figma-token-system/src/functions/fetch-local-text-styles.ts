type TextStyleByMode = Record<
  string,
  {
    data: {
      type: 'text'
      fontName: FontName
      fontSize: number
      lineHeight: LineHeight
      letterSpacing: LetterSpacing
    }
  }
>

type TextStylePayload = {
  id: string
  name: string
  description: string
  type: 'STYLE'
  collection: 'typography'
  value: {
    kind: 'TEXT_STYLE'
    byMode: TextStyleByMode
  }
}

export async function fetchLocalTextStyles(): Promise<TextStylePayload[]> {
  const localTextStyles = await figma.getLocalTextStylesAsync()

  const textStylesMap = new Map<string, TextStylePayload>()

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
      name: name.toLowerCase(),
      description,
      type: 'STYLE',
      collection: 'typography',
      value: {
        kind: 'TEXT_STYLE',
        byMode: {
          default: {
            data: {
              type: 'text',
              fontName,
              fontSize,
              lineHeight,
              letterSpacing,
            },
          },
        },
      },
    })
  }

  return Array.from(textStylesMap.values())
}
