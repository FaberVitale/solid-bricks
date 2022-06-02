![@solid-bricks/barcode](https://raw.githubusercontent.com/FaberVitale/solid-bricks/main/repo-media/barcode-banner.png)

# [@solid-bricks/barcode](https://github.com/FaberVitale/solid-bricks/blob/main/packages/barcode/Readme.md) &middot; ![npm](https://img.shields.io/npm/v/@solid-bricks/barcode)

## Description

A [solidjs](https://www.solidjs.com/) `<Barcode />` component powered by [JsBarcode](https://github.com/lindell/JsBarcode).

## Installation

### npm

```bash
npm i @solid-bricks/barcode
```

### yarn

```bash
yarn add @solid-bricks/barcode
```

### pnpm

```bash
pnpm add @solid-bricks/barcode
```

## Examples

- **barcode-generator**: **[site](https://fabervitale.github.io/solid-bricks/examples/barcode-generator) - [source](https://github.com/FaberVitale/solid-bricks/tree/main/examples/barcode-generator)**

## Usage

```ts
import { render } from 'solid-js/web';
import { Barcode } from '@solid-bricks/barcode';

const root = document.getElementById('app');

if (!root) {
  throw new Error('root node not found');
}

render(() => <Barcode value="ping-pong" />, root);
```

## API Reference

### Barcode props

| name      | type                     |        required         | description                                                                                                                |
| --------- | ------------------------ | :---------------------: | -------------------------------------------------------------------------------------------------------------------------- |
| `value`   | `string`                 |         **yes**         | the value rendered in the barcode.                                                                                         |
| `onError` | `Function`               | default `console.error` | Callback invoked whenever an error occurs while rendering the barcode.                                                     |
| `as`      | `"svg"\|"img"\|"canvas"` |     default `"svg"`     | The element that displays the barcode.                                                                                     |
| `options` | `Object`                 |      default: `{}`      | Additional barcode customization, see `JsBarcode` [wiki](https://github.com/lindell/JsBarcode/wiki/Options) for more info. |

### Barcode options example

```ts
{
  width: 2,
  height: 100,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined
}
```

### Other props

- [id](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)
- [class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)
- [classlist](https://www.solidjs.com/docs/latest/api#classlist)

More informations are available at https://github.com/lindell/JsBarcode.

### Reference

- https://github.com/lindell/JsBarcode
- https://github.com/lindell/JsBarcode
- https://www.solidjs.com/docs/latest/api

## License

[MIT](https://raw.githubusercontent.com/FaberVitale/solid-bricks/main/LICENSE)
