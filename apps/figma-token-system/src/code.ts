import { getLocalVariables } from './functions/get-local-variables'

;(async () => {
  const variables = await getLocalVariables()
  console.log(variables)
})()
