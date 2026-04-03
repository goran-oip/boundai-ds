/** Five-point star path in 20×20 viewBox (Figma star icon frame). */
export const STAR_PATH_D =
  'M10 1.66 12.47 7.6 19 8.55 14.27 13.15 15.39 19.65 10 16.9 4.61 19.65 5.73 13.15 1 8.55 6.53 7.6 10 1.66z'

/**
 * Figma **Star icon** (`1232:9`) — horizontal clip width in viewBox units (20×20) for each 10% step.
 * Not linear: matches Design System v1.1 (e.g. 10% → 3, 50% → 10, 90% → 17).
 */
export const STAR_FILL_CLIP_WIDTH_U = [0, 3, 5, 7, 9, 10, 11, 13, 15, 17, 20] as const

/** Clip width for `fill` 0–100 (interpolates between 10% steps). */
export function starClipWidthForFill(fill: number): number {
  const f = Math.min(100, Math.max(0, fill))
  const n = f / 10
  const i0 = Math.floor(n)
  const i1 = Math.min(10, Math.ceil(n))
  const t = n - i0
  const w0 = STAR_FILL_CLIP_WIDTH_U[i0]
  const w1 = STAR_FILL_CLIP_WIDTH_U[i1]
  return w0 + (w1 - w0) * t
}
