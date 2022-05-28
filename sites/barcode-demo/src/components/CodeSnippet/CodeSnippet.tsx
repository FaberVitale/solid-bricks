import {
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  splitProps,
} from 'solid-js';
import { ClipboardButton } from '../ClipboardButton/ClipboardButton';
import styles from './styles.module.scss';

export type CodeSnippetProps = JSX.IntrinsicElements['pre'];

export function CodeSnippet(props: CodeSnippetProps): JSX.Element {
  const [local, otherProps] = splitProps(props, ['children', 'classList']);
  const [latestCopiedSnippet, setLatestCopiedSnippet] = createSignal<
    string | null
  >(null);
  let codeRef: HTMLElement;

  createEffect(() => {
    if (latestCopiedSnippet()) {
      const timerRef = setTimeout(() => {
        setLatestCopiedSnippet(null);
      }, 5000);

      onCleanup(() => {
        if (timerRef) {
          clearTimeout(timerRef);
        }
      });
    }
  });

  const handleCopyRequest = (evt: MouseEvent) => {
    if (!!evt.button || evt.defaultPrevented || !codeRef) {
      return;
    }

    const snippet = codeRef.textContent ?? '<missing-snippet>';

    window.navigator.clipboard.writeText(snippet).then(() => {
      setLatestCopiedSnippet(snippet);
    });
  };

  const getTextToCopy = () => {
    if (!codeRef) {
      return '';
    }

    return codeRef.textContent;
  };

  return (
    <pre
      classList={{
        ...local.classList,
        'position-relative': true,
        [styles.pre]: true,
      }}
      {...otherProps}
    >
      <ClipboardButton
        class={styles.floatingBtn}
        getTextToCopy={getTextToCopy}
      />
      <code ref={codeRef}>{local.children}</code>
    </pre>
  );
}
