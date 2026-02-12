import { getPackageManager, resolvePMCommand } from './resolve-pm-command'

vi.mock('package-manager-detector/detect', () => ({
  detect: vi.fn(),
}))

vi.mock('package-manager-detector/commands', () => ({
  resolveCommand: vi.fn(),
}))

describe('resolve-pm-command', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getPackageManager', () => {
    it('should return detected package manager', async () => {
      const { detect } = await import('package-manager-detector/detect')

      const mockPm = {
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      } as const

      vi.mocked(detect).mockResolvedValue(mockPm)

      const result = await getPackageManager()

      expect(result).toEqual(mockPm)
      expect(detect).toHaveBeenCalledWith({
        strategies: ['lockfile', 'packageManager-field', 'devEngines-field', 'install-metadata'],
      })
    })

    it('should throw error when no package manager is detected', async () => {
      const { detect } = await import('package-manager-detector/detect')

      vi.mocked(detect).mockResolvedValue(null)

      await expect(getPackageManager()).rejects.toThrow('Could not detect package manager')
    })

    it('should detect npm as package manager', async () => {
      const { detect } = await import('package-manager-detector/detect')

      const mockPm = {
        agent: 'npm',
        name: 'npm',
        version: '9.0.0',
      } as const

      vi.mocked(detect).mockResolvedValue(mockPm)

      const result = await getPackageManager()

      expect(result.agent).toBe('npm')
    })

    it('should detect yarn as package manager', async () => {
      const { detect } = await import('package-manager-detector/detect')

      const mockPm = {
        agent: 'yarn',
        name: 'yarn',
        version: '3.0.0',
      } as const

      vi.mocked(detect).mockResolvedValue(mockPm)

      const result = await getPackageManager()

      expect(result.agent).toBe('yarn')
    })

    it('should detect bun as package manager', async () => {
      const { detect } = await import('package-manager-detector/detect')

      const mockPm = {
        agent: 'bun',
        name: 'bun',
        version: '1.0.0',
      } as const

      vi.mocked(detect).mockResolvedValue(mockPm)

      const result = await getPackageManager()

      expect(result.agent).toBe('bun')
    })
  })

  describe('resolvePMCommand', () => {
    it('should resolve command for pnpm', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'pnpm',
        args: ['add', 'react'],
      })

      const result = await resolvePMCommand('add', ['react'])

      expect(result).toEqual({
        command: 'pnpm',
        args: ['add', 'react'],
        full: 'pnpm add react',
      })
    })

    it('should resolve command for npm', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'npm',
        name: 'npm',
        version: '9.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'npm',
        args: ['install', 'react'],
      })

      const result = await resolvePMCommand('add', ['react'])

      expect(result).toEqual({
        command: 'npm',
        args: ['install', 'react'],
        full: 'npm install react',
      })
    })

    it('should resolve install command without arguments', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'pnpm',
        args: ['install'],
      })

      const result = await resolvePMCommand('install', [])

      expect(result).toEqual({
        command: 'pnpm',
        args: ['install'],
        full: 'pnpm install',
      })
    })

    it('should resolve command with multiple arguments', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'pnpm',
        args: ['add', 'react', 'react-dom', 'typescript'],
      })

      const result = await resolvePMCommand('add', ['react', 'react-dom', 'typescript'])

      expect(result).toEqual({
        command: 'pnpm',
        args: ['add', 'react', 'react-dom', 'typescript'],
        full: 'pnpm add react react-dom typescript',
      })
    })

    it('should resolve remove command', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'yarn',
        name: 'yarn',
        version: '3.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'yarn',
        args: ['remove', 'lodash'],
      })

      const result = await resolvePMCommand('uninstall', ['lodash'])

      expect(result).toEqual({
        command: 'yarn',
        args: ['remove', 'lodash'],
        full: 'yarn remove lodash',
      })
    })

    it('should resolve command with dev flag', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'npm',
        name: 'npm',
        version: '9.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'npm',
        args: ['install', '--save-dev', 'vitest'],
      })

      const result = await resolvePMCommand('add', ['--save-dev', 'vitest'])

      expect(result).toEqual({
        command: 'npm',
        args: ['install', '--save-dev', 'vitest'],
        full: 'npm install --save-dev vitest',
      })
    })

    it('should throw error when command cannot be resolved', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue(null)

      // @ts-expect-error: invalid-command is not a valid command for pnpm
      await expect(resolvePMCommand('invalid-command', [])).rejects.toThrow(
        'Could not resolve command "invalid-command" for pnpm'
      )
    })

    it('should throw error when package manager detection fails', async () => {
      const { detect } = await import('package-manager-detector/detect')

      vi.mocked(detect).mockResolvedValue(null)

      await expect(resolvePMCommand('add', ['react'])).rejects.toThrow(
        'Could not detect package manager'
      )
    })

    it('should call resolveCommand with correct parameters', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'bun',
        name: 'bun',
        version: '1.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'bun',
        args: ['add', 'react'],
      })

      await resolvePMCommand('add', ['react'])

      expect(resolveCommand).toHaveBeenCalledWith('bun', 'add', ['react'])
    })

    it('should handle empty args array', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'pnpm',
        args: ['run', 'build'],
      })

      const result = await resolvePMCommand('run', ['build'])

      expect(result.args).toEqual(['run', 'build'])
    })
  })

  describe('integration scenarios', () => {
    it('should work with different package managers for the same command', async () => {
      const { detect } = await import('package-manager-detector/detect')
      const { resolveCommand } = await import('package-manager-detector/commands')

      vi.mocked(detect).mockResolvedValue({
        agent: 'pnpm',
        name: 'pnpm',
        version: '8.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'pnpm',
        args: ['add', 'react'],
      })

      const pnpmResult = await resolvePMCommand('add', ['react'])
      expect(pnpmResult.full).toBe('pnpm add react')

      vi.mocked(detect).mockResolvedValue({
        agent: 'npm',
        name: 'npm',
        version: '9.0.0',
      })

      vi.mocked(resolveCommand).mockReturnValue({
        command: 'npm',
        args: ['install', 'react'],
      })

      const npmResult = await resolvePMCommand('add', ['react'])
      expect(npmResult.full).toBe('npm install react')
    })
  })
})
