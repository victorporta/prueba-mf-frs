import { z } from 'zod'

export const PokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonListItemSchema),
})

export type PokemonListItemDto = z.infer<typeof PokemonListItemSchema>
export type PokemonListDto = z.infer<typeof PokemonListSchema>
