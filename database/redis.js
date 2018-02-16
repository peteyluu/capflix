const redis = require('redis');
const { promisify } = require('util');

// const client = redis.createClient(6379, '18.144.5.239');
// const client = redis.createClient(6379, 'localhost');
const client = redis.createClient(6379, process.env.REDIS_HOST);

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

module.exports = {
  client,
  getAsync,
  setAsync,
  existAsync,
  expireAsync,
  delAsync,
  flushDbAsync,
};
