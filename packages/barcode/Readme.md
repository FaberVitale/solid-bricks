![@solid-bricks/barcode](https://raw.githubusercontent.com/FaberVitale/solid-bricks/main/repo-media/barcode-banner.png)

# [@solid-bricks/barcode](https://github.com/FaberVitale/solid-bricks/packages/barcode) &middot; ![npm](https://img.shields.io/npm/v/@solid-bricks/barcode)

## Description

A solid-js `<Barcode />` component powered by [JsBarcode](https://github.com/lindell/JsBarcode).

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

## API Refence

### Main barcode props

#### value

The rendered string, **required**.

#### options

`JsBarcode` options, see: https://github.com/lindell/JsBarcode/wiki/Options

E.g.

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

#### onError

Invoked whenever an error occurs while rendering the barcode.

Default value: `console.error`.

#### as

The element that displays the barcode, one of `svg` | `img` | `canvas`.

Default value: `svg`.

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
