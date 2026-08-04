import { z } from 'zod'

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    other: z.object({
      dream_world: z.object({
        front_default: z.string().nullable(),
      }),
      'official-artwork': z.object({
        front_default: z.string().nullable(),
      }),
    }),
  }),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    }),
  ),
})

export type PokemonDto = z.infer<typeof PokemonSchema>
