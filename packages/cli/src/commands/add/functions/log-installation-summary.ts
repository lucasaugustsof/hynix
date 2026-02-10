import { logger } from '@/utils/logger'

type InstallationSummary = {
  successfulComponents: string[]
  overwrittenComponents: string[]
  skippedComponents: string[]
}

type ComponentGroup = {
  components: string[]
  title: string
  logMethod: 'success' | 'warning'
}

function logComponentGroup(group: ComponentGroup): void {
  if (group.components.length === 0) {
    return
  }

  logger.break()
  logger[group.logMethod](group.title)

  for (const componentName of group.components) {
    logger.dim(`- ${componentName}`, {
      indent: 1,
    })
  }
}

export function logInstallationSummary(summary: InstallationSummary): void {
  const { successfulComponents, overwrittenComponents, skippedComponents } = summary

  const groups: ComponentGroup[] = [
    {
      components: successfulComponents,
      title: 'Successfully installed components:',
      logMethod: 'success',
    },
    {
      components: overwrittenComponents,
      title: 'Successfully overwritten components:',
      logMethod: 'success',
    },
    {
      components: skippedComponents,
      title: 'The following components were skipped (no changes were made):',
      logMethod: 'warning',
    },
  ]

  for (const group of groups) {
    logComponentGroup(group)
  }
}
