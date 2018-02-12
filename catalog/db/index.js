const mongoose = require('mongoose');

const mongodb = 'mongodb://127.0.0.1/capflix';

mongoose.connect(mongodb);

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log(`mongoose connected successfully to ${mongodb}`);
});

const trailer = mongoose.Schema({
  manifestId: String,
  thumbnail: String,
});

const episode = mongoose.Schema({
  description: String,
  length: Number,
  thumbnail: String,
  manifestFileId: String,
  season: Number,
  episode: Number,
});

const movieSchema = mongoose.Schema({
  id: String,
  director: String,
  actors: [String],
  genres: [String],
  category: String,
  mpRating: String,
  airYear: Number,
  capflixOriginal: Boolean,
  trailers: [trailer],
  content: {
    description: String,
    length: Number,
    thumbnail: String ,
    manifestFileId: String,
  },
});

const tvSchema = mongoose.Schema({
  id: String,
  director: String,
  actors: [String],
  genres: [String],
  category: String,
  mpRating: String,
  airYear: Number,
  capflixOriginal: Boolean,
  trailers: [trailer],
  seasonCount: Number,
  episodes: [episode],
});

const tvContent = mongoose.model('tvContent', tvSchema, 'tvContent');
const movieContent = mongoose.model('movieContent', movieSchema, 'movieContent');

const tvFetch = id => tvContent.find({ id }).exec();

const movieFetch = id => movieContent.find({ id }).exec();

const tvAdd = (
  id, director, actors, genres, category,
  mpRating, airYear, capflixOriginal, trailers, seasonCount, episodes,
) => {
  const info = new tvContent({
    id,
    director,
    actors,
    genres,
    category,
    mpRating,
    airYear,
    capflixOriginal,
    trailers,
    seasonCount,
    episodes,
  });
  info.save();
};
  
const movieAdd = (
  id, director, actors, genres, category,
  mpRating, airYear, capflixOriginal, trailers, content
) => {
  const info = new movieContent({
    id,
    director,
    actors,
    genres,
    category,
    mpRating,
    airYear,
    capflixOriginal,
    trailers,
    content,
  });
  info.save();
};

module.exports.tvFetch = tvFetch;
module.exports.movieFetch = movieFetch;
module.exports.tvAdd = tvAdd;
module.exports.movieAdd = movieAdd;
