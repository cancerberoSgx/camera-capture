import test from 'ava'
import { config, exec } from 'shelljs'

config.silent = true

test('--help', async t => {
  const p = exec('node bin/saudade --help')
  t.deepEqual(p.code, 0)
  t.true(p.stdout.includes('Usage:'))
  t.deepEqual(p.stderr.trim(), '')
})

test('--invalid', async t => {
  const p = exec('node bin/saudade --invalid')
  t.notDeepEqual(p.code, 0)
  t.true(p.stdout.includes('Usage:'))
  t.true(p.stderr.includes('is mandatory'))
})
