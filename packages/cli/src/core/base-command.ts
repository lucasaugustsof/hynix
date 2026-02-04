import { Command } from 'commander'
import { Listr, type ListrBaseClassOptions, type ListrTask } from 'listr2'

import { logger } from '@/common/logger'

export interface PreflightContext {
  warnings: Set<string>
  errors: Set<string>
}

export abstract class BaseCommand<TOptions = void> extends Command {
  constructor(name: string) {
    super(name)
    this.action((options: TOptions) => this.run(options))
  }

  protected async runPreflightChecks(
    tasks: ListrTask<PreflightContext>[],
    taskOptions?: ListrBaseClassOptions<PreflightContext>
  ): Promise<PreflightContext> {
    const ctx: PreflightContext = {
      warnings: new Set(),
      errors: new Set(),
    }

    logger.highlight('white', '🛫 Preflight Checks...')
    logger.break()

    await new Listr(tasks, {
      ...taskOptions,
      exitOnError: false,
    }).run(ctx)

    return ctx
  }

  protected abstract run(options: TOptions): Promise<void> | void
}
