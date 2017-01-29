var path = require('path');


module.exports = {
  context: path.resolve(__dirname, './js'),

  entry: {
    app: './apollo.js',
  },

  output: {
    library: 'Apollo',
    libraryTarget: 'umd',
	  umdNamedDefine: true,
    path: path.resolve(__dirname, './public'),
    filename: 'apollo.js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  devServer: {
    contentBase: [path.resolve(__dirname, './public'), path.resolve(__dirname, './dist')],
    watchContentBase: true
  },
}
