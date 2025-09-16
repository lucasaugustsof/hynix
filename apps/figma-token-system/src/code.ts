import { fetchLocalEffectStyles } from './functions/fetch-local-effect-styles'
import { fetchLocalPaintStyles } from './functions/fetch-local-paint-styles'
import { fetchLocalTextStyles } from './functions/fetch-local-text-styles'
import { fetchLocalVariables } from './functions/fetch-local-variables'
import type { TokensExport } from './tokens-schema'
import { WEBHOOK_URL } from './utilities/const'

async function main() {
  const effectStyles = await fetchLocalEffectStyles()
  const paintStyles = await fetchLocalPaintStyles()
  const textStyles = await fetchLocalTextStyles()
  const variables = await fetchLocalVariables()

  const exportedData: TokensExport = {
    source: 'figma-token-system',
    version: 1,
    exportedAt: new Date().toISOString(),
    exportedBy: figma.currentUser?.name ?? 'Lucas Augusto',
    items: [...effectStyles, ...paintStyles, ...textStyles, ...variables],
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

    figma.closePlugin()
  } catch (err) {
    figma.notify(err.message, {
      error: true,
    })
  }
}

main()
