import { promises as fs } from 'node:fs'

import type { PackageJson } from './read-package-json'
import { readPackageJson } from './read-package-json'

vi.mock('node:fs', () => ({
  promises: {
    readFile: vi.fn(),
  },
}))

vi.mock('./const', () => ({
  CWD: '/mock/project/root',
  HYNIX_LOGO: '',
  CONFIG_FILE_NAME: 'hynix.json',
  PEER_DEPENDENCIES: [],
  CORE_DEPENDENCIES: [],
}))

describe('readPackageJson', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('successful reads', () => {
    it('should read and parse valid package.json with all fields', async () => {
      const mockPackageJson: PackageJson = {
        name: 'my-app',
        version: '1.0.0',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
          vitest: '^4.0.0',
        },
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result).toEqual(mockPackageJson)
      expect(fs.readFile).toHaveBeenCalledWith('/mock/project/root/package.json', 'utf8')
    })

    it('should read and parse package.json with only required fields', async () => {
      const mockPackageJson = {
        name: 'minimal-app',
        version: '0.1.0',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.name).toBe('minimal-app')
      expect(result.version).toBe('0.1.0')
      expect(result.dependencies).toBeUndefined()
      expect(result.devDependencies).toBeUndefined()
    })

    it('should read package.json with only dependencies', async () => {
      const mockPackageJson: PackageJson = {
        name: 'app-with-deps',
        version: '2.0.0',
        dependencies: {
          express: '^4.18.0',
        },
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.dependencies).toEqual({ express: '^4.18.0' })
      expect(result.devDependencies).toBeUndefined()
    })

    it('should read package.json with only devDependencies', async () => {
      const mockPackageJson: PackageJson = {
        name: 'app-with-dev-deps',
        version: '1.5.0',
        devDependencies: {
          vitest: '^4.0.0',
        },
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.devDependencies).toEqual({ vitest: '^4.0.0' })
      expect(result.dependencies).toBeUndefined()
    })

    it('should read package.json with empty dependencies objects', async () => {
      const mockPackageJson: PackageJson = {
        name: 'app-with-empty-deps',
        version: '1.0.0',
        dependencies: {},
        devDependencies: {},
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.dependencies).toEqual({})
      expect(result.devDependencies).toEqual({})
    })

    it('should handle package.json with semver version formats', async () => {
      const testCases = ['1.0.0', '1.0.0-alpha.1', '1.0.0-beta', '^2.0.0', '~3.0.0']

      for (const version of testCases) {
        const mockPackageJson = {
          name: 'test-app',
          version,
        }

        vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

        const result = await readPackageJson()

        expect(result.version).toBe(version)
      }
    })

    it('should preserve extra fields in package.json', async () => {
      const mockPackageJson = {
        name: 'app-with-extras',
        version: '1.0.0',
        description: 'My app',
        author: 'John Doe',
        license: 'MIT',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      // Extra fields are not validated but should be present
      expect(result.name).toBe('app-with-extras')
      expect(result.version).toBe('1.0.0')
    })
  })

  describe('file not found errors', () => {
    it('should throw error when package.json does not exist', async () => {
      const notFoundError = Object.assign(new Error('ENOENT: no such file or directory'), {
        code: 'ENOENT',
      })

      vi.mocked(fs.readFile).mockRejectedValue(notFoundError)

      await expect(readPackageJson()).rejects.toThrow(
        'Could not find package.json in the current directory.\n' +
          'Make sure you are running this command from the root of your project.'
      )
    })

    it('should provide helpful error message for missing file', async () => {
      const notFoundError = Object.assign(new Error('File not found'), {
        code: 'ENOENT',
      })

      vi.mocked(fs.readFile).mockRejectedValue(notFoundError)

      await expect(readPackageJson()).rejects.toThrow(/Could not find package\.json/)
      await expect(readPackageJson()).rejects.toThrow(/root of your project/)
    })
  })

  describe('file read errors', () => {
    it('should throw error when file cannot be read due to permissions', async () => {
      const permissionError = Object.assign(new Error('EACCES: permission denied'), {
        code: 'EACCES',
      })

      vi.mocked(fs.readFile).mockRejectedValue(permissionError)

      await expect(readPackageJson()).rejects.toThrow(
        'Failed to read package.json.\nPlease check file permissions and try again.'
      )
    })

    it('should handle generic file read errors', async () => {
      const genericError = new Error('Unknown error')

      vi.mocked(fs.readFile).mockRejectedValue(genericError)

      await expect(readPackageJson()).rejects.toThrow(/Failed to read package\.json/)
      await expect(readPackageJson()).rejects.toThrow(/file permissions/)
    })

    it('should handle non-Error exceptions during read', async () => {
      vi.mocked(fs.readFile).mockRejectedValue('String error')

      await expect(readPackageJson()).rejects.toThrow(/Failed to read package\.json/)
    })
  })

  describe('JSON parsing errors', () => {
    it('should throw error for invalid JSON syntax', async () => {
      const invalidJson = '{ name: "missing-quotes" }'

      vi.mocked(fs.readFile).mockResolvedValue(invalidJson)

      await expect(readPackageJson()).rejects.toThrow(
        'Failed to parse package.json.\n' +
          'The file contains invalid JSON. Please fix the syntax errors and try again.'
      )
    })

    it('should throw error for malformed JSON with trailing comma', async () => {
      const malformedJson = '{ "name": "test", "version": "1.0.0", }'

      vi.mocked(fs.readFile).mockResolvedValue(malformedJson)

      await expect(readPackageJson()).rejects.toThrow(/Failed to parse package\.json/)
      await expect(readPackageJson()).rejects.toThrow(/invalid JSON/)
    })

    it('should throw error for incomplete JSON', async () => {
      const incompleteJson = '{ "name": "test"'

      vi.mocked(fs.readFile).mockResolvedValue(incompleteJson)

      await expect(readPackageJson()).rejects.toThrow(/Failed to parse package\.json/)
    })

    it('should throw error for empty file', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('')

      await expect(readPackageJson()).rejects.toThrow(/Failed to parse package\.json/)
    })

    it('should throw error for non-JSON content', async () => {
      const nonJson = 'This is not JSON at all'

      vi.mocked(fs.readFile).mockResolvedValue(nonJson)

      await expect(readPackageJson()).rejects.toThrow(/Failed to parse package\.json/)
    })
  })

  describe('schema validation errors', () => {
    it('should throw error when name field is missing', async () => {
      const invalidPackageJson = {
        version: '1.0.0',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
      await expect(readPackageJson()).rejects.toThrow(
        /The "name" field is required in package\.json/
      )
    })

    it('should throw error when version field is missing', async () => {
      const invalidPackageJson = {
        name: 'my-app',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
      await expect(readPackageJson()).rejects.toThrow(
        /The "version" field is required in package\.json/
      )
    })

    it('should throw error when both name and version are missing', async () => {
      const invalidPackageJson = {
        description: 'Some description',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)

      try {
        await readPackageJson()
      } catch (error) {
        const errorMessage = (error as Error).message
        expect(errorMessage).toContain('The "name" field is required')
        expect(errorMessage).toContain('The "version" field is required')
      }
    })

    it('should throw error when name is not a string', async () => {
      const invalidPackageJson = {
        name: 123,
        version: '1.0.0',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
    })

    it('should throw error when version is not a string', async () => {
      const invalidPackageJson = {
        name: 'my-app',
        version: 1.0,
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
    })

    it('should throw error when dependencies is not an object', async () => {
      const invalidPackageJson = {
        name: 'my-app',
        version: '1.0.0',
        dependencies: 'invalid',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
    })

    it('should throw error when devDependencies is not an object', async () => {
      const invalidPackageJson = {
        name: 'my-app',
        version: '1.0.0',
        devDependencies: ['array', 'not', 'object'],
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      await expect(readPackageJson()).rejects.toThrow(/Invalid package\.json/)
    })

    it('should format multiple validation errors', async () => {
      const invalidPackageJson = {
        description: 'Missing name and version',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(invalidPackageJson))

      try {
        await readPackageJson()
        expect.fail('Should have thrown an error')
      } catch (error) {
        const errorMessage = (error as Error).message
        expect(errorMessage).toContain('Invalid package.json:')
        expect(errorMessage).toMatch(/ {2}- .*/)
      }
    })
  })

  describe('edge cases', () => {
    it('should handle package.json with whitespace', async () => {
      const packageJsonWithWhitespace = `
        {
          "name": "test-app",
          "version": "1.0.0"
        }
      `

      vi.mocked(fs.readFile).mockResolvedValue(packageJsonWithWhitespace)

      const result = await readPackageJson()

      expect(result.name).toBe('test-app')
      expect(result.version).toBe('1.0.0')
    })

    it('should handle package.json with unicode characters', async () => {
      const mockPackageJson = {
        name: 'app-with-émojis-🚀',
        version: '1.0.0',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.name).toBe('app-with-émojis-🚀')
    })

    it('should handle large package.json files', async () => {
      const largeDependencies: Record<string, string> = {}
      for (let i = 0; i < 1000; i++) {
        largeDependencies[`package-${i}`] = `^${i}.0.0`
      }

      const mockPackageJson: PackageJson = {
        name: 'large-app',
        version: '1.0.0',
        dependencies: largeDependencies,
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      const result = await readPackageJson()

      expect(result.dependencies).toHaveProperty('package-0')
      expect(result.dependencies).toHaveProperty('package-999')
      expect(Object.keys(result.dependencies || []).length).toBe(1000)
    })

    it('should read from correct path based on CWD', async () => {
      const mockPackageJson = {
        name: 'test',
        version: '1.0.0',
      }

      vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPackageJson))

      await readPackageJson()

      expect(fs.readFile).toHaveBeenCalledWith('/mock/project/root/package.json', 'utf8')
    })
  })
})
