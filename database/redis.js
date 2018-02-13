const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(6379, process.env.REDIS_HOST || 'localhost');

client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('error', (err) => {
  console.log(`Error ${err}`);
});
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const existAsync = promisify(client.exists).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const delAsync = promisify(client.del).bind(client);
const flushDbAsync = promisify(client.flushdb).bind(client);

// setAsync('key1', 'value1')
//   .then((reply) => {
//     console.log(reply);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// getAsync('key1')
//   .then((reply) => {
//     console.log(reply);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// existAsync('key1')
//   .then((reply) => {
//     console.log(reply);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// client.quit();

// const get = (key) => {
//   client.get(key, (err, res) => {
//     console.log(res);
//     client.quit();
//   });
// };
// console.log(client.get('action'));

// const set = (key, value) => {

//   client.set(key, value);
// };

// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', (error, result) => {
//   if (error) throw error;
//   console.log('GET result -> ', result);
// });

module.exports = {
  client,
  getAsync,
  setAsync,
  existAsync,
  expireAsync,
  delAsync,
  flushDbAsync,
};
