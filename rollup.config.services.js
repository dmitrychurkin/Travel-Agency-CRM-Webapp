import babel from 'rollup-plugin-babel';
//import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';

export default{
    entry: 'src/services/services.js',
    dest: 'public/javascripts/services.min.js',
    format: 'iife',
    sourceMap: false,
    moduleName: '_FM_',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        /*eslint({
            exclude: [
                'src/styles/**',
            ]
        }),*/
        babel({ 
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-3'],
            plugins: [
                ['transform-class-properties', { spec: true }], 
                'transform-decorators-legacy'
            ]
        }),
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
};