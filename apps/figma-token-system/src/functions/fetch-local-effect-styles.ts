import type { TokenBaseItem } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'
import { toRGB } from '../utilities/to-rgb'

export async function fetchLocalEffectStyles(): Promise<TokenBaseItem[]> {
  const localEffectStyles = await figma.getLocalEffectStylesAsync()

  const effectStylesMap = new Map<string, TokenBaseItem>()

  for (const { id, name, description, effects } of localEffectStyles) {
    const supportedEffects = effects.filter(
      effect => effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW',
    )

    if (supportedEffects.length === 0) continue

    const shadowValues = supportedEffects.map(effect => {
      const isInner = effect.type === 'INNER_SHADOW'
      const x = effect.offset.x
      const y = effect.offset.y
      const blur = effect.radius
      const spread = effect.spread ?? 0
      const color = toRGB(effect.color)

      return `${isInner ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`
    })

    const effectName = name.toLowerCase()

    effectStylesMap.set(id, {
      name: effectName,
      path: effectName.split('/'),
      description: description || '',
      kind: 'shadow',
      collection: 'effects',
      value: {
        [BASE_MODE]: shadowValues.join(', '),
      },
    })
  }

  return Array.from(effectStylesMap.values())
}
