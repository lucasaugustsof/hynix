import path from 'node:path'

import { resolveAliasToAbsolutePath } from './resolve-alias-to-absolute-path'

vi.mock('tsconfig-paths', () => ({
  loadConfig: vi.fn(),
}))

vi.mock('./const', () => ({
  CWD: '/mock/project/root',
  HYNIX_LOGO: '',
  CONFIG_FILE_NAME: 'hynix.json',
  PEER_DEPENDENCIES: [],
  CORE_DEPENDENCIES: [],
}))

describe('resolveAliasToAbsolutePath', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('successful alias resolution', () => {
    it('should resolve basic @ alias to absolute path', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components/button')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', 'components/button'))
    })

    it('should resolve alias with multiple path segments', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/utils/helpers/string')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', 'utils/helpers/string'))
    })

    it('should resolve alias without trailing wildcard', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@components': ['src/components'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@components/button')

      expect(result).toBe(path.resolve('/mock/project/root', 'src/components', '/button'))
    })

    it('should resolve different alias prefixes', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '~/*': ['lib/*'],
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('~/utils/helpers')

      expect(result).toBe(path.resolve('/mock/project/root', 'lib', 'utils/helpers'))
    })

    it('should use first matching path pattern', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*', 'lib/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components/button')

      // Should use the first pattern 'src/*'
      expect(result).toBe(path.resolve('/mock/project/root', 'src', 'components/button'))
    })

    it('should resolve alias with nested baseUrl', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root/packages/app',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/packages/app/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components/button')

      expect(result).toBe(
        path.resolve('/mock/project/root/packages/app', 'src', 'components/button')
      )
    })

    it('should resolve alias with file extension', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components/button.tsx')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', 'components/button.tsx'))
    })

    it('should resolve complex alias patterns', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@ui/*': ['packages/ui/src/*'],
          '@shared/*': ['packages/shared/src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const uiResult = resolveAliasToAbsolutePath('@ui/components/button')
      const sharedResult = resolveAliasToAbsolutePath('@shared/utils/helpers')

      expect(uiResult).toBe(
        path.resolve('/mock/project/root', 'packages/ui/src', 'components/button')
      )
      expect(sharedResult).toBe(
        path.resolve('/mock/project/root', 'packages/shared/src', 'utils/helpers')
      )
    })

    it('should handle empty remaining path', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', ''))
    })
  })

  describe('error handling', () => {
    it('should throw error when tsconfig loading fails', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'failed',
        message: 'Cannot find tsconfig.json',
      })

      expect(() => resolveAliasToAbsolutePath('@/components/button')).toThrow(
        'Failed to load tsconfig: Cannot find tsconfig.json'
      )
    })

    it('should throw error when no paths are configured', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        // @ts-expect-error: No paths are configured
        paths: undefined,
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      expect(() => resolveAliasToAbsolutePath('@/components/button')).toThrow(
        'No paths found in tsconfig configuration.'
      )
    })

    it('should throw error when paths object is empty', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {},
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      expect(() => resolveAliasToAbsolutePath('@/components/button')).toThrow(
        "Failed to resolve the alias '@/components/button' to an absolute path. Please verify that the alias is correctly configured in tsconfig.json."
      )
    })

    it('should throw error when alias does not match any pattern', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      expect(() => resolveAliasToAbsolutePath('~/components/button')).toThrow(
        "Failed to resolve the alias '~/components/button' to an absolute path. Please verify that the alias is correctly configured in tsconfig.json."
      )
    })

    it('should throw error when alias prefix does not match', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@ui/*': ['src/ui/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      expect(() => resolveAliasToAbsolutePath('@/components/button')).toThrow(
        "Failed to resolve the alias '@/components/button' to an absolute path"
      )
    })

    it('should provide helpful error message with the failed alias', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const invalidAlias = '#/some/invalid/path'

      expect(() => resolveAliasToAbsolutePath(invalidAlias)).toThrow(
        `Failed to resolve the alias '${invalidAlias}' to an absolute path`
      )
    })
  })

  describe('edge cases', () => {
    it('should handle alias with only prefix character', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@': ['src'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', '/components'))
    })

    it('should call loadConfig with correct CWD', async () => {
      const { loadConfig } = await import('tsconfig-paths')
      const { CWD } = await import('./const')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      resolveAliasToAbsolutePath('@/components')

      expect(loadConfig).toHaveBeenCalledWith(CWD)
    })

    it('should resolve when path has trailing slash', async () => {
      const { loadConfig } = await import('tsconfig-paths')

      vi.mocked(loadConfig).mockReturnValue({
        resultType: 'success',
        absoluteBaseUrl: '/mock/project/root',
        paths: {
          '@/*': ['src/*'],
        },
        configFileAbsolutePath: '/mock/project/root/tsconfig.json',
      })

      const result = resolveAliasToAbsolutePath('@/components/')

      expect(result).toBe(path.resolve('/mock/project/root', 'src', 'components/'))
    })
  })
})
