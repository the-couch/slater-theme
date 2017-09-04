const webpack = require('webpack')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const p = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/scripts/app.js'),
  output: {
    path: path.join(__dirname, 'src/assets'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        exclude: /node_modules/,
        options: {
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/scripts'),
        loaders: ['babel-loader']
      },
    ]
  },
  resolve: {
    alias: {
      slater: path.resolve(__dirname, 'src/scripts/src/', 'slater'),
      components: path.resolve(__dirname, 'src/scripts/src/', 'components'),
      templates: path.resolve(__dirname, 'src/scripts/src/', 'templates'),
    },
  },
  plugins: p ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin()
  ] : []
};
