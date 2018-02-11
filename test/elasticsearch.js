const { expect } = require('chai');
const es = require('../database/elasticsearch');
const { initIndex, deleteIndex, indexName } = require('./elasticsearchTestData');

describe('elasticsearch database', () => {
  beforeEach(() => initIndex());
  afterEach(() => deleteIndex());

  describe('client', () => {
    it('should connect to elasticsearch', async () => {
      const health = await es.client.cluster.health();
      expect(health.cluster_name).to.be.a('string');
      expect(health.number_of_nodes).to.be.at.least(1);
      expect(health.number_of_data_nodes).to.be.at.least(1);
    });
    it('should have index', async () => {
      const resp = await es.client.indices.exists({ index: indexName });
      expect(resp).to.equal(true);
    });
    it('should have movie type', async () => {
      const resp = await es.client.indices.existsType({ index: indexName, type: 'movie' });
      expect(resp).to.equal(true);
    });
  });

  describe('GET /test', () => {
    it('should get index', async () => {
      const resp = await es.client.indices.get({ index: indexName });
      expect(resp).to.be.an('object');
      expect(resp).to.have.property('test');
    });
  });

  describe('GET /test/movie/:id', () => {
    it('should get document from the index based on its id', async () => {
      const resp = await es.getSummaryById(0);
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
      const resp = await es.searchSummary('action');
      expect(resp).to.be.an('object');
      expect(resp.hits.total).to.be.at.least(1);
      expect(resp.hits.hits).to.be.an('array');
      expect(resp.hits.hits).to.deep.equal([{
        _index: 'test',
        _type: 'movie',
        _id: '0',
        _score: 1.3862944,
        _source: {
          category_name: 'action',
          content_id: 0,
          thumbnail: 'http://lorempixel.com/640/480/0',
          mpr: 'g',
          description: 'description0',
          capflix_original: true,
          content_name: 'contentname0',
          airdate: 2017,
        },
      }]);
    });
  });

  describe('GET /test/movie/_search', () => {
    it('should get document(s) from index based on categories', async () => {
      const resp = await es.fetchCategories(['action', 'anime']);
      expect(resp).to.be.an('object');
      expect(resp.hits.total).to.be.at.least(1);
      expect(resp.hits.hits).to.be.an('array');
      expect(resp.hits.hits).to.deep.equal([
        {
          _index: 'test',
          _type: 'movie',
          _id: '0',
          _score: 1,
          _source: {
            category_name: 'action',
            content_id: 0,
            thumbnail: 'http://lorempixel.com/640/480/0',
            mpr: 'g',
            description: 'description0',
            capflix_original: true,
            content_name: 'contentname0',
            airdate: 2017,
          },
        },
        {
          _index: 'test',
          _type: 'movie',
          _id: '1',
          _score: 1,
          _source: {
            category_name: 'anime',
            content_id: 1,
            thumbnail: 'http://lorempixel.com/640/480/1',
            mpr: 'pg',
            description: 'description1',
            capflix_original: false,
            content_name: 'contentname1',
            airdate: 2017,
          },
        },
      ]);
    });
  });
});
