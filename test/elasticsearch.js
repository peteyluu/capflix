const { expect } = require('chai');
const { client } = require('../database/elasticsearch');
const { initIndex, deleteIndex, indexName } = require('./elasticsearchTestData');

describe('elasticsearch database', () => {
  beforeEach(() => initIndex());
  afterEach(() => deleteIndex());

  describe('client', () => {
    it('should connect to elasticsearch', async () => {
      const health = await client.cluster.health();
      expect(health.cluster_name).to.be.a('string');
      expect(health.number_of_nodes).to.be.at.least(1);
      expect(health.number_of_data_nodes).to.be.at.least(1);
    });
    it('should have index', async () => {
      const resp = await client.indices.exists({ index: indexName });
      expect(resp).to.equal(true);
    });
    it('should have movie type', async () => {
      const resp = await client.indices.existsType({ index: indexName, type: 'movie' });
      expect(resp).to.equal(true);
    });
  });

  describe('GET /test', () => {
    it('should get index', async () => {
      const resp = await client.indices.get({ index: indexName });
      expect(resp).to.be.an('object');
      expect(resp).to.have.property('test');
    });
  });

  describe('GET /test/movie/:id', () => {
    it('should get document from the index based on its id', async () => {
      const resp = await client.get({ index: indexName, type: 'movie', id: 0 });
      expect(resp).to.be.an('object');
      expect(resp).to.have.property('_index', 'test');
      expect(resp).to.have.property('_type', 'movie');
      expect(resp).to.have.property('_id', '0');
      expect(resp).to.have.property('found', true);
      expect(resp).to.have.property('_source');
      expect(resp._source).to.deep.equal({
        category_name: 'action',
        content_id: 0,
        thumbnail: 'http://lorempixel.com/640/480/0',
        mpr: 'g',
        description: 'description0',
        capflix_original: true,
        content_name: 'contentname0',
        airdate: 2017,
      });
    });
  });

  describe('GET /test/_search', () => {
    it('should get document(s) from index based on search query', async () => {
      const resp = await client.search({ index: indexName, q: 'action' });
      expect(resp).to.be.an('object');
      expect(resp.hits.total).to.be.at.least(1);
      expect(resp.hits.hits).to.be.an('array');
      for (let i = 0; i < resp.hits.hits.length; i += 1) {
        expect(resp.hits.hits[i]).to.be.an('object');
      }
    });
  });

  describe('GET /test/movie/_search', () => {
    it('should get document(s) from index based on categories', async () => {
      const resp = await client.search({
        index: indexName,
        body: {
          query: {
            terms: {
              category_name: ['action', 'anime'],
            },
          },
        },
      });
      expect(resp).to.be.an('object');
      expect(resp.hits.total).to.be.at.least(1);
      expect(resp.hits.hits).to.be.an('array');
      for (let i = 0; i < resp.hits.hits.length; i += 1) {
        expect(resp.hits.hits[i]).to.be.an('object');
      }
    });
  });
});
