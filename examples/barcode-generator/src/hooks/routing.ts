import {
  Accessor,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';

export function createHashSignal(): Accessor<string> {
  const [hash, setHash] = createSignal<string>('');

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
    setHash(window.location.hash);
  });

  return hash;
}
