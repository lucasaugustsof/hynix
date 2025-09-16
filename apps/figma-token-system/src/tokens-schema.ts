export type TokenKind = Uppercase<'variable' | 'style'>
export type TokenType =
  | 'color'
  | 'textStyle'
  | 'effects'
  | 'paintStyle'
  | 'dimension'

export type BaseItem = {
  id: string | number
  name: string
  path?: string[]
  description?: string
  kind: TokenKind
  collection: string
  type: TokenType
}

export type ColorValue = string

export type TextStyleValue = {
  fontName: FontName
  fontSize: number
  lineHeight: LineHeight
  letterSpacing: LetterSpacing
}

export type EffectShadow = {
  kind: 'innerShadow' | 'dropShadow'
  color: string
  offset: {
    x: number
    y: number
  }
  radius: number
  spread: number
}

export type EffectsValue = {
  effects: EffectShadow[]
}

export type PaintSolid = {
  kind: 'solid'
  color: string
}

export type PaintGradientLinear = {
  kind: 'gradientLinear'
  stops: {
    position: number
    color: string
  }[]
  gradientTransform?: [[number, number, number], [number, number, number]]
}

export type PaintStyleValue = {
  paints: (PaintSolid | PaintGradientLinear)[]
}

export type Modes<T> = Record<string, T>

export type DimensionValue = number | string

export type Item =
  | (BaseItem & {
      type: 'color'
      modes: Modes<ColorValue>
    })
  | (BaseItem & {
      type: 'textStyle'
      modes: Modes<TextStyleValue>
    })
  | (BaseItem & {
      type: 'effects'
      modes: Modes<EffectsValue>
    })
  | (BaseItem & {
      type: 'paintStyle'
      modes: Modes<PaintStyleValue>
    })
  | (BaseItem & {
      type: 'dimension'
      modes: Modes<DimensionValue>
    })

export type TokensExport = {
  source: 'figma-token-system'
  version: 1
  exportedAt: string
  exportedBy: string
  items: Item[]
}
