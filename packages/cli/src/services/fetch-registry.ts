const API_BASE_URL = 'https://api.github.com'
const REGISTRY_API_URL = process.env.REGISTRY_API_URL || 'https://storybook.hynix.cc'
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

class RegistryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RegistryError'
  }
}

function isAbortError(error: Error): boolean {
  return error.name === 'AbortError'
}

function isNetworkError(error: Error): boolean {
  return error.message === 'fetch failed' || error.name === 'TypeError'
}

function handleFetchError(
  error: unknown,
  context: 'registry' | 'component',
  componentName?: string
): never {
  if (!(error instanceof Error)) {
    const message = componentName
      ? `Unknown error fetching component "${componentName}"`
      : 'Unknown error fetching registry'

    throw new RegistryError(message)
  }

  if (isAbortError(error)) {
    throw new RegistryError(`Request timeout after ${REQUEST_TIMEOUT / 1000} seconds`)
  }

  if (isNetworkError(error)) {
    if (context === 'registry') {
      throw new RegistryError(
        'Failed to connect to GitHub API. Please check your internet connection and try again.'
      )
    }
    throw new RegistryError(
      `Failed to connect to component registry at ${REGISTRY_API_URL}. Make sure the registry server is running.`
    )
  }

  throw new RegistryError(error.message)
}

function handleResponseError(response: Response, componentName?: string): never {
  if (componentName && response.status === 404) {
    throw new RegistryError(`Component not found in the registry`)
  }

  if (componentName) {
    throw new RegistryError(
      `Failed to fetch component "${componentName}": ${response.status} ${response.statusText}`
    )
  }

  throw new RegistryError(`GitHub API returned ${response.status}: ${response.statusText}`)
}

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const abortController = new AbortController()
  const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: abortController.signal,
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function fetchRegistry(): Promise<string[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/repos/lucasaugustsof/hynix/contents/packages/react/src/components`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }
    )

    if (!response.ok) {
      handleResponseError(response)
    }

    const data = (await response.json()) as Array<{
      name: string
    }>

    return data.map(item => item.name)
  } catch (error) {
    handleFetchError(error, 'registry')
  }
}

export async function fetchComponentRegistry(componentName: string): Promise<ComponentRegistry> {
  try {
    const url = `${REGISTRY_API_URL}/r/${componentName}.json`
    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      handleResponseError(response, componentName)
    }

    const data = (await response.json()) as ComponentRegistry

    return data
  } catch (error) {
    handleFetchError(error, 'component', componentName)
  }
}
