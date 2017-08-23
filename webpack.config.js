const path = require('path');
var webpack = require( 'webpack' );
// var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
   entry: {
      app: path.resolve(__dirname, 'src/scripts/',  'app.js'),
   },
   output: {
      path: path.resolve(__dirname, 'src/scripts/'),
      pathinfo: true,
      filename: 'compiled.bundle.js'
   },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
        // new DashboardPlugin()
    ],
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         components: path.resolve(__dirname, 'src/scripts/src/', 'components'),
         slater: path.resolve(__dirname, 'src/scripts/src/', 'slater'),
         templates: path.resolve(__dirname, 'src/scripts/src/', 'templates'),
      },
   },
   module: {

      loaders: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname),
          loader: 'babel',
          query: require('./babel')
        },
      ],
      rules: [
         {
            test: /\.js$/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['es2015']
               }
            }
         }
      ]
   }
};
