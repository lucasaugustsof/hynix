import { Command } from 'commander'

export abstract class BaseCommand extends Command {
  constructor(name: string) {
    super(name)
    this.action(this.execute.bind(this))
  }

  private async execute(...args: unknown[]): Promise<void> {
    await this.runPreflightChecks()
    await this.run(...args)
  }

  protected abstract runPreflightChecks(): Promise<void> | void
  protected abstract run(...args: unknown[]): Promise<void> | void
}
