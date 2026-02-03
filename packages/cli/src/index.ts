#! /usr/bin/env node --harmony

import { program } from 'commander'

import { init } from '@/commands/init'

program.addCommand(init)

program.parse()
