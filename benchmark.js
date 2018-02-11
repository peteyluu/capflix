const siege = require('siege');

siege()
  .on(3000)
  .for(10000).times
  .concurrent(25)
  .get('/content/2672816')
  .get('/search/horror')
  .get('/categories')
  .attack();
