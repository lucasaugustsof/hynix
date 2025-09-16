import { toRGB } from '../utilities/to-rgb'

type ColorByMode = Record<
  string,
  {
    data: {
      type: 'color'
      value: string
    }
  }
>

type FloatByMode = Record<
  string,
  {
    data: {
      type: 'float'
      value: number
      unit: 'PX'
    }
  }
>

type ColorVariableValue = {
  kind: 'COLOR'
  byMode: ColorByMode
}

type FloatVariableValue = {
  kind: 'FLOAT'
  byMode: FloatByMode
}

type VariablePayload = {
  id: string
  name: string
  type: 'VARIABLE'
  description: string
  collectionName: string
  value: ColorVariableValue | FloatVariableValue
}

export async function fetchLocalVariables(): Promise<VariablePayload[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const variables = await figma.variables.getLocalVariablesAsync()

  const variableNameMap = new Map<string, string>()
  const payloadByVarId = new Map<string, VariablePayload>()

  variables.forEach(variable => {
    variableNameMap.set(variable.id, variable.name)
  })

  for (const collection of collections) {
    const collectionName = collection.name
      .toLowerCase()
      .replace(/^\d+-/, ' ')
      .trim()

    for (const { modeId, name: modeLabel } of collection.modes) {
      for (const variable of variables) {
        if (variable.variableCollectionId !== collection.id) continue

        try {
          const processedValue = processVariableValue(
            variable,
            modeId,
            variableNameMap,
          )

          payloadByVarId.set(variable.id, {
            id: variable.id,
            type: 'VARIABLE',
            name: variable.name.replace(/-/g, '/'),
            description: variable.description,
            collectionName,
            value: createVariableValue(
              variable.resolvedType,
              modeLabel,
              processedValue,
            ),
          })
        } catch (err) {
          console.error(err.message)
        }
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

function createVariableValue(
  resolvedType: string,
  modeLabel: string,
  processedValue: string | number,
): ColorVariableValue | FloatVariableValue {
  const DEFAULT_MODE = 'default'
  const isColorType = resolvedType === 'COLOR'

  // When a collection has only one mode, Figma automatically names it "Mode 1".
  // We rename this case to maintain consistent naming across all modes.
  if (modeLabel === 'Mode 1') {
    modeLabel = modeLabel.replace(modeLabel, DEFAULT_MODE)
  }

  return {
    kind: isColorType ? 'COLOR' : 'FLOAT',
    byMode: {
      [modeLabel.toLowerCase()]: {
        data: {
          type: isColorType ? 'color' : 'float',
          value: processedValue,
          ...(isColorType
            ? {}
            : {
                unit: 'PX',
              }),
        },
      },
    },
  } as ColorVariableValue | FloatVariableValue
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
