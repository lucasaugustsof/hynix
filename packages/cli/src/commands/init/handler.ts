import { existsSync } from 'node:fs'
import path from 'node:path'

import * as p from '@clack/prompts'
import chalk from 'chalk'

import type { Manifest } from '@/schemas/manifest'

import { addExternalDependencies } from '@/utilities/add-external-dependencies'
import { CLIError } from '@/utilities/cli-error'
import {
  MANIFEST_FILE,
  PROCESS_CWD,
  REQUIRED_DEPENDENCIES,
} from '@/utilities/const'
import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'

import {
  askComponentsAlias,
  askCssPath,
  askHooksAlias,
  askUtilitiesAlias,
} from './utilities'

export async function handler() {
  try {
    const manifestPath = path.resolve(PROCESS_CWD, MANIFEST_FILE)
    const manifestExists = existsSync(manifestPath)

    if (manifestExists) {
      logger.warning(
        `Warning: '${MANIFEST_FILE}' already exists and will be overwritten. All existing configurations will be reset.`,
      )

      const confirmOverwrite = await p.confirm({
        message: 'A configuration file was found. Overwrite it?',
        active: 'Yes, overwrite it',
        inactive: 'No, keep existing',
        initialValue: false,
      })

      if (p.isCancel(confirmOverwrite) || !confirmOverwrite) {
        logger.warning(
          `Initialization canceled. '${MANIFEST_FILE}' remains unchanged.`,
        )
        process.exit(0)
      }
    }

    const createdFiles = new Set<string>()

    const cssConfigPath = await askCssPath()
    const componentsAlias = await askComponentsAlias()
    const hooksAlias = await askHooksAlias(createdFiles)
    const utilitiesAlias = await askUtilitiesAlias(createdFiles)

    await p.tasks([
      {
        title: `Install dependencies: ${REQUIRED_DEPENDENCIES.join(', ')}`,
        task: async () => {
          await addExternalDependencies(REQUIRED_DEPENDENCIES)
          return `Installed: ${REQUIRED_DEPENDENCIES.join(', ')}`
        },
      },
      {
        title: `Save manifest to ${MANIFEST_FILE}`,
        task: async () => {
          const manifestContent = {
            tailwind: {
              css: cssConfigPath,
            },
            aliases: {
              components: componentsAlias,
              utilities: utilitiesAlias,
              hooks: hooksAlias,
            },
          } as Manifest

          await manifestManager.saveManifest(manifestContent)
          return `Manifest written to '${MANIFEST_FILE}'.`
        },
      },
    ])

    const createdFilesSummary = Array.from(createdFiles)
      .map(filePath => `- ${filePath}`)
      .join('\n')

    logger.step(
      `Setup complete. ${createdFiles.size} files generated:\n${createdFilesSummary}`,
    )

    logger.success('Setup completed successfully.')
    p.outro(
      `All configurations have been applied and files generated. Now you can add components.\n   To add a component, run: ${chalk.blue('npx hynix@alpha add <component>')}.`,
    )
  } catch (error) {
    if (error instanceof CLIError) {
      logger.error(error.message)
    } else {
      logger.error(
        'Unexpected error during setup. Please try again or contact support.',
      )
    }
  }
}
