# camera-capture

Portable Camera capture Node.js API for desktop Apps

## Contents

<!-- toc -->

- [What / WHy ?](#what--why-)
- [Install](#install)
- [JavaScript API](#javascript-api)
  * [Managed frame read](#managed-frame-read)
  * [Manual frame read](#manual-frame-read)
  * [Encoded Frames](#encoded-frames)
- [Command line](#command-line)
- [Summary](#summary)
  * [Design summary](#design-summary)
  * [Status](#status)
- [Reference API](#reference-api)
- [TODO / Road map](#todo--road-map)
  * [low priority](#low-priority)

<!-- tocstop -->

## What / WHy ?

After searching for an easy to use portable library to access the webcam directly from node.js I didn't found a library that works in windows, macOs and linux, without native dependencies that users need ot manually install (or even so, they won't work). 

This library solves the problem with an easy approach. Use headless browser to capture the video,  draw in canvas and post the image data from there to the Node.js side using page.exposeFunction() and without almost any encode since the image data is passed as array buffer. 
 
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
c.addFrameListener(frame => {  // frame is an ImageData : {width: 480, height: 360, data: UIntArray}
  // use a library or render the image data to a surface... - 
  // or save the raw frames and later make a video with image-magick or ffmpeg
})
await c.start()
console.log('Capturing camera');
```

### Manual frame read

```js
import {VideoCapture} from 'camera-capture'
const c = new VideoCapture({
  width: 100, height: 100, port: 8083
})
await c.initialize()
// ... some time pass
const f = await c.readFrame()  // read the current frame (f is an ImageData)
// ... some time pass
const f2 = await c.readFrame()  // take another shot
```

### Encoded Frames

```js
import {VideoCapture} from 'camera-capture'
const c = new VideoCapture({ width: 200, height: 200,  mime: 'image/png'})
await c.initialize()
const f = await c.readFrame()               // PNG as configured
writeFileSync('tmp.png', f.data)
const f2 = await c.readFrame('image/jpeg')  // jpeg
writeFileSync('tmp.jpg', f2.data)
const f3 = await c.readFrame('image/webp')  // webp
writeFileSync('tmp.webp', f3.data)
const f4 = await c.readFrame('image/bmp')   // bmp
writeFileSync('tmp.bmp', f4.data)
const f5 = await c.readFrame('rgba')        // raw image data (as default)
writeFileSync('tmp-8bit-200x200.rgba', f5.data)
const f6 = await c.readFrame('image/gif')   // gif
writeFileSync('tmp6.gif', f6.data)
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

About, 30 frames per second (size  600x400)

 * JavaScript API (managing the capturing loop) Done 
 * javaScript API (manual capture) Done
 * image encoded as jpeg, png, bmp, webp Done
 + just born - working APIs to read frames as ImageData.

## Reference API

* [VideoCapture class](../docs/modules/_capture_.md)
* [VideoCapture options](../docs/interfaces/_capture_.captureoptions.md)
 
## TODO / Road map
- [ ] check c.addFrameListener() and encoded images
- [ ] investigate why/how to pass the buffer / array buffer view  directly without transforming it to number[] / and array buffer views
- [ ] test if toDataUrl is faster than toBlob
- [ ] probably for frames a generator / or observable is more appropriate than even listeners.
- [ ] perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
- [ ] CLI
- [w] real world example: native app
- [x] encode in browser supported formats (png, jpg)
- [ ] do we really need to serialize constrains ? 
- [x] c.readFrame() users read manually instead listener - loop controlled by users.
- [x] listener API managed  loop
- [x] API docs
- [x] add api docs descriptions to class, options and

### low priority
- [ ] research how fast/slow is painting canvas pixel by pizel form imagedata than showImage in node-gui
- [ ] TODO: support fps control like in opencv
- [ ] change size dynamically ?
- [ ] record capture using dom api (output is mp4/avi video)
- [ ] record desktop ? possible ?
- [ ] record web page - browser / page screenshot utility
- [ ]  sound/ audio ? 
- [ ]  geo location (get the coords) ? (need https?)
- [ ]