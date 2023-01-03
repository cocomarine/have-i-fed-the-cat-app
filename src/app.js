const express = require('express');
const { Cat } = require('./models');

const app = express();

// we expect to have to parse json from request bodies,
// so we need the JSON middleware
app.use(express.json());

// routes and controller functions
app.post('/cats', (req, res) => {
    Cat.create(req.body)
        .then(cat => res.status(201).json(cat))
        .catch(err => res.status(400).json(err));
});

app.get('/cats', (req, res) => {
    Cat.findAll({ where: req.query })
        .then(cat => res.status(200).json(cat))
        .catch(err => res.status(400).json(err));
});

app.get('/cats/:catId', (req, res) => {
    Cat.findByPk(req.params.catId)
        .then(cat => res.status(200).json(cat))
        .catch(err => res.status(400).json(err));
});

app.patch('/cats/:catId', (req, res) => {
    Cat.update(req.body, { where: { id: req.params.catId } })
        .then(cat => res.status(201).json(cat))
        .catch(err => res.status(400).json(err));
});

app.delete('/cats/:catId', (req, res) => {
    Cat.destroy({ where: { id: req.params.catId } })
        .then(cat => res.status(200).json(cat))
        .catch(err => res.status(400).json(err));
});

app.patch('/feed/cat/:catId', (req, res) => {
    Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId } })
        .then(cat => res.status(200).json(cat))
        .catch(err => res.status(400).json(err));
});

module.exports = app;