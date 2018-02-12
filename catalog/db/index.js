var mongoose = require('mongoose');
var mongodb = 'mongodb://127.0.0.1/capflix'
mongoose.connect(mongodb);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log(`mongoose connected successfully to ${mongodb}`);
});

var trailer = mongoose.Schema({
  manifestId: String,
  thumbnail: String
})

var episode = mongoose.Schema({
  description: String,
  length: Number,
  thumbnail: String,
  manifestFileId: String,
  season: Number,
  episode: Number
})

var movieSchema = mongoose.Schema({
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
    manifestFileId: String
  }
})

var tvSchema = mongoose.Schema({
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
  episodes: [episode]
})

var tvContent = mongoose.model('tvContent', tvSchema, 'tvContent');
var movieContent = mongoose.model('movieContent', movieSchema, 'movieContent');

let tvFetch = (id) => {
  return tvContent.find({id: id}).exec();
};

let movieFetch = (id) => {
  return movieContent.find({id: id}).exec()
}

let tvAdd = (id) => {
  
}
// let testSave = () => {
//   let info = new tvContent({
//     id: 'TVTEST',
//     director: 'TEST',
//     actors: ['TEST','TESTER'],
//     genres: ['TESTG'],
//     category: 'TESTC',
//     mpRating: 'TEST',
//     airYear: 2015,
//     capflixOriginal: true,
//     trailers: [{manifestFileId: 'TEST', thumbnail: 'TEST'}],
//     content: {
//       description: 'DESC',
//       length: 'LENGTH',
//       thumbnail: 'THUMBNAIL',
//       manifestFileId: 'MANI ID'
//     }
//   });
//   info.save();
// }


// testSave();
module.exports.tvFetch = tvFetch;
module.exports.movieFetch = movieFetch;
