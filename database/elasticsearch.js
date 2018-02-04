const elasticsearch = require('elasticsearch');

// create a client instance
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

// send a HEAD request to `/` and allow up to 1 second for it to complete
// const ping = client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000,
// }, (err) => {
//   if (err) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

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

// get documents from summary index based on query
const searchSummary = async query =>
  client.search({
    index: 'summary',
    q: query,
  });

// get documents from summary index on [categories]
const fetchCategories = async categories =>
  client.search({
    index: 'summary',
    body: {
      query: {
        terms: {
          category_name: categories,
        },
      },
    },
  });

// get document from summary index on id
const getSummaryById = async summaryId =>
  client.get({
    index: 'summary',
    type: 'movie',
    id: summaryId,
  });

// add/update/delete to /summary/movie
const bulkDocuments = async docs =>
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
  searchSummary,
  fetchCategories,
  getSummaryById,
  bulkDocuments,
};
