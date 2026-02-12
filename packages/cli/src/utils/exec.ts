import { exec as nodeExec } from 'node:child_process'
import { promisify } from 'node:util'

/**
 * Result object returned by the exec function
 */
interface ExecResult {
  /** Standard output from the command, trimmed of leading/trailing whitespace */
  stdout: string
  /** Standard error from the command, trimmed of leading/trailing whitespace */
  stderr: string
}

/**
 * Executes a shell command asynchronously and returns the output
 *
 * Wraps Node's child_process.exec with a Promise interface and automatically
 * trims whitespace from stdout and stderr. The command is executed in a shell,
 * which means shell features like pipes, redirects, and environment variables
 * are supported.
 *
 * @param command - The shell command to execute
 * @returns A promise that resolves to an object containing stdout and stderr
 * @throws {Error} If the command fails or exits with a non-zero code
 *
 * @example
 * ```ts
 * // Execute a simple command
 * const { stdout } = await exec('echo "Hello World"')
 * console.log(stdout) // 'Hello World'
 *
 * // Execute with pipes
 * const { stdout: files } = await exec('ls -la | grep .ts')
 * console.log(files) // List of .ts files
 *
 * // Handle errors
 * try {
 *   await exec('invalid-command')
 * } catch (error) {
 *   console.error('Command failed:', error)
 * }
 * ```
 */
export async function exec(command: string): Promise<ExecResult> {
  const execAsync = promisify(nodeExec)
  const { stdout, stderr } = await execAsync(command)

  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  }
}
