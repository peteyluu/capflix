const { client } = require('../database/elasticsearch');

const data = [
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '0',
    },
  },
  {
    category_name: 'action',
    content_id: 0,
    thumbnail: 'http://lorempixel.com/640/480/0',
    mpr: 'g',
    description: 'description0',
    capflix_original: true,
    content_name: 'contentname0',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '1',
    },
  },
  {
    category_name: 'anime',
    content_id: 1,
    thumbnail: 'http://lorempixel.com/640/480/1',
    mpr: 'pg',
    description: 'description1',
    capflix_original: false,
    content_name: 'contentname1',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '2',
    },
  },
  {
    category_name: 'british',
    content_id: 2,
    thumbnail: 'http://lorempixel.com/640/480/2',
    mpr: 'pg-13',
    description: 'description2',
    capflix_original: true,
    content_name: 'contentname2',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '3',
    },
  },
  {
    category_name: 'classic',
    content_id: 3,
    thumbnail: 'http://lorempixel.com/640/480/3',
    mpr: 'r',
    description: 'description3',
    capflix_original: false,
    content_name: 'contentname3',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '4',
    },
  },
  {
    category_name: 'comedy',
    content_id: 4,
    thumbnail: 'http://lorempixel.com/640/480/4',
    mpr: 'nc-17',
    description: 'description4',
    capflix_original: true,
    content_name: 'contentname4',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '5',
    },
  },
  {
    category_name: 'crime',
    content_id: 5,
    thumbnail: 'http://lorempixel.com/640/480/5',
    mpr: 'g',
    description: 'description5',
    capflix_original: false,
    content_name: 'contentname5',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '6',
    },
  },
  {
    category_name: 'cult',
    content_id: 6,
    thumbnail: 'http://lorempixel.com/640/480/6',
    mpr: 'pg',
    description: 'description6',
    capflix_original: true,
    content_name: 'contentname6',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '7',
    },
  },
  {
    category_name: 'documentaries',
    content_id: 7,
    thumbnail: 'http://lorempixel.com/640/480/7',
    mpr: 'pg-13',
    description: 'description7',
    capflix_original: false,
    content_name: 'contentname7',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '8',
    },
  },
  {
    category_name: 'docuseries',
    content_id: 8,
    thumbnail: 'http://lorempixel.com/640/480/8',
    mpr: 'r',
    description: 'description8',
    capflix_original: true,
    content_name: 'contentname8',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '9',
    },
  },
  {
    category_name: 'drama',
    content_id: 9,
    thumbnail: 'http://lorempixel.com/640/480/9',
    mpr: 'nc-17',
    description: 'description9',
    capflix_original: false,
    content_name: 'contentname9',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '10',
    },
  },
  {
    category_name: 'horror',
    content_id: 10,
    thumbnail: 'http://lorempixel.com/640/480/10',
    mpr: 'pg',
    description: 'description10',
    capflix_original: true,
    content_name: 'contentname10',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '11',
    },
  },
  {
    category_name: 'international',
    content_id: 11,
    thumbnail: 'http://lorempixel.com/640/480/11',
    mpr: 'pg-13',
    description: 'description11',
    capflix_original: false,
    content_name: 'contentname11',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '12',
    },
  },
  {
    category_name: 'kids',
    content_id: 12,
    thumbnail: 'http://lorempixel.com/640/480/12',
    mpr: 'r',
    description: 'description12',
    capflix_original: true,
    content_name: 'contentname12',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '13',
    },
  },
  {
    category_name: 'korean',
    content_id: 13,
    thumbnail: 'http://lorempixel.com/640/480/13',
    mpr: 'nc-17',
    description: 'description13',
    capflix_original: false,
    content_name: 'contentname13',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '14',
    },
  },
  {
    category_name: 'music',
    content_id: 14,
    thumbnail: 'http://lorempixel.com/640/480/14',
    mpr: 'pg',
    description: 'description14',
    capflix_original: true,
    content_name: 'contentname14',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '15',
    },
  },
  {
    category_name: 'mysteries',
    content_id: 15,
    thumbnail: 'http://lorempixel.com/640/480/15',
    mpr: 'pg-13',
    description: 'description15',
    capflix_original: false,
    content_name: 'contentname15',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '16',
    },
  },
  {
    category_name: 'reality',
    content_id: 16,
    thumbnail: 'http://lorempixel.com/640/480/16',
    mpr: 'r',
    description: 'description16',
    capflix_original: true,
    content_name: 'contentname16',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '17',
    },
  },
  {
    category_name: 'romance',
    content_id: 17,
    thumbnail: 'http://lorempixel.com/640/480/17',
    mpr: 'nc-17',
    description: 'description17',
    capflix_original: false,
    content_name: 'contentname17',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '18',
    },
  },
  {
    category_name: 'scifi',
    content_id: 18,
    thumbnail: 'http://lorempixel.com/640/480/18',
    mpr: 'pg',
    description: 'description18',
    capflix_original: true,
    content_name: 'contentname18',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '19',
    },
  },
  {
    category_name: 'science',
    content_id: 19,
    thumbnail: 'http://lorempixel.com/640/480/19',
    mpr: 'pg-13',
    description: 'description19',
    capflix_original: false,
    content_name: 'contentname19',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '20',
    },
  },
  {
    category_name: 'spanish',
    content_id: 20,
    thumbnail: 'http://lorempixel.com/640/480/20',
    mpr: 'r',
    description: 'description20',
    capflix_original: true,
    content_name: 'contentname20',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '21',
    },
  },
  {
    category_name: 'sports',
    content_id: 21,
    thumbnail: 'http://lorempixel.com/640/480/21',
    mpr: 'nc-17',
    description: 'description21',
    capflix_original: false,
    content_name: 'contentname21',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '22',
    },
  },
  {
    category_name: 'standup',
    content_id: 22,
    thumbnail: 'http://lorempixel.com/640/480/22',
    mpr: 'pg',
    description: 'description22',
    capflix_original: true,
    content_name: 'contentname22',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '23',
    },
  },
  {
    category_name: 'standup',
    content_id: 23,
    thumbnail: 'http://lorempixel.com/640/480/23',
    mpr: 'pg-13',
    description: 'description23',
    capflix_original: false,
    content_name: 'contentname23',
    airdate: 2017,
  },
  {
    index: {
      _index: 'test',
      _type: 'movie',
      _id: '24',
    },
  },
  {
    category_name: 'thriller',
    content_id: 24,
    thumbnail: 'http://lorempixel.com/640/480/24',
    mpr: 'r',
    description: 'description24',
    capflix_original: true,
    content_name: 'contentname24',
    airdate: 2017,
  },
];

const indexName = 'test';
const initIndex = async () => {
  try {
    await client.indices.create({ index: indexName });
    await client.bulk({ body: data });
    await client.indices.refresh({ index: indexName });
  } catch (err) {
    throw err;
  }
};

const deleteIndex = async () => {
  try {
    await client.indices.delete({ index: indexName });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  initIndex,
  deleteIndex,
  indexName,
};
