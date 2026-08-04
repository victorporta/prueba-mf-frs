import { z } from 'zod'

export const PokemonTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  pokemon: z.array(
    z.object({
      pokemon: z.object({
        name: z.string(),
        url: z.string(),
      }),
    }),
  ),
})

export type PokemonTypeDto = z.infer<typeof PokemonTypeSchema>
