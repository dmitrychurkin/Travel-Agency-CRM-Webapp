const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[id]-[contenthash].js'
  },
  plugins: [
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, 'dist/rev-manifest/js.json')
    })
  ]
});