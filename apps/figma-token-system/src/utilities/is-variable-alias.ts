export function isVariableAlias(value: unknown): value is VariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in (value as Record<string, unknown>) &&
    (value as Record<string, unknown>).type === 'VARIABLE_ALIAS' &&
    typeof (value as Record<string, unknown>).id === 'string'
  )
}
