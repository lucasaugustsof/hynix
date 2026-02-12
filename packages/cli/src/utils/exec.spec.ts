const mockExecAsync = vi.fn()

vi.mock('node:util', () => ({
  promisify: vi.fn(() => mockExecAsync),
}))

vi.mock('node:child_process', () => ({
  exec: vi.fn(),
}))

describe('exec', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('successful command execution', () => {
    it('should execute simple command and return stdout', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Hello World',
        stderr: '',
      })

      const result = await exec('echo "Hello World"')

      expect(result.stdout).toBe('Hello World')
      expect(result.stderr).toBe('')
    })

    it('should trim whitespace from stdout', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '  Hello World  \n',
        stderr: '',
      })

      const result = await exec('echo "Hello World"')

      expect(result.stdout).toBe('Hello World')
    })

    it('should trim whitespace from stderr', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '',
        stderr: '  Warning message  \n',
      })

      const result = await exec('some-command')

      expect(result.stderr).toBe('Warning message')
    })

    it('should handle multiline output', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'line1\nline2\nline3',
        stderr: '',
      })

      const result = await exec('ls -la')

      expect(result.stdout).toBe('line1\nline2\nline3')
    })

    it('should handle both stdout and stderr', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Standard output',
        stderr: 'Standard error',
      })

      const result = await exec('command-with-stderr')

      expect(result.stdout).toBe('Standard output')
      expect(result.stderr).toBe('Standard error')
    })

    it('should handle empty stdout', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '',
        stderr: '',
      })

      const result = await exec('silent-command')

      expect(result.stdout).toBe('')
      expect(result.stderr).toBe('')
    })

    it('should trim leading and trailing newlines', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '\n\nHello\n\n',
        stderr: '\n\nWarning\n\n',
      })

      const result = await exec('test-command')

      expect(result.stdout).toBe('Hello')
      expect(result.stderr).toBe('Warning')
    })

    it('should handle commands with special characters', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Result',
        stderr: '',
      })

      const result = await exec('echo "test" && echo "another"')

      expect(result.stdout).toBe('Result')
    })

    it('should handle commands with pipes', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'filtered output',
        stderr: '',
      })

      const result = await exec('ls | grep test')

      expect(result.stdout).toBe('filtered output')
    })

    it('should handle commands with redirects', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '',
        stderr: '',
      })

      const result = await exec('echo "test" > output.txt')

      expect(result.stdout).toBe('')
      expect(result.stderr).toBe('')
    })

    it('should handle long output', async () => {
      const { exec } = await import('./exec')

      const longOutput = 'a'.repeat(10000)
      mockExecAsync.mockResolvedValue({
        stdout: longOutput,
        stderr: '',
      })

      const result = await exec('long-command')

      expect(result.stdout).toBe(longOutput)
      expect(result.stdout.length).toBe(10000)
    })

    it('should preserve internal whitespace', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Hello   World',
        stderr: '',
      })

      const result = await exec('echo "Hello   World"')

      expect(result.stdout).toBe('Hello   World')
    })
  })

  describe('command execution errors', () => {
    it('should throw error when command fails', async () => {
      const { exec } = await import('./exec')

      const mockError = new Error('Command failed')
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('invalid-command')).rejects.toThrow('Command failed')
    })

    it('should throw error with command not found', async () => {
      const { exec } = await import('./exec')

      const mockError = Object.assign(new Error('command not found'), {
        code: 127,
      })
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('nonexistent-command')).rejects.toThrow()
    })

    it('should throw error when command exits with non-zero code', async () => {
      const { exec } = await import('./exec')

      const mockError = Object.assign(new Error('Command exited with code 1'), {
        code: 1,
      })
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('failing-command')).rejects.toThrow()
    })

    it('should preserve error message', async () => {
      const { exec } = await import('./exec')

      const errorMessage = 'Specific error occurred'
      const mockError = new Error(errorMessage)
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('command')).rejects.toThrow(errorMessage)
    })

    it('should handle permission denied errors', async () => {
      const { exec } = await import('./exec')

      const mockError = Object.assign(new Error('Permission denied'), {
        code: 'EACCES',
      })
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('restricted-command')).rejects.toThrow('Permission denied')
    })

    it('should handle timeout errors', async () => {
      const { exec } = await import('./exec')

      const mockError = Object.assign(new Error('Command timeout'), {
        killed: true,
        signal: 'SIGTERM',
      })
      mockExecAsync.mockRejectedValue(mockError)

      await expect(exec('slow-command')).rejects.toThrow('Command timeout')
    })
  })

  describe('edge cases', () => {
    it('should handle empty command string', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '',
        stderr: '',
      })

      const result = await exec('')

      expect(result.stdout).toBe('')
      expect(result.stderr).toBe('')
    })

    it('should handle commands with unicode characters', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Hello 世界 🌍',
        stderr: '',
      })

      const result = await exec('echo "Hello 世界 🌍"')

      expect(result.stdout).toBe('Hello 世界 🌍')
    })

    it('should handle commands with tabs', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '\tIndented\tText\t',
        stderr: '',
      })

      const result = await exec('echo "text"')

      expect(result.stdout).toBe('Indented\tText')
    })

    it('should handle only whitespace output', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: '   \n\n   ',
        stderr: '   \t\t   ',
      })

      const result = await exec('whitespace-command')

      expect(result.stdout).toBe('')
      expect(result.stderr).toBe('')
    })

    it('should handle concurrent executions', async () => {
      const { exec } = await import('./exec')

      let callCount = 0
      mockExecAsync.mockImplementation(async () => {
        callCount++
        return {
          stdout: `Output ${callCount}`,
          stderr: '',
        }
      })

      const [result1, result2, result3] = await Promise.all([
        exec('command1'),
        exec('command2'),
        exec('command3'),
      ])

      expect(result1.stdout).toBe('Output 1')
      expect(result2.stdout).toBe('Output 2')
      expect(result3.stdout).toBe('Output 3')
    })

    it('should handle stderr with warnings while command succeeds', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'Success',
        stderr: 'Warning: deprecated feature',
      })

      const result = await exec('command-with-warnings')

      expect(result.stdout).toBe('Success')
      expect(result.stderr).toBe('Warning: deprecated feature')
    })
  })

  describe('integration scenarios', () => {
    it('should execute multiple commands sequentially', async () => {
      const { exec } = await import('./exec')

      mockExecAsync
        .mockResolvedValueOnce({
          stdout: 'Result 1',
          stderr: '',
        })
        .mockResolvedValueOnce({
          stdout: 'Result 2',
          stderr: '',
        })

      const result1 = await exec('command1')
      const result2 = await exec('command2')

      expect(result1.stdout).toBe('Result 1')
      expect(result2.stdout).toBe('Result 2')
    })

    it('should handle command chaining with &&', async () => {
      const { exec } = await import('./exec')

      mockExecAsync.mockResolvedValue({
        stdout: 'All commands succeeded',
        stderr: '',
      })

      const result = await exec('cmd1 && cmd2 && cmd3')

      expect(result.stdout).toBe('All commands succeeded')
    })
  })
})
