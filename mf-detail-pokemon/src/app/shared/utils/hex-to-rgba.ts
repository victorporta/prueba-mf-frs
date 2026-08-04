export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '').trim()
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized

  if (full.length !== 6) {
    return `rgba(107, 114, 128, ${alpha})`
  }

  const r = Number.parseInt(full.slice(0, 2), 16)
  const g = Number.parseInt(full.slice(2, 4), 16)
  const b = Number.parseInt(full.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
