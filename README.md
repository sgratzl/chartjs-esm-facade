# Chart.js ESM Flat Facade

[![NPM Package][npm-image]][npm-url] [![Github Actions][github-actions-image]][github-actions-url]

This is a helper package for the latest chart.js 3.0.0-alpha.2 version to provide a unified flat export hierarchy for both UMD and ESM cases.
It is an application of the [Facade Design Pattern](https://en.wikipedia.org/wiki/Facade_pattern).

**Works only with Chart.js >= 3.0.0-alpha.2**

## Install

```bash
npm install --save chart.js@next chartjs-esm-facade@next
```

## Usage

ESM

```js
import {
  Chart,
  CategoryScale,
  LinearScale,
  Rectangle,
  Legend,
  Line,
  merge,
  valueOrDefault,
} from '@sgratzl/chartjs-esm-facade';
```

UMD

```js
const { Chart, CategoryScale, LinearScale, Rectangle, Legend, merge, valueOrDefault } = ChartESMFacade;
```

see [Samples](https://github.com/sgratzl/chartjs-esm-facade/tree/master/samples) on Github

## Library Usage

In order to proper choose the right adapter when embedding it into a library, one has to enforce the UMD case when building UMD package versions.
This will be accomplished using an alias in the bundler.

An example rollup config

```js
// rollup.config.js
import pnp from 'rollup-plugin-pnp-resolve';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import pkg from './package.json';

export default [
  {
    input: 'src/bundle.js',
    output: {
      file: pkg.main,
      name: 'UMDName',
      format: 'umd',
      globals: {
        'chart.js': 'Chart',
      },
    },
    external: ['chart.js'],
    plugins: [
      alias({
        // enforce UMD adapter version
        entries: [
          {
            find: /^(@sgratzl\/chartjs-esm-facade)$/,
            replacement: '@sgratzl/chartjs-esm-facade/src/index.umd.js',
          },
        ],
      }),
      commonjs(),
      pnp(),
      resolve(),
      babel({ babelHelpers: 'runtime' }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'esm',
    },
    external: (e) => e === 'chart.js' || e.startsWith('chart.js/'),
    plugins: [commonjs(), pnp(), resolve()],
  },
];
```

## Development Environment

```sh
npm i -g yarn
yarn set version 2.1.0
yarn
yarn pnpify --sdk vscode
```

### Building

```sh
yarn install
yarn build
```

[npm-image]: https://badge.fury.io/js/%40sgratzl%2Fchartjs-esm-facade.svg
[npm-url]: https://npmjs.org/package/@sgratzl/chartjs-esm-facade
[github-actions-image]: https://github.com/sgratzl/chartjs-esm-facade/workflows/ci/badge.svg
[github-actions-url]: https://github.com/sgratzl/chartjs-esm-facade/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
