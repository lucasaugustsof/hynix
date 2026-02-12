import type { ComponentRegistry } from './fetch-registry'
import { fetchComponentRegistry, fetchRegistry } from './fetch-registry'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('fetch-registry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()

    await vi.waitFor(() => Promise.resolve())
  })

  describe('fetchRegistry', () => {
    it('should fetch list of components from GitHub API', async () => {
      const mockData = [
        {
          name: 'button',
        },
        {
          name: 'input',
        },
        {
          name: 'dialog',
        },
      ]

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchRegistry()

      expect(result).toEqual(['button', 'input', 'dialog'])
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/lucasaugustsof/hynix/contents/packages/react/src/components',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Accept: 'application/vnd.github+json',
          },
        })
      )
    })

    it('should handle empty component list', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      })

      const result = await fetchRegistry()

      expect(result).toEqual([])
    })

    it('should throw RegistryError when GitHub API returns 404', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(fetchRegistry()).rejects.toThrow('GitHub API returned 404: Not Found')
    })

    it('should throw RegistryError when GitHub API returns 500', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      await expect(fetchRegistry()).rejects.toThrow(
        'GitHub API returned 500: Internal Server Error'
      )
    })

    it('should throw RegistryError on network error', async () => {
      mockFetch.mockRejectedValue(new Error('fetch failed'))

      await expect(fetchRegistry()).rejects.toThrow(
        'Failed to connect to GitHub API. Please check your internet connection and try again.'
      )
    })

    it('should throw RegistryError on timeout', async () => {
      const error = new Error('The operation was aborted')
      error.name = 'AbortError'

      mockFetch.mockRejectedValue(error)

      await expect(fetchRegistry()).rejects.toThrow('Request timeout after 10 seconds')
    })

    it('should throw RegistryError on unknown error', async () => {
      mockFetch.mockRejectedValue('Unknown error')

      await expect(fetchRegistry()).rejects.toThrow('Unknown error fetching registry')
    })

    it('should throw RegistryError with error message for generic Error', async () => {
      mockFetch.mockRejectedValue(new Error('Custom error message'))

      await expect(fetchRegistry()).rejects.toThrow('Custom error message')
    })

    it('should handle TypeError as network error', async () => {
      const typeError = new TypeError('Failed to fetch')
      mockFetch.mockRejectedValue(typeError)

      await expect(fetchRegistry()).rejects.toThrow(
        'Failed to connect to GitHub API. Please check your internet connection and try again.'
      )
    })
  })

  describe('fetchComponentRegistry', () => {
    const mockComponent: ComponentRegistry = {
      name: 'button',
      type: 'component',
      externalDependencies: ['react', 'react-dom'],
      registryDependencies: [],
      files: [
        {
          name: 'button.tsx',
          content: 'export const Button = () => <button />',
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    }

    it('should fetch component registry data', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockComponent,
      })

      const result = await fetchComponentRegistry('button')

      expect(result).toEqual(mockComponent)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://storybook.hynix.cc/r/button.json',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
      )
    })

    it('should use REGISTRY_API_URL from environment variable', async () => {
      const originalEnv = process.env.REGISTRY_API_URL
      process.env.REGISTRY_API_URL = 'https://custom-registry.com'

      // Need to re-import to pick up env variable
      vi.resetModules()
      const { fetchComponentRegistry: fetchWithCustomEnv } = await import('./fetch-registry')

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockComponent,
      })

      await fetchWithCustomEnv('button')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://custom-registry.com/r/button.json',
        expect.any(Object)
      )

      process.env.REGISTRY_API_URL = originalEnv
    })

    it('should throw RegistryError when component not found (404)', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(fetchComponentRegistry('nonexistent')).rejects.toThrow(
        'Component not found in the registry'
      )
    })

    it('should throw RegistryError on network error with registry context', async () => {
      mockFetch.mockRejectedValue(new Error('fetch failed'))

      await expect(fetchComponentRegistry('button')).rejects.toThrow(
        'Failed to connect to component registry at https://storybook.hynix.cc. Make sure the registry server is running.'
      )
    })

    it('should throw RegistryError on timeout for component', async () => {
      const error = new Error('The operation was aborted')
      error.name = 'AbortError'

      mockFetch.mockRejectedValue(error)

      await expect(fetchComponentRegistry('button')).rejects.toThrow(
        'Request timeout after 10 seconds'
      )
    })

    it('should throw RegistryError on unknown error for component', async () => {
      mockFetch.mockRejectedValue('Unknown error')

      await expect(fetchComponentRegistry('button')).rejects.toThrow(
        'Unknown error fetching component "button"'
      )
    })

    it('should throw RegistryError with component name for non-404 errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      await expect(fetchComponentRegistry('button')).rejects.toThrow(
        'Failed to fetch component "button": 500 Internal Server Error'
      )
    })

    it('should handle TypeError as network error for component', async () => {
      const typeError = new TypeError('Failed to fetch')
      mockFetch.mockRejectedValue(typeError)

      await expect(fetchComponentRegistry('button')).rejects.toThrow(
        'Failed to connect to component registry'
      )
    })

    it('should fetch component with complex dependencies', async () => {
      const complexComponent: ComponentRegistry = {
        name: 'dialog',
        type: 'component',
        externalDependencies: ['react', 'react-dom', 'framer-motion'],
        registryDependencies: ['button', 'portal'],
        files: [
          {
            name: 'dialog.tsx',
            content: 'export const Dialog = () => <div />',
          },
          {
            name: 'dialog.css',
            content: '.dialog { }',
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => complexComponent,
      })

      const result = await fetchComponentRegistry('dialog')

      expect(result.externalDependencies).toHaveLength(3)
      expect(result.registryDependencies).toEqual(['button', 'portal'])
      expect(result.files).toHaveLength(2)
    })

    it('should handle component with no dependencies', async () => {
      const noDepsComponent: ComponentRegistry = {
        name: 'simple',
        type: 'component',
        externalDependencies: [],
        registryDependencies: [],
        files: [
          {
            name: 'simple.tsx',
            content: 'export const Simple = () => <div />',
          },
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => noDepsComponent,
      })

      const result = await fetchComponentRegistry('simple')

      expect(result.externalDependencies).toEqual([])
      expect(result.registryDependencies).toEqual([])
    })
  })

  describe('fetchWithTimeout integration', () => {
    it('should clear timeout on successful request', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      })

      await fetchRegistry()

      expect(clearTimeoutSpy).toHaveBeenCalled()
    })

    it('should clear timeout on failed request', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(fetchRegistry()).rejects.toThrow()

      expect(clearTimeoutSpy).toHaveBeenCalled()
    })

    it('should pass abort signal to fetch', async () => {
      let abortSignal: AbortSignal | undefined

      mockFetch.mockImplementation((_, options) => {
        abortSignal = options?.signal as AbortSignal
        return Promise.resolve({
          ok: true,
          json: async () => [],
        })
      })

      await fetchRegistry()

      expect(abortSignal).toBeDefined()
      expect(abortSignal).toBeInstanceOf(AbortSignal)
    })
  })

  describe('error types', () => {
    it('should create RegistryError with correct name', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Error',
      })

      try {
        await fetchRegistry()
        expect.fail('Should have thrown')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).name).toBe('RegistryError')
      }
    })

    it('should preserve error message in RegistryError', async () => {
      mockFetch.mockRejectedValue(new Error('Specific error message'))

      try {
        await fetchRegistry()
        expect.fail('Should have thrown')
      } catch (error) {
        expect((error as Error).message).toBe('Specific error message')
      }
    })
  })

  describe('edge cases', () => {
    it('should handle components with special characters in name', async () => {
      const component: ComponentRegistry = {
        name: 'custom-button-v2',
        type: 'component',
        externalDependencies: [],
        registryDependencies: [],
        files: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => component,
      })

      const result = await fetchComponentRegistry('custom-button-v2')

      expect(result.name).toBe('custom-button-v2')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://storybook.hynix.cc/r/custom-button-v2.json',
        expect.any(Object)
      )
    })

    it('should handle empty files array', async () => {
      const component: ComponentRegistry = {
        name: 'empty',
        type: 'component',
        externalDependencies: [],
        registryDependencies: [],
        files: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => component,
      })

      const result = await fetchComponentRegistry('empty')

      expect(result.files).toEqual([])
    })

    it('should handle malformed JSON response', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      await expect(fetchRegistry()).rejects.toThrow('Invalid JSON')
    })
  })
})
