[camera-capture](../README.md) › ["captureBase"](../modules/_capturebase_.md) › [CaptureBase](_capturebase_.capturebase.md)

# Class: CaptureBase

## Hierarchy

* **CaptureBase**

  ↳ [VideoCapture](_capture_.videocapture.md)

## Index

### Constructors

* [constructor](_capturebase_.capturebase.md#constructor)

### Properties

* [browser](_capturebase_.capturebase.md#protected-optional-browser)
* [o](_capturebase_.capturebase.md#protected-o)
* [page](_capturebase_.capturebase.md#protected-optional-page)
* [server](_capturebase_.capturebase.md#protected-optional-server)

### Methods

* [initialize](_capturebase_.capturebase.md#initialize)
* [stop](_capturebase_.capturebase.md#stop)

## Constructors

###  constructor

\+ **new CaptureBase**(`o`: [CaptureBaseOptions](../interfaces/_types_.capturebaseoptions.md)): *[CaptureBase](_capturebase_.capturebase.md)*

*Defined in [captureBase.ts:14](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L14)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [CaptureBaseOptions](../interfaces/_types_.capturebaseoptions.md) |  {} |

**Returns:** *[CaptureBase](_capturebase_.capturebase.md)*

## Properties

### `Protected` `Optional` browser

• **browser**? : *puppeteer.Browser*

*Defined in [captureBase.ts:13](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L13)*

___

### `Protected` o

• **o**: *[CaptureBaseOptions](../interfaces/_types_.capturebaseoptions.md)*

*Defined in [captureBase.ts:16](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L16)*

___

### `Protected` `Optional` page

• **page**? : *puppeteer.Page*

*Defined in [captureBase.ts:14](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L14)*

___

### `Protected` `Optional` server

• **server**? : *Server*

*Defined in [captureBase.ts:12](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L12)*

## Methods

###  initialize

▸ **initialize**(): *Promise‹void›*

*Defined in [captureBase.ts:29](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L29)*

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

*Defined in [captureBase.ts:19](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/captureBase.ts#L19)*

**Returns:** *Promise‹void›*
