const siege = require('siege');

siege()
  .on(3000)
  .concurrent(20)
  .for(120).seconds
  .get('/chunk/somecontent?res=240&chunkNumber=23')
  .attack();

// siege()
//   .on(3000)
//   .concurrent(20)
//   .for(120).seconds
//   .get('/manifest/somecontent?res=720')
//   .attack();

// siege()
//   .on(3000)
//   .concurrent(100)
//   .for(30).seconds
//   .post('/startsession')
//   .attack();