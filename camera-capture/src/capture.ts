import { checkThrow, mergeRecursive, sleep, serial } from 'misc-utils-of-mine-generic'
import { canvasToArrayBuffer, startRecording, blobToArrayBuffer } from './browser'
import { CaptureBase } from './captureBase'
import { ImageData, Listener, CaptureOptions, SupportedFormats } from './types'
import { readFileSync } from 'fs'
import { join } from 'path'

export class VideoCapture extends CaptureBase {

  protected capturing = false
  protected initialized = false
  protected lastFrame?: ImageData
  protected listeners: Listener[] = []

  constructor(protected o: CaptureOptions = {}) {
    super(o)
    this.captureLoop = this.captureLoop.bind(this)
    // this._postFrame = this._postFrame.bind(this)
    this.o.width = this.o.width || 480
    this.o.height = this.o.height || 320
  }

  // async readFrame(mime: SupportedFormats = this.o.mime || 'rgba') {
  //   if (this.initialized) {

  //   // this.lastFrame = imageData

  //    const imageData =  await this.captureFrame(mime)
  //     // await sleep(0)
  //   await this.notifyListeners(imageData as any)
  //     // return this.lastFrame!
  //   return imageData
  //   }
  //   else {
  //     throw new Error('Expected to be initialized')
  //   }
  // }

  addFrameListener(listener: Listener): void {
    this.listeners.push(listener)
  }

  protected async  notifyListeners(d: ImageData) {
    await serial(this.listeners.map(l => async () => {
      await l(d)
    }))
  }
  /**
   */
  async stopCamera() {
    checkThrow(this.server && this.browser && this.page, 'Expected started before calling stop()')
    this.initialized = false
    this.capturing = false
    await this.page!.evaluate(() => ((window as any).videoStream as MediaStream) && ((window as any).videoStream as MediaStream).getTracks().forEach(t => t.stop()))
  }

  /**
    */
  async stop() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    await this.stopCamera()
    await sleep(10)
    await super.stop()
  }

  async pause() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = false
  }

  async resume() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = true
  }

  /**
   * Starts capture. It resolved when the camera starts capturing or rejects if any error.
   */
  async start() {
    if (this.capturing) {
      throw new Error('Already capturing')
    }
    await this.initialize()
    this.capturing = true
    this.counter = 0
    await this.captureLoop()
  }

  /**
   * starts servers, browser and media streams / canvas / video in the DOM. After it resolves this instance will be ready to be handle [readFrane].
   */
  async initialize() {
    if (this.initialized) {
      return
    }
    await super.initialize()
    
    await this.page!.addScriptTag({content:  readFileSync(join(__dirname, 'assets', 'buffer-5.4.3.min.js')).toString() })
    await this.page!.evaluate((canvasToArrayBufferS, recordTestS, blobToArrayBuffer) => {
      const d = document.createElement('div')
      d.innerHTML = `<video playsinline autoplay></video><canvas></canvas>`
      document.body.append(d);
      (window as any).canvasToArrayBuffer = eval(`(${canvasToArrayBufferS})`);
      (window as any).startRecording = eval(`(${recordTestS})`);
      (window as any).blobToArrayBuffer = eval(`(${blobToArrayBuffer})`);
    }, canvasToArrayBuffer.toString(), startRecording.toString(), blobToArrayBuffer.toString())
    // await this.page!.exposeFunction('postFrame', this._postFrame)
    await this.startCamera()
    // console.log('initialize');
    this.initialized = true
  }

  async startRecording(recordOptions = { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }) {
    await this.page!.evaluate(async (recordOptionsS) => {
      const options = JSON.parse(recordOptionsS)
      await (window as any).startRecording(options)
    }, JSON.stringify(recordOptions))
  }

  async stopRecording() {
    const data = await this.page!.evaluate(async () => {
      return new Promise<number[]>(resolve => {
        const blob = new Blob((window as any).recordedBlobs, { type: 'video/webm' })
        const fr = new FileReader()
        fr.readAsArrayBuffer(blob)
        fr.onloadend = () => {
          const data = fr.result as ArrayBuffer
          resolve(Array.from(new Uint8ClampedArray(data))) // TODO: use buffer here too
        }
      })
    })
    return new Uint8ClampedArray(data)
  }

  public async readFrame(mime: SupportedFormats = this.o.mime || 'rgba') {
    if (this.initialized) {
      //TODO. perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
      //TODO: probably is faster to use canvas API to encode frames directly instead first as data - if users wants ust encoded then do that.
    const data =  await this.page!.evaluate(async (mime: SupportedFormats = 'rgba', width: number, height: number) => {
        const video = document.querySelector<HTMLVideoElement>('video')!
        const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
        canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height)
        if (mime === 'rgba') {
          const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
          //  console.log(data.data.buffer.byteLength);
          return { width: data.width, height: data.height, data: (window as any).buffer.Buffer.from(data.data).toString('binary') as string}
          // await (window as any).postFrame(data.width, data.height, Array.from(data.data.values()))
        } else {
          const data = await (window as any).canvasToArrayBuffer(canvas, mime) // TODO: use https://github.com/feross/blob-to-buffer/blob/master/index.js
          if (data) {
            // console.log(data.length);
          //  console.log(data.byteLength);
            
             return { width , height , data: (window as any).buffer.Buffer.from(data).toString('binary') as string }
            // await (window as any).postFrame(width, height, Array.from(new Uint8ClampedArray(data)))
          } else {
            // TODO: warning
            throw new Error('Should not happen 1234')
          }
        }
        // return ''
      }, mime, this.o.width!, this.o.height!)
      // console.log('captureFrame 2');
      
    const imageData = {
      width: data.width, 
      height: data.height, 
      data: Buffer.from(data.data, 'binary' )
    }

     await this.notifyListeners(imageData as any)

    return imageData
    } else{
         throw new Error('Expected to be initialized')

    }
  }


  // protected async _postFrame(width: number, height: number, data: number[]) {
  //   const imageData = {
  //     // TODO: investigate why/how to pass the buffer / vide directly without transforming it to number[]
  //     data: new Uint8ClampedArray(data),
  //     width,
  //     height
  //   }
  //   this.notifyListeners(imageData)
  //   this.lastFrame = imageData //HEADS UP - readFrame needs this to pass frames to the user 
  // }

  protected counter = 0
  protected async captureLoop() {
    if (!this.initialized || this.o.shots && this.counter >= this.o.shots) {
      return
    }
    if (this.capturing) {
      await this.readFrame()
      this.counter++
      await sleep(0)
    } else {
      await sleep(100)
    }
    await this.captureLoop()
  }

  async startCamera() {
    const constraints = {
      ...{
        audio: false,
        video: true
      },
      ...this.o.constrains
    }
    await this.page!.evaluate((width, height, constraints) => {
      return new Promise((resolve, reject) => {
        const video = document.querySelector<HTMLVideoElement>('video')!
        const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
        canvas.width = width
        canvas.height = height
        // TODO: do we really need to serialize constrains ? 
        const parsedConstraints = JSON.parse(constraints) as MediaStreamConstraints
        navigator.mediaDevices.getUserMedia(parsedConstraints)
          .then(stream => {
            video.onerror = reject;
            (window as any).videoStream = video.srcObject = stream
            video.onplay = (() => setTimeout(() => resolve(), 200))
          })
          .catch(error => {
            console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
            reject(error)
          })
      })
    }, this.o.width || 480, this.o.height || 360, JSON.stringify(constraints))
  }


}

