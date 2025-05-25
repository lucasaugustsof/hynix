import path from 'node:path'
import fse from 'fs-extra'

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
} from '@/utilities/const'
import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'

export async function handler() {
  try {
    const manifestFilePath = path.resolve(PROCESS_CWD, MANIFEST_FILE)
    const isManifestFileExists = fse.existsSync(manifestFilePath)

    if (isManifestFileExists) {
      logger.warning(
        'Overwriting `ui.json` will reset all Hynix CLI configurations. Your existing\ncustom settings will be lost.',
      )

      const shouldProceedOverwrite = await p.confirm({
        message:
          'The ui.json file already exists. Do you want to overwrite it?',
        active: 'Yes, I want to overwrite the file.',
        inactive: 'No, I want to keep the existing file.',
        initialValue: false,
      })

      if (!shouldProceedOverwrite) {
        logger.info('Process aborted. `ui.json` was not overwritten.')
        process.exit(0)
      }
    }

    const cssPath = await askCssPath()
    const componentsAlias = await askComponentsAlias()
    const utilitiesAlias = await askUtilitiesAlias()

    await manifestManager.saveManifest({
      tailwind: {
        css: cssPath,
      },
      aliases: {
        components: componentsAlias,
        utilities: utilitiesAlias,
      },
    })

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

export function showInitSummary({
  cssPath,
  componentsAlias,
  utilitiesAlias,
}: {
  cssPath: string
  componentsAlias: string
  utilitiesAlias: string
}) {
  logger.success('Hynix CLI has been successfully initialized!')

  p.outro(`${chalk.bold('Summary of the configuration:')}

${chalk.blue('CSS Path:')} ${cssPath}
${chalk.blue('Components Alias:')} ${componentsAlias}
${chalk.blue('Utilities Alias:')} ${utilitiesAlias}

Configuration saved to ${chalk.green(MANIFEST_FILE)}.

${chalk.bold('Next step:')}
Run ${chalk.yellow('npx hynix@latest add <component>')} to add your first component.
`)
}
