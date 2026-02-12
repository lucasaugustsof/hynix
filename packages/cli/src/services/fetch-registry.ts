/**
 * Base URL for GitHub API
 */
const API_BASE_URL = 'https://api.github.com'

/**
 * Registry API URL - can be overridden via REGISTRY_API_URL environment variable
 */
const REGISTRY_API_URL = process.env.REGISTRY_API_URL || 'https://staging.hynix.cc'

/**
 * Request timeout in milliseconds
 */
const REQUEST_TIMEOUT = 10000 // 10 seconds

/**
 * Represents a single file in a component
 */
export interface ComponentFile {
  /** File name */
  name: string
  /** File content */
  content: string
}

/**
 * Represents a component's registry entry with all its metadata
 */
export interface ComponentRegistry {
  /** Component name */
  name: string
  /** Component type */
  type: string
  /** External package dependencies */
  externalDependencies: string[]
  /** Dependencies on other registry components */
  registryDependencies: string[]
  /** Component files (source code) */
  files: ComponentFile[]
  /** Creation timestamp */
  createdAt: string
  /** Last update timestamp */
  updatedAt: string
}

/**
 * Custom error class for registry-related errors
 */
class RegistryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RegistryError'
  }
}

/**
 * Checks if an error is an abort error (timeout)
 * @param error - The error to check
 * @returns True if the error is an abort error
 */
function isAbortError(error: Error): boolean {
  return error.name === 'AbortError'
}

/**
 * Checks if an error is a network connectivity error
 * @param error - The error to check
 * @returns True if the error is a network error
 */
function isNetworkError(error: Error): boolean {
  return error.message === 'fetch failed' || error.name === 'TypeError'
}

/**
 * Handles and transforms fetch errors into user-friendly RegistryError
 * @param error - The error that occurred
 * @param context - Whether fetching registry list or component
 * @param componentName - Optional component name for better error messages
 * @throws {RegistryError} Always throws with appropriate error message
 */
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

/**
 * Handles HTTP response errors and throws appropriate RegistryError
 * @param response - The HTTP response object
 * @param componentName - Optional component name for better error messages
 * @throws {RegistryError} Always throws with appropriate error message
 */
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

/**
 * Performs a fetch request with automatic timeout handling
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise that resolves to the Response
 * @throws {Error} If the request times out or fails
 */
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

/**
 * Fetches the list of available components from the GitHub repository
 *
 * Retrieves the directory listing of components from the GitHub API.
 * The request has a 10-second timeout and will throw descriptive errors
 * for network issues, timeouts, or API failures.
 *
 * @returns Promise that resolves to an array of component names
 * @throws {RegistryError} If the request fails, times out, or returns an error status
 *
 * @example
 * ```ts
 * try {
 *   const components = await fetchRegistry()
 *   console.log('Available components:', components)
 *   // ['button', 'input', 'dialog', ...]
 * } catch (error) {
 *   if (error instanceof RegistryError) {
 *     console.error('Registry error:', error.message)
 *   }
 * }
 * ```
 */
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

/**
 * Fetches detailed registry information for a specific component
 *
 * Retrieves the complete component metadata including files, dependencies,
 * and timestamps from the component registry. The request has a 10-second
 * timeout and will throw descriptive errors for various failure scenarios.
 *
 * @param componentName - The name of the component to fetch
 * @returns Promise that resolves to the complete ComponentRegistry object
 * @throws {RegistryError} If component is not found, request fails, times out, or returns an error status
 *
 * @example
 * ```ts
 * try {
 *   const buttonComponent = await fetchComponentRegistry('button')
 *   console.log('Files:', buttonComponent.files.map(f => f.name))
 *   console.log('Dependencies:', buttonComponent.externalDependencies)
 * } catch (error) {
 *   if (error instanceof RegistryError) {
 *     console.error('Failed to fetch component:', error.message)
 *   }
 * }
 * ```
 */
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
