import JsBarcode from 'jsbarcode';
import type { JSX } from 'solid-js';
import { mergeProps, splitProps, createEffect, on } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { Options as JsBarcodeOptions } from 'jsbarcode';

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

const defaultProps: Required<Pick<BarcodeProps, 'as' | 'onError'>> = {
  as: 'svg',
  onError: console.error,
};

export function Barcode(props: BarcodeProps): JSX.Element {
  const [local, otherProps] = splitProps(mergeProps(defaultProps, props), [
    'as',
    'onError',
    'value',
    'options',
  ]);

  let elemRef: SVGElement | HTMLCanvasElement | HTMLImageElement | undefined;

  createEffect(
    on(
      () => [local.value, local.options, local.as],
      () => {
        try {
          JsBarcode(elemRef, local.value, local.options);
        } catch (err) {
          local.onError?.(err);
        }
      }
    )
  );

  return <Dynamic component={local.as} ref={elemRef} {...otherProps} />;
}
