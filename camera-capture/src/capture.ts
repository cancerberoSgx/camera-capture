import { readFileSync } from 'fs'
import { checkThrow, serial, sleep } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { blobToArrayBuffer, canvasToArrayBuffer, startRecording } from './browser'
import { CaptureBase } from './captureBase'
import { CaptureOptions, ImageData, Listener, SupportedFormats } from './types'

export class VideoCapture extends CaptureBase {

  protected capturing = false
  protected initialized = false
  protected lastFrame?: ImageData
  protected listeners: Listener[] = []
  /** counts [shots] */
  protected counter = 0
  protected recording = false

  constructor(protected o: CaptureOptions = {}) {
    super(o)
    this.captureLoop = this.captureLoop.bind(this)
    this.o.width = this.o.width || 480
    this.o.height = this.o.height || 320
  }

  /**
   * Will be notified on managed frame shoot started by [start] method. Notice that this is optional and frames can be arbitrarily read using [readFrame]
   */
  addFrameListener(listener: Listener): void {
    this.listeners.push(listener)
  }

  /**
   * Turns off the camera. frame read loop triggered by [start] won't be cleared but listeners won't be called while camera is off. 
   * 
   * The camera can be turned on again by calling [startCamera]
   */
  async stopCamera() {
    checkThrow(this.server && this.browser && this.page, 'Expected started before calling stop()')
    this.initialized = false
    this.capturing = false
    if (this.recording) {
      await this.stopRecording(true)
    }
    await this.page!.evaluate(() => {
      const video = document.querySelector<HTMLVideoElement>('video')!;
      (video.srcObject as MediaStream)!.getTracks().forEach(t => t.stop())
    })
  }

