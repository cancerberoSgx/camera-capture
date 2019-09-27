import test from 'ava'
import fileType from 'file-type'
import { readFileSync, writeFileSync } from 'fs'
import { VideoCapture } from '../src/capture'
import { sleep } from 'misc-utils-of-mine-generic'

test('simple recording', async t => {
  const c = new VideoCapture({ port: 8082 })
  await c.initialize()
  await c.startRecording()
  await sleep(500)
  const data = await c.stopRecording()
  t.deepEqual(fileType(data.buffer),{ ext: 'webm', mime: 'video/webm' });
})
