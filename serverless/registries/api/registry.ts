import path from 'node:path'

import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as vercelBlob from '@vercel/blob'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const availableComponentBlobs = await fetchAvailableComponentBlobs()
  res.json(availableComponentBlobs)
}

type ComponentData = {
  name: string
  url: string
  uploadedAt: Date
}

async function fetchAvailableComponentBlobs(): Promise<ComponentData[]> {
  const { blobs } = await vercelBlob.list({
    mode: 'folded',
    prefix: 'components/',
  })

  const HASHED_FILENAME_REGEX = /^(.+)-([a-zA-Z0-9]{10,})\.json$/

  const components = blobs
    .slice(1)
    .map(blob => {
      const { pathname, uploadedAt, url } = blob
      const match = pathname.match(HASHED_FILENAME_REGEX)

      if (!match) return null

      const { base: componentName } = path.parse(match[1])

      return {
        name: componentName,
        url,
        uploadedAt,
      }
    })
    .filter(Boolean) as ComponentData[]

  return components
}
