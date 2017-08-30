#!/usr/bin/env node

const express = require('express')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
const path = require('path')
// const crypto = require('crypto')
const bodyParser = require('body-parser')
const akismet = require('akismet').client({
    blog: process.env.AKISMET_SITE,
    apiKey: process.env.AKISMET_KEY
})


const app = express()

app.use(express.static('./dist/'))


/*********************************/
/*           AKISMET             */
/*********************************/

app.post('/akismet/check', (req, res) => {

    akismet.verifyKey(function(err, verified) {
        if (verified) {
            console.log('Akismet API key successfully verified.');

            const info = {
                user_ip: req.body.IP,
                user_agent: req.body.useragent,
                // referrer: req.body.referrer,
                // permalink: req.body.url,
                comment_type: req.body.comment_type,
                comment_author: req.body.username,
                comment_author_email: req.body.email,
                comment_content: req.body.content,
                blog_lang: 'en'
            }

            akismet.checkSpam(info, function(err, spam) {
                if (spam) {
                    console.log('Spam caught.');
                    // akismet.submitSpam(info, function(err) {
                    //     console.log('Spam reported to Akismet.');
                    // });
                    res.sendStatus(403);
                } else {
                    console.log('Not spam');
                    res.sendStatus(200);
                }
            });

        } else {
            console.log('Unable to verify Akismet API key');
            res.sendStatus(200);
        }
    });

})


/*********************************/
/*             AUTH              */
/*********************************/

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