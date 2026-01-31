import { promises as fs } from 'node:fs'

/**
 * Reads existing registry file and returns dates if present
 * @param {string} filePath
 * @returns {Promise<{ createdAt: string | null, updatedAt: string | null }>}
 */
export async function getExistingDates(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const existing = JSON.parse(content)

    return {
      createdAt: existing.createdAt || null,
      updatedAt: existing.updatedAt || null,
    }
  } catch {
    return {
      createdAt: null,
      updatedAt: null,
    }
  }
}

/**
 * Checks if content has changed by comparing files array
 * @param {string} filePath
 * @param {object[]} newFiles
 * @returns {Promise<boolean>}
 */
export async function hasContentChanged(filePath, newFiles) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const existing = JSON.parse(content)

    const existingFiles = existing.files || []

    if (existingFiles.length !== newFiles.length) {
      return true
    }

    for (let i = 0; i < newFiles.length; i++) {
      const newFile = newFiles[i]
      const existingFile = existingFiles.find(f => f.name === newFile.name)

      if (!existingFile || existingFile.content !== newFile.content) {
        return true
      }
    }

    return false
  } catch {
    return true
  }
}

/**
 * Calculates createdAt and updatedAt based on existing file and content changes
 * @param {string} filePath
 * @param {object[]} newFiles
 * @returns {Promise<{ createdAt: string, updatedAt: string }>}
 */
export async function calculateDates(filePath, newFiles) {
  const now = new Date().toISOString()

  const { createdAt: existingCreatedAt, updatedAt: existingUpdatedAt } =
    await getExistingDates(filePath)

  const createdAt = existingCreatedAt || now
  const contentChanged = await hasContentChanged(filePath, newFiles)
  const updatedAt = contentChanged ? now : existingUpdatedAt || now

  return {
    createdAt,
    updatedAt,
  }
}
