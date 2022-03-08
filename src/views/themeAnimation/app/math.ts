export function random(base: number | number[]): number {
  if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0]
  return Math.random() * base
}
export function pickRandom<T = any>(arr: T | T[]): T {
  if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)]
  return arr
}

export function lerp(
  current: number,
  target: number,
  speed: number = 0.1,
  limit: number = 0.001
): number {
  let change = (target - current) * speed
  if (Math.abs(change) < limit) {
    change = target - current
  }
  return change
}

export function formattedAlpha(
  current: number,
  target: number,
  limit: number = 0.001
): number {
  const alpha = Math.max(Math.min(current / target, 1), 0)
  if (alpha < limit) return 0
  if (1 - alpha < limit) return 1
  return alpha
}
