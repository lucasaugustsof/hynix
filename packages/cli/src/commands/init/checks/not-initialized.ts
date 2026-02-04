import { lilconfig } from 'lilconfig'
import type { ListrTask } from 'listr2'

import { LIL_CONFIG_SEARCH_OPTIONS } from '@/common/const'
import type { PreflightContext } from '@/core/base-command'

import { InitPreflightWarning } from '../enums'

export function checkNotInitialized(): ListrTask<PreflightContext> {
  return {
    title: `Checking if project is not initialized`,
    task: async (ctx, task) => {
      const config = await lilconfig('hynix', LIL_CONFIG_SEARCH_OPTIONS).search()

      if (config) {
        ctx.warnings.add(InitPreflightWarning.ALREADY_INITIALIZED)
        throw new Error('Project already initialized')
      }

      task.title = `Project is ready to initialize`
    },
  }
}
