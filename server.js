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
});

server.get('/api/accounts/:id', (req, res) => {
    db
        .select('*')
        .from('accounts')
        .where('id', '=', req.params.id)
        .first()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not get account by id'})
        });
});

server.post('/api/accounts/', (req, res) => {
    db
        .insert(req.body, 'id')
        .into('accounts')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not add the account'})
        });
});

server.put('/api/accounts/:id', (req, res) => {
    const edits = req.body;

    db('accounts')
        .where({id: req.params.id})
        .update(edits)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not update the account'})
        });
});

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Failed to delete the account'})
        })
})

module.exports = server;