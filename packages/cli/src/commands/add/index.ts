import { Command } from 'commander'
import ora from 'ora'
import prompt from 'prompts'
import { pascalCase } from 'scule'

import { fetchRegistry } from '@/services/fetch-registry'
import { hynixConfig } from '@/utils/config-file'
import { logger } from '@/utils/logger'
import { runPreflight } from '@/utils/run-preflight'

import { checkValidProject } from '../init/checks/valid-project'
import { checkComponentsDirectory } from './checks/components-directory'
import { checkIsInitialized } from './checks/is-initialized'
import { installComponents } from './functions/install-components'

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

    for (const [componentName, { status }] of installedComponents) {
      const componentDisplayName = pascalCase(componentName)

      if (status === 'already-installed') {
        const { overwrite: isComponentOverwrite } = await prompt({
          type: 'confirm',
          name: 'overwrite',
          message: `${componentDisplayName} already exists. Overwrite?`,
          initial: false,
        })

        console.log(isComponentOverwrite)
      }
    }
  } catch {}
}

export const add = new Command()
  .name('add')
  .description('add components to your project from the registry')
  .action(runAddCommand)
  .argument('[components...]', 'Name of the component to add')
