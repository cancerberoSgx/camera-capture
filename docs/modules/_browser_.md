[camera-capture](../README.md) › ["browser"](_browser_.md)

# External module: "browser"

## Index

### Classes

* [MediaRecorder](../classes/_browser_.mediarecorder.md)

### Interfaces

* [StartRecordingOptions](../interfaces/_browser_.startrecordingoptions.md)

### Type aliases

* [EventHandler](_browser_.md#eventhandler)
* [MediaRecorderOptions](_browser_.md#mediarecorderoptions)
* [OnDataAvailableListener](_browser_.md#ondataavailablelistener)
* [RecordingState](_browser_.md#recordingstate)

### Functions

* [blobToArrayBuffer](_browser_.md#blobtoarraybuffer)
* [canvasToArrayBuffer](_browser_.md#canvastoarraybuffer)
* [startRecording](_browser_.md#startrecording)

## Type aliases

###  EventHandler

Ƭ **EventHandler**: *TODO*

*Defined in [browser.ts:99](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L99)*

___

###  MediaRecorderOptions

Ƭ **MediaRecorderOptions**: *TODO*

*Defined in [browser.ts:95](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L95)*

___

###  OnDataAvailableListener

Ƭ **OnDataAvailableListener**: *function*

*Defined in [browser.ts:101](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L101)*

#### Type declaration:

▸ (`e`: object): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | object |

___

###  RecordingState

Ƭ **RecordingState**: *TODO*

*Defined in [browser.ts:97](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L97)*

## Functions

###  blobToArrayBuffer

▸ **blobToArrayBuffer**(`blob`: Blob): *Promise‹ArrayBuffer›*

*Defined in [browser.ts:6](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L6)*

Self contained function to transform a [Blob] into [ArrayBuffer]. Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.

**Parameters:**

Name | Type |
------ | ------ |
`blob` | Blob |

**Returns:** *Promise‹ArrayBuffer›*

___

###  canvasToArrayBuffer

▸ **canvasToArrayBuffer**(`canvas`: HTMLCanvasElement, `mime`: string, `quality`: number, `blobToArrayBufferFn`: [blobToArrayBuffer](_browser_.md#blobtoarraybuffer)): *Promise‹ArrayBuffer›*

*Defined in [browser.ts:30](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L30)*

Reads given [HTMLCanvasElement] image encoded in given format and quality and return its content as [ArrayBuffer]. Depends on [blobToArrayBufferFn] which must be given or assumed to be global.  Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`canvas` | HTMLCanvasElement | - | - |
`mime` | string | "image/png" | A DOMString indicating the image format. The default type is image/png. |
`quality` | number | 1 | A Number between 0 and 1 indicating image quality if the requested type is image/jpeg. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.  |
`blobToArrayBufferFn` | [blobToArrayBuffer](_browser_.md#blobtoarraybuffer) |  (window as any).blobToArrayBuffer | - |

**Returns:** *Promise‹ArrayBuffer›*

___

###  startRecording

▸ **startRecording**(`options`: [StartRecordingOptions](../interfaces/_browser_.startrecordingoptions.md)): *Promise‹unknown›*

*Defined in [browser.ts:46](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L46)*

Uses [MediaRecorder] to start recording current captured video.
Notice that this function is meant to be serialized and evaluated in a browser context that's why its dependencies must be controlled.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [StartRecordingOptions](../interfaces/_browser_.startrecordingoptions.md) |  { video: document.querySelector<HTMLVideoElement>('video')!, mimeType: 'video/webm;codecs=vp8', width: 480, height: 320 } |

**Returns:** *Promise‹unknown›*
