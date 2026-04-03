/**
 * Rewrites `id="…"` and `url(#…)` / `href="#…"` in an SVG fragment so multiple
 * instances on one page do not collide (circle-flags / brand marks reuse ids).
 */
export function rewriteSvgIds(fragment: string, prefix: string): string {
  const seen = new Set<string>()
  for (const m of fragment.matchAll(/\bid="([^"]+)"/g)) {
    seen.add(m[1])
  }
  /** Longest first so shorter ids never truncate longer ones */
  const ids = [...seen].sort((a, b) => b.length - a.length)
  let out = fragment
  for (const id of ids) {
    const next = `${prefix}-${id}`
    out = out.replaceAll(`id="${id}"`, `id="${next}"`)
    out = out.replaceAll(`url(#${id})`, `url(#${next})`)
    out = out.replaceAll(`href="#${id}"`, `href="#${next}"`)
  }
  return out
}
