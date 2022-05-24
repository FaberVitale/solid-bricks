import JsBarcode from 'jsbarcode';
import type { JSX } from 'solid-js';
import { mergeProps, splitProps, createEffect, on } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { BarcodeProps } from './types';

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
