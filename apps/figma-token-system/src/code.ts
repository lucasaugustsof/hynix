import { WEBHOOK_URL } from './utilities/const'
import { isVariableAlias } from './utilities/is-variable-alias'
import { normalizeVariableName } from './utilities/normalize-variable-name'
import { toRGB } from './utilities/to-rgb'

async function main() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const variables = await figma.variables.getLocalVariablesAsync()

  const variableNameMap = new Map<string, string>()
  const collectionToVariablesMap = new Map<string, Variable[]>()

  const exportedData: Record<string, Record<string, string | number>> = {}

  for (const variable of variables) {
    variableNameMap.set(variable.id, normalizeVariableName(variable.name))
  }

  for (const collection of collections) {
    if (!collectionToVariablesMap.has(collection.name)) {
      collectionToVariablesMap.set(collection.name, [])
    }

    for (const variable of variables) {
      if (variable.variableCollectionId === collection.id) {
        const groupedVariables =
          collectionToVariablesMap.get(collection.name) ?? []
        groupedVariables.push(variable)

        collectionToVariablesMap.set(collection.name, groupedVariables)
      }
    }
  }

  for (const [collectionName, groupedVariables] of collectionToVariablesMap) {
    const normalizedCollectionName = collectionName
      .toLowerCase()
      .replace(/^\d+-/, ' ')
      .trim()

    if (!exportedData[normalizedCollectionName]) {
      exportedData[normalizedCollectionName] = {}
    }

    for (const variable of groupedVariables) {
      const normalizedName = normalizeVariableName(variable.name)

      let resolvedValue: string | number

      // @TODO: Implement a solution to handle multiple variable modes
      const [modeId] = Object.keys(variable.valuesByMode)
      const value = variable.valuesByMode[modeId]

      if (isVariableAlias(value)) {
        const aliasedName = variableNameMap.get(value.id)
        resolvedValue = `{${aliasedName}}`
      } else {
        switch (variable.resolvedType) {
          case 'COLOR':
            resolvedValue = toRGB(value as RGBA)
            break
          case 'FLOAT':
            resolvedValue = Number(value)
            break
        }
      }

      // @ts-expect-error: Variable 'resolvedValue' is used before being assigned.
      exportedData[normalizedCollectionName][normalizedName] = resolvedValue
    }
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exportedData),
    })

    if (!response.ok) {
      throw new Error('Webhook connection failed. Please try again.')
    }

    const data = await response.json()

    figma.notify(data.message)
  } catch (err) {
    if (err instanceof Error) {
      figma.notify(`Error exporting variables: ${err.message}`, {
        error: true,
      })
    }
  }

  figma.closePlugin()
}

main()
