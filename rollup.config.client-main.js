import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/client/ts/main.ts',
  output: {
    file: 'dist/assets/js/main.js',
    format: 'iife',
    name: '_WFW_',
    sourcemap: true
  },
  
  plugins: [
    typescript({
      tsconfig: 'src/client/tsconfig.client.json',
      typescript: require('typescript')
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    uglify({
        'screw-ie8': true,
        'lint': true,
        compress:{
            dead_code: true,
            properties: true,
            drop_debugger: true,
            unsafe: true,
            unsafe_comps: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            collapse_vars: true,
            unused: true,
            reduce_vars: true,
            warnings: false,
            drop_console: true
        }
    }),
    json()
  ]
}