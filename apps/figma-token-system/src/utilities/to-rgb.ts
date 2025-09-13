export function toRGB({ r, g, b, a = 1 }: RGBA): string {
  const red = Math.round(r * 255)
  const green = Math.round(g * 255)
  const blue = Math.round(b * 255)

  if (a < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(2)})`
  }
  return `rgb(${red}, ${green}, ${blue})`
}
