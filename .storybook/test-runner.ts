import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'

import { injectAxe, checkA11y, configureAxe } from 'axe-playwright'

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page)
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context)

    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    })

    const element = storyContext.parameters?.a11y?.element ?? 'body'
    await checkA11y(page, element, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })

    const elementHandler = await page.$('#storybook-root')
    const innerHTML = await elementHandler!.innerHTML()

    expect(innerHTML).toMatchSnapshot()
  },
}

export default config
