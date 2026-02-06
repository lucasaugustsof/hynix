const API_BASE_URL = 'https://api.github.com'
const REGISTRY_API_URL = 'http://localhost:6006'
const REQUEST_TIMEOUT = 10000 // 10 seconds

export interface ComponentFile {
  name: string
  content: string
}

export interface ComponentRegistry {
  name: string
  type: string
  externalDependencies: string[]
  registryDependencies: string[]
  files: ComponentFile[]
  createdAt: string
  updatedAt: string
}

export async function fetchRegistry() {
  const abortController = new AbortController()
  const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/lucasaugustsof/hynix/contents/packages/react/src/components`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        signal: abortController.signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`)
    }

    const data = (await response.json()) as {
      name: string
    }[]

    return data.map(registry => registry.name)
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${REQUEST_TIMEOUT / 1000} seconds`)
      }
      throw new Error(error.message || 'Error fetching registry')
    }

    throw new Error('Unknown error fetching registry')
  }
}

export async function fetchComponentRegistry(componentName: string): Promise<ComponentRegistry> {
  const abortController = new AbortController()
  const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT)

  try {
    const url = `${REGISTRY_API_URL}/r/${componentName}.json`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: abortController.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Component registry returned ${response.status}: ${response.statusText}`)
    }

    const data = (await response.json()) as ComponentRegistry

    return data
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${REQUEST_TIMEOUT / 1000} seconds`)
      }
      throw new Error(error.message || `Error fetching component "${componentName}"`)
    }

    throw new Error(`Unknown error fetching component "${componentName}"`)
  }
}
