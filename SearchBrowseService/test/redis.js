const { expect } = require('chai');

describe('redis database', () => {
  let db;
  before(() => {
    db = require('../database/redis');
  });
  after(async () => {
    const resp = await db.flushDbAsync();
    if (resp === 'OK') db.client.quit();
  });
  describe('client', () => {
    it('should connect to redis', async () => {
      expect(db.client).to.have.property('connected', true);
    });
  });
  describe('get', () => {
    it('should get value based on key', async () => {
      await db.setAsync('hello', 'world');
      const resp = await db.getAsync('hello');
      expect(resp).to.equal('world');
    });
  });
  describe('set', () => {
    it('should overwrite existing set key/value mapping', async () => {
      await db.setAsync('foo', 'bar');
      await db.setAsync('foo', 'bor');
      const resp = await db.getAsync('foo');
      expect(resp).to.equal('bor');
    });
  });
  describe('exist', () => {
    it('should check if key/value mapping exist', async () => {
      await db.setAsync('redis', 'ayylmao');
      const resp = await db.existAsync('redis');
      expect(resp).to.equal(1);
    });
  });
  describe('delete', () => {
    it('should delete if key/value', async () => {
      await db.setAsync('peanut', 'butter');
      await db.delAsync('peanut');
      const resp = await db.getAsync('peanut');
      expect(resp).to.equal(null);
    });
  });
});
