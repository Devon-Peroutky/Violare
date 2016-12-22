var webpack = require('webpack')
var path = require('path');

var APP_DIR = path.resolve(__dirname, '.');
var BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: './app.js',

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    /* Send API requests on localhost to API server get around CORS */
    proxy: {
        '/api/*': 'http://localhost:3001/',
        logLevel: 'debug'
    }
  },

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}