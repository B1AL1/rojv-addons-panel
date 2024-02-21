const express = require('express')
const axios = require('axios')

const app = express()
const cors = require('cors')

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

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

app.get('/mrg', async (req, res) => {
    const { page } = req.query
    try {
        const axiosResponse = await axios.get(`https://www.margonem.pl/ladder/players,Inferno?page=${page}`, {
            headers: {
                'Content-Type': 'text/html'
            }
        })

        const data = axiosResponse.data
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred')
    }
})