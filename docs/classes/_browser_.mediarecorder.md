[camera-capture](../README.md) › ["browser"](../modules/_browser_.md) › [MediaRecorder](_browser_.mediarecorder.md)

# Class: MediaRecorder

## Hierarchy

* **MediaRecorder**

## Index

### Constructors

* [constructor](_browser_.mediarecorder.md#constructor)

### Properties

* [audioBitsPerSecond](_browser_.mediarecorder.md#audiobitspersecond)
* [mimeType](_browser_.mediarecorder.md#mimetype)
* [ondataavailable](_browser_.mediarecorder.md#ondataavailable)
* [onerror](_browser_.mediarecorder.md#onerror)
* [onpause](_browser_.mediarecorder.md#onpause)
* [onresume](_browser_.mediarecorder.md#onresume)
* [onstart](_browser_.mediarecorder.md#onstart)
* [onstop](_browser_.mediarecorder.md#onstop)
* [state](_browser_.mediarecorder.md#state)
* [stream](_browser_.mediarecorder.md#stream)
* [videoBitsPerSecond](_browser_.mediarecorder.md#videobitspersecond)

### Methods

* [pause](_browser_.mediarecorder.md#pause)
* [requestData](_browser_.mediarecorder.md#requestdata)
* [resume](_browser_.mediarecorder.md#resume)
* [start](_browser_.mediarecorder.md#start)
* [stop](_browser_.mediarecorder.md#stop)
* [isTypeSupported](_browser_.mediarecorder.md#static-istypesupported)

## Constructors

###  constructor

\+ **new MediaRecorder**(`stream`: MediaStream, `options`: [MediaRecorderOptions](../modules/_browser_.md#mediarecorderoptions)): *[MediaRecorder](_browser_.mediarecorder.md)*

*Defined in [browser.ts:105](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | MediaStream |
`options` | [MediaRecorderOptions](../modules/_browser_.md#mediarecorderoptions) |

**Returns:** *[MediaRecorder](_browser_.mediarecorder.md)*

## Properties

###  audioBitsPerSecond

• **audioBitsPerSecond**: *number*

*Defined in [browser.ts:117](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L117)*

___

###  mimeType

• **mimeType**: *string*

*Defined in [browser.ts:108](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L108)*

___

###  ondataavailable

• **ondataavailable**: *[OnDataAvailableListener](../modules/_browser_.md#ondataavailablelistener)*

*Defined in [browser.ts:112](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L112)*

___

###  onerror

• **onerror**: *[EventHandler](../modules/_browser_.md#eventhandler)*

*Defined in [browser.ts:115](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L115)*

___

###  onpause

• **onpause**: *[EventHandler](../modules/_browser_.md#eventhandler)*

*Defined in [browser.ts:113](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L113)*

___

###  onresume

• **onresume**: *[EventHandler](../modules/_browser_.md#eventhandler)*

*Defined in [browser.ts:114](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L114)*

___

###  onstart

• **onstart**: *[EventHandler](../modules/_browser_.md#eventhandler)*

*Defined in [browser.ts:110](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L110)*

___

###  onstop

• **onstop**: *[EventHandler](../modules/_browser_.md#eventhandler)*

*Defined in [browser.ts:111](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L111)*

___

###  state

• **state**: *[RecordingState](../modules/_browser_.md#recordingstate)*

*Defined in [browser.ts:109](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L109)*

___

###  stream

• **stream**: *MediaStream*

*Defined in [browser.ts:107](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L107)*

___

###  videoBitsPerSecond

• **videoBitsPerSecond**: *number*

*Defined in [browser.ts:116](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L116)*

## Methods

###  pause

▸ **pause**(): *void*

*Defined in [browser.ts:120](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L120)*

**Returns:** *void*

___

###  requestData

▸ **requestData**(): *void*

*Defined in [browser.ts:122](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L122)*

**Returns:** *void*

___

###  resume

▸ **resume**(): *void*

*Defined in [browser.ts:121](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L121)*

**Returns:** *void*

___

###  start

▸ **start**(`timeslice`: number): *void*

*Defined in [browser.ts:118](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`timeslice` | number |

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Defined in [browser.ts:119](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L119)*

**Returns:** *void*

___

### `Static` isTypeSupported

▸ **isTypeSupported**(`type`: string): *boolean*

*Defined in [browser.ts:123](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/browser.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*
