import {
  createSignal,
  createEffect,
  onCleanup,
  JSX,
  splitProps,
} from 'solid-js';
import styles from './styles.module.scss';

export interface ClipboardButtonOwnProps {
  getTextToCopy(): string;
}

export type ClipboardButtonProps = JSX.IntrinsicElements['button'] &
  ClipboardButtonOwnProps;

export function ClipboardButton(props) {
  const [local, otherProps] = splitProps(props, [
    'getTextToCopy',
    'classList',
    'children',
  ]);
  const [latestCopiedSnippet, setLatestCopiedSnippet] = createSignal<
    string | null
  >(null);

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
    if (!!evt.button || evt.defaultPrevented) {
      return;
    }

    const snippet = local.getTextToCopy();

    window.navigator.clipboard.writeText(snippet).then(() => {
      setLatestCopiedSnippet(snippet);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopyRequest}
      classList={{
        ...local.classList,
        [styles.copyBtn]: true,
        'has-text-success-dark': !!latestCopiedSnippet(),
        'has-background-success-light': !!latestCopiedSnippet(),
      }}
      title="copy"
      {...otherProps}
    >
      <svg
        width={24}
        height={24}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="currentColor"
          d="M15 37.95Q13.8 37.95 12.9 37.05Q12 36.15 12 34.95V6.95Q12 5.75 12.9 4.85Q13.8 3.95 15 3.95H37Q38.2 3.95 39.1 4.85Q40 5.75 40 6.95V34.95Q40 36.15 39.1 37.05Q38.2 37.95 37 37.95ZM15 34.95H37Q37 34.95 37 34.95Q37 34.95 37 34.95V6.95Q37 6.95 37 6.95Q37 6.95 37 6.95H15Q15 6.95 15 6.95Q15 6.95 15 6.95V34.95Q15 34.95 15 34.95Q15 34.95 15 34.95ZM9 43.95Q7.8 43.95 6.9 43.05Q6 42.15 6 40.95V10.8H9V40.95Q9 40.95 9 40.95Q9 40.95 9 40.95H32.7V43.95ZM15 6.95Q15 6.95 15 6.95Q15 6.95 15 6.95V34.95Q15 34.95 15 34.95Q15 34.95 15 34.95Q15 34.95 15 34.95Q15 34.95 15 34.95V6.95Q15 6.95 15 6.95Q15 6.95 15 6.95Z"
        />
      </svg>
      <span>{latestCopiedSnippet() ? 'copied!' : 'copy'}</span>
    </button>
  );
}
