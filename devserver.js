#!/usr/bin/env node
// see https://github.com/webpack/webpack-dev-server/issues/48#issuecomment-54102027

// This is a little middleware so that we can preserve pushState
var server = require('pushstate-server');

server.start({
  port: process.env.PORT || 8090,
  directory: './dist'
});

// Then we run webpack dev server
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

// var compiler = webpack(process.argv[2] == 'hot' ? require('./webpack.config.hot.js') : require('./webpack.config.js'));
var compiler = webpack(require('./webpack.config.js'));
var devServer = new WebpackDevServer(compiler, {
    stats: {colors: true},
    // contentBase: './dist/',
    contentBase: 'http://localhost:8090/',
	// proxy: {
	// 	"*": "http://localhost:8090/"
	// },
    publicPath: 'http://localhost:8080/js/',
    open: true,
    hot: true
    // hot: process.argv[2] == 'hot'
});

devServer.listen(8080, "localhost", function() {});
