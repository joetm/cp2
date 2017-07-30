const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, "src"),
  entry: {
    main: "./src/main.js",
    vendor: [
        "deepstream.io-client-js/dist/deepstream"
        //   "react",
        //   "react-dom",
        //   "react-tap-event-plugin",
        //   "material-ui/styles/MuiThemeProvider"
    ]
    // devhotserver: "webpack/hot/dev-server",
    // devserver: "webpack-dev-server/client?http://localhost:8081"
  },
  output: {
    path: path.resolve('./dist/js'),
    publicPath: '/',
    filename: "[name].js"
  },
  devtool: debug ? "inline-sourcemap" : false,
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
        // exclude: [ /vendor/, /venv/, /__tests__/, /BAK/ ],
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap&outputStyle=expanded")
        loader: ExtractTextPlugin.extract("css-loader?sourceMap!sass-loader?sourceMap&outputStyle=expanded")
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'].join("!")
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
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: debug ?
  // -----------
  // DEVELOPMENT
  // -----------
  [
    new ExtractTextPlugin({
      // allChunks: true
      filename: 'style.css',
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
  :
  // -----------
  // PRODUCTION
  // -----------
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // new FaviconsWebpackPlugin('logo.png'),
    new ExtractTextPlugin({
      // allChunks: true
      filename: 'style.css',
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.optimize.OccurrenceOrderPlugin(),
  	new webpack.optimize.UglifyJsPlugin({
        // mangle: false,
        compress: {
            warnings: false
        }
     })
  ]
};
