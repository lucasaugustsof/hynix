import type { PromisePreflightCheck } from './run-preflight'
import { runPreflight } from './run-preflight'

vi.mock('./logger', () => ({
  logger: {
    dim: vi.fn(),
    break: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}))

describe('runPreflight', () => {
  let processExitSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('when all checks pass', () => {
    it('should return empty failed and skipped checks', async () => {
      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
          message: 'Check 1 passed',
        }),
        async (): PromisePreflightCheck => ({
          name: 'check-2',
          status: 'passed',
          message: 'Check 2 passed',
        }),
      ]

      const result = await runPreflight(checks)

      expect(result.failedChecks.size).toBe(0)
      expect(result.skippedChecks.size).toBe(0)
    })

    it('should log success messages for passed checks', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
          message: 'Check 1 passed',
        }),
      ]

      await runPreflight(checks)

      expect(logger.success).toHaveBeenCalledWith('Check 1 passed', {
        indent: 1,
      })
    })

    it('should use default message when message is not provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
        }),
      ]

      await runPreflight(checks)

      expect(logger.success).toHaveBeenCalledWith('Check passed', {
        indent: 1,
      })
    })
  })

  describe('when checks are skipped', () => {
    it('should return skipped checks data', async () => {
      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'skipped',
          message: 'Check 1 skipped',
          reason: 'Not applicable',
        }),
      ]

      const result = await runPreflight(checks)

      expect(result.skippedChecks.size).toBe(1)
      expect(result.skippedChecks.get('check-1')).toEqual({
        reason: 'Not applicable',
      })
    })

    it('should log warning messages for skipped checks', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'skipped',
          message: 'Check 1 skipped',
          reason: 'Not applicable',
        }),
      ]

      await runPreflight(checks)

      expect(logger.warning).toHaveBeenCalledWith('Skipped: Check 1 skipped', {
        indent: 1,
      })
    })

    it('should use reason as message when message is not provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'skipped',
          reason: 'Not applicable',
        }),
      ]

      await runPreflight(checks)

      expect(logger.warning).toHaveBeenCalledWith('Skipped: Not applicable', {
        indent: 1,
      })
    })
  })

  describe('when checks fail', () => {
    it('should exit process when checks fail', async () => {
      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          message: 'Check 1 failed',
          reason: 'Something went wrong',
        }),
      ]

      await runPreflight(checks)

      expect(processExitSpy).toHaveBeenCalledWith(0)
    })

    it('should log error messages for failed checks', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          message: 'Check 1 failed',
          reason: 'Something went wrong',
        }),
      ]

      await runPreflight(checks)

      expect(logger.error).toHaveBeenCalledWith('Check 1 failed', { indent: 1 })
    })

    it('should use default error message when message is not provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          reason: 'Something went wrong',
        }),
      ]

      await runPreflight(checks)

      expect(logger.error).toHaveBeenCalledWith('An unknown error occurred', { indent: 1 })
    })

    it('should display failure details before exit', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          message: 'Check 1 failed',
          reason: 'Something went wrong',
        }),
      ]

      await runPreflight(checks)

      expect(logger.error).toHaveBeenCalledWith('Something went wrong', {
        withoutSymbol: true,
      })
    })

    it('should display hint when provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          message: 'Check 1 failed',
          reason: 'Something went wrong',
          hint: 'Try running with --verbose',
        }),
      ]

      await runPreflight(checks)

      expect(logger.dim).toHaveBeenCalledWith('Tip: Try running with --verbose', {})
    })

    it('should handle multiple failed checks', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'failed',
          message: 'Check 1 failed',
          reason: 'First error',
          hint: 'First hint',
        }),
        async (): PromisePreflightCheck => ({
          name: 'check-2',
          status: 'failed',
          message: 'Check 2 failed',
          reason: 'Second error',
        }),
      ]

      await runPreflight(checks)

      expect(logger.error).toHaveBeenCalledWith('First error', {
        withoutSymbol: true,
      })
      expect(logger.error).toHaveBeenCalledWith('Second error', {
        withoutSymbol: true,
      })
      expect(logger.dim).toHaveBeenCalledWith('Tip: First hint', {})
      expect(processExitSpy).toHaveBeenCalledWith(0)
    })
  })

  describe('mixed check results', () => {
    it('should handle passed, skipped, and failed checks together', async () => {
      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
          message: 'Check 1 passed',
        }),
        async (): PromisePreflightCheck => ({
          name: 'check-2',
          status: 'skipped',
          message: 'Check 2 skipped',
          reason: 'Not needed',
        }),
        async (): PromisePreflightCheck => ({
          name: 'check-3',
          status: 'failed',
          message: 'Check 3 failed',
          reason: 'Error occurred',
        }),
      ]

      await runPreflight(checks)

      expect(processExitSpy).toHaveBeenCalledWith(0)
    })

    it('should not exit when there are only passed and skipped checks', async () => {
      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
          message: 'Check 1 passed',
        }),
        async (): PromisePreflightCheck => ({
          name: 'check-2',
          status: 'skipped',
          message: 'Check 2 skipped',
          reason: 'Not needed',
        }),
      ]

      const result = await runPreflight(checks)

      expect(result.skippedChecks.size).toBe(1)
      expect(processExitSpy).not.toHaveBeenCalled()
    })
  })

  describe('custom heading', () => {
    it('should display custom heading when provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
        }),
      ]

      await runPreflight(checks, 'Custom heading...')

      expect(logger.dim).toHaveBeenCalledWith('Custom heading...')
    })

    it('should use default heading when not provided', async () => {
      const { logger } = await import('./logger')

      const checks = [
        async (): PromisePreflightCheck => ({
          name: 'check-1',
          status: 'passed',
        }),
      ]

      await runPreflight(checks)

      expect(logger.dim).toHaveBeenCalledWith('Running preflight checks...')
    })
  })

  describe('execution order', () => {
    it('should execute checks sequentially', async () => {
      const executionOrder: number[] = []

      const checks = [
        async (): PromisePreflightCheck => {
          executionOrder.push(1)
          return {
            name: 'check-1',
            status: 'passed',
          }
        },
        async (): PromisePreflightCheck => {
          executionOrder.push(2)
          return {
            name: 'check-2',
            status: 'passed',
          }
        },
        async (): PromisePreflightCheck => {
          executionOrder.push(3)
          return {
            name: 'check-3',
            status: 'passed',
          }
        },
      ]

      await runPreflight(checks)

      expect(executionOrder).toEqual([1, 2, 3])
    })
  })
})
