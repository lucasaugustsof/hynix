import path from 'node:path'

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { list as blobList, BlobError } from '@vercel/blob'

type ComponentData = {
  name: string
  url: string
  uploadedAt: Date
}

async function fetchAvailableComponentBlobs(): Promise<ComponentData[]> {
  try {
    const { blobs } = await blobList({
      mode: 'folded',
      prefix: 'components/',
    })

    const HASHED_FILENAME_REGEX = /^(.+)-([a-zA-Z0-9]{10,})\.json$/

    return blobs
      .slice(1)
      .map(blob => {
        const { pathname, uploadedAt, url } = blob
        const match = pathname.match(HASHED_FILENAME_REGEX)
        if (!match) return null

        const { base: componentName } = path.parse(match[1])
        return { name: componentName, url, uploadedAt }
      })
      .filter((c): c is ComponentData => Boolean(c))
  } catch (err) {
    if (err instanceof BlobError) {
      throw new BlobError(`Blob fetch error: ${err.message}`)
    }

    throw err
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')

    return res.status(405).json({
      error: 'Method Not Allowed',
    })
  }

  try {
    const components = await fetchAvailableComponentBlobs()
    return res.status(200).json(components)
  } catch (err) {
    if (err instanceof BlobError) {
      console.error('[BlobError] failed to list blobs:', err)

      return res
        .status(502)
        .json({ error: 'Unable to fetch component registry.' })
    }

    console.error('[UnexpectedError] an unexpected error occurred:', err)

    return res
      .status(500)
      .json({ error: 'Internal server error. Please try again later.' })
  }
}
