import { fetchJson } from '@/utilities/fetch-json'
import { logger } from '@/utilities/logger'

interface RegistryComponent {
  name: string
  uploadedAt: Date
  url: string
}

interface RegistryMetadata {
  name: string
  dependencies: string[]
  registryDependencies: string[]
  file: {
    name: string
    content: string
  }
}

const REGISTRY_URL = 'https://hynix.cc/api/registry'

export async function fetchRegistry(): Promise<RegistryComponent[]> {
  try {
    const data = await fetchJson<RegistryComponent[]>(REGISTRY_URL, {
      cacheEnabled: true,
    })

    return data
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err)

    logger.debug(
      `Error fetching registry components from ${REGISTRY_URL}: ${cause}`,
    )

    throw new Error(
      `Could not load component registry. Please check your connection or API endpoint. (${cause})`,
    )
  }
}

export async function fetchRegistryMetadata(
  url: string,
): Promise<RegistryMetadata> {
  try {
    const data = await fetchJson<RegistryMetadata>(url, {
      method: 'GET',
      cacheEnabled: true,
    })

    return data
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err)

    logger.debug(`Error fetching registry metadata from ${url}: ${cause}`)

    throw new Error(
      `Could not retrieve data from "${url}". Please verify the URL and your network connection. (${cause})`,
    )
  }
}
