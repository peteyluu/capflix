var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
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

var tvContent = mongoose.model('tvContent', tvSchema);
var movieContent = mongoose.model('movieContent', movieSchema);

// let fetch = (name) => {
//   return WaterMe.find({name: name}).exec();
// };
//
// let save = (name, weight, wakeTime, sleepTime, amountPerDay, amountSoFar, bottles) => {
//   let info = new WaterMe({
//     name: name,
//     weight: weight,
//     wakeTime: wakeTime,
//     sleepTime: sleepTime,
//     amountPerDay: amountPerDay,
//     amountSoFar: amountSoFar,
//     bottles: bottles
//   });
//   info.save();
// }
//
// let update = (amount) => {
//   WaterMe.findOneAndUpdate({name: 'Justin'}, {$inc: { amountSoFar: amount }}, {new: true}, function(err, doc) {
//     if(err) {
//       console.log('Error');
//     }
//   })
// }
//
// let newBottle = (bottle) => {
//   let bottleAmount = parseInt(bottle);
//   WaterMe.findOneAndUpdate({name: 'Justin'}, {$addToSet: { bottles: bottleAmount}}, {new: true}, function(err, doc) {
//     if(err) {
//       console.log('Error');
//     }
//   })
// }
//
// module.exports.save = save;
// module.exports.fetch = fetch;
// module.exports.update = update;
// module.exports.newBottle = newBottle;
// // sample data
// save('Justin', 200, 7, 23, 128, 0, [27]);
