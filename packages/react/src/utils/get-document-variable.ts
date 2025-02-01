// Hynix: getDocumentVariable [v0.0.1]

export function getDocumentVariable(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}
