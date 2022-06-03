import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  splitProps,
} from 'solid-js';
import { ClipboardButton } from '../ClipboardButton/ClipboardButton';
import styles from './styles.module.scss';

export type CodeSnippetProps = JSX.IntrinsicElements['pre'] & {
  copyBtnPosition?: 'floating' | 'none' | 'static';
};

export function CodeSnippet(props: CodeSnippetProps): JSX.Element {
  const [local, otherProps] = splitProps(
    mergeProps({ copyBtnPosition: 'floating' }, props),
    ['children', 'classList', 'copyBtnPosition']
  );
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

  const getTextToCopy = (): string => {
    return codeRef?.textContent || '';
  };

  return (
    <pre
      classList={{
        ...local.classList,
        'position-relative': true,
        [styles.pre]: true,
        [styles.floatingCopyBtn]: local.copyBtnPosition === 'floating',
        [styles.staticCopyBtn]: local.copyBtnPosition === 'static',
      }}
      {...otherProps}
    >
      <code ref={codeRef}>{local.children}</code>
      <ClipboardButton
        classList={{
          'is-hidden': local.copyBtnPosition === 'none',
          [styles.floatingBtn]: local.copyBtnPosition === 'floating',
        }}
        getTextToCopy={getTextToCopy}
      />
    </pre>
  );
}
