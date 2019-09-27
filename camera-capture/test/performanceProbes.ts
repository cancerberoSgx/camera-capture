import { sleep } from 'misc-utils-of-mine-generic'
import { VideoCapture } from '../src/capture'

async function rgba480x320() {
  const c = new VideoCapture({ port: 8012, width: 480, height: 320, mime: 'rgba' })
  let counter = 0
  c.addFrameListener(f => {
    counter++
  })
  const t = setInterval(() => {
    console.log(`rgba480x320 ${counter++} FPS`)
    counter = 0
  }, 1000)
  setTimeout(async () => {
    clearInterval(t)
    await sleep(1200)
    c.stop()
  }, 15000)
  await c.start()
}
// rgba480x320()

async function jpg480x320() {
  const c = new VideoCapture({ port: 8013, width: 480, height: 320, mime: 'image/jpeg' })
  let counter = 0
  c.addFrameListener(f => {
    counter++
  })
  const t = setInterval(() => {
    console.log(`jpg480x320 ${counter++} FPS`)
    counter = 0
  }, 1000)
  setTimeout(async () => {
    clearInterval(t)
    await sleep(1200)
    await c.stop()
  }, 15000)
  await c.start()
}



(async () => {
  await rgba480x320()
  await jpg480x320()
})()


// async function perfCheat1() {
//   class C extends CaptureBase {
//     // hack = new SharedArrayBuffer(200)// {data: {}}
//     async initialize() {
//       // this.hack.
//       await super.initialize()
//       // console.log(this.hack);
//       await this.page!.exposeFunction('hack', () => {

//       })
//       // await this.page!.exposeFunction('hack', ()=>this.hack)

//       await this.page!.evaluate(() => {
//         (window as any).arr = new Uint8ClampedArray(1024 * 1024);
//       })

//       console.time('a')
//       const test1 = new Uint8ClampedArray(await this.page!.evaluate(() => {
//         return Array.from((window as any).arr) as number[]
//       }))
//       console.timeEnd('a')
//       console.log(test1.length / 1024 / 1024);


//       console.time('b')
//       const test2 = new TextEncoder().encode(await this.page!.evaluate(() => {
//         // new TextEncoder().encode()
//         return new TextDecoder().decode((window as any).arr)
//         // return Array.from((window as any).arr) as number[]
//       }))
//       console.timeEnd('b')
//       console.log(test2.length / 1024 / 1024);


//       // const d = new TextDecoder('s', {encoding:'windows-1252'})
//       // d.encoding='windows-1252'
//       // await this.page!.evaluate((s)=>{
//       //    (window as any).fileContents3 = new Uint8ClampedArray(new TextEncoder().encode(s).buffer)
//       //   }, new TextDecoder().decode(new Uint8ClampedArray(readFileSync('test/assets/lenna.jpg').buffer)))

//       // await this.page!.evaluate((s)=>{
//       //   try {
//       //   // eval(s)
//       //   //@ts-ignore
//       //   console.log(window.Buffer, window.require)

//       //   } catch (error) {
//       //     console.error(error)
//       //   }
//       //   }, readFileSync('test/assets/buffer-5.4.3.min.js').toString())
//     await this.page!.addScriptTag({content:  readFileSync('src/assets/buffer-5.4.3.min.js').toString() })


// // load 'buffer' library. It will be available at window.buffer.Buffer.
// // await this.page!.evaluate((s) => eval(s), readFileSync('test/assets/buffer-5.4.3.min.js').toString())

// // store an image as a Buffer in window.fileContents3 global variable (simulates the image array buffer view extracted from canvas)
// await this.page!.evaluate((s) =>
//   // @ts-ignore
//   window.fileContents3 = window.buffer.Buffer.from(s, 'binary')
//   , readFileSync('test/assets/lenna.jpg').toString('binary'))

// console.time('c')
// // get the encoded image as Node.js Buffer
// const fileContents = Buffer.from(await this.page!.evaluate(() =>
//   // @ts-ignore
//   window.fileContents3.toString('binary')
// ), 'binary')
// console.timeEnd('c')

// writeFileSync('tmp_l1.jpg', fileContents)

//       // console.log(test3.length/1024/1024);
//       // writeFileSync('tmp_l.jpg',Buffer.from(test3) )
//       // // writeFileSync('tmp_l2.jpg', readFileSync('test/assets/lenna.jpg' ).toString('binary'), {encoding: 'binary'})
//       // // writeFileSync('tmp_l4.jpg',new Uint8ClampedArray(test3))
//       // // writeFileSync('tmp_l5.jpg',new Uint8ClampedArray(test3.buffer))
//     }
//   }
//   const c = new C({ port: 8014 })
//   await c.initialize()
// }
// perfCheat1()
