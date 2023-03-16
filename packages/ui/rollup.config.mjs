import { defineConfig } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: false,
    },
  ],
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
    }),
    nodeResolve(),
    postcss({
      namedExports: true,
      extract: true,
      minimize: true,
      sourceMap: false,
      extensions: ['.css'],
      plugins: [autoprefixer()],
    }),
    typescript(),
  ],
  external: ['react'],
});
