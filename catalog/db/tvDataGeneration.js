const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const util = require('util');

// function from mdn
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

var getRandomBoolean = function () {
  let boolean = getRandomInt(0, 2);
  return (boolean) ?  true : false;
};

var weightSeasons = function () {
  let numSeasons;
  let raw = getRandomInt(0, 20);
  if (raw >= 0 && raw < 8) {
    numSeasons = 1;
  }
  if (raw >= 8 && raw < 11) {
    numSeasons = 2;
  }
  if (raw >= 11 && raw < 14) {
    numSeasons = 3;
  }
  if (raw >= 14 && raw < 19) {
    numSeasons = 4;
  }
  if (raw === 19) {
    numSeasons = 7;
  }
  if (raw === 20) {
    numSeasons = 10;
  }
  if (numSeasons === null) {
    return raw;
  }
  return numSeasons;
};

var weightEpisodes = function () {
  let numEpisodes;
  let raw = getRandomInt(0, 20);
  if (raw >= 0 && raw < 2) {
    numEpisodes = 4;
  }
  if (raw >= 2 && raw < 4) {
    numEpisodes = 5;
  }
  if (raw >= 4 && raw < 6) {
    numEpisodes = 6;
  }
  if (raw >= 6 && raw < 9) {
    numEpisodes = 7;
  }
  if (raw >= 9 && raw < 12) {
    numEpisodes = 8;
  }
  if (raw >= 12 && raw < 14) {
    numEpisodes = 9;
  }
  if (raw >= 14 && raw < 17) {
    numEpisodes = 10;
  }
  if (raw >= 17 && raw < 19) {
    numEpisodes = 11;
  }
  if (raw >= 19 && raw <= 20) {
    numEpisodes = 12;
  }
  if (numEpisodes === null) {
    return raw;
  }
  return numEpisodes;
};

// async function createShows() {
//   var directors = [];
//   var actors = [];
//   var genres = ['War', 'Western', 'Sci-Fi', 'Musical/Dance', 'Horror',
//     'Epic/Historical', 'Drama', 'Crime/Gangster', 'Comedy', 'Adventure', 'Action',
//     'Thriller', 'Romance', 'Drama', 'Mystery', 'Fantasy', 'Superhero', 'Animation',
//     'Kids', 'Family'];
//   var categories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9'];
//   var mpRating = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
//   var airYear = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];


//   for (let i = 0; i < 40000; i++) {
//       directors.push(faker.name.findName())
//   }
//   for (let i = 0; i < 100000; i++) {
//       actors.push(faker.name.findName())
//   }
//   for (var j = 8; j < 10; j++) {
//     let fileCounter = j;
//     let showCounter = j * 500000;

//     let csvWriter = createCsvWriter({
//       path: __dirname + `/data/show${fileCounter}.csv`,
//       header: [{id: 'id', title: 'id'},
//         {id: 'director', title: 'director'},
//         {id: 'actors', title: 'actors'},
//         {id: 'genres', title: 'genres'},
//         {id: 'category', title: 'category'},
//         {id: 'mpRating', title: 'mpRating'},
//         {id: 'airYear', title: 'airYear'},
//         {id: 'capflixOriginal', title: 'capflixOriginal'},
//         {id: 'trailers', title: 'trailers'},
//         {id: 'seasonCount', title: 'seasonCount'},
//         {id: 'episodes', title: 'episodes'}]
//     });

//     let records = [];

//     for (let i = 1; i <= 100000; i++) {
//       let showGenres = [], showActors = [], showTrailers = [], episodes = [];
//       let numSeasons = weightSeasons();
//       for (let i = 0; i < 2; i++) {
//         showGenres.push(genres[getRandomInt(0, genres.length)])
//       }
//       for (let i = 0; i < 2; i++) {
//         showActors.push(actors[getRandomInt(0, actors.length)])
//       }
//       for (let i = 0; i < getRandomInt(0, 2); i++) {
//         let trailer = {
//           manifestId: faker.lorem.words().replace(/\s/g, '') + '.m3u8',
//           thumbnail: faker.image.imageUrl()
//         }
//         showTrailers.push(trailer);
//       }
//       for (var x = 0; x < numSeasons; x++) {
//         let currentSeasonLength = weightEpisodes();
//         for (var y = 0; y < currentSeasonLength; y++) {
//           let episode = {
//             description: faker.lorem.paragraph(),
//             length: getRandomInt(60, 150),
//             thumbnail: faker.image.imageUrl(),
//             manifestFileId: faker.lorem.words().replace(/\s/g, '') + '.m3u8',
//             season: x + 1,
//             episode: y + 1
//           }
//           episodes.push(episode);
//         }
//       }
//       let show = {
//         id: 'TV' + showCounter,
//         director: directors[getRandomInt(0, directors.length)],
//         actors: showActors,
//         genres: showGenres,
//         category: categories[getRandomInt(0, categories.length)],
//         mpRating: mpRating[getRandomInt(0, mpRating.length)],
//         airYear: airYear[getRandomInt(0, airYear.length)],
//         capflixOriginal: getRandomBoolean(),
//         trailers: JSON.stringify(showTrailers),
//         seasonCount: numSeasons,
//         episodes: JSON.stringify(episodes)
//       };
//       records[i] = show;
//       showCounter++;
//     }
//     csvWriter
//       .writeRecords(records)
//     console.log(fileCounter + 'file done')
//   }
// }

