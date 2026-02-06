import fs from 'node:fs/promises'
import path from 'node:path'

import { lilconfig } from 'lilconfig'
import type { z } from 'zod'

import type { HynixConfig } from '@/schemas/config'

import { CONFIG_FILE_NAME, CWD } from './const'

/**
 * Utility class for managing configuration files
 * Handles reading, writing, and deleting configuration files
 */
export class ConfigFile<T = HynixConfig> {
  private readonly searchPlaces: string[]
  private readonly configName: string
  private readonly schema?: z.ZodSchema<T>

  constructor(
    configName = 'hynix',
    searchPlaces: string[] = [CONFIG_FILE_NAME],
    schema?: z.ZodSchema<T>
  ) {
    this.configName = configName
    this.searchPlaces = searchPlaces
    this.schema = schema
  }

  /**
   * Searches for an existing configuration file
   * @returns Configuration file path and content, or null if not found
   */
  async find() {
    const result = await lilconfig(this.configName, {
      cache: false,
      searchPlaces: this.searchPlaces,
      ignoreEmptySearchPlaces: false,
    }).search()

    if (!result) {
      return null
    }

    return {
      filepath: result.filepath,
      config: result.config as T,
    }
  }

  /**
   * Checks if a configuration file exists
   * @returns True if configuration exists, false otherwise
   */
  async exists(): Promise<boolean> {
    const result = await this.find()
    return result !== null
  }

  /**
   * Reads the configuration file
   * @returns Configuration content (validated if schema is provided)
   * @throws Error if configuration file is not found or validation fails
   */
  async read(): Promise<T> {
    const result = await this.find()

    if (!result) {
      throw new Error(`Configuration file not found in: ${this.searchPlaces.join(', ')}`)
    }

    // Validate with schema if provided
    if (this.schema) {
      return this.schema.parse(result.config)
    }

    return result.config
  }

  /**
   * Writes content to the configuration file
   * @param content - Content to write to the file (validated if schema is provided)
   * @param filename - Optional filename (defaults to first search place)
   * @returns Path to the written file
   * @throws Error if validation fails (when schema is provided)
   */
  async write(content: T, filename?: string): Promise<string> {
    // Validate with schema if provided
    const validatedContent = this.schema ? this.schema.parse(content) : content

    const targetFilename = filename ?? this.searchPlaces[0]
    const filepath = path.join(CWD, targetFilename)

    const contentString = JSON.stringify(validatedContent, null, 2)

    await fs.writeFile(filepath, contentString, 'utf-8')

    return filepath
  }

  /**
   * Deletes the configuration file
   * @returns True if file was deleted, false if file didn't exist
   */
  async delete(): Promise<boolean> {
    const result = await this.find()

    if (!result) {
      return false
    }

    await fs.unlink(result.filepath)

    return true
  }

  /**
   * Updates the configuration file by merging with existing content
   * @param updates - Partial content to merge with existing configuration
   * @returns Path to the updated file
   * @throws Error if configuration file is not found
   */
  async update(updates: Partial<T>): Promise<string> {
    const existing = await this.read()
    const merged = { ...existing, ...updates } as T

    const result = await this.find()
    const filename = result ? path.basename(result.filepath) : undefined

    return this.write(merged, filename)
  }

  /**
   * Gets the full path where the configuration file would be written
   * @param filename - Optional filename (defaults to first search place)
   * @returns Full path to the configuration file
   */
  getPath(filename?: string): string {
    const targetFilename = filename ?? this.searchPlaces[0]
    return path.join(CWD, targetFilename)
  }
}

/**
 * Default instance for Hynix configuration (without schema validation)
 * For typed version with validation, import from schemas/config
 */
export const hynixConfig = new ConfigFile('hynix')

/**
 * Creates a new ConfigFile instance with schema validation
 * @param schema - Zod schema for validation
 * @param configName - Configuration name (default: 'hynix')
 * @param searchPlaces - Places to search for config file
 */
export function createConfigFile<T = HynixConfig>(
  schema: z.ZodSchema<T>,
  configName = 'hynix',
  searchPlaces: string[] = [CONFIG_FILE_NAME]
) {
  return new ConfigFile<T>(configName, searchPlaces, schema)
}
