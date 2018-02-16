const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  // host: '54.153.100.216:9200' || 'localhost:9200',
  host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
});

// create index
// const createIndex = indexName => client.indices.create({ index: indexName });

// delete index
// const deleteIndex = indexName => client.indices.delete({ index: indexName });

// check if the index exists
// const indexExists = indexName => client.indices.exists({ index: indexName });

// get documents from summary index based on query
const searchSummary = query =>
  client.search({
    index: process.env.ELASTIC_INDEX || 'summary',
    q: query,
  });

// get documents from summary index on [categories]
const fetchCategories = categories =>
  client.search({
    index: process.env.ELASTIC_INDEX || 'summary',
    body: {
      query: {
        terms: {
          category_name: categories,
        },
      },
    },
  });

// get document from summary index on id
const getSummaryById = summaryId =>
  client.get({
    index: process.env.ELASTIC_INDEX || 'summary',
    type: process.env.ELASTIC_TYPE || 'movie',
    id: summaryId,
  });

// add/update/delete to /summary/movie
const bulkDocuments = docs =>
  client.bulk({
    body: docs,
  });

module.exports = {
  client,
  searchSummary,
  fetchCategories,
  getSummaryById,
  bulkDocuments,
};
