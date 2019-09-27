[camera-capture](../README.md) › ["browser"](_browser_.md)

# External module: "browser"

## Index

### Functions

* [canvasToArrayBuffer](_browser_.md#canvastoarraybuffer)

## Functions

###  canvasToArrayBuffer

▸ **canvasToArrayBuffer**(`canvas`: HTMLCanvasElement, `mime`: string, `quality`: number): *Promise‹ArrayBuffer›*

*Defined in [browser.ts:7](https://github.com/cancerberoSgx/camera-capture/blob/b4deec3/camera-capture/src/browser.ts#L7)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`canvas` | HTMLCanvasElement | - | - |
`mime` | string | "image/png" | A DOMString indicating the image format. The default type is image/png. |
`quality` | number | 1 | A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.  |

**Returns:** *Promise‹ArrayBuffer›*
