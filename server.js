#!/usr/bin/env node

const express = require('express')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
const path = require('path')
// const crypto = require('crypto')
const bodyParser = require('body-parser')


const app = express()

app.use(express.static('./dist/'))


// TODO
app.post('/auth/getToken/', (req, res) => {
    if (req.body.email == 'hello@test.com' && req.body.password == 'test') {
        res.status(200)
            .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'})
    } else {
        res.sendStatus(403)
    }
})

// TODO
app.get('/protected/', (req, res) => {
    let token = req.headers['authorization']
    if (!token) {
        res.sendStatus(401)
    } else {
        try {
            let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
            res.status(200)
                .json({data: 'Valid JWT found! This protected data was fetched from the server.'})
        } catch (e) {
            res.sendStatus(401)
        }
    }
})


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/dist/index.html');
// })


const port = process.env.AUTHPORT || 3000

app.listen(port, function () {
    console.log(`Auth listening on http://localhost:${port}`)
})