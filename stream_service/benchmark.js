const siege = require('siege');

// siege()
//   .on(1337)
//   .concurrent(20)
//   .for(120).seconds
//   .get('http://ec2-13-57-179-177.us-west-1.compute.amazonaws.com:1337/chunk/somecontent?res=240&chunkNumber=23')
//   .attack();

// siege()
//   .on(1337)
//   .concurrent(20)
//   .for(120).seconds
//   .get('http://ec2-13-57-179-177.us-west-1.compute.amazonaws.com:1337/manifest/somecontent?res=720')
//   .attack();

siege()
  .on(3000)
  .concurrent(100)
  .for(30).seconds
  .post('http://ec2-13-57-179-177.us-west-1.compute.amazonaws.com:1337/startsession', {content_id: 123, user_id: 456})
  .attack();