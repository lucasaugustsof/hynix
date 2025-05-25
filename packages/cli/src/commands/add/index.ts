import { Command } from 'commander'

import { handler } from './handler'

export const add = new Command()
  .name('add')
  .description('add Hynix components to your project.')
  .action(handler)
