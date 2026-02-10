import { Command } from 'commander'
import ora from 'ora'
import pc from 'picocolors'
import { pascalCase } from 'scule'

import prompt from '@/lib/prompts'
import { fetchRegistry } from '@/services/fetch-registry'
import { hynixConfig } from '@/utils/config-file'
import { logger } from '@/utils/logger'
import { runPreflight } from '@/utils/run-preflight'

import { checkValidProject } from '../init/checks/valid-project'
import { checkComponentsDirectory } from './checks/components-directory'
import { checkIsInitialized } from './checks/is-initialized'
import { installComponents } from './functions/install-components'
import { installExternalDependencies } from './functions/install-external-dependencies'
import { logInstallationSummary } from './functions/log-installation-summary'

async function runAddCommand(components: string[]) {
  try {
    logger.intro()

    await runPreflight([checkValidProject, checkIsInitialized, checkComponentsDirectory])

    logger.break()
    logger.dim('Adding components...')
    logger.break()

    const config = await hynixConfig.read()

    const registrySpinner = ora('Fetching registry').start()
    const availableComponents = await fetchRegistry()
    registrySpinner.succeed('Registry fetched')

    let selectedComponents = components

    if (components.length === 0) {
      const answer = await prompt({
        type: 'multiselect',
        name: 'selectedComponents',
        message: 'Select components to add',
        hint: 'Press <space> to select, <a> to select all, <enter> to confirm',
        choices: availableComponents.map(component => {
          const componentName = pascalCase(component)
          return {
            title: componentName,
            value: component,
          }
        }),
        instructions: false,
      })

      selectedComponents = answer.selectedComponents
    }

    const installedComponents = await installComponents(selectedComponents, config)

    const skippedComponents: string[] = []
    const successfulComponents: string[] = []
    const overwrittenComponents: string[] = []
    const externalDependenciesToInstall: string[] = []

    for (const [componentName, installResult] of installedComponents) {
      const componentDisplayName = pascalCase(componentName)

      if (installResult.status === 'already-installed') {
        const { overwrite: isComponentOverwrite } = await prompt({
          type: 'confirm',
          name: 'overwrite',
          message: `Component ${pc.cyan(componentDisplayName)} already exists. Do you want to overwrite it?`,
          initial: false,
        })

        if (isComponentOverwrite) {
          await installResult.onOverwrite()
          overwrittenComponents.push(componentDisplayName)
        } else {
          skippedComponents.push(componentDisplayName)
        }

        continue
      }

      if (installResult.status === 'installed') {
        successfulComponents.push(componentDisplayName)

        if (installResult.externalDependencies && installResult.externalDependencies.length > 0) {
          externalDependenciesToInstall.push(...installResult.externalDependencies)
        }
      }

      if (installResult.status === 'failed') {
        logger.error(`Failed to install component ${pc.cyan(componentDisplayName)}`)
        logger.dim(`Reason: ${installResult.error}`, {
          indent: 1,
        })
      }
    }

    if (externalDependenciesToInstall.length > 0) {
      await installExternalDependencies(externalDependenciesToInstall)
    }

    logInstallationSummary({
      successfulComponents,
      overwrittenComponents,
      skippedComponents,
      installedExternalDependencies: externalDependenciesToInstall,
    })
  } catch (error) {
    logger.break()

    if (error instanceof Error) {
      logger.error(error.message, {
        withoutSymbol: true,
      })

      if (error.stack) {
        logger.dim('Stack trace:', {
          indent: 1,
        })
        logger.dim(error.stack, {
          indent: 2,
        })
      }
    } else {
      logger.error('An unexpected error occurred while installing components', {
        withoutSymbol: true,
      })
    }
  } finally {
    logger.break()
  }
}

export const add = new Command()
  .name('add')
  .description('add components to your project from the registry')
  .action(runAddCommand)
  .argument('[components...]', 'Name of the component to add')
