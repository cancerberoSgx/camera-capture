// This utilities are serialized (function.prototype.toString()) and evaluated in the browser's context so they must remain independent

/**
 * @param mime A DOMString indicating the image format. The default type is image/png.
 * @param quality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
 */
export function canvasToArrayBuffer(canvas: HTMLCanvasElement, mime: string = 'image/png', quality = 1): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => canvas.toBlob(async blob => {
    if (blob) {
    resolve(await  (window as any).blobToArrayBuffer(blob))
      // const r = new FileReader();
      // r.addEventListener('loadend', e => {
      //   const ab = r.result;
      //   if (ab) {
      //     resolve(ab as ArrayBuffer);
      //   }
      //   else {
      //     reject(new Error('Expected FileReader result'));
      //   }
      // }); r.addEventListener('error', e => {
      //   reject(e)
      // });
      // r.readAsArrayBuffer(d);
    }
    else {
      reject(new Error('Expected toBlob() to be defined'));
    }
  }, mime, quality))
}


export function blobToArrayBuffer (blob: Blob) {
  // if (typeof cb !== 'function') {
  //   throw new Error('second argument must be a function')
  // }
return new Promise((resolve, reject)=>{
  const reader = new FileReader()
  // if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
  //   reject(new Error('first argument must be a Blob'))
  // }
  function onLoadEnd (e: any) {
    reader.removeEventListener('loadend', onLoadEnd, false)
    if (e.error) {
      reject(e.error)
    }
    // else resolve((window as any).buffer.Buffer.from(reader.result))
    else if(reader.result){
      resolve(reader.result as ArrayBuffer)
    }else {
     reject(new Error('Expected FileReader result'));
    }
  }
  reader.addEventListener('loadend', onLoadEnd, false)
  reader.readAsArrayBuffer(blob)
})
}


export function startRecording(options = { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }) {
  return new Promise(resolve => {
    const mediaSource = new MediaSource()
    let sourceBuffer: SourceBuffer
    mediaSource.addEventListener('sourceopen', () => {
      sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
    }, false)

    const video = document.querySelector<HTMLVideoElement>('video')!
      ; (window as any).recordedBlobs = [] as Blob[]
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`)
      options = { mimeType: 'video/webm', width: 480, height: 320 }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`)
        options = { mimeType: '', width: 480, height: 320 }
      }
    }
    try {
      const mediaRecorder = new MediaRecorder(video.srcObject as MediaStream, options)
      mediaRecorder.onstop = (event: any) => {
        console.log('Recorder stopped: ', event)
      }
      mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          (window as any).recordedBlobs.push(event.data)
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
// DOM MediaRecorder missing types
import { TODO } from 'misc-utils-of-mine-generic'

export type MediaRecorderOptions = TODO

export type RecordingState = TODO

export type EventHandler = TODO

export type OnDataAvailableListener = (e: {
  data: Blob;
}) => void

export declare class MediaRecorder {
  constructor(stream: MediaStream, options: MediaRecorderOptions);
  readonly stream: MediaStream;
  readonly mimeType: string;
  readonly state: RecordingState;
  onstart: EventHandler;
  onstop: EventHandler;
  ondataavailable: OnDataAvailableListener;
  onpause: EventHandler;
  onresume: EventHandler;
  onerror: EventHandler;
  readonly videoBitsPerSecond: number;
  readonly audioBitsPerSecond: number;
  start(timeslice: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;
  static isTypeSupported(type: string): boolean;
}
