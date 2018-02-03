const express = require('express');
const path = require('path');
const cassandra = require('cassandra-driver');
const app = express();

var client = new cassandra.Client({ contactPoints : ['127.0.0.1'] });
client.connect(function(err, result) {
  console.log('cassandra connected');
});

// client.execute('SELECT * FROM capflix_test.sessions', [], function(err, result) {
//   if(err) {
//     res.status(404).send({ msg : err });
//   } else {
//     console.log('ok ok estamos bien muchachos viva la revolucion!')
//   }
// })

// /manifest/:contentId?res=[720]
app.get('/manifest/:contentId', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `./file_storage/${req.query.res}p/${req.query.res}_out.m3u8`));
});

// /chunk/:contentId?res=[720]&chunkNumber=[1]
app.get('/chunk/:contentId', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `./file_storage/${req.query.res}p/${req.query.res}_out${req.query.chunkNumber}.ts`));
});

app.post('/startsession', (req, res) => {

});

app.listen(3000, () => console.log('Example app listening on port 3000!'));