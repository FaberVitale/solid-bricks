import { JSX, createMemo } from 'solid-js';
import { BarcodeProps } from '@solid-bricks/barcode';
import { CodeSnippet } from '../CodeSnippet/CodeSnippet';

export type BarcodeSnippetProps = BarcodeProps;

export function BarcodeSnippet(props: BarcodeSnippetProps): JSX.Element {
  const serializedOptions = createMemo(() => {
    return props.options ? JSON.stringify(props.options, null, ' ') : undefined;
  });

  const indent = '\u0020\u0020';
  const jsxIndent = indent + indent;

  return (
    <CodeSnippet>
      {"import { Barcode } from '@solid-bricks/barcode';\n\n"}
      const options = {serializedOptions()};{'\n'}
      const barcode ={' '}
      {`(\n${indent}<Barcode\n${jsxIndent}options={options}\n${jsxIndent}as="${props.as}"\n${jsxIndent}value="${props.value}"\n${indent}/>\n);`}
    </CodeSnippet>
  );
}
