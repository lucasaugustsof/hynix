export function normalizeVariableName(rawName: string): string {
  return rawName.replace(/\//g, '-').replace(/ /g, '_')
}
