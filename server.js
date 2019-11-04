const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Let's get this party started</h2>`)
});

server.get('/api/accounts', (req, res) => {
    db('Accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({error: 'failed to get accounts'})
        })
})

module.exports = server;