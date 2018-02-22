// var nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const cluster = require('cluster');

const PORT = 3000;

if (cluster.isMaster) {
  const numWorkers = require('os').cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
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
}


// POST /update/new

// POST /update/category

