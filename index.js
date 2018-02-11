require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const search = require('./server/search');
const cluster = require('express-cluster');
const clusting = require('cluster');

// if (clusting.isMaster) {
//   const cpuCount = require('os').cpus().length;

//   for (let i = 0; i < cpuCount; i += 1) {
//     clusting.fork();
//   }
// } else {
//   const app = express();
//   const PORT = 3000;
//   app.use(bodyParser.json());
//   app.use(search);
//   app.listen(PORT, () => console.log(`capflix is listening on port ${PORT}`));
// }

// cluster((worker) => {
//   const app = express();
//   const PORT = 3000;

//   app.use(bodyParser.json());
//   app.use(search);
//   return app.listen(PORT, () => console.log(`capflix is listening on port ${PORT}`));
// });

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(search);
app.listen(PORT, () => console.log(`capflix is listening on port ${PORT}`));

// module.exports = app;
