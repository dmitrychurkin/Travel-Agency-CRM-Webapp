const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/client/ts/main.ts',
    polyfills: './src/client/ts/polyfills/polyfill.min.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/js')
  },
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
        {
            test: /\.ts$/, 
            loader: "ts-loader",
            options: {
                configFile: require.resolve('./src/client/tsconfig.client.json'),
                logInfoToStdOut: true,
                logLevel: 'error'
            }, 
            exclude: /node_modules/
        }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
};