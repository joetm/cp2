#!/usr/bin/env node

const express = require('express')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
const path = require('path')
// const crypto = require('crypto')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('./dist/'))

app.get('/login', function (req, res) {
	console.log('login request')
    res.send('Hello World!')
})

const port = process.env.AUTHPORT || 3000

app.listen(port, function () {
    console.log(`Auth listening on http://localhost:${port}`)
})