import { TODO } from 'misc-utils-of-mine-generic'

// This utilities are serialized (function.prototype.toString()) and evaluated in the browser's context so they must remain independent

/**
 * @param mime A DOMString indicating the image format. The default type is image/png.
 * @param quality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
 */
export function canvasToArrayBuffer(canvas: HTMLCanvasElement, mime: string = 'image/png', quality = 1): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => canvas.toBlob(async (d) => {
    if (d) {
      const r = new FileReader();
      r.addEventListener('loadend', e => {
        const ab = r.result;
        if (ab) {
          resolve(ab as ArrayBuffer);
        }
        else {
          reject(new Error('Expected FileReader result'));
        }
      }); r.addEventListener('error', e => {
        reject(e)
      });
      r.readAsArrayBuffer(d);
    }
    else {
      reject(new Error('Expected toBlob() to be defined'));
    }
  }, mime, quality))
}




interface MediaRecorderOptions {

}

type RecordingState = TODO

type EventHandler = TODO

declare class MediaRecorder {
  constructor(stream: MediaStream, options: MediaRecorderOptions)
  readonly stream: MediaStream;
  readonly mimeType: string;
  readonly state: RecordingState;
  onstart: EventHandler;
  onstop: EventHandler;
  ondataavailable: (e: { data: Blob }) => void;
  onpause: EventHandler;
  onresume: EventHandler;
  onerror: EventHandler;
  readonly videoBitsPerSecond: number;
  readonly audioBitsPerSecond: number;
  start(timeslice: number): void
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;
  static isTypeSupported(type: string): boolean;
}

export function startRecording(options ={ mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }) {
  return new Promise(resolve => {
    const mediaSource = new MediaSource()
    let sourceBuffer: SourceBuffer
    mediaSource.addEventListener('sourceopen', () => {
      sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
    }, false)

    const video = document.querySelector<HTMLVideoElement>('video')!;
    // const options = {}
     (window as any).  recordedBlobs  = [] as Blob[]
    // let options = { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`)
      // console.error( `${options.mimeType} is not Supported`)
      // options = { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }
      // if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      //   console.error(`${options.mimeType} is not Supported`)
      //   // console.error( `${options.mimeType} is not Supported`)
      //   options = { mimeType: 'video/webm', width: 480, height: 320 }
      //   if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      //     console.error(`${options.mimeType} is not Supported`)
      //     // console.error( `${options.mimeType} is not Supported`)
      //     options = { mimeType: '', width: 480, height: 320 }
      //   }
      // }
    }
    try {
     const mediaRecorder = new MediaRecorder(video.srcObject as MediaStream, options)
      mediaRecorder.onstop = (event: any) => {
        console.log('Recorder stopped: ', event)
      }
      mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
           (window as any).  recordedBlobs .push(event.data)
        }
      }
      mediaRecorder.start(10) // collect 10ms of data
      resolve()
    } catch (error) {
      console.error('Exception while creating MediaRecorder:', error, `Exception while creating MediaRecorder: ${JSON.stringify(error)}`)
      return
    }
  })
}
