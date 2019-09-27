# camera-capture

Portable Camera, audio, desktop capture Node.js library. 

## Contents

<!-- toc -->

- [What / Why ?](#what--why-)
- [Install](#install)
- [JavaScript API](#javascript-api)
  * [Managed frame read](#managed-frame-read)
  * [Manual frame read](#manual-frame-read)
  * [Encoded Frames](#encoded-frames)
  * [Recording](#recording)
- [Command line](#command-line)
- [Summary](#summary)
  * [Design summary](#design-summary)
  * [Status](#status)
- [Reference API](#reference-api)
- [TODO / Road map](#todo--road-map)
  * [low priority](#low-priority)

<!-- tocstop -->

## What / Why ?

After searching for an easy to use portable library to access the webcam directly from node.js I didn't found a library that works in windows, macOs and linux, without native dependencies that users need ot manually install (or even so, they won't work). 

This library solves the problem with an easy approach. Use headless browser to capture the video, draw in canvas and pass the image data  the Node.js context as fast as possible (`age.exposeFunction()`) and with minimal processing. It uses HTMLCanvasElement getImageData when returning raw image data or HTMLCanvasElement.toBlob() when retuning encoded images such as png, jpg. In both cases using ArrayBuffer
 
## Install

```sh
npm install camera-capture puppeteer
```

(`puppeteer` is a peer dependency you must install it by yourself)

## JavaScript API

### Managed frame read

```js
import {VideoCapture} from 'camera-capture'
const c = new VideoCapture()
c.addFrameListener(frame => {  
  // frame by default is unencoded raw Image Data `{width: 480, height: 360, data: UIntArray}``
  // which is often what image processing / surfaces interfaces expect for fast processing. 
  // Use `mime` option to receive it in other formats (see examples below)
  surface.putImageData(0,0,frame.width, frame.height, frame.data)
})
// pause / resume frame emission (without tunning off the camera)
setTimeout(()=>c.pause(), 1000)
setTimeout(()=>c.resume(), 2000)
// shutdown everything, including, camera, browser, server:
setTimeout(()=>c.stop(), 3000)
console.log('Capturing camera');
await c.start() // promise will be resolved only when `stop`
console.log('Stopping camera capture');
```

### Manual frame read

Instead of using start() and being notified on each frame, just call `initialize()` and read frames programmatically:

```js
import {VideoCapture} from 'camera-capture'
const c = new VideoCapture({
  mime: 'image/png'
})
await c.initialize()
let f = await c.readFrame()               // PNG as configured
writeFileSync('tmp.png', f.data)
f = await c.readFrame('image/webp')       // take another shot this time as webp image
writeFileSync('tmp.webp', f.data)
f = await c.readFrame('image/jpeg') // jpeg
writeFileSync('tmp.jpg', f.data)
f = await c.readFrame('rgba')       // raw image data (as default)
writeFileSync('tmp-8bit-200x200.rgba', f.data)
```

### Recording camera video

The following uses DOM MediaRecorder API to record video. Notice that it all happens in the browser, on memory, so the result is a excellent quality video but it could consume lots of memory on long recordings. If that's an issue perhaps it's better to store frame by frame to hard drive and then use a video assembler like ffmpeg / imagemagick. (in the roadmap):

```ts
import {VideoCapture} from 'camera-capture'
const c = new VideoCapture({ port: 8082 })
await c.initialize()
await c.startRecording()
await sleep(500)
const data = await c.stopRecording()
writeFileSync('tmp6.webm', data)
```

## Command line

TODO - TBD

## Summary

I didn't found any library that provides an interface to capture webcam video so I show the video and filter frame by frame in my Node.s desktop app (not based on electron - no canvas / HTML5 available - rendering on cairo/opengl surface that complies with

 * Don't require users to install native complex dependencies (like opencv or native applications installed)
 * Don't include any binary code that needs to be compiled. 
 * works on windows, macOs, and linux
 * provides a stream-like API for video frames
 * fast so it can be used for a "real-time" video filter demo
 * usable without electron/canvas/html5 - imagine I'm rendering in a native surface like cairo, gtk, etc
 * portable - no surprises - working in latest node.js versions
 * Optionally the frames can be encoded as in jpg/png or even a video created . 
 + Also provides simple filtering API.

### Design summary

 * Use puppeteer (which is google chrome headless browser) to capture camera video. Expose frames as fast as possible. 
 * not focused on encoding more than the ones supported by the browser
 * API based on raw image data - users responsible of compose an output video with ffmpeg, imagemagick, opencv, etc. Format encoding is not the objective of this project

### Status
 
Observed behavior: 

About, 30 frames per second (size  600x400, format: raw image data)

 * JavaScript API (managing the capturing loop)
 * javaScript API (manual capture) 
 * image encoded as jpeg, png, webp 
 * camera video recording using DOM MediaRecorder
## Reference API

* [Capture options](https://github.com/cancerberoSgx/camera-capture/blob/master/docs/interfaces/_capture_.captureoptions.md)
* [Capture class](https://github.com/cancerberoSgx/camera-capture/blob/master/docs/modules/_capture_.md)
 
## TODO / Road map
- [ ] investigate why/how to pass the buffer / array buffer view  directly without transforming it to number[] / and array buffer views
  -  se TextEncoder/TextDecoder to serialize the data as a single char-per-byte string (using windows-1252 encoding) and deserialize it in Node on the other side which is fast (since passing strings is much faster).
- [ ] test if toDataUrl is faster than toBlob
- [ ] probably for frames a generator / or observable is more appropriate than even listeners.
- [ ] perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
- [ ] CLI
- [ ] pause/resume / start/stop should work for recording too. 
- [ ] performance tests (fps raw image data and encoded images)
- [ ] do we really need to serialize constrains ? 
- [ ] video recording formats other than webm?
- [ ] video recording constraints - size - 
- [ ] audio recording only API
- [ ] record desktop ? possible ?
- [ ] desktop screenshot only API
- [ ] browser screenshot only API
- [ ] webcam screenshot only API
- [ ] geo location (get the coords) ? (need https?)
- [ ] change video size dynamically ?
-
- [x] check c.addFrameListener() with encoded images
- [x] real world example: native app
- [x] encode in browser supported formats (png, jpg)
- [x] c.readFrame() users read manually instead listener - loop controlled by users.
- [x] listener API managed  loop
- [x] API docs
- [x] add api docs descriptions to class, options and
- [x] record capture using dom api (output is mp4/avi video)

### low priority
- [ ] research how fast/slow is painting canvas pixel by pixel from image data than showImage in node-gui
- [ ] TODO: support fps control like in opencv
- [ ]