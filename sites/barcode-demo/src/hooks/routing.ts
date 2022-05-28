import {
  Accessor,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';

export function createHashSignal(initialValue = ''): Accessor<string> {
  const [hash, setHash] = createSignal<string>(initialValue);

  createEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    onCleanup(() => {
      window.removeEventListener('hashchange', onHashChange);
    });
  });

  onMount(() => {
    const initialValue = hash();
    if (window.location.hash !== initialValue) {
      window.location.hash = initialValue;
    }
  });

  return hash;
}
