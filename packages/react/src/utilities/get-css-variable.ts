export function getCssVariable(variableName: string): string | number {
  const rootElementStyles = getComputedStyle(document.documentElement)
  return rootElementStyles.getPropertyValue(variableName).trim()
}
