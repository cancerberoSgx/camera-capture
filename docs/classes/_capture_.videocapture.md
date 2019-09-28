[camera-capture](../README.md) › ["capture"](../modules/_capture_.md) › [VideoCapture](_capture_.videocapture.md)

# Class: VideoCapture

## Hierarchy

* [CaptureBase](_capturebase_.capturebase.md)

  ↳ **VideoCapture**

## Index

### Constructors

* [constructor](_capture_.videocapture.md#constructor)

### Properties

* [browser](_capture_.videocapture.md#protected-optional-browser)
* [capturing](_capture_.videocapture.md#protected-capturing)
* [counter](_capture_.videocapture.md#protected-counter)
* [initialized](_capture_.videocapture.md#protected-initialized)
* [lastFrame](_capture_.videocapture.md#protected-optional-lastframe)
* [listeners](_capture_.videocapture.md#protected-listeners)
* [o](_capture_.videocapture.md#protected-o)
* [page](_capture_.videocapture.md#protected-optional-page)
* [recording](_capture_.videocapture.md#protected-recording)
* [server](_capture_.videocapture.md#protected-optional-server)

### Methods

* [addFrameListener](_capture_.videocapture.md#addframelistener)
* [captureLoop](_capture_.videocapture.md#protected-captureloop)
* [initialize](_capture_.videocapture.md#initialize)
* [isPaused](_capture_.videocapture.md#ispaused)
* [isRecording](_capture_.videocapture.md#isrecording)
* [isStopped](_capture_.videocapture.md#isstopped)
* [notifyListeners](_capture_.videocapture.md#protected-notifylisteners)
* [pause](_capture_.videocapture.md#pause)
* [readFrame](_capture_.videocapture.md#readframe)
* [resume](_capture_.videocapture.md#resume)
* [start](_capture_.videocapture.md#start)
* [startCamera](_capture_.videocapture.md#startcamera)
* [startRecording](_capture_.videocapture.md#startrecording)
* [stop](_capture_.videocapture.md#stop)
* [stopCamera](_capture_.videocapture.md#stopcamera)
* [stopRecording](_capture_.videocapture.md#stoprecording)

## Constructors

###  constructor

\+ **new VideoCapture**(`o`: [CaptureOptions](../interfaces/_types_.captureoptions.md)): *[VideoCapture](_capture_.videocapture.md)*

*Overrides [CaptureBase](_capturebase_.capturebase.md).[constructor](_capturebase_.capturebase.md#constructor)*

*Defined in [capture.ts:16](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [CaptureOptions](../interfaces/_types_.captureoptions.md) |  {} |

**Returns:** *[VideoCapture](_capture_.videocapture.md)*

## Properties

### `Protected` `Optional` browser

• **browser**? : *puppeteer.Browser*

*Inherited from [CaptureBase](_capturebase_.capturebase.md).[browser](_capturebase_.capturebase.md#protected-optional-browser)*

*Defined in [captureBase.ts:13](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/captureBase.ts#L13)*

___

### `Protected` capturing

• **capturing**: *boolean* = false

*Defined in [capture.ts:10](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L10)*

___

### `Protected` counter

• **counter**: *number* = 0

*Defined in [capture.ts:15](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L15)*

counts [shots]

___

### `Protected` initialized

• **initialized**: *boolean* = false

*Defined in [capture.ts:11](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L11)*

___

### `Protected` `Optional` lastFrame

• **lastFrame**? : *[ImageData](../interfaces/_types_.imagedata.md)*

*Defined in [capture.ts:12](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L12)*

___

### `Protected` listeners

• **listeners**: *[Listener](../modules/_types_.md#listener)[]* =  []

*Defined in [capture.ts:13](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L13)*

___

### `Protected` o

• **o**: *[CaptureOptions](../interfaces/_types_.captureoptions.md)*

*Overrides [CaptureBase](_capturebase_.capturebase.md).[o](_capturebase_.capturebase.md#protected-o)*

*Defined in [capture.ts:18](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L18)*

___

### `Protected` `Optional` page

• **page**? : *puppeteer.Page*

*Inherited from [CaptureBase](_capturebase_.capturebase.md).[page](_capturebase_.capturebase.md#protected-optional-page)*

*Defined in [captureBase.ts:14](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/captureBase.ts#L14)*

___

### `Protected` recording

• **recording**: *boolean* = false

*Defined in [capture.ts:16](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L16)*

___

### `Protected` `Optional` server

• **server**? : *Server*

*Inherited from [CaptureBase](_capturebase_.capturebase.md).[server](_capturebase_.capturebase.md#protected-optional-server)*

*Defined in [captureBase.ts:12](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/captureBase.ts#L12)*

## Methods

###  addFrameListener

▸ **addFrameListener**(`listener`: [Listener](../modules/_types_.md#listener)): *void*

*Defined in [capture.ts:28](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L28)*

Will be notified on managed frame shoot started by [start] method. Notice that this is optional and frames can be arbitrarily read using [readFrame]

**Parameters:**

Name | Type |
------ | ------ |
`listener` | [Listener](../modules/_types_.md#listener) |

**Returns:** *void*

___

### `Protected` captureLoop

▸ **captureLoop**(): *Promise‹void›*

*Defined in [capture.ts:248](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L248)*

**Returns:** *Promise‹void›*

___

###  initialize

▸ **initialize**(): *Promise‹void›*

*Overrides [CaptureBase](_capturebase_.capturebase.md).[initialize](_capturebase_.capturebase.md#initialize)*

*Defined in [capture.ts:107](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L107)*

starts servers, browser, install scripts and global functions used , and start up the video and canvas elements.
,media streams / canvas / video in the DOM.

After it resolves the camera should be turned on , and methods like  [readFrame] and [startRecording] will be ready to be called..

**Returns:** *Promise‹void›*

___

###  isPaused

▸ **isPaused**(): *boolean*

*Defined in [capture.ts:68](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L68)*

**Returns:** *boolean*

___

###  isRecording

▸ **isRecording**(): *boolean*

*Defined in [capture.ts:76](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L76)*

**Returns:** *boolean*

___

###  isStopped

▸ **isStopped**(): *boolean*

*Defined in [capture.ts:72](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L72)*

**Returns:** *boolean*

___

### `Protected` notifyListeners

▸ **notifyListeners**(`d`: [ImageData](../interfaces/_types_.imagedata.md)): *Promise‹void›*

*Defined in [capture.ts:242](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [ImageData](../interfaces/_types_.imagedata.md) |

**Returns:** *Promise‹void›*

___

###  pause

▸ **pause**(): *Promise‹void›*

*Defined in [capture.ts:63](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L63)*

Won't turn off the camera but frame listeners won't be notified which will result on low cpu usage. Use it to switch between managed and manual frame read with [readFrame]. You can unpause calling [resume].

**Returns:** *Promise‹void›*

___

###  readFrame

▸ **readFrame**(`mime`: [SupportedFormats](../modules/_types_.md#supportedformats), `quality`: number): *Promise‹object›*

*Defined in [capture.ts:209](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L209)*

Main public method to capture the current frame on the video camera. [initialized] must be called first. Then this method can be called at will, optionally providing desired image output format.

It will work even if [isPaused] since is independent of managed frame listening.

Tip: right now, 'image/jpeg' seems to be faster then the rest, even rgba, on a x2.5 ratio (Reading jpg 30 fps on a canvas size  480, 320).. Nevertheless this could change/improve in the future.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mime` | [SupportedFormats](../modules/_types_.md#supportedformats) |  this.o.mime || 'rgba' |
`quality` | number | 1 |

**Returns:** *Promise‹object›*

___

###  resume

▸ **resume**(): *Promise‹void›*

*Defined in [capture.ts:83](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L83)*

Resumes frame listener notification. See [pause].

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [capture.ts:91](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L91)*

Starts capturing camera video. If not calling yet it will call [initialize] and after camera is turned on it will start the capture loop, this is frame listeners notification. The loop, by default will be as fast as possible consequently with high cpu overhead. Use [pause] and[resume] to control it. Alternatively, if you just want to read frames arbitrarily y your self, just call [initialize] instead this method and use [readFrame].

**Returns:** *Promise‹void›*

___

###  startCamera

▸ **startCamera**(`o`: MediaStreamConstraints): *Promise‹void›*

*Defined in [capture.ts:130](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L130)*

Just turn on the camera using given constrains and merging them with defaults and the ones given in constructor.

After it resolves the camera should be turned on and methods like [readFrame] and [startRecording] will be ready to be called..

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | MediaStreamConstraints |  {} |

**Returns:** *Promise‹void›*

___

###  startRecording

▸ **startRecording**(`recordOptions`: object): *Promise‹void›*

*Defined in [capture.ts:162](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L162)*

 Uses [MediaRecorder] to start recording current captured video. Notice that this happens 100% on memory so take a look at RAM and the time it takes [stopRecording] to encode the video file.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`recordOptions` | object |  { mimeType: 'video/webm;codecs=vp8', width: 480, height: 320, } |

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

*Overrides [CaptureBase](_capturebase_.capturebase.md).[stop](_capturebase_.capturebase.md#stop)*

*Defined in [capture.ts:53](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L53)*

turns off everything, first recording , turns of camera, frame listeners and at last the server and browser. Everything can be restarted using [initialize] or alternatively [start] to restart frame listener notifications too

**Returns:** *Promise‹void›*

___

###  stopCamera

▸ **stopCamera**(): *Promise‹void›*

*Defined in [capture.ts:37](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L37)*

Turns off the camera. frame read loop triggered by [start] won't be cleared but listeners won't be called while camera is off.

The camera can be turned on again by calling [startCamera]

**Returns:** *Promise‹void›*

___

###  stopRecording

▸ **stopRecording**(`discard`: boolean): *Promise‹undefined | Uint8ClampedArray›*

*Defined in [capture.ts:174](https://github.com/cancerberoSgx/camera-capture/blob/31f9c91/camera-capture/src/capture.ts#L174)*

Stop video recording (see [startRecording]) and resolves with a encoded video file 'video/webm' which dimensions correspond to the original video constraints.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`discard` | boolean | false | if true it won't build the video and resolve with undefined.  |

**Returns:** *Promise‹undefined | Uint8ClampedArray›*
