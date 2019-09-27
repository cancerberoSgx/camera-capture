// this example takes rgba image data frames abd uses jimp to convert to jpeg to finally render in node-gui. 
// is not optimal - imagedata is basically not used/not supported - see app2.ts for more optimal approach
import {tryTo, sleep} from 'misc-utils-of-mine-generic'
import { VideoCapture, ImageData } from 'camera-capture'
import { Window, Container, MessageLoop, Image, Label, Button } from 'gui'
import { realpathSync, readFileSync } from 'fs'
import { join } from 'path'

async function main() {

  let frameBuffer: Buffer = readFileSync(realpathSync(join(__dirname, 'n.png')))
  let img: Image = Image.createFromBuffer(frameBuffer, 1)

  const w = Window.create({})
  w.onClose=()=>{
    capture.stopCamera().then(()=>process.exit(0)).catch(()=>process.exit(1))
  }
  const c2 = Container.create()
  w.setContentView(c2)
  w.setContentSize({ width: 600, height: 600, })

  c2.setStyle({ flex: 1, width: '100%', height: '100%', flexDirection: 'column' })
  const options = Container.create()
  options.setStyle({flex: 1,   width: '100%', maxHeight: '20px', flexDirection: 'row' })
  c2.addChildView(options)

  const fps = Label.create('0 FPS')
  fps.setStyle({ flexDirection: 'column' })
  options.addChildView(fps)

  const pause = Button.create('pause')
  pause.setStyle({ flexDirection: 'column' })
  options.addChildView(pause)
  pause.onClick=()=>
    capture.pause()
  
  const resume = Button.create('resume')
  resume.setStyle({ flexDirection: 'column' })
  options.addChildView(resume)
  resume.onClick=()=>
    capture.resume()
  
    const stop = Button.create('stopCamera')
  stop.setStyle({ flexDirection: 'column' })
  options.addChildView(stop)
  stop.onClick=async ()=>{
    // await sleep(1100)
    MessageLoop.postDelayedTask(200, async ()=>await capture.stop())
    
    // await sleep(1100)
    
  }
   const start = Button.create('startCamera')
  start.setStyle({ flexDirection: 'column' })
  options.addChildView(start)
  start.onClick=async ()=>{
  // await sleep(1100)
  try {
    // await capture.start()
    //  startEventLoop()
    MessageLoop.postDelayedTask(200, async ()=>await capture.start())

  } catch (error) {
    console.log('start error', error, error.stack);
    
  }
    // await sleep(1100)
  }
  const canvas = Container.create()
  canvas.setStyle({ flex: 1, width: '100%', height: '100%', flexDirection: 'row', flexGrow: 1 })
  c2.addChildView(canvas)
  canvas.onDraw = (self, painter, dirty) => {
    painter.drawImageFromRect(img, dirty, dirty)
  }
  let counter = 0
  setInterval(() => {
    fps.setText(`${counter} FPS`)
    counter = 0
  }, 1000)

  const capture = new VideoCapture({
    debug: true, width: 480, height: 360, mkdirServed: true, port: 8081, 
    mime: 'image/jpeg', constrains: 
    {
      audio: false, video: {aspectRatio: 1, width: 480, height: 360
    }}
  })
  
  capture.addFrameListener(async frame => {
    img = frame && frame.data && frame.data.length ? Image.createFromBuffer(frame.data, 1) : img
    canvas.schedulePaint()
    counter++
  })

  // await capture.start()
    console.log('Starting event loop');
 startEventLoop()
    MessageLoop.postDelayedTask(1000, async ()=>await capture.start())

function startEventLoop(){
  // if(typeof MessageLoop.run!=='undefined'){

  //  heads up - we need to activate here and not after the capturer fr some reason
  w.center()
  w.activate()
   if (!process.versions.yode) {
    MessageLoop.run()
    console.log('Good bye');
    // w.close()
  }else {
    console.log('Good bye22222');
  }
}
}

main()