  /**
   * turns off everything, first recording , turns of camera, frame listeners and at last the server and browser. Everything can be restarted using [initialize] or alternatively [start] to restart frame listener notifications too
    */
  async stop() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    await this.stopCamera()
    await super.stop()
    await sleep(300)
  }

  /**
   * Won't turn off the camera but frame listeners won't be notified which will result on low cpu usage. Use it to switch between managed and manual frame read with [readFrame]. You can unpause calling [resume].
   */
  async pause() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = false
  }

  isPaused() {
    return this.capturing
  }

  isStopped() {
    return this.initialized
  }

  isRecording() {
    return this.recording
  }

  /**
   * Resumes frame listener notification. See [pause].
   */
  async resume() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = true
  }

  /**
   * Starts capturing camera video. If not calling yet it will call [initialize] and after camera is turned on it will start the capture loop, this is frame listeners notification. The loop, by default will be as fast as possible consequently with high cpu overhead. Use [pause] and[resume] to control it. Alternatively, if you just want to read frames arbitrarily y your self, just call [initialize] instead this method and use [readFrame]. 
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
   * starts servers, browser, install scripts and global functions used , and start up the video and canvas elements. 
   * ,media streams / canvas / video in the DOM. 
   * 
   * After it resolves the camera should be turned on , and methods like  [readFrame] and [startRecording] will be ready to be called..
   */
  async initialize() {
    if (this.initialized) {
      return
    }
    await super.initialize()
    await this.page!.addScriptTag({ content: readFileSync(join(__dirname, 'assets', 'buffer-5.4.3.min.js')).toString() })
    await this.page!.evaluate((canvasToArrayBufferS, startRecordingS, blobToArrayBufferS) => {
      const d = document.createElement('div')
      d.innerHTML = `<video playsinline autoplay></video><canvas></canvas>`
      document.body.append(d);
      (window as any).blobToArrayBuffer = eval(`(${blobToArrayBufferS})`);
      (window as any).canvasToArrayBuffer = eval(`(${canvasToArrayBufferS})`);
      (window as any).startRecording = eval(`(${startRecordingS})`)
    }, canvasToArrayBuffer.toString(), startRecording.toString(), blobToArrayBuffer.toString())
    await this.startCamera()
    this.initialized = true
  }

  /**
   * Just turn on the camera using given constrains and merging them with defaults and the ones given in constructor.
   * 
   * After it resolves the camera should be turned on and methods like [readFrame] and [startRecording] will be ready to be called..
   */
  async startCamera(o: MediaStreamConstraints = {}) {
    const constraints = {
      ...{
        audio: false,
        video: true
      },
      ...this.o.constrains, ...o
    }
    await this.page!.evaluate((width, height, constraints) => {
      return new Promise((resolve, reject) => {
        const video = document.querySelector<HTMLVideoElement>('video')!
        const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
        canvas.width = width
        canvas.height = height
        const parsedConstraints = JSON.parse(constraints) as MediaStreamConstraints
        navigator.mediaDevices.getUserMedia(parsedConstraints)
          .then(stream => {
            video.onerror = reject
            video.srcObject = stream
            video.onplay = (() => setTimeout(() => resolve(), 200)) // TODO: remove listener ? 
          })
          .catch(error => {
            console.error('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
            reject(error)
          })
      })
    }, this.o.width || 480, this.o.height || 320, JSON.stringify(constraints))
  }

  /**
   *  Uses [MediaRecorder] to start recording current captured video. Notice that this happens 100% on memory so take a look at RAM and the time it takes [stopRecording] to encode the video file. 
   */
  async startRecording(recordOptions = { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320, }) {
    this.recording = true
    await this.page!.evaluate(async (recordOptionsS) => {
      const options = JSON.parse(recordOptionsS)
      await (window as any).startRecording({ ...options, video: document.querySelector<HTMLVideoElement>('video')! })
    }, JSON.stringify(recordOptions))
  }

  /**
   * Stop video recording (see [startRecording]) and resolves with a encoded video file 'video/webm' which dimensions correspond to the original video constraints. 
   * @param discard if true it won't build the video and resolve with undefined.
   */
  async stopRecording(discard = false) {
    if (!this.isRecording()) {
      return
    }
    this.recording = false
    const data = await this.page!.evaluate((discard) => {
      return new Promise<number[]>(resolve => {
        //TODO: move to browser and use blobToArrayBuffer
        // TODO: returns Promise<Buffer|void>
        // TODO: use buffer here too to pass data
        if (discard) {
          (window as any).recordedBlobs = []
          resolve()
        } else {
          const blob = new Blob((window as any).recordedBlobs, { type: 'video/webm' })
          const fr = new FileReader()
          fr.readAsArrayBuffer(blob)
          fr.onloadend = () => {
            const data = fr.result as ArrayBuffer
            resolve(Array.from(new Uint8ClampedArray(data)));
            (window as any).recordedBlobs = []
          }
        }
      })
    }, discard)
    return data ? new Uint8ClampedArray(data) : undefined
  }

  /**
   * Main public method to capture the current frame on the video camera. [initialized] must be called first. Then this method can be called at will, optionally providing desired image output format. 
   * 
   * It will work even if [isPaused] since is independent of managed frame listening.
   * 
   * Tip: right now, 'image/jpeg' seems to be faster then the rest, even rgba, on a x2.5 ratio (Reading jpg 30 fps on a canvas size  480, 320).. Nevertheless this could change/improve in the future. 
   */
  async readFrame(mime: SupportedFormats = this.o.mime || 'rgba', quality = 1) {
    if (this.initialized) {
      //TODO. perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration? - if so we must call node.js function cause cannot return.
      const data = await this.page!.evaluate(async (mime: SupportedFormats = 'rgba', width: number, height: number, quality: number) => {
        const video = document.querySelector<HTMLVideoElement>('video')!
        const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
        canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height)
        if (mime === 'rgba') {
          const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
          return { width: data.width, height: data.height, data: (window as any).buffer.Buffer.from(data.data).toString('binary') as string }
        } else {
          const data = await (window as any).canvasToArrayBuffer(canvas, mime, quality, (window as any).blobToArrayBuffer)
          if (data) {
            return { width, height, data: (window as any).buffer.Buffer.from(data).toString('binary') as string }
          } else {
            // console.error('123');

            throw new Error('Should not happen 1234')
          }
        }
      }, mime, this.o.width!, this.o.height!, quality)
      const imageData = {
        width: data.width,
        height: data.height,
        data: Buffer.from(data.data, 'binary')
      }
      await this.notifyListeners(imageData as any)
      return imageData
    } else {
      throw new Error('Expected to be initialized')
    }
  }

  /**
   * Get devices list
   */
  async getDevicesList(o: MediaStreamConstraints = {}) {
    const constraints = {
      ...{
        audio: false,
        video: true,
      },
      ...this.o.constrains,
      ...o,
    };

    const resultString = await this.page!.evaluate(
      (constraints) => {
        return new Promise<string>((resolve, reject) => {
          const parsedConstraints = JSON.parse(
            constraints
          ) as MediaStreamConstraints;

          navigator.mediaDevices
            .getUserMedia(parsedConstraints)
            .then(() => {
              navigator.mediaDevices.enumerateDevices().then((devices) => {
                resolve(JSON.stringify(devices));
              });
            })
            .catch((error) => {
              console.error(
                "navigator.MediaDevices.getUserMedia error: ",
                error.message,
                error.name
              );
              reject(error);
            });
        });
      },
      JSON.stringify(constraints)
    );

    return JSON.parse(resultString);
  }

  protected async  notifyListeners(d: ImageData) {
    await serial(this.listeners.map(l => async () => {
      await l(d)
    }))
  }

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


}

