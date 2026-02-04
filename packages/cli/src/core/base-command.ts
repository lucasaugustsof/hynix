import { Command } from 'commander'
import { Listr, type ListrBaseClassOptions, type ListrTask } from 'listr2'

import { logger } from '@/common/logger'

export interface PreflightContext {
  warnings: Set<string>
  errors: Set<string>
}

export abstract class BaseCommand<TArgs extends unknown[] = unknown[]> extends Command {
  constructor(name: string) {
    super(name)
    this.action((...args: TArgs) => this.run(...args))
  }

  protected async runPreflightChecks(
    tasks: ListrTask<PreflightContext>[],
    taskOptions?: ListrBaseClassOptions<PreflightContext>
  ): Promise<PreflightContext> {
    const ctx: PreflightContext = {
      warnings: new Set(),
      errors: new Set(),
    }

    logger.highlight('yellowBright', 'Preflight Checks...')
    logger.break()

    await new Listr(tasks, {
      ...taskOptions,
      exitOnError: false,
    }).run(ctx)

    return ctx
  }

  protected abstract run(...args: TArgs): Promise<void> | void
}
