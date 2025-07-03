import { z } from 'zod'

export const RegistrySchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()),
  registryDependencies: z.array(z.string()),
  file: z.object({
    name: z.string(),
    content: z.string(),
  }),
})
