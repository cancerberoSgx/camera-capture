# camera-capture-demo

## Contents

<!-- toc -->
 
<!-- tocstop -->

## Demos

 * A desktop app demo that use [camera-capture-demo](https://www.npmjs.com/package/camera-capture)


## Playground & demos

 * TODO
 
## Summary

I didn't found any library that provides an interface to capture webcam video so I show the video and filter frame by frame in my Node.s desktop app (not based on electron - no canvas / HTML5 available - rendering on cairo/opengl surface that complies with

 * 
 * don't require users to install native complex dependencies (like opencv)
 * works on windows, macOs, and linux
 * provides a stream-like API for video frames
 * fast so it can be used for a "real-time" video filter demo
 * usable without electron/canvas/html5 - imagine I'm rendering in a native surface like cairo, gtk, etc
 * portable - no surprises - working in latest node.js versions
 * Optionally the frames can be encoded as in jpg/png or even a video created . 
 + Also provides simple filtering API.

## Design summary

 * Use puppeteer (which is google chrome headless browser) to capture camera video. Expose frames as fast as possible. 
 * not focused on encoding more than the ones supported by the browser
 * API based on raw image data - users responsible of compose an output video with ffmpeg, imagemagick, opencv, etc. Format encoding is not the objective of this project

## Status
 
 * just born - working APIs to read frames as ImageData. About, 30 frames per second (size  600x400)
 
## Install

```sh
npm install camera-capture puppeteer
```

(puppeteer is a peer dependency you must install it by yourself)

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

## Command line

TODO - TBD

## Reference API

* (VideoCapture class)[docs/modules/_capture_.md]
* (VideoCapture pptions)[docs/interfaces/_capture_.captureoptions.md]
 
## TODO / Road map
- [x] c.readFrame() users read manually instead listener - loop controlled by users.
- [ ] investigate why/how to pass the buffer / vide directly without transforming it to number[]
- [ ] probably for frames a generator / or observable is more appropriate than even listeners.
- [ ] perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
- [ ] CLI
- [ ] real world example: native app
- [ ] encode in browser supported formats (png, jpg)
- [ ] do we really need to serialize constrains ? 
- [x] listener API managed  loop
- [x] API docs
- [x] add api docs descriptions to class, options and

### low priority
- [ ] change size dynamically ?
- [ ] record capture using dom api (output is mp4/avi video)
- [ ] record desktop ? possible ?
- [ ] record web page - browser / page screenshot utility
- [ ]  sound/ audio ? 
- [ ]  geo location (get the coords) ? (need https?)
- [ ]
Links

 * 