#! /usr/bin/env node

import { program } from 'commander'
import { version } from '../package.json'

import { add } from '@/commands/add'
import { init } from '@/commands/init'

program.name('hynix').version(version).addCommand(init).addCommand(add)

program.parse()
