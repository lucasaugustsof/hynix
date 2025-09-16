import { fetchLocalEffectStyles } from './functions/fetch-local-effect-styles'
import { fetchLocalPaintStyles } from './functions/fetch-local-paint-styles'
import { fetchLocalTextStyles } from './functions/fetch-local-text-styles'
import { fetchLocalVariables } from './functions/fetch-local-variables'
import type { TokensExport } from './tokens-schema'
import { AUTHOR_FALLBACK, WEBHOOK_URL } from './utilities/const'
import { uuid } from './utilities/uuid'

async function main() {
  const effectStyles = await fetchLocalEffectStyles()
  const paintStyles = await fetchLocalPaintStyles()
  const textStyles = await fetchLocalTextStyles()
  const variables = await fetchLocalVariables()

  const exportedData: TokensExport = {
    source: 'figma-token-system',
    version: 1,
    exportedAt: new Date().toISOString(),
    exportedBy: figma.currentUser?.name ?? AUTHOR_FALLBACK,
    items: [...effectStyles, ...paintStyles, ...textStyles, ...variables].map(
      items => {
        return {
          ...items,
          id: uuid(),
        }
      },
    ),
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
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
