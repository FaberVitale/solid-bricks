import type { JSX } from 'solid-js';

export function MaterialReset(
  props: JSX.IntrinsicElements['svg']
): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path d="M22.55 41.9q-6.15-.5-10.35-5.05Q8 32.3 8 26.05q0-3.85 1.775-7.25t4.975-5.55l2.15 2.15q-2.8 1.65-4.35 4.525Q11 22.8 11 26.05q0 5 3.3 8.65 3.3 3.65 8.25 4.2Zm3 0v-3q5-.6 8.25-4.225 3.25-3.625 3.25-8.625 0-5.45-3.775-9.225Q29.5 13.05 24.05 13.05h-1l3 3-2.15 2.15-6.65-6.65L23.9 4.9l2.15 2.15-3 3h1q6.7 0 11.35 4.675 4.65 4.675 4.65 11.325 0 6.25-4.175 10.8Q31.7 41.4 25.55 41.9Z" />
    </svg>
  );
}

export function MaterialFileDownload(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path d="M24 32.35 14.35 22.7 16.5 20.55 22.5 26.55V8H25.5V26.55L31.5 20.55L33.65 22.7ZM11 40Q9.8 40 8.9 39.1Q8 38.2 8 37V29.85H11V37Q11 37 11 37Q11 37 11 37H37Q37 37 37 37Q37 37 37 37V29.85H40V37Q40 38.2 39.1 39.1Q38.2 40 37 40Z" />
    </svg>
  );
}
