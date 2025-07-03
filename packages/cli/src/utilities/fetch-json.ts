type FetchOptions = RequestInit & {
  cacheEnabled?: boolean
}

const requestCache = new Map<string, Promise<unknown>>()

export async function fetchJson<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  if (options.cacheEnabled && requestCache.has(endpoint)) {
    return requestCache.get(endpoint)! as Promise<T>
  }

  const fetchPromise = (async (): Promise<T> => {
    let response: Response

    try {
      response = await fetch(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      })
    } catch (networkError) {
      throw new Error(
        `Network error while fetching "${endpoint}": ${networkError}`,
      )
    }

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '<no body>')
      throw new Error(
        `Request to "${endpoint}" failed with status ${response.status} ${response.statusText}. Response body: ${bodyText}`,
      )
    }

    try {
      return (await response.json()) as T
    } catch (parseError) {
      throw new Error(`Failed to parse JSON from "${endpoint}": ${parseError}`)
    }
  })()

  if (options.cacheEnabled) {
    requestCache.set(endpoint, fetchPromise)

    fetchPromise.catch(() => {
      requestCache.delete(endpoint)
    })
  }

  return fetchPromise
}
