require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const search = require('./server/search');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(search);
// app.get('/', (req, res) => {
//   res.send('Hello world\n');
// });


app.listen(PORT, () => console.log(`capflix is listening on port ${PORT}`));

module.exports = app;
