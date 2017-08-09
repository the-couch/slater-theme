const path = require('path');

module.exports = {
   entry: {
      theme: path.resolve(__dirname, 'src/scripts/src/',  'theme.jsx'),
      vendor: path.resolve(__dirname,  'src/scripts/src/',  'vendor.jsx'),
   },
   output: {
      path: path.resolve(__dirname, 'src/scripts/'),
      filename: 'compiled.bundle.js'
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         components: path.resolve(__dirname, 'src/scripts/src/', 'components'),
         sections: path.resolve(__dirname, 'src/scripts/src/', 'sections'),
         templates: path.resolve(__dirname, 'src/scripts/src/', 'templates'),
      },
   },
   module: {
      rules: [
         {
            test: /\.jsx/,
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
