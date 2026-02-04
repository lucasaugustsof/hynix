import { exec as nodeExec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(nodeExec)

interface ExecResult {
  stdout: string
  stderr: string
}

export async function exec(command: string): Promise<ExecResult> {
  const { stdout, stderr } = await execAsync(command)

  return {
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  }
}
