import { JSX, createMemo, splitProps } from 'solid-js';
import { BarcodeProps } from '@solid-bricks/barcode';
import { CodeSnippet, CodeSnippetProps } from '../CodeSnippet/CodeSnippet';

export type BarcodeSnippetProps = {
  barcodeProps: BarcodeProps;
} & CodeSnippetProps;

export function BarcodeSnippet(props: BarcodeSnippetProps): JSX.Element {
  const [local, otherProps] = splitProps(props, ['barcodeProps']);

  const serializedOptions = createMemo(() => {
    return local.barcodeProps.options
      ? JSON.stringify(local.barcodeProps.options, null, ' ')
      : undefined;
  });

  const indent = '\u0020\u0020';
  const jsxIndent = indent + indent;

  return (
    <CodeSnippet {...otherProps}>
      {"import { Barcode } from '@solid-bricks/barcode';\n\n"}
      const options = {serializedOptions()};{'\n'}
      const barcode ={' '}
      {`(\n${indent}<Barcode\n${jsxIndent}options={options}\n${jsxIndent}as="${local.barcodeProps.as}"\n${jsxIndent}value="${local.barcodeProps.value}"\n${indent}/>\n);`}
    </CodeSnippet>
  );
}
