export function replaceAliasWithRawImport(rawCode: string) {
  return rawCode.replace(/@r/g, '@')
}