// try {
//   createShows().then(() => {
//     console.log('Shows created')
//   });
// } catch (err) {
//   console.log(err);
// }

var createShows = function() {
  var directors = [];
  var actors = [];
  var genres = ['War', 'Western', 'Sci-Fi', 'Musical/Dance', 'Horror',
    'Epic/Historical', 'Drama', 'Crime/Gangster', 'Comedy', 'Adventure', 'Action',
    'Thriller', 'Romance', 'Drama', 'Mystery', 'Fantasy', 'Superhero', 'Animation',
    'Kids', 'Family'];
  var categories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9'];
  var mpRating = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  var airYear = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];


  for (let i = 0; i < 10; i++) {
    directors.push(faker.name.findName());
  }
  for (let i = 0; i < 10; i++) {
    actors.push(faker.name.findName());
  }
  for (var j = 0; j < 1; j++) {
    let fileCounter = j;
    let showCounter = j * 100000;

    let csvWriter = createCsvWriter({
      path: __dirname + `/data/show${fileCounter}.csv`,
      header: [{id: 'id', title: 'id'},
        {id: 'director', title: 'director'},
        {id: 'actors', title: 'actors'},
        {id: 'genres', title: 'genres'},
        {id: 'category', title: 'category'},
        {id: 'mpRating', title: 'mpRating'},
        {id: 'airYear', title: 'airYear'},
        {id: 'capflixOriginal', title: 'capflixOriginal'},
        {id: 'trailers', title: 'trailers'},
        {id: 'seasonCount', title: 'seasonCount'},
        {id: 'episodes', title: 'episodes'}]
    });

    let records = [];

    for (let i = 1; i <= 1; i++) {
      let showGenres = [], showActors = [], showTrailers = [], episodes = [];
      let numSeasons = weightSeasons();
      for (let i = 0; i < 2; i++) {
        showGenres.push(genres[getRandomInt(0, genres.length)])
      }
      for (let i = 0; i < 2; i++) {
        showActors.push(actors[getRandomInt(0, actors.length)])
      }
      for (let i = 0; i < getRandomInt(0, 2); i++) {
        let trailer = {
          manifestId: faker.lorem.words().replace(/\s/g, '') + '.m3u8',
          thumbnail: faker.image.imageUrl()
        }
        showTrailers.push(trailer);
      }
      for (var x = 0; x < numSeasons; x++) {
        let currentSeasonLength = weightEpisodes();
        for (var y = 0; y < currentSeasonLength; y++) {
          let episode = {
            description: faker.lorem.paragraph(),
            length: getRandomInt(60, 150),
            thumbnail: faker.image.imageUrl(),
            manifestFileId: faker.lorem.words().replace(/\s/g, '') + '.m3u8',
            season: x + 1,
            episode: y + 1
          }
          episodes.push(episode);
        }
      }
      let show = {
        id: 'TV' + showCounter,
        director: directors[getRandomInt(0, directors.length)],
        actors: showActors,
        genres: showGenres,
        category: categories[getRandomInt(0, categories.length)],
        mpRating: mpRating[getRandomInt(0, mpRating.length)],
        airYear: airYear[getRandomInt(0, airYear.length)],
        capflixOriginal: getRandomBoolean(),
        trailers: JSON.stringify(showTrailers),
        seasonCount: numSeasons,
        episodes: JSON.stringify(episodes)
      };
      records[i] = show;
      showCounter++;
      console.log(records);
    }
  }
}

createShows();