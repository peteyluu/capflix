const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'elasticsearch:9200' || 'localhost:9200',
  // host: 'http://192.168.99.100:9200',
  // log: 'trace',
});

// create index
// const createIndex = indexName => client.indices.create({ index: indexName });

// delete index
// const deleteIndex = indexName => client.indices.delete({ index: indexName });

// check if the index exists
// const indexExists = indexName => client.indices.exists({ index: indexName });

// indexExists('summarymovie')
//   .then((exists) => {
//     if (exists) return deleteIndex('summarymovie');
//   })
//   .then(() => createIndex('summarymovie'))
//   .then(() => {
//     // create index mapping for movie summary
//     client.indices.putMapping({
//       index: 'summarymovie',
//       type: 'movie',
//       body: {
//         properties: {
//           content_name: { type: 'text' },
//           capflix_original: { type: 'boolean' },
//           thumbnail: { type: 'text' },
//           description: { type: 'text' },
//           category_name: { type: 'text' },
//           airdate: { type: 'integer' },
//           mpr: { type: 'text' },
//           suggest: {
//             type: 'completion',
//             analyzer: 'simple',
//             search_analyzer: 'simple',
//           },
//         },
//       },
//     });
//   });

// indexExists('summarytvshow')
//   .then((exists) => {
//     if (exists) return deleteIndex('summarytvshow');
//   })
//   .then(() => createIndex('summarytvshow'))
//   .then(() => {
//     // create index mapping for tv show summary
//     client.indices.putMapping({
//       index: 'summarytvshow',
//       type: 'tvshow',
//       body: {
//         properties: {
//           content_name: { type: 'text' },
//           capflix_original: { type: 'boolean' },
//           thumbnail: { type: 'text' },
//           season: { type: 'integer' },
//           episode: { type: 'integer' },
//           description: { type: 'text' },
//           category_name: { type: 'text' },
//           airdate: { type: 'integer' },
//           seasons: { type: 'integer' },
//           mpr: { type: 'text' },
//           suggest: {
//             type: 'completion',
//             analyzer: 'simple',
//             search_analyzer: 'simple',
//           },
//         },
//       },
//     });
//   });

/*
  Inside a function marked as `async`, you are allowed to place the `await` keyword in front of an expression that returns a promise.
  When you do, the execution of the `async` function is paused until the promise is resolved
*/

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

// add document to summarymovie
// if the index does not exist, it will implicitly create it
// each index can only have one type
// const addDocumentSummaryMovie = document =>
//   client.index({
//     index: 'summarymovie',
//     type: 'movie',
//     id: document.id,
//     body: {
//       airdate: document.airdate,
//       capflix_original: document.capflix_original,
//       category_name: document.category_name,
//       content_name: document.content_name,
//       description: document.description,
//       mpr: document.mpr,
//     },
//   });

// add document to summarytvshow
// if the index does not exist, it will implicitly create it
// each index can only have one type
// const addDocumentSummaryTvshow = document =>
//   client.index({
//     index: 'summarytvshow',
//     type: 'tvshow',
//     id: document.id,
//     body: {
//       airdate: document.airdate,
//       capflix_original: document.capflix_original,
//       category_name: document.category_name,
//       content_name: document.content_name,
//       description: document.description,
//       episode: document.episode,
//       mpr: document.mpr,
//       season: document.season,
//       seasons: document.seasons,
//     },
//   });

module.exports = {
  // createIndex,
  // deleteIndex,
  // indexExists,
  // addDocumentSummaryMovie,
  // addDocumentSummaryTvshow,
  client,
  searchSummary,
  fetchCategories,
  getSummaryById,
  bulkDocuments,
};
