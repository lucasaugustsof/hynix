import type { TokenBaseItem, TokenGroup, TokenTree } from '../tokens-schema'

function buildTokenTree(tokens: TokenBaseItem[]): TokenTree {
  const tree: TokenTree = {}

  for (const token of tokens) {
    let current = tree

    for (let i = 0; i < token.path.length - 1; i++) {
      const segment = token.path[i]

      if (!current[segment]) {
        current[segment] = {}
      }

      current = current[segment] as TokenTree
    }

    const finalKey = token.path[token.path.length - 1]

    current[finalKey] = {
      $type: token.kind,
      $value: token.value,
      attributes: {
        ...(token.description && {
          description: token.description,
        }),
      },
    }
  }

  return tree
}

export function groupTokensByCollection(tokens: TokenBaseItem[]): TokenGroup[] {
  const collections = new Map<string, TokenBaseItem[]>()

  for (const token of tokens) {
    if (!collections.has(token.collection)) {
      collections.set(token.collection, [])
    }

    collections.get(token.collection)?.push(token)
  }

  return Array.from(collections.entries()).map(([collection, tokens]) => ({
    filename: `${collection}.json`,
    content: buildTokenTree(tokens),
  }))
}
