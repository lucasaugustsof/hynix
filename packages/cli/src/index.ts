#! /usr/bin/env node --harmony

import { program } from 'commander'

import { add } from '@/commands/add'
import { init } from '@/commands/init'

import { description, name, version } from '../package.json' with { type: 'json' }

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

function main() {
  program
    .name(name)
    .description(description)
    .version(version || '1.0.0', '-v, --version', 'display the version number')

  program.addCommand(init)
  program.addCommand(add)

  program.parse()
}

main()
