const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js'
  }
});