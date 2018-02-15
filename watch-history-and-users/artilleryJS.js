const Faker = require('faker');

function generateRandomUser(requestParams, context, events, done) {
	let email = `${Math.floor(Math.random() * 1000000)}${Faker.internet.email()}`;
	let password = `${Math.floor(Math.random() * 1000000)}${Faker.internet.password()}`;
	context.vars.email = email;
	context.vars.password = password;
	return done();
}

module.exports = {
  generateRandomUser
};