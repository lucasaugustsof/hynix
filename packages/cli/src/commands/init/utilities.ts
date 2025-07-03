import { promises as fs, existsSync } from 'node:fs'
import path from 'node:path'

import * as p from '@clack/prompts'
import prettier from 'prettier'
import { kebabCase } from 'scule'

import {
  CSS_FILE,
  DEFAULT_COMPONENTS_ALIAS,
  DEFAULT_CSS_PATH,
  DEFAULT_HOOKS_ALIAS,
  DEFAULT_UTILITIES_ALIAS,
  HOOKS,
  UTILITIES,
} from '@/utilities/const'
import { logger } from '@/utilities/logger'
import { resolveAliasToAbsolutePath } from '@/utilities/resolve-alias-to-absolute-path'

async function generateTemplateFiles(
  importAlias: string,
  templateMap: Record<string, string>,
  createdFiles: Set<string>,
) {
  const outputDir = resolveAliasToAbsolutePath(importAlias)

  if (!existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true })
  }

  await Promise.all(
    Object.entries(templateMap).map(async ([templateName, templateContent]) => {
      const outputFileName = `${kebabCase(templateName)}.ts`

      const targetFilePath = path.join(outputDir, outputFileName)

      const fileSummary = targetFilePath
        .split(path.sep)
        .slice(-3)
        .join(path.sep)

      try {
        const formattedTemplate = await prettier.format(templateContent, {
          parser: 'typescript',
          singleQuote: true,
        })
        await fs.writeFile(targetFilePath, formattedTemplate, 'utf8')

        createdFiles.add(fileSummary)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)

        throw new Error(
          `Failed to generate "${outputFileName}": ${errorMessage}`,
        )
      }
    }),
  )
}

export async function askCssPath(): Promise<string> {
  const enteredPath = await p.text({
    message: 'Enter the path for your main Tailwind CSS file:',
    placeholder: DEFAULT_CSS_PATH,
    initialValue: DEFAULT_CSS_PATH,
    validate(value) {
      return value.trim() ? undefined : 'This field is required.'
    },
  })

  if (p.isCancel(enteredPath)) {
    logger.warning('CSS configuration canceled. No changes were applied.')
    process.exit(0)
  }

  const cssFilePath = enteredPath.toString()
  const { dir: cssDirectory, base: cssFileName } = path.parse(cssFilePath)

  if (!existsSync(cssDirectory)) {
    await fs.mkdir(cssDirectory, {
      recursive: true,
    })
  }

  try {
    const cssContent = await prettier.format(CSS_FILE, { parser: 'css' })
    await fs.writeFile(cssFilePath, cssContent, 'utf8')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to generate "${cssFileName}": ${errorMessage}`)
  }

  return cssFilePath
}

export async function askComponentsAlias(): Promise<string> {
  const componentsAlias = (
    await p.text({
      message:
        'Which alias would you like to configure for importing your components?',
      placeholder: DEFAULT_COMPONENTS_ALIAS,
      initialValue: DEFAULT_COMPONENTS_ALIAS,
      validate(value) {
        return value.trim()
          ? undefined
          : 'This field is required. Please provide a value.'
      },
    })
  ).toString()

  if (p.isCancel(componentsAlias)) {
    logger.warning('Component alias setup canceled. No alias configured.')
    process.exit(0)
  }

  const componentsDir = resolveAliasToAbsolutePath(componentsAlias)

  if (!existsSync(componentsDir)) {
    await fs.mkdir(componentsDir, {
      recursive: true,
    })
  }

  return componentsAlias
}

export async function askHooksAlias(
  createdFiles: Set<string>,
): Promise<string> {
  const hooksAliasInput = await p.text({
    message:
      'Which alias would you like to configure for importing your hooks?',
    placeholder: DEFAULT_HOOKS_ALIAS,
    initialValue: DEFAULT_HOOKS_ALIAS,
    validate(value) {
      return value.trim()
        ? undefined
        : 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(hooksAliasInput)) {
    logger.warning('Hooks alias setup canceled. No alias configured.')
    process.exit(0)
  }

  const hooksAlias = hooksAliasInput.toString()
  await generateTemplateFiles(hooksAlias, HOOKS, createdFiles)

  return hooksAlias
}

export async function askUtilitiesAlias(
  createdFiles: Set<string>,
): Promise<string> {
  const utilitiesAliasInput = await p.text({
    message:
      'Which alias would you like to configure for importing your utilities?',
    placeholder: DEFAULT_UTILITIES_ALIAS,
    initialValue: DEFAULT_UTILITIES_ALIAS,
    validate(value) {
      return value.trim()
        ? undefined
        : 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(utilitiesAliasInput)) {
    logger.warning('Utilities alias setup canceled. No alias configured.')
    process.exit(0)
  }

  const utilitiesAlias = utilitiesAliasInput.toString()
  await generateTemplateFiles(utilitiesAlias, UTILITIES, createdFiles)

  return utilitiesAlias
}
