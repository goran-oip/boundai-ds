import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'

type A11yStoryEntry =
  | {
      id: string
      title: string
      name: string
      skipped: true
      reason: string
    }
  | {
      id: string
      title: string
      name: string
      skipped?: false
      violationCount: number
      /** Sum of failing nodes across all rules */
      failingNodeCount: number
      incompleteCount: number
      passes: number
      violations: import('axe-core').Result['violations']
      incomplete: import('axe-core').Result['incomplete']
    }

function reportsDir() {
  return join(process.cwd(), 'reports')
}

/** One NDJSON file per Jest worker so parallel runs do not clobber each other. */
function ndjsonPath() {
  const w = process.env.JEST_WORKER_ID ?? '0'
  return join(reportsDir(), `a11y-stories-w${w}.ndjson`)
}

function appendStory(entry: A11yStoryEntry) {
  appendFileSync(ndjsonPath(), `${JSON.stringify(entry)}\n`, 'utf8')
}

function mergeNdjsonToReport() {
  const dir = reportsDir()
  if (!existsSync(dir)) {
    return
  }
  const shardFiles = readdirSync(dir).filter((f) => /^a11y-stories-w\d+\.ndjson$/.test(f))
  const collected: A11yStoryEntry[] = []
  for (const f of shardFiles.sort()) {
    const raw = readFileSync(join(dir, f), 'utf8').trim()
    if (!raw) continue
    for (const line of raw.split('\n')) {
      if (line.trim()) collected.push(JSON.parse(line) as A11yStoryEntry)
    }
  }
  if (collected.length === 0) {
    writeFileSync(
      join(dir, 'a11y-report.json'),
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          summary: {
            storiesScanned: 0,
            storiesWithViolations: 0,
            totalViolationRules: 0,
            totalFailingNodes: 0,
          },
          stories: [],
        },
        null,
        2,
      ),
      'utf8',
    )
    return
  }

  const storiesWithViolations = collected.filter(
    (s) => !('skipped' in s && s.skipped) && s.violationCount > 0,
  )
  const totalFailingNodes = collected.reduce((acc, s) => {
    if ('skipped' in s && s.skipped) return acc
    return acc + s.failingNodeCount
  }, 0)

  const payload = {
    generatedAt: new Date().toISOString(),
    summary: {
      storiesScanned: collected.length,
      storiesWithViolations: storiesWithViolations.length,
      /** Sum of rule entries (same rule can appear in multiple stories) */
      totalViolationRules: collected.reduce((acc, s) => {
        if ('skipped' in s && s.skipped) return acc
        return acc + s.violationCount
      }, 0),
      totalFailingNodes,
    },
    stories: collected,
  }

  writeFileSync(join(reportsDir(), 'a11y-report.json'), JSON.stringify(payload, null, 2), 'utf8')
}

const config: TestRunnerConfig = {
  setup() {
    mkdirSync(reportsDir(), { recursive: true })
    // Do not truncate here: Jest reloads this module between story files, which would wipe prior shards.
    // Run `node scripts/clear-a11y-reports.mjs` before `test-storybook` (see npm script `test:a11y`).
  },

  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context)

    if (storyContext.parameters?.a11y?.disable === true) {
      appendStory({
        id: context.id,
        title: context.title,
        name: context.name,
        skipped: true,
        reason: 'parameters.a11y.disable',
      })
      return
    }

    let builder = new AxeBuilder({ page })
    const axeOptions = storyContext.parameters?.a11y?.options
    if (axeOptions && typeof axeOptions === 'object') {
      builder = builder.options(axeOptions)
    }

    if ((await page.locator('#storybook-root').count()) > 0) {
      builder = builder.include('#storybook-root')
    } else if ((await page.locator('#root').count()) > 0) {
      builder = builder.include('#root')
    }

    const axe = await builder.analyze()
    const failingNodeCount = axe.violations.reduce((sum, v) => sum + v.nodes.length, 0)

    appendStory({
      id: context.id,
      title: context.title,
      name: context.name,
      violationCount: axe.violations.length,
      failingNodeCount,
      incompleteCount: axe.incomplete.length,
      passes: axe.passes?.length ?? 0,
      violations: axe.violations,
      incomplete: axe.incomplete,
    })
  },
}

process.on('exit', () => {
  try {
    mergeNdjsonToReport()
  } catch {
    // ignore
  }
})

export default config
