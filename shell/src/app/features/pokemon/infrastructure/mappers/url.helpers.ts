function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/+$/, '').split('/')
  const last = segments.at(-1)

  if (!last) {
    throw new Error(`Unable to extract id from url: ${url}`)
  }

  const id = Number(last)

  if (Number.isNaN(id)) {
    throw new Error(`Unable to extract numeric id from url: ${url}`)
  }

  return id
}

function extractOffsetFromUrl(url: string | null): number | null {
  if (!url) return null

  const offset = new URL(url).searchParams.get('offset')
  if (offset === null) return null

  const value = Number(offset)
  return Number.isNaN(value) ? null : value
}

function buildOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export const pokemonUrlHelpers = {
  extractIdFromUrl,
  extractOffsetFromUrl,
  buildOfficialArtworkUrl,
}
