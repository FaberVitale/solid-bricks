import type { Options as JsBarcodeOptions } from 'jsbarcode';
import type { JSX } from 'solid-js';

export type BarcodeElement = 'svg' | 'canvas' | 'img';

export type BarcodeOtions = JsBarcodeOptions;

export interface BarcodeProps {
  /**
   * The element that displays the barcode.
   *
   * Default value: `svg`
   */
  as?: BarcodeElement;
  /**
   * The rendered value.
   */
  value: string;
  /**
   * `JsBarcode` options.
   * @see https://github.com/lindell/JsBarcode/wiki/Options
   *
   * Default value: `undefined`
   */
  options?: BarcodeOtions | undefined;
  /**
   * Invoked whenever an error occurs while rendering the barcode.
   *
   * Default value: `console.error`
   */
  onError?(reason: unknown): void;
  id?: string | undefined;
  class?: JSX.IntrinsicElements['img']['class'];
  classlist?: JSX.IntrinsicElements['img']['classList'];
}
