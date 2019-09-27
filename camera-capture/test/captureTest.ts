import test from 'ava'
import { VideoCapture } from '../src/capture'
import fileType from 'file-type'
import { writeFileSync, readFileSync } from 'fs'
import { sleep } from 'misc-utils-of-mine-generic'

test.serial.cb('addFrameListener single ', t => {
  const c = new VideoCapture({ port: 8082, width: 480, height: 360 })
  c.addFrameListener(frame => {
    t.deepEqual([frame.width, frame.height, frame.data.length], [480, 360, 691200])
    // c.stop()
    t.end()
  })
  c.start()
})

test.serial.cb('addFrameListener multiple ', t => {
  let i = 0
  let t0 = Infinity
  const N = 50
  const c = new VideoCapture({
    width: 200, height: 200, port: 8081
  })
  c.addFrameListener(frame => {
    i++
    t.deepEqual([frame.width, frame.height, frame.data.length], [200, 200, 160000])
    if (i > N) {
      console.log(`${N} frames in ` + (Date.now() - t0))
      // c.stop().then(
        t.end()
        // )
    }
  })
  c.initialize().then(() => {    
    t0 = Date.now()  
    c.start()
  })
})

test.serial('users requesting frames instead notifications', async t => {
  const c = new VideoCapture({
    width: 100, height: 100, port: 8083
  })
  await c.initialize()
  const f = await c.readFrame()
  const f2 = await c.readFrame()
  t.deepEqual([f.width, f.height, f.data.length], [100, 100, 40000])
  t.deepEqual([f2.width, f2.height, f2.data.length], [100, 100, 40000])
  t.true(f !== f2)
  await c.stop()

})

test.serial.only('encoded frames - default format given in options', async t => {
  const c = new VideoCapture({
    width: 480, height: 320, port: 8084, mime: 'image/png'
  })

  await c.initialize()
   await c.readFrame()
    await c.readFrame()
    await sleep(500)
  const f = await c.readFrame()
  t.deepEqual(fileType(Buffer.from(f.data)), { ext: 'png', mime: 'image/png' })
  writeFileSync('tmp.png', Buffer.from(f.data.buffer))
  t.deepEqual(fileType(readFileSync('tmp.png')), { ext: 'png', mime: 'image/png' })

  const f2 = await c.readFrame('image/jpeg')
  t.deepEqual(fileType(Buffer.from(f2.data)), { ext: 'jpg', mime: 'image/jpeg' })
  writeFileSync('tmp.jpg', Buffer.from(f2.data.buffer))
  t.deepEqual(fileType(readFileSync('tmp.jpg')), { ext: 'jpg', mime: 'image/jpeg' })

  const f3 = await c.readFrame('image/webp')
  t.deepEqual(fileType(f3.data.buffer), { ext: 'webp', mime: 'image/webp' })
  writeFileSync('tmp.webp', Buffer.from(f3.data.buffer))
  t.deepEqual(fileType(readFileSync('tmp.webp')), { ext: 'webp', mime: 'image/webp' })

  await c.stop()
})

test.todo('pause, resume, stop')
