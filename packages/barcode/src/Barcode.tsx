import JsBarcode from 'jsbarcode';
import { createMemo, JSX, mergeProps, createEffect, on } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { Options as JsBarcodeOptions } from 'jsbarcode';

export type BarcodeElement = 'svg' | 'canvas' | 'img';

export type BarcodeFormat =
  | 'CODE39'
  | 'CODE128'
  | 'CODE128A'
  | 'CODE128B'
  | 'CODE128C'
  | 'EAN13'
  | 'EAN8'
  | 'EAN5'
  | 'EAN2'
  | 'UPC'
  | 'UPCE'
  | 'ITF14'
  | 'ITF'
  | 'MSI'
  | 'MSI10'
  | 'MSI11'
  | 'MSI1010'
  | 'MSI1110'
  | 'pharmacode'
  | 'codabar';

export interface BarcodeOtions extends Omit<JsBarcodeOptions, 'format'> {
  format?: BarcodeFormat;
}

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
  class?: JSX.IntrinsicElements['img']['class'];
  classList?: JSX.IntrinsicElements['img']['classList'];
  elemProps?:
    | JSX.IntrinsicElements['svg']
    | JSX.IntrinsicElements['img']
    | JSX.IntrinsicElements['canvas'];
}

const defaultProps: Required<Pick<BarcodeProps, 'as' | 'onError'>> = {
  as: 'svg',
  onError: console.error,
};

export function Barcode(props: BarcodeProps): JSX.Element {
  const local = mergeProps(defaultProps, props);

  let elemRef: SVGElement | HTMLCanvasElement | HTMLImageElement | undefined;

  createEffect(
    on(
      () => [local.value, local.options, local.as],
      () => {
        try {
          JsBarcode(elemRef, local.value, Object.assign({}, local.options));
        } catch (err) {
          local.onError?.(err);
        }
      }
    )
  );

  const memoClassList = createMemo(() => {
    let elemPropsClassList, elemPropsClass, localClass;

    if (local.elemProps) {
      elemPropsClassList = local.elemProps.classList;
      elemPropsClass =
        local.elemProps.class != null
          ? { [local.elemProps.class]: !!local.elemProps.class }
          : null;
    }

    if (local.class != null) {
      localClass = { [local.class + '']: !!local.class };
    }

    return Object.assign(
      {},
      elemPropsClassList,
      elemPropsClass,
      local.classList,
      localClass
    );
  });

  return (
    <Dynamic
      {...local.elemProps}
      class={undefined}
      component={local.as}
      ref={elemRef}
      classList={memoClassList()}
    />
  );
}
