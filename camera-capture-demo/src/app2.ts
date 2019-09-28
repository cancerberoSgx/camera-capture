// this example takes rgba image data frames abd uses jimp to convert to jpeg to finally render in node-gui. 
// is not optimal - imagedata is basically not used/not supported - see app2.ts for more optimal approach
import { showModal } from './showModal'
import { VideoCapture, ImageData } from 'camera-capture'
import { Window, Container, MessageLoop, Image, Label, Button, FileOpenDialog, FileDialog, FileSaveDialog } from 'gui'
import { realpathSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { getExtensionsForMimeType } from 'misc-utils-of-mine-generic'
import { getProp } from './state'

async function main() {

  // let frameBuffer: Buffer = readFileSync(realpathSync(join(__dirname, 'n.png')))
  let img: Image = Image.createEmpty()//.createFromBuffer(frameBuffer, 1)

  const win = Window.create({})
  win.onClose = () => {
    capture.stopCamera().then(() => process.exit(0)).catch(() => process.exit(1))
  }
  const contentView = Container.create()
  win.setContentView(contentView)
  win.setContentSize({ width: 600, height: 600, })

  contentView.setStyle({ flex: 1, width: '100%', height: '100%', flexDirection: 'column' })
  const options = Container.create()
  options.setStyle({ flex: 1, width: '100%', maxHeight: '20px', flexDirection: 'row' })
  contentView.addChildView(options)


  const pause = Button.create('pause')
  pause.setStyle({ flexDirection: 'column' })
  options.addChildView(pause)
  pause.onClick = async () => await capture.pause()

  const resume = Button.create('resume')
  resume.setStyle({ flexDirection: 'column' })
  options.addChildView(resume)
  resume.onClick = async () => await capture.resume()

  const stop = Button.create('stopCamera')
  stop.setStyle({ flexDirection: 'column' })
  options.addChildView(stop)
  stop.onClick = async () => {
    MessageLoop.postDelayedTask(200, async () => await capture.stop())
  }

  const start = Button.create('startCamera')
  start.setStyle({ flexDirection: 'column' })
  options.addChildView(start)
  start.onClick = async () => {
    MessageLoop.postDelayedTask(200, async () => await capture.start())
  }

  const save = Button.create('Save photo')
  save.setStyle({ flexDirection: 'column' })
  options.addChildView(save)
  save.onClick = async () => {
    await capture.pause()
    await handleSave(win, Buffer.from(lastFrame.data), getExtensionsForMimeType(getProp('mime')) || ['png'])
    await capture.resume()
  }

  const open = Button.create('Open file')
  open.setStyle({ flexDirection: 'column' })
  open.onClick = async () => {
    await capture.pause()
    await showModal({ parent: win, title: 'Not implemented yet' })
    await capture.resume()
  }
  options.addChildView(open)

  const fps = Label.create('0 FPS')
  fps.setStyle({ flexDirection: 'column' })
  options.addChildView(fps)

  const startRecording = Button.create('Start recording')
  startRecording.setStyle({ flexDirection: 'column' })
  startRecording.onClick = async () => {
    await capture.startRecording()
  }
  options.addChildView(startRecording)

  const stopRecording = Button.create('stop recording')
  stopRecording.setStyle({ flexDirection: 'column' })
  stopRecording.onClick = async () => {
    const data = await capture.stopRecording()
    if(data){
     await capture.pause()
    await handleSave(win, Buffer.from(data),  ['webm'])
    await capture.resume()
    }
  }
  options.addChildView(stopRecording)




  const canvas = Container.create()
  canvas.setStyle({ flex: 1, width: '100%', height: '100%', flexDirection: 'row', flexGrow: 1 })
  contentView.addChildView(canvas)
  canvas.onDraw = (self, painter, dirty) => {
    painter.drawImageFromRect(img, dirty, dirty)
  }

  let counter = 0
  setInterval(() => {
    fps.setText(`${counter} FPS`)
    counter = 0
  }, 1000)

  const capture = new VideoCapture({
    debug: true,
    width: 480,
    height: 320,
    mkdirServed: true,
    port: 8081,
    mime: getProp('mime'),
    constrains: {
      audio: false, video: {
        aspectRatio: 1,
        width: 480,
        height: 320
      }
    }
  })

  let lastFrame: ImageData
  capture.addFrameListener(async frame => {
    lastFrame = frame
    img = frame && frame.data && frame.data.length ? Image.createFromBuffer(frame.data, 1) : img
    canvas.schedulePaint()
    counter++
  })

  startEventLoop()

  function startEventLoop() {
    console.log('Starting event loop');
    //  heads up - we need to activate here and not after the capturer fr some reason
    win.center()
    win.activate()
    if (!process.versions.yode) {
      MessageLoop.run()
    }
    MessageLoop.postDelayedTask(1000, async () => await capture.start())
  }
}

main()



// async  function handleOpen() {
//   const dialog = FileOpenDialog.create()
//   dialog.setOptions(FileDialog.optionShowHidden)
//   dialog.setFilters([
//     { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
//   ])
//   if (dialog.runForWindow(this.win)) {
//     setState(await this.buildBuffers(readFileSync(dialog.getResult())))
//   }
// }

async function handleSave(w: Window, file: Buffer, extensions: string[]) {
  const dialog = FileSaveDialog.create()
  dialog.setOptions(FileDialog.optionShowHidden)
  dialog.setFilters([
    { description: 'Images', extensions },
  ])
  if (dialog.runForWindow(w)) {
    // setState({
    //   working: 'Processing...',
    // })
    // await sleep(20)
    // const result = mainSync({
    //   command: `convert output.miff '${basename(dialog.getResult())}'`,
    //   inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    // })
    // if (checkError(result, this.state)) {
    //   return
    // }
    // if (result.outputFiles.length) {
    writeFileSync(dialog.getResult(), file)
    showModal({ parent: w, title: 'File Saved', closeIn: 5000, body: 'File successfully saved at \n' + dialog.getResult() })
    // }
    // else {
    //   showModal({ title: 'Error', body: 'An error occurred while trying to save file \n' + dialog.getResult() + ': \n' + result.error + '\n' + result.stderr.join(', '), closeIn: 5000  , state: this.state})
    // }
    // setState({ working: undefined })
  }
}

