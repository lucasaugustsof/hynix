import prompts, { type PromptObject } from 'prompts'

import { logger } from './logger'

export async function prompt<T extends string>(
  questions: PromptObject<T> | PromptObject<T>[]
): Promise<prompts.Answers<T>> {
  function onCancel() {
    logger.break()
    logger.info('Operation cancelled')
    process.exit(0)
  }

  return prompts(questions, {
    onCancel,
  })
}
