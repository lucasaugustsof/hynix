import { z } from 'zod'

import { createConfigFile } from '@/utils/config-file'

const aliasesSchema = z.record(
  z.string().min(1, 'Alias name cannot be empty'),
  z.string().min(1, 'Alias path cannot be empty')
)

const tailwindSchema = z.object({
  /** Path to the global CSS file */
  css: z.string().min(1, 'CSS path cannot be empty'),
})

/**
 * Schema for Hynix configuration file (hynix.json)
 */
export const configSchema = z.object({
  /** Whether React Server Components are enabled */
  rsc: z.boolean().default(false),

  /** Whether TypeScript JSX/TSX is used */
  tsx: z.boolean().default(true),

  /** Path aliases for imports */
  aliases: aliasesSchema,

  /** Tailwind CSS configuration */
  tailwind: tailwindSchema.optional(),
})

/**
 * Inferred TypeScript type from the config schema
 */
export type HynixConfig = z.infer<typeof configSchema>

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: HynixConfig = {
  rsc: false,
  tsx: true,
  aliases: {
    components: '@/components',
    utils: '@/utils',
    hooks: '@/hooks',
    styles: '@/styles',
  },
}

/**
 * Validates and parses a configuration object
 * @param data - Raw configuration data to validate
 * @returns Parsed and validated configuration
 * @throws ZodError if validation fails
 */
export function validateConfig(data: unknown): HynixConfig {
  return configSchema.parse(data)
}

/**
 * Safely validates a configuration object without throwing
 * @param data - Raw configuration data to validate
 * @returns Success result with parsed config or error result
 */
export function safeValidateConfig(data: unknown) {
  return configSchema.safeParse(data)
}

/**
 * Type-safe ConfigFile instance with Zod validation
 * Use this for reading/writing Hynix configuration with automatic validation
 */
export const hynixConfigTyped = createConfigFile(configSchema)
