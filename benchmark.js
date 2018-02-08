const siege = require('siege');

siege()
  .on(3000)
  .for(2000).times
  // .concurrent(100)
  .get('/content/2672816')
  .get('/search/horror')
  .get('/categories')
  .attack();
