import { fetchLocalEffectStyles } from './functions/fetch-local-effect-styles'
import { fetchLocalPaintStyles } from './functions/fetch-local-paint-styles'
import { fetchLocalTextStyles } from './functions/fetch-local-text-styles'
import { fetchLocalVariables } from './functions/fetch-local-variables'
import type { TokensExport } from './tokens-schema'
import { AUTHOR_FALLBACK } from './utilities/const'
import { groupTokensByCollection } from './utilities/group-tokens-by-collection'

async function main() {
  const effectStyles = await fetchLocalEffectStyles()
  const paintStyles = await fetchLocalPaintStyles()
  const textStyles = await fetchLocalTextStyles()
  const variables = await fetchLocalVariables()

  const aggregatedTokens = [
    ...effectStyles,
    ...paintStyles,
    ...textStyles,
    ...variables,
  ]

  const exportedData: TokensExport = {
    source: 'figma-token-system',
    version: 1,
    exportedAt: new Date().toISOString(),
    exportedBy: figma.currentUser?.name ?? AUTHOR_FALLBACK,
    items: groupTokensByCollection(aggregatedTokens),
  }

  console.log(exportedData.items)

  try {
    const url =
      'http://localhost:5678/webhook-test/8ad2bd98-b6dc-45da-a799-2ac0f16fe7ac'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exportedData),
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }
    const data = await response.json()
    figma.notify(data.message)
  } catch (err) {
    figma.notify(err.message, {
      error: true,
    })
  } finally {
    figma.closePlugin()
  }
}

main()
