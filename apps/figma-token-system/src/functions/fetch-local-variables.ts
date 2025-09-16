import type { Item } from '../tokens-schema'
import { BASE_MODE } from '../utilities/const'
import { toRGB } from '../utilities/to-rgb'

export async function fetchLocalVariables(): Promise<Item[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const variables = await figma.variables.getLocalVariablesAsync()

  const variableNameMap = new Map<string, string>()
  const payloadByVarId = new Map<string, Item>()

  variables.forEach(variable => {
    variableNameMap.set(variable.id, variable.name)
  })

  for (const collection of collections) {
    const collectionName = collection.name
      .toLowerCase()
      .replace(/^\d+-/, '')
      .trim()

    for (const variable of variables) {
      if (variable.variableCollectionId !== collection.id) continue

      const modes: Record<string, string | number> = {}

      for (const { modeId, name: modeLabel } of collection.modes) {
        try {
          const processedValue = processVariableValue(
            variable,
            modeId,
            variableNameMap,
          )

          // When a collection has only one mode, Figma automatically names it "Mode 1".
          // We rename this case to maintain consistent naming across all modes.
          const modeName =
            modeLabel === 'Mode 1' ? BASE_MODE : modeLabel.toLowerCase()
          modes[modeName] = processedValue
        } catch (err) {
          console.error(err.message)
        }
      }

      const isColorType = variable.resolvedType === 'COLOR'

      const processedName = variable.name.replace(/-/g, '/')

      if (isColorType) {
        payloadByVarId.set(variable.id, {
          id: variable.id,
          name: processedName,
          path: processedName.split('/'),
          description: variable.description,
          kind: 'VARIABLE',
          collection: collectionName || 'foundations',
          type: 'color',
          modes: modes as Record<string, string>,
        })
      } else {
        payloadByVarId.set(variable.id, {
          id: variable.id,
          name: processedName,
          path: processedName.split('/'),
          description: variable.description,
          kind: 'VARIABLE',
          collection: collectionName || 'foundations',
          type: 'dimension',
          modes: modes as Record<string, number | string>,
        })
      }
    }
  }

  return Array.from(payloadByVarId.values())
}

function processVariableValue(
  variable: Variable,
  modeId: string,
  variableNameMap: Map<string, string>,
): string | number {
  const valueForMode = variable.valuesByMode[modeId]
  const variableResolvedType = variable.resolvedType

  if (isVariableAlias(valueForMode) && valueForMode.type === 'VARIABLE_ALIAS') {
    const aliasName = variableNameMap.get(valueForMode.id)

    if (!aliasName) {
      throw new Error(`Alias name not found for variable ${valueForMode.id}`)
    }

    return `{${aliasName.replace(/\//g, '-')}}`
  }

  if (variableResolvedType === 'COLOR') return toRGB(valueForMode as RGBA)
  if (variableResolvedType === 'FLOAT') return Number(valueForMode)

  throw new Error(
    `Error: Unable to process the variable of type ${variableResolvedType}.
    \nSuggestion: consider implementing support for this variable type before continuing.`,
  )
}

function isVariableAlias(value: unknown): value is VariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in (value as Record<string, unknown>) &&
    (value as Record<string, unknown>).type === 'VARIABLE_ALIAS' &&
    typeof (value as Record<string, unknown>).id === 'string'
  )
}
