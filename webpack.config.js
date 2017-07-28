var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, "src"),
  entry: {
    // vendor: [
    //   "react",
    //   "react-dom",
    //   "react-tap-event-plugin",
    //   "whatwg-fetch", // AJAX fetch polyfill - https://github.com/github/fetch
    //   "material-ui/styles/MuiThemeProvider"
    // ],
    // profile: "./src/profile.js"
    main: "./src/main.js"
    // devhotserver: "webpack/hot/dev-server",
    // devserver: "webpack-dev-server/client?http://localhost:8081"
  },
  output: {
    path: path.resolve('./dist/js'),
    publicPath: '/',
    filename: "[name].js"
  },
  devtool: debug ? "inline-sourcemap" : null,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|vendor|venv|__tests__|BAK)/,
        loader: 'babel-loader', //-loader (optional)
        query: {
          // cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy', 'react-html-attrs', 'transform-class-properties'],
        }
      },
      // fonts and svg
      // { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      // { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      // images
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.scss$/,
        exclude: [ /vendor/, /node_modules/, /venv/, /__tests__/, /BAK/ ],
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ].join("!")
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss', '.css']
    //modules: [
    //  'node_modules',
    //  'src/Components'
    //]
  },
  plugins: debug ?
  //DEV
  [
    new ExtractTextPlugin('style.css', {
      // allChunks: true
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
  :
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // new FaviconsWebpackPlugin('logo.png'),
    new ExtractTextPlugin('style.css', {
      // allChunks: true
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  	new webpack.optimize.UglifyJsPlugin({
        // mangle: false,
        compress: {
            warnings: false
        }
     })
  ]
};
