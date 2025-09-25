export type TokenKind = 'color' | 'dimension' | 'text' | 'shadow' | 'gradient'

export type TokenBaseItem = {
  kind: TokenKind
  name: string
  description: string
  path: string[]
  collection: string
  value: {
    [key: string]: string | number
  }
}

export type TokenGroup = {
  fileName: string
  content: TokenTree
}

export type TokenTree = {
  [key: string]:
    | TokenTree
    | {
        $type: string
        $value: unknown
      }
}

export type TokensExport = {
  source: 'figma-token-system'
  version: 1
  exportedAt: string
  exportedBy: string
  items: TokenGroup[]
}
