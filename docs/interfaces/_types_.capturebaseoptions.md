[camera-capture](../README.md) › ["types"](../modules/_types_.md) › [CaptureBaseOptions](_types_.capturebaseoptions.md)

# Interface: CaptureBaseOptions

## Hierarchy

* **CaptureBaseOptions**

  ↳ [CaptureOptions](_types_.captureoptions.md)

## Index

### Properties

* [debug](_types_.capturebaseoptions.md#optional-debug)
* [mkdirServed](_types_.capturebaseoptions.md#optional-mkdirserved)
* [port](_types_.capturebaseoptions.md#optional-port)
* [puppeteerOptions](_types_.capturebaseoptions.md#optional-puppeteeroptions)

## Properties

### `Optional` debug

• **debug**? : *undefined | false | true*

*Defined in [types.ts:13](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L13)*

___

### `Optional` mkdirServed

• **mkdirServed**? : *string | boolean*

*Defined in [types.ts:12](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L12)*

If given, a folder with that path will be created (or if true is given at $HOME/.camera-capture/static) and a index.html file will be copied there so it can be served as static web page for the headless browser to use. This is not often necessary, but particularly when packaging the client package as a desktop application with asar or yackage .

___

### `Optional` port

• **port**? : *undefined | number*

*Defined in [types.ts:7](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L7)*

Image-capture needs to serve a static HTML so the headless browser capture media from there. If given port number will be used for the server. Default is 8080.

___

### `Optional` puppeteerOptions

• **puppeteerOptions**? : *LaunchOptions*

*Defined in [types.ts:8](https://github.com/cancerberoSgx/camera-capture/blob/8b5746d/camera-capture/src/types.ts#L8)*
