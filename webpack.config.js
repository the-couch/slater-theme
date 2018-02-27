const webpack = require('webpack')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const p = process.env.NODE_ENV === 'production'
const DashboardPlugin = require('webpack-dashboard/plugin')

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
      slater: path.join(__dirname, 'src/scripts/', 'slater'),
      components: path.join(__dirname, 'src/scripts/', 'components'),
      pages: path.join(__dirname, 'src/scripts/', 'pages'),
      templates: path.join(__dirname, 'src/scripts/', 'templates'),
    },
  },
  plugins: p ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new DashboardPlugin()
  ] : []
};
