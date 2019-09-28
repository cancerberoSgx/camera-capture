[camera-capture](../README.md) › ["types"](../modules/_types_.md) › [CaptureOptions](_types_.captureoptions.md)

# Interface: CaptureOptions

## Hierarchy

* [CaptureBaseOptions](_types_.capturebaseoptions.md)

  ↳ **CaptureOptions**

## Index

### Properties

* [constrains](_types_.captureoptions.md#optional-constrains)
* [debug](_types_.captureoptions.md#optional-debug)
* [fps](_types_.captureoptions.md#optional-fps)
* [height](_types_.captureoptions.md#optional-height)
* [interval](_types_.captureoptions.md#optional-interval)
* [mime](_types_.captureoptions.md#optional-mime)
* [mkdirServed](_types_.captureoptions.md#optional-mkdirserved)
* [port](_types_.captureoptions.md#optional-port)
* [puppeteerOptions](_types_.captureoptions.md#optional-puppeteeroptions)
* [shots](_types_.captureoptions.md#optional-shots)
* [width](_types_.captureoptions.md#optional-width)

## Properties

### `Optional` constrains

• **constrains**? : *MediaStreamConstraints*

*Defined in [types.ts:19](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L19)*

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from [CaptureBaseOptions](_types_.capturebaseoptions.md).[debug](_types_.capturebaseoptions.md#optional-debug)*

*Defined in [types.ts:13](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L13)*

___

### `Optional` fps

• **fps**? : *undefined | number*

*Defined in [types.ts:39](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L39)*

If given it will make sure frames speed is no greater than given number of frames per second.

___

### `Optional` height

• **height**? : *undefined | number*

*Defined in [types.ts:35](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L35)*

Frames height in pixels. Default is 320.

___

### `Optional` interval

• **interval**? : *undefined | number*

*Defined in [types.ts:23](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L23)*

TODO. Make sure that at least given number of milliseconds pass between frames

___

### `Optional` mime

• **mime**? : *[SupportedFormats](../modules/_types_.md#supportedformats)*

*Defined in [types.ts:43](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L43)*

Output frames image format. Accepted values:  `image/png`, `image/jpeg`, `image/webp`, `rgba`. By default is `rgba` which is raw data image 8-bit depth RGBA - as in HTML's ImageData object.

___

### `Optional` mkdirServed

• **mkdirServed**? : *string | boolean*

*Inherited from [CaptureBaseOptions](_types_.capturebaseoptions.md).[mkdirServed](_types_.capturebaseoptions.md#optional-mkdirserved)*

*Defined in [types.ts:12](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L12)*

If given, a folder with that path will be created (or if true is given at $HOME/.camera-capture/static) and a index.html file will be copied there so it can be served as static web page for the headless browser to use. This is not often necessary, but particularly when packaging the client package as a desktop application with asar or yackage .

___

### `Optional` port

• **port**? : *undefined | number*

*Inherited from [CaptureBaseOptions](_types_.capturebaseoptions.md).[port](_types_.capturebaseoptions.md#optional-port)*

*Defined in [types.ts:7](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L7)*

Image-capture needs to serve a static HTML so the headless browser capture media from there. If given port number will be used for the server. Default is 8080.

___

### `Optional` puppeteerOptions

• **puppeteerOptions**? : *LaunchOptions*

*Inherited from [CaptureBaseOptions](_types_.capturebaseoptions.md).[puppeteerOptions](_types_.capturebaseoptions.md#optional-puppeteeroptions)*

*Defined in [types.ts:8](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L8)*

___

### `Optional` shots

• **shots**? : *undefined | number*

*Defined in [types.ts:27](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L27)*

Takes given number of shots and stops.

___

### `Optional` width

• **width**? : *undefined | number*

*Defined in [types.ts:31](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L31)*

Frames width in pixels. Default is 480.
