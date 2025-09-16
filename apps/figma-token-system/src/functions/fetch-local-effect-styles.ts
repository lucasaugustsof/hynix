import type { Item } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'
import { toRGB } from '../utilities/to-rgb'

export async function fetchLocalEffectStyles(): Promise<Item[]> {
  const localEffectStyles = await figma.getLocalEffectStylesAsync()

  const effectStylesMap = new Map<string, Item>()

  for (const { id, name, description, effects } of localEffectStyles) {
    effectStylesMap.set(id, {
      id,
      name,
      path: name.split('/'),
      description,
      type: 'effects',
      kind: 'STYLE',
      collection: 'shadows',
      modes: {
        [BASE_MODE]: {
          effects: effects
            .filter(
              effect =>
                effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW',
            )
            .map(effect => {
              return {
                kind:
                  effect.type === 'DROP_SHADOW' ? 'dropShadow' : 'innerShadow',
                color: toRGB(effect.color),
                spread: effect.spread ?? 0,
                radius: effect.radius,
                offset: effect.offset,
              }
            }),
        },
      },
    })
  }

  return Array.from(effectStylesMap.values())
}
