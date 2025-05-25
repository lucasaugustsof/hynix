import { Command } from 'commander'

import { handler } from './handler'

export const init = new Command()
  .name('init')
  .description('prepares the setup for Hynix CLI.')
  .action(handler)
