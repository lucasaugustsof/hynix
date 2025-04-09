export function parseCubicBezierValues(cubicBezierString: string): number[] {
  const bezierParamsString = cubicBezierString.slice(13, -1)

  const bezierValues = bezierParamsString
    .split(',')
    .map(value => Number(value.trim()))

  return bezierValues
}
