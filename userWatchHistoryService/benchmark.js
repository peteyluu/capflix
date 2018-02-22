const siege = require('siege');

siege()
	.on(3000)
	.for(1).times
	.concurrent(10)
	.get('/login', {email: 'Anika_Beahan@hotmail.com8000013', password: 'UFft6aZS2OdAK78'}, {hello: 'world'})
	.attack()

// siege()
// 	.wait(1000)
// 	.on(3000)
// 	.post('/signup', {email:'fakeemail@gmail.com', password:'lalalala', geolocation: {lat: 0.0000,lng: 0.0000}})
// 	.for(1).times
// 	.attack()