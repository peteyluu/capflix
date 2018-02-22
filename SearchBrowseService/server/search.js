const express = require('express');
const db = require('../database/elasticsearch');
const redis = require('../database/redis');

const router = express.Router();

// http://...:PORT/search/query
router.get('/search/:query', async (req, res) => {
  try {
    let data;
    if (await redis.existAsync(req.params.query)) {
      data = await redis.getAsync(req.params.query);
    } else {
      data = await db.searchSummary(req.params.query);
      await redis.setAsync(req.params.query, JSON.stringify(data));
    }
    redis.expireAsync(req.params.query, 600);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:3000/categories?cats=["action","anime"]
// defaults to ["action","anime"] if no query is provided
router.get('/categories', async (req, res) => {
  try {
    const categories = req.query.cats ? JSON.parse(req.query.cats) : ['action', 'anime'];
    const categoriesKey = categories.join('');
    let data;
    if (await redis.existAsync(categoriesKey)) {
      data = await redis.getAsync(categoriesKey);
    } else {
      data = await db.fetchCategories(categories);
      await redis.setAsync(categoriesKey, JSON.stringify(data));
    }
    redis.expireAsync(categoriesKey, 600);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// gets content movie details (current: movie summary)
// TODO: sends request to catalogue service
router.get('/content/:id', async (req, res) => {
  try {
    let data;
    if (await redis.existAsync(req.params.id)) {
      data = await redis.getAsync(req.params.id);
    } else {
      data = await db.getSummaryById(req.params.id);
      await redis.setAsync(req.params.id, JSON.stringify(data));
    }
    redis.expireAsync(req.params.id, 600);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// adds one or more documents to summary/movie
// TODO: refactor line 45-49 to a middleware???
router.post('/summary/movie', async (req, res) => {
  const body = [];
  req.body.forEach((doc) => {
    body.push({ index: { _index: 'summary', _type: 'movie', _id: doc.content_id } });
    body.push(doc);
  });
  try {
    const data = await db.bulkDocuments(body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete one or more documents from summary/movie
// TODO: refactor line 45-49 to a middleware???
router.delete('/summary/movie', async (req, res) => {
  const body = [];
  req.body.forEach((doc) => {
    body.push({ delete: { _index: 'summary', _type: 'movie', _id: doc.content_id } });
  });
  try {
    const data = await db.bulkDocuments(body);
    res.status(202).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/category', (req, res) => {
//   db.createIndex(req.body.indexName)
//     .then((resp) => {
//       res.status(200).json(resp);
//     }).catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.delete('/category', (req, res) => {
//   db.deleteIndex(req.body.indexName)
//     .then((resp) => {
//       res.status(200).json(resp);
//     }).catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.post('/category/summary', (req, res) => {
//   db.addDocument(req.body)
//     .then(resp => res.status(200).json(resp))
//     .catch(err => res.status(400).json(err));
// });

// router.delete('/category/summary', (req, res) => {
//   db.deleteDocument(req.body)
//     .then(resp => res.status(200).json(resp))
//     .catch(err => res.status(400).json(err));
// });

// get all categories: popular, trending now, netflix originals
// router.get('/categories', (req, res) => {
//   db.getCategories()
//     .then(resp => res.status(200).json(resp))
//     .catch(err => res.status(400).json(err));
// });

// add movie summary
// router.post('/summary/movie', (req, res) => {
//   db.addDocumentSummaryMovie(req.body)
//     .then(resp => res.status(201).json(resp))
//     .catch(err => res.status(400).json(err));
// });

// // add tvshow summary
// router.post('/summary/tvshow', (req, res) => {
//   db.addDocumentSummaryTvshow(req.body)
//     .then(resp => res.status(200).json(resp))
//     .catch(err => res.status(400).json(err));
// });

module.exports = router;
