// These utilities are serialized (function.prototype.toString()) and evaluated in the browser's context so they must remain independent

/**
 * Self contained function to transform a [Blob] into [ArrayBuffer]. Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.
 */
export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    function onLoadEnd(e: any) {
      reader.removeEventListener('loadend', onLoadEnd, false)
      if (e.error) {
        reject(e.error)
      } else if (reader.result) {
        resolve(reader.result as ArrayBuffer)
      } else {
        reject(new Error('Expected FileReader result'))
      }
    }
    reader.addEventListener('loadend', onLoadEnd, false)
    reader.readAsArrayBuffer(blob)
  })
}


/**
 * Reads given [HTMLCanvasElement] image encoded in given format and quality and return its content as [ArrayBuffer]. Depends on [blobToArrayBufferFn] which must be given or assumed to be global.  Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.
 * @param mime A DOMString indicating the image format. The default type is image/png.
 * @param quality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
 */
export function canvasToArrayBuffer(canvas: HTMLCanvasElement, mime: string = 'image/png', quality = 1, blobToArrayBufferFn: typeof blobToArrayBuffer = (window as any).blobToArrayBuffer): Promise<ArrayBuffer> {
  blobToArrayBufferFn = typeof blobToArrayBufferFn === 'function' ? blobToArrayBufferFn : (window as any).blobToArrayBuffer
  return new Promise((resolve, reject) => canvas.toBlob(async blob => {
    if (blob) {
      resolve(await blobToArrayBufferFn(blob))
    }
    else {
      reject(new Error('Expected toBlob() to be defined'));
    }
  }, mime, quality))
}

/**
 * Uses [MediaRecorder] to start recording current captured video.
 * Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.
 */
export function startRecording(options: StartRecordingOptions = { video: document.querySelector<HTMLVideoElement>('video')!, mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 }) {
  return new Promise(resolve => {
    options.video = options.video || document.querySelector<HTMLVideoElement>('video')!
    options.mimeType = options.mimeType || 'video/webm;codecs=vp8'
    options.width = options.width || 480
    options.height = options.height || 320
    const mediaSource = new MediaSource()
    let sourceBuffer: SourceBuffer
    mediaSource.addEventListener('sourceopen', () => {
      sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
    }, false)
      ; (window as any).recordedBlobs = [] as Blob[]
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`)
      options = { ...options, mimeType: 'video/webm' }
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        console.error(`${options.mimeType} is not Supported`)
        options = { ...options, mimeType: '' }
      }
    }
    try {
      const mediaRecorder = new MediaRecorder(options.video.srcObject as MediaStream, options)
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

export interface StartRecordingOptions {
  video: HTMLVideoElement
  mimeType?: string
  width?: number
  height?: number
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
