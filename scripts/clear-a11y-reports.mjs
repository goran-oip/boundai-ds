#!/usr/bin/env node
/**
 * Removes prior axe NDJSON shards and merged report so `npm run test:a11y` starts clean.
 * (Jest reloads the test-runner module per file, so in-setup truncation cannot be trusted.)
 */
import { existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(process.cwd(), 'reports')
if (!existsSync(dir)) {
  process.exit(0)
}
for (const f of readdirSync(dir)) {
  if (
    /^a11y-stories-w\d+\.ndjson$/.test(f) ||
    f === 'a11y-stories.ndjson' ||
    f === 'a11y-report.json'
  ) {
    rmSync(join(dir, f), { force: true })
  }
}
