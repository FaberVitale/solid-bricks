// rollup.config.js
import withSolid from 'rollup-preset-solid';

const config = withSolid({
  input: 'src/index.tsx',
  targets: ['esm', 'cjs'],
});

export default config;
