const express = require('express')

const app = express()

app.listen(3000)

app.get('/', (req, res) => {
    res.sendFile('test-addon.js', { root: __dirname })
})

app.get('/html', (req, res) => {
    res.sendFile('test-html.html', { root: __dirname })
})

app.get('/test-css.css', (req, res) => {
    res.sendFile('test-css.css', { root: __dirname })
})

app.get('/test-js.js', (req, res) => {
    res.sendFile('test-js.js', { root: __dirname })
})