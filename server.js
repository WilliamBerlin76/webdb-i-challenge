const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Let's get this party started</h2>`)
});

module.exports = server;