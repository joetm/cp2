#!/usr/bin/env node
// see https://stackoverflow.com/a/26218192/426266
"use strict";

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

const dirname = 'dist';

// proxy----------------------
var app = express();
// proxy the request for static assets
// app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/*', function(req, res) {
    res.sendFile(dirname + '/index.html');
});

// webpack-dev-server---------
var server = new WebpackDevServer(webpack(config), {
    contentBase: dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/dist/",
    stats: { colors: true }
});

// run the two servers--------
server.listen(8081, "localhost", function() {});
app.listen(8080);
