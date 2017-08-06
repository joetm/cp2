const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, "src"),
  entry: {
    main: "./src/main.js",
    vendor: [
        "react",
        "react-dom",
        //   "react-tap-event-plugin",
        //   "material-ui/styles/MuiThemeProvider"
        "deepstream.io-client-js/dist/deepstream"
    ]
    // devhotserver: "webpack/hot/dev-server",
    // devserver: "webpack-dev-server/client?http://localhost:8081"
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: "js/[name].js"
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
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
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
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/assets/',
    compress: true,
    port: 9000,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: debug ?
  // -----------
  // DEVELOPMENT
  // -----------
  [
    new ExtractTextPlugin({
      // allChunks: true
      filename: './css/style.css',
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin()
  ]
  :
  // -----------
  // PRODUCTION
  // -----------
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new FaviconsWebpackPlugin({
        logo: './logo.png',
        prefix: 'icons-[hash]/',
        emitStats: false,
        statsFilename: 'iconstats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#fff',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: true
        }
    }),
    new ExtractTextPlugin({
      // allChunks: true
      filename: './css/style.css',
    }),
    //new CopyWebpackPlugin([
    //  {from: './data', to: './data'}
    //]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
        title: "CP v2",
        filename: 'index.html',
        template: '!!handlebars-loader!src/index.hbs',
        minify: {
            collapseWhitespace: true
        },
        hash: true,
        cache: true,
        showErrors: true
    })
  ]
};
