const path = require('path');
var webpack = require( 'webpack' );

module.exports = {
   entry: {
      app: path.resolve(__dirname, 'src/scripts/',  'app.js'),
   },
   output: {
      path: path.resolve(__dirname, 'src/scripts/'),
      filename: 'compiled.bundle.js'
   },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         components: path.resolve(__dirname, 'src/scripts/src/', 'components'),
         sections: path.resolve(__dirname, 'src/scripts/src/', 'sections'),
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
