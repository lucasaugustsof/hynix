import { logger } from './logger'

type PreflightCheckBase = {
  /** Unique identifier for the check */
  name: string
  /** Optional message to display */
  message?: string
}

type PreflightCheckPassed = PreflightCheckBase & {
  /** Indicates the check completed successfully */
  status: 'passed'
}

type PreflightCheckFailed = PreflightCheckBase & {
  /** Indicates the check did not pass */
  status: 'failed'
  /** Reason for the failure */
  reason: string
  /** Suggestion to help the user resolve the issue */
  hint?: string
}

type PreflightCheckSkipped = PreflightCheckBase & {
  /** Indicates the check was skipped */
  status: 'skipped'
  /** Reason for skipping the check */
  reason: string
}

type PreflightCheck = PreflightCheckPassed | PreflightCheckFailed | PreflightCheckSkipped

export type PromisePreflightCheck = Promise<PreflightCheck>

type PreflightCheckFn = () => PromisePreflightCheck

type FailedCheckData = Pick<PreflightCheckFailed, 'reason' | 'hint'>
type SkippedCheckData = Pick<PreflightCheckSkipped, 'reason'>

const DEFAULT_ERROR_MESSAGE = 'An unknown error occurred'

/**
 * Handles a failed preflight check by logging the error and storing failure data
 */
function handleFailedCheck(
  check: PreflightCheckFailed,
  failedChecks: Map<string, FailedCheckData>
) {
  failedChecks.set(check.name, {
    reason: check.reason,
    hint: check.hint,
  })

  logger.error(check.message ?? DEFAULT_ERROR_MESSAGE, { indent: 1 })
}

/**
 * Handles a skipped preflight check by logging the warning and storing skip data
 */
function handleSkippedCheck(
  check: PreflightCheckSkipped,
  skippedChecks: Map<string, SkippedCheckData>
) {
  skippedChecks.set(check.name, {
    reason: check.reason,
  })

  logger.warning(`Skipped: ${check.message ?? check.reason}`, { indent: 1 })
}

/**
 * Handles a passed preflight check by logging success message
 */
function handlePassedCheck(check: PreflightCheckPassed) {
  logger.success(check.message ?? 'Check passed', { indent: 1 })
}

/**
 * Displays detailed error information for all failed checks and exits the process
 */
function displayFailuresAndExit(failedChecks: Map<string, FailedCheckData>) {
  for (const { reason, hint } of failedChecks.values()) {
    logger.break()
    logger.error(reason, { withoutSymbol: true })
    logger.break()

    if (hint) {
      logger.dim(`Tip: ${hint}`, {})
      logger.break()
    }
  }

  process.exit(0)
}

/**
 * Executes a series of preflight checks and reports any failures.
 * @param checks - Array of async functions that return a preflight check result
 * @param heading - Text displayed before running the checks
 * @returns Object containing failed and skipped checks data
 */
export async function runPreflight(
  checks: PreflightCheckFn[],
  heading = 'Running preflight checks...'
) {
  logger.dim(heading)
  logger.break()

  const failedChecks = new Map<string, FailedCheckData>()
  const skippedChecks = new Map<string, SkippedCheckData>()

  for (const checkFn of checks) {
    const result = await checkFn()

    switch (result.status) {
      case 'failed':
        handleFailedCheck(result, failedChecks)
        break
      case 'skipped':
        handleSkippedCheck(result, skippedChecks)
        break
      case 'passed':
        handlePassedCheck(result)
        break
    }
  }

  if (failedChecks.size > 0) {
    displayFailuresAndExit(failedChecks)
  }

  return {
    failedChecks,
    skippedChecks,
  }
}
