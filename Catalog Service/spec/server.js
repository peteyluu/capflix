const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');


const PORT = 8080;


const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get('/content/sb/:id', (req, res) => {
  if (req.params.id.slice(0,3) === 'MOV') {
    db.movieFetch(req.params.id)
      .then((info) => {
        if (info.length !== 0) {
          res.send(info[0]);
        } else {
          res.status(404).send('Not content');
        }
      });
  }
  if (req.params.id.slice(0,2) === 'TV') {
    db.tvFetch(req.params.id)
      .then((info) => {
        if (info.length !== 0) {
          res.send(info[0]);
        } else {
          res.status(404).send('Not content');
        }
      });
  }
});

// GET /content/wh/:id
app.get('/content/wh/:id', (req, res) => {
  if (req.params.id.slice(0,3) === 'MOV') {
    db.movieFetch(req.params.id)
      .then((info) => {
        if (info.length !== 0) {
          res.send({ category: info[0].category, capflixOriginal: info[0].capflixOriginal });
        } else {
          res.status(404).send('Not content');
        }
      });
  }
  if (req.params.id.slice(0,2) === 'TV') {
    db.tvFetch(req.params.id).then((info) => {
      if (info.length !== 0) {
        res.send({ category: info[0].category, capflixOriginal: info[0].capflixOriginal });
      } else {
        res.status(404).send('Not content');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Process ${process.pid} is listening to all incoming requests`);
});

module.exports = app;
