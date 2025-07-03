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
  alias: string,
  templates: Record<string, string>,
  filesCreatedAfterExecution: Set<string>,
) {
  const dirPath = resolveAliasToAbsolutePath(alias)

  if (!existsSync(dirPath)) {
    await fs.mkdir(dirPath, {
      recursive: true,
    })
  }

  await Promise.all(
    Object.entries(templates).map(async ([file, code]) => {
      const fileName = `${kebabCase(file)}.ts`
      const filePath = path.join(dirPath, fileName)

      const summaryPath = filePath.split(path.sep).slice(-3).join(path.sep)

      try {
        const formattedCode = await prettier.format(code, {
          parser: 'typescript',
          singleQuote: true,
        })
        await fs.writeFile(filePath, formattedCode, 'utf8')
        filesCreatedAfterExecution.add(summaryPath)
      } catch (err) {
        const cause = err instanceof Error ? err.message : String(err)
        throw new Error(`Failed to create "${fileName}": ${cause}`)
      }
    }),
  )
}

export async function askCssPath(): Promise<string> {
  const cssPath = await p.text({
    message: 'Enter the path for your main Tailwind CSS file:',
    placeholder: DEFAULT_CSS_PATH,
    initialValue: DEFAULT_CSS_PATH,
    validate(v) {
      return v.trim() ? undefined : 'This field is required.'
    },
  })

  if (p.isCancel(cssPath)) {
    logger.warning('CSS configuration canceled. No changes were applied.')
    process.exit(0)
  }

  const cssFilePath = cssPath.toString()
  const { dir: cssDir, base: fileName } = path.parse(cssFilePath)

  if (!existsSync(cssDir)) {
    await fs.mkdir(cssDir, {
      recursive: true,
    })
  }

  try {
    const formattedCode = await prettier.format(CSS_FILE, {
      parser: 'css',
    })

    await fs.writeFile(cssFilePath, formattedCode, 'utf8')
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to create "${fileName}": ${cause}`)
  }

  return cssFilePath
}

export async function askComponentsAlias(): Promise<string> {
  const alias = await p.text({
    message:
      'Which alias would you like to configure for importing your components?',
    placeholder: DEFAULT_COMPONENTS_ALIAS,
    initialValue: DEFAULT_COMPONENTS_ALIAS,
    validate(v) {
      return v.trim()
        ? undefined
        : 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(alias)) {
    logger.warning('Component alias setup canceled. No alias configured.')
    process.exit(0)
  }

  return alias.toString()
}

export async function askHooksAlias(
  filesCreatedAfterExecution: Set<string>,
): Promise<string> {
  const alias = await p.text({
    message:
      'Which alias would you like to configure for importing your hooks?',
    placeholder: DEFAULT_HOOKS_ALIAS,
    initialValue: DEFAULT_HOOKS_ALIAS,
    validate(v) {
      return v.trim()
        ? undefined
        : 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(alias)) {
    logger.warning('Hooks alias setup canceled. No alias configured.')
    process.exit(0)
  }

  const aliasStr = alias.toString()
  await generateTemplateFiles(aliasStr, HOOKS, filesCreatedAfterExecution)
  return aliasStr
}

export async function askUtilitiesAlias(
  filesCreatedAfterExecution: Set<string>,
): Promise<string> {
  const alias = await p.text({
    message:
      'Which alias would you like to configure for importing your utilities?',
    placeholder: DEFAULT_UTILITIES_ALIAS,
    initialValue: DEFAULT_UTILITIES_ALIAS,
    validate(v) {
      return v.trim()
        ? undefined
        : 'This field is required. Please provide a value.'
    },
  })

  if (p.isCancel(alias)) {
    logger.warning('Utilities alias setup canceled. No alias configured.')
    process.exit(0)
  }

  const aliasStr = alias.toString()
  await generateTemplateFiles(aliasStr, UTILITIES, filesCreatedAfterExecution)

  return aliasStr
}
