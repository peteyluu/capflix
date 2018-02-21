const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const util = require('util');

// function from mdn
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomBoolean() {
  let boolean = getRandomInt(0, 2);
  return (boolean) ?  true : false;
}

async function createMovies() {
  var directors = [];
  var actors = [];
  var genres = ['War', 'Western', 'Sci-Fi', 'Musical/Dance', 'Horror',
    'Epic/Historical', 'Drama', 'Crime/Gangster', 'Comedy', 'Adventure', 'Action',
    'Thriller', 'Romance', 'Drama', 'Mystery', 'Fantasy', 'Superhero', 'Animation',
    'Kids', 'Family'];
  var categories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9'];
  var mpRating = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  var airYear = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

  for (let i = 0; i < 40000; i++) {
      directors.push(faker.name.findName())
  }
  for (let i = 0; i < 100000; i++) {
      actors.push(faker.name.findName())
  }
  for (var j = 0; j < 18; j++) {
    let fileCounter = j;
    let movieCounter = j * 500000;
    let csvWriter = createCsvWriter({
      path: __dirname + `/data/movie${fileCounter}.csv`,
      header: [{id: 'id', title: 'id'},
        {id: 'director', title: 'director'},
        {id: 'actors', title: 'actors'},
        {id: 'genres', title: 'genres'},
        {id: 'category', title: 'category'},
        {id: 'mpRating', title: 'mpRating'},
        {id: 'airYear', title: 'airYear'},
        {id: 'capflixOriginal', title: 'capflixOriginal'},
        {id: 'trailers', title: 'trailers'},
        {id: 'content', title: 'content'}]
    });

    let records = [];

    for (let i = 1; i <= 500000; i++) {
      let movGenres = [], movActors = [], movTrailers = [];
      for (let i = 0; i < 2; i++) {
        movGenres.push(genres[getRandomInt(0, genres.length)])
      }
      for (let i = 0; i < 2; i++) {
        movActors.push(actors[getRandomInt(0, actors.length)])
      }
      for (let i = 0; i < getRandomInt(0, 2); i++) {
        let trailer = {
          manifestId: faker.lorem.words().replace(/\s/g, '') + '.m3u8',
          thumbnail: faker.image.imageUrl()
        }
        movTrailers.push(trailer);
      }
      let movContent = {
        description: faker.lorem.paragraph(),
        length: getRandomInt(60, 150),
        thumbnail: faker.image.imageUrl(),
        manifestFileId: faker.lorem.words().replace(/\s/g, '') + '.m3u8'
      }
      let movie = {
        id: 'MOV' + movieCounter,
        director: directors[getRandomInt(0, directors.length)],
        actors: movActors,
        genres: movGenres,
        category: categories[getRandomInt(0, categories.length)],
        mpRating: mpRating[getRandomInt(0, mpRating.length)],
        airYear: airYear[getRandomInt(0, airYear.length)],
        capflixOriginal: getRandomBoolean(),
        trailers: JSON.stringify(movTrailers),
        content: JSON.stringify(movContent)
      };
      records[i] = movie;
      movieCounter++;
    }

    csvWriter
      .writeRecords(records)
  }
}

try {
  createMovies().then(() => {
    console.log('Movies created')
  });
} catch (err) {
  console.log(err);
}
