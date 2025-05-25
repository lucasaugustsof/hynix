import { z } from 'zod/v4'

export const ManifestSchema = z.object({
  tailwind: z.object({
    css: z.string(),
  }),
  aliases: z.object({
    components: z.string(),
    utilities: z.string(),
  }),
})
