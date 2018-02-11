const { expect } = require('chai');
const redis = require('redis');
const { promisify } = require('util');
// const { redis } = require('../database/redis');
//  getAsync, setAsync, existAsync, expireAsync, delAsync

describe('redis database', () => {
  let client;
  beforeEach(() => {
    client = redis.createClient();
  });
  afterEach(() => {
    client.flushdb((err, resp) => {
      console.log('succeeded');
    });
    client.quit();
  });
  it('should connect to redis', () => {
    console.log(client);
  });
});
