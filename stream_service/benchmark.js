const siege = require('siege');

siege()
  .on(3000)
  .for(120).seconds
  .get('/chunk/somecontent?res=720&chunkNumber=1')
  .attack();