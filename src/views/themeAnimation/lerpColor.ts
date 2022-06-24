// #000000
type ColorString = string

const lerpColorN = (pFrom: number, pTo: number, pRatio: number): number => {
  const ar = (pFrom & 0xff0000) >> 16
  const ag = (pFrom & 0x00ff00) >> 8
  const ab = pFrom & 0x0000ff

  const br = (pTo & 0xff0000) >> 16
  const bg = (pTo & 0x00ff00) >> 8
  const bb = pTo & 0x0000ff

  const rr = ar + pRatio * (br - ar)
  const rg = ag + pRatio * (bg - ag)
  const rb = ab + pRatio * (bb - ab)

  return (rr << 16) + (rg << 8) + (rb | 0)
}

const easing = (duration: number, setter: (value: number) => void): void => {
  const start = new Date().getTime()
  const cb = (): void => {
    const now = new Date().getTime()
    const p = (now - start) / duration
    if (p < 1) {
      setter(p)
      requestAnimationFrame(cb)
    } else {
      setter(1)
    }
  }
  cb()
}

const lerpColor = (
  from: ColorString,
  to: ColorString,
  duration: number,
  setter: (value: ColorString) => void
): void => {
  const pFrom = +from.replace('#', '0x')
  const pTo = +to.replace('#', '0x')

  easing(duration, (ratio) => {
    const c = lerpColorN(pFrom, pTo, ratio)
    setter('#' + c.toString(16))
  })
}

export default lerpColor
