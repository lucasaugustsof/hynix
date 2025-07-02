import { existsSync } from 'node:fs'
import path from 'node:path'

import * as p from '@clack/prompts'
import chalk from 'chalk'

import { CLIError } from '@/utilities/cli-error'
import {
  DEFAULT_COMPONENTS_ALIAS,
  DEFAULT_CSS_PATH,
  DEFAULT_UTILITIES_ALIAS,
  IS_DEV,
  MANIFEST_FILE,
  PROCESS_CWD,
  REQUIRED_DEPENDENCIES,
} from '@/utilities/const'
import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'
import { resolvePackageManagerCommand } from '@/utilities/resolve-package-manager-command'
import { runShellCommand } from '@/utilities/run-shell-command'

export async function handler() {
  try {
    const manifestFilePath = path.resolve(PROCESS_CWD, MANIFEST_FILE)
    const isManifestFileExists = existsSync(manifestFilePath)

    if (isManifestFileExists) {
      logger.warning(
        `Overwriting '${MANIFEST_FILE}' will reset all Hynix CLI configurations. Your existing\ncustom settings will be lost.`,
      )

      const shouldProceedOverwrite = await p.confirm({
        message:
          'The ui.json file already exists. Do you want to overwrite it?',
        active: 'Yes, I want to overwrite the file.',
        inactive: 'No, I want to keep the existing file.',
        initialValue: false,
      })

      if (p.isCancel(shouldProceedOverwrite) || !shouldProceedOverwrite) {
        logger.info('Process aborted. `ui.json` was not overwritten.')
        process.exit(0)
      }
    }

    const cssPath = await askCssPath()
    const componentsAlias = await askComponentsAlias()
    const utilitiesAlias = await askUtilitiesAlias()

    await p.tasks([
      {
        title: `Install required dependencies: ${REQUIRED_DEPENDENCIES.join(', ')}`,
        task: async () => {
          const { command, args } = await resolvePackageManagerCommand(
            'add',
            REQUIRED_DEPENDENCIES,
          )
          const fullCommand = `${command} ${args.join(' ')}`
          logger.info(`Executing: ${fullCommand}`)

          await runShellCommand(fullCommand)

          return `Successfully installed: ${REQUIRED_DEPENDENCIES.join(', ')}.`
        },
      },
      {
        title: `Write manifest file to ${MANIFEST_FILE}`,
        task: async () => {
          const manifestData = {
            tailwind: {
              css: cssPath,
            },
            aliases: {
              components: componentsAlias,
              utilities: utilitiesAlias,
            },
          }

          await manifestManager.saveManifest(manifestData)

          return `Manifest saved to ${MANIFEST_FILE}.`
        },
      },
    ])

    showInitSummary({
      cssPath,
      componentsAlias,
      utilitiesAlias,
    })
  } catch (err) {
    if (err instanceof Error && IS_DEV) {
      logger.debug(err.message)
    }

    throw new CLIError(err)
  }
}

async function askCssPath() {
  const result = await p.text({
    message:
      'What is the path to your main CSS file where the Tailwind directives are imported?',
    placeholder: DEFAULT_CSS_PATH,
    initialValue: DEFAULT_CSS_PATH,
    validate(value) {
      if (value.length === 0)
        return 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(result)) {
    logger.error('Operation cancelled.')
  }

  return result.toString()
}

async function askComponentsAlias() {
  const result = await p.text({
    message:
      'Which alias would you like to configure for importing your components?',
    placeholder: DEFAULT_COMPONENTS_ALIAS,
    initialValue: DEFAULT_COMPONENTS_ALIAS,
    validate(value) {
      if (value.length === 0)
        return 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(result)) {
    logger.error('Operation cancelled.')
  }

  return result.toString()
}

async function askUtilitiesAlias() {
  const result = await p.text({
    message:
      'Which alias would you like to configure for importing your utilities?',
    placeholder: DEFAULT_UTILITIES_ALIAS,
    initialValue: DEFAULT_UTILITIES_ALIAS,
    validate(value) {
      if (value.length === 0)
        return 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(result)) {
    logger.error('Operation cancelled.')
  }

  return result.toString()
}

function showInitSummary({
  cssPath,
  componentsAlias,
  utilitiesAlias,
}: {
  cssPath: string
  componentsAlias: string
  utilitiesAlias: string
}) {
  logger.success('Hynix CLI initialized.')

  p.outro(`
CSS Path:            ${chalk.green(cssPath)}
Components Alias:    ${chalk.green(componentsAlias)}
Utilities Alias:     ${chalk.green(utilitiesAlias)}

Manifest file saved to ${chalk.green(MANIFEST_FILE)}.

To add your first component, run: ${chalk.yellow('npx hynix@latest add <components...>')}
`)
}
