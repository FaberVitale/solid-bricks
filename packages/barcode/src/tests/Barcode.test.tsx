import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'solid-testing-library';
import { Barcode } from '../';

describe('<Barcode />', () => {
  let result: ReturnType<typeof render> | undefined;

  afterEach(() => {
    result?.unmount();
    result = undefined;
  });

  it('renders a svg when as="svg"', () => {
    result = render(() => <Barcode as="svg" value="ping" />);

    expect(result.container.querySelector('svg')?.tagName).toMatch(/svg/i);

    expect(
      result.container.querySelector('svg')?.tagName
    ).toMatchInlineSnapshot('"svg"');
  });

  it('renders a canvas when as="canvas"', () => {
    result = render(() => <Barcode as="canvas" value="ping" />);

    expect(result.container.querySelector('canvas')?.tagName).toMatch(
      /canvas/i
    );

    expect(result.container.querySelector('canvas')).toMatchInlineSnapshot(`
      <canvas
        height="142"
        width="178"
      />
    `);
  });

  it('renders an img when  as="img"', () => {
    result = render(() => <Barcode as="img" value="ping" />);
    expect(result.baseElement.querySelector('img')?.tagName).toMatch(/img/i);

    expect(result.container.querySelector('img')).toMatchInlineSnapshot(`
      <img
        src="data,image/jpeg;base64,:V2h5IGFyZSB5b3UgZGVjb2RpbmcgdGhpcyBtb2NrPwo="
      />
    `);
  });

  it('passes elemProps to the element', () => {
    result = render(() => (
      <Barcode
        as="img"
        value="ping"
        elemProps={{ class: 'visually-hidden', 'aria-hidden': 'true' }}
      />
    ));
    expect(
      result.baseElement.querySelector(
        'img.visually-hidden[aria-hidden="true"]'
      )
    ).not.toBe(null);
  });

  it('merges all class props', () => {
    result = render(() => (
      <Barcode
        as="img"
        value="ping"
        class="sr-only"
        classList={{
          ping: true,
        }}
        elemProps={{
          class: 'visually-hidden',
          classList: { pang: true },
          'aria-hidden': 'true',
        }}
      />
    ));

    expect(
      new Set(result.baseElement.querySelector('img')?.classList.values())
    ).toEqual(new Set(['ping', 'sr-only', 'visually-hidden', 'pang']));
  });

  it('forwards render errors to props.onError', () => {
    const onError = vi.fn();

    result = render(() => (
      <Barcode
        as={'div' as any}
        value="ping"
        class="sr-only"
        onError={onError}
      />
    ));

    expect(onError).toHaveBeenCalled();
  });
});
