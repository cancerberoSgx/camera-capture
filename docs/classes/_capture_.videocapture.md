[camera-capture](../README.md) › ["capture"](../modules/_capture_.md) › [VideoCapture](_capture_.videocapture.md)

# Class: VideoCapture

## Hierarchy

* **VideoCapture**

## Index

### Constructors

* [constructor](_capture_.videocapture.md#constructor)

### Properties

* [browser](_capture_.videocapture.md#protected-optional-browser)
* [capturing](_capture_.videocapture.md#protected-capturing)
* [initialized](_capture_.videocapture.md#protected-initialized)
* [lastFrame](_capture_.videocapture.md#protected-optional-lastframe)
* [listeners](_capture_.videocapture.md#protected-listeners)
* [o](_capture_.videocapture.md#protected-o)
* [page](_capture_.videocapture.md#protected-optional-page)
* [server](_capture_.videocapture.md#protected-optional-server)

### Methods

* [_postFrame](_capture_.videocapture.md#protected-_postframe)
* [addFrameListener](_capture_.videocapture.md#addframelistener)
* [captureFrame](_capture_.videocapture.md#protected-captureframe)
* [captureLoop](_capture_.videocapture.md#protected-captureloop)
* [initialize](_capture_.videocapture.md#initialize)
* [launch](_capture_.videocapture.md#protected-launch)
* [notifyListeners](_capture_.videocapture.md#protected-notifylisteners)
* [pause](_capture_.videocapture.md#pause)
* [readFrame](_capture_.videocapture.md#readframe)
* [resume](_capture_.videocapture.md#resume)
* [start](_capture_.videocapture.md#start)
* [startCamera](_capture_.videocapture.md#startcamera)
* [stop](_capture_.videocapture.md#stop)
* [stopCamera](_capture_.videocapture.md#stopcamera)

## Constructors

###  constructor

\+ **new VideoCapture**(`o`: [CaptureOptions](../interfaces/_capture_.captureoptions.md)): *[VideoCapture](_capture_.videocapture.md)*

*Defined in [capture.ts:38](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [CaptureOptions](../interfaces/_capture_.captureoptions.md) |  {} |

**Returns:** *[VideoCapture](_capture_.videocapture.md)*

## Properties

### `Protected` `Optional` browser

• **browser**? : *puppeteer.Browser*

*Defined in [capture.ts:33](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L33)*

___

### `Protected` capturing

• **capturing**: *boolean* = false

*Defined in [capture.ts:35](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L35)*

___

### `Protected` initialized

• **initialized**: *boolean* = false

*Defined in [capture.ts:36](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L36)*

___

### `Protected` `Optional` lastFrame

• **lastFrame**? : *[ImageData](../interfaces/_capture_.imagedata.md)*

*Defined in [capture.ts:37](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L37)*

___

### `Protected` listeners

• **listeners**: *[Listener](../modules/_capture_.md#listener)[]* =  []

*Defined in [capture.ts:38](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L38)*

___

### `Protected` o

• **o**: *[CaptureOptions](../interfaces/_capture_.captureoptions.md)*

*Defined in [capture.ts:40](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L40)*

___

### `Protected` `Optional` page

• **page**? : *puppeteer.Page*

*Defined in [capture.ts:34](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L34)*

___

### `Protected` `Optional` server

• **server**? : *Server*

*Defined in [capture.ts:32](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L32)*

## Methods

### `Protected` _postFrame

▸ **_postFrame**(`width`: number, `height`: number, `data`: number[]): *Promise‹void›*

*Defined in [capture.ts:177](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |
`data` | number[] |

**Returns:** *Promise‹void›*

___

###  addFrameListener

▸ **addFrameListener**(`listener`: [Listener](../modules/_capture_.md#listener)): *void*

*Defined in [capture.ts:59](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`listener` | [Listener](../modules/_capture_.md#listener) |

**Returns:** *void*

___

### `Protected` captureFrame

▸ **captureFrame**(`mime`: [SupportedFormats](../modules/_capture_.md#supportedformats)): *Promise‹void›*

*Defined in [capture.ts:149](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L149)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mime` | [SupportedFormats](../modules/_capture_.md#supportedformats) |  this.o.mime || 'rgba' |

**Returns:** *Promise‹void›*

___

### `Protected` captureLoop

▸ **captureLoop**(): *Promise‹void›*

*Defined in [capture.ts:188](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L188)*

**Returns:** *Promise‹void›*

___

###  initialize

▸ **initialize**(): *Promise‹void›*

*Defined in [capture.ts:110](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L110)*

starts servers, browser and media streams / canvas / video in the DOM.

It's not necessary to call this method - it will be called automatically. Separated on purpose so capturing can be measured independently of initialization.

**Returns:** *Promise‹void›*

___

### `Protected` launch

▸ **launch**(): *Promise‹void›*

*Defined in [capture.ts:120](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L120)*

**Returns:** *Promise‹void›*

___

### `Protected` notifyListeners

▸ **notifyListeners**(`d`: [ImageData](../interfaces/_capture_.imagedata.md)): *void*

*Defined in [capture.ts:173](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [ImageData](../interfaces/_capture_.imagedata.md) |

**Returns:** *void*

___

###  pause

▸ **pause**(): *Promise‹void›*

*Defined in [capture.ts:83](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L83)*

**Returns:** *Promise‹void›*

___

###  readFrame

▸ **readFrame**(`mime`: [SupportedFormats](../modules/_capture_.md#supportedformats)): *Promise‹[ImageData](../interfaces/_capture_.imagedata.md)›*

*Defined in [capture.ts:47](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L47)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mime` | [SupportedFormats](../modules/_capture_.md#supportedformats) |  this.o.mime || 'rgba' |

**Returns:** *Promise‹[ImageData](../interfaces/_capture_.imagedata.md)›*

___

###  resume

▸ **resume**(): *Promise‹void›*

*Defined in [capture.ts:88](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L88)*

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [capture.ts:96](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L96)*

Starts capture. It resolved when the camera starts capturing or rejects if any error.

**Returns:** *Promise‹void›*

___

###  startCamera

▸ **startCamera**(): *Promise‹void›*

*Defined in [capture.ts:198](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L198)*

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

*Defined in [capture.ts:74](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L74)*

**Returns:** *Promise‹void›*

___

###  stopCamera

▸ **stopCamera**(): *Promise‹void›*

*Defined in [capture.ts:65](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/capture.ts#L65)*

**Returns:** *Promise‹void›*
