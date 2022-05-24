# @solid-bricks/barcode

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
import { render } from "solid-js/web";
import { Barcode } from '@solid-bricks/barcode';

const root = document.getElementById("app");

if(!root) {
  throw new Error('root node not found');
}

render(() => <Barcode value="ping-pong" />, root);
```

## API Refence

### Main barcode props

#### value

The rendered value, **required**.

#### options

JsBarcode options:  https://github.com/lindell/JsBarcode/wiki/Options


#### onError

Invoked whenever an error occurs while rendering the barcode.

Default value: `console.error`.


#### as

The element that displays the barcode.

Default value: `svg`.

### Other props

- id
- class
- classlist
