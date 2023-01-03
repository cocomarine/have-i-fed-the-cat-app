const express = require('express');
const { Cat } = require('./models');

const app = express();

// we expect to have to parse json from request bodies,
// so we need the JSON middleware
app.use(express.json());

// routes and controller functions
app.post('/cats', (req, res) => {
    Cat.create(req.body)
        .then(cat => res.status(201).json(cat));
});

app.get('/cats', (req, res) => {
    Cat.findAll({ where: req.query })
        .then(cat => res.status(200).json(cat));
});

app.get('/cats/:catId', (req, res) => {
    Cat.findByPk(req.params.catId)
        .then(cat => res.status(200).json(cat));
});

app.patch('/cats/:catId', (req, res) => {
    Cat.update(req.body, { where: { id: req.params.catId } })
        .then(cat => res.status(201).json(cat));
});


module.exports = app;