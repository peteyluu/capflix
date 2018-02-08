require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');
const cassandra = require('cassandra-driver');
const app = express();

app.use(bodyParser.json())

var client = new cassandra.Client({ contactPoints : ['127.0.0.1'] });
client.connect(function(err, result) {
  console.log('cassandra connected..');
});

// /manifest/:contentId?res=[720]
app.get('/manifest/:contentId', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `./file_storage/${req.query.res}p/${req.query.res}_out.m3u8`));
});

// /chunk/:contentId?res=[720]&chunkNumber=[1]
app.get('/chunk/:contentId', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `./file_storage/${req.query.res}p/${req.query.res}_out${req.query.chunkNumber}.ts`));
});

app.post('/startsession', (req, res) => {
  let uuid = uuidv1();
  client.execute(`INSERT INTO capflix_test.server_sessions (id, content_id, user_id, started, ended, runtime) VALUES (${uuid}, ${req.body.content_id}, ${req.body.user_id}, dateof(now()), null, null);`, function(err, result) {
    if (err) {
      res.status(404).send({ msg : err });
    } else {
      res.set('session_id', uuid);
      res.status(200).sendFile(path.join(__dirname, `./file_storage/rootmanifest.m3u8`));
    }
  });
});

app.patch('/endsession', (req, res) => {
  client.execute(`UPDATE capflix_test.server_sessions SET ended = dateof(now()), runtime = ${req.body.runtime} WHERE id = ${req.body.session_id};`, (err, result) => {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.status(201).send('Session Ended Successfully');
      // HERE I SHOULD ADD THE ENDED SESSION TO A SQS QUEUE SO JIMMY's SERVICE READS IT AND GETS THE DATA
    }
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));