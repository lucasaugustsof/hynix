import pc from 'picocolors'
import _prompt, { type Answers, type Options, type PromptObject } from 'prompts'

async function prompt<T extends string = string>(
  questions: PromptObject<T> | Array<PromptObject<T>>,
  options?: Options
): Promise<Answers<T>> {
  const questionsArray = Array.isArray(questions) ? questions : [questions]

  const normalizedQuestions = questionsArray.map(question => ({
    ...question,
    message: question.message ? pc.reset(String(question.message)) : question.message,
  }))

  return await _prompt(normalizedQuestions, options)
}

export default prompt
