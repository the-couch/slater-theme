const webpack = require('webpack')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const p = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/scripts/index.js'),
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
      }
    ]
  },
  resolve: {
    alias: {
      slater: path.join(__dirname, 'src/scripts/', 'slater'),
      micromanagerRoot: path.join(__dirname, 'src/scripts'),
      components: path.join(__dirname, 'src/scripts/', 'components'),
      pages: path.join(__dirname, 'src/scripts/', 'pages'),
      templates: path.join(__dirname, 'src/scripts/', 'templates'),
      lib: path.join(__dirname, 'src/scripts/', 'lib')
    }
  },
  plugins: p ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new LodashModuleReplacementPlugin(),
    new UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ] : []
};
