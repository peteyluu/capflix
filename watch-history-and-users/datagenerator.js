const faker = require('faker');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter

//generates fake users for the users database
async function fakeUserGenerator (number) {
	for (var i = 0; i < 1; i++) {
		let fileName = 'users' + i;
		let id = i * 500000 + 1;
		const csvWriter = createCsvWriter({
	    path: path.join(__dirname, `/databases/data/users/${fileName}.csv`),
	    header: [
	    		{id: 'id', title: 'id'},
	        {id: 'email', title: 'email'},
	        {id: 'password', title: 'password'},
	        {id: 'geolocation', title: 'geolocation'}
	    ]
		});

		let records = [];

		for (var j = 1; j <= number; j++) {
			const email = faker.internet.email();
			const password = faker.internet.password();
			const lat = faker.address.latitude();
			const lng = faker.address.longitude();
			const geolocation = `{lat:${lat}, lng:${lng}}`;

			const user = {id, email, password, geolocation};
			records[j] = user;
			id++;
		}

		csvWriter.writeRecords(records)
			.then(() => {
				console.log('users added');
			})
	}
}

const precisionRound =(number, precision) => {
	const factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
//generates fake sessions for the usersSession database
async function fakeSessionsGenerator (number) {
	const categories = ['Action & Adventure', 'Comedies', 'Thrillers', 'Violent TV Shows', 'Animation', 'Documentaries', 'Reality TV', 'Critically-acclaimed', 'Horror', 'TV Comedies', 'Sci-fi', 'Dramas'];
	const trueContent = [false, true];

	for (var i = 0; i < 1; i++) {
		let fileName = 'user_sessions' + i;
		let id = i * 500000 + 1;
		const csvWriter = createCsvWriter({
			path: path.join(__dirname, `/databases/data/user_sessions/${fileName}.csv`),
			header: [
					{id: 'id', title: 'id'},
					{id: 'userId', title: 'userId'},
					{id: 'contentId', title: 'contentId'},
					{id: 'category', title: 'category'},
					{id: 'originalContent', title: 'originalContent'},
					{id: 'viewedMinutes', title: 'viewedMinutes'},
					{id: 'geolocation', title: 'geolocation'},
					{id: 'date', title: 'date'}
			]
		});

		let records = [];

		for (var j = 1; j <= number; j++) {
			const userId = Math.floor(Math.random() * 10000000);
			const contentId = Math.floor(Math.random() * 10000000);
			const category = categories[Math.floor(Math.random() * categories.length)];
			const originalContent = trueContent[Math.floor(Math.random() * trueContent.length)];
			const viewedMinutes = precisionRound(Math.random() * 180, 2);
			const lat = faker.address.latitude();
			const lng = faker.address.longitude();
			const geolocation = `{lat:${lat}, lng:${lng}}`;
			const year = Math.ceil(Math.random() * 17) + 2000;
			const month = Math.ceil(Math.random() * 12);
			let day;
			if (month === 2) { 
				day = Math.ceil(Math.random() * 28);
			} else {
				day = Math.ceil(Math.random() * 31);
			}
			const date = `${month}/${day}/${year}`;
			const session = {id, userId, contentId, category, originalContent, viewedMinutes, geolocation, date};

			records[j] = session;
			id++;
		}

		csvWriter.writeRecords(records)
			.then(() => {
				console.log('sessions added');
			})
	}
}

try {
	fakeUserGenerator(500000)
		.then(() => {
			console.log('Users generated');
		});

	fakeSessionsGenerator(500000)
		.then(() => {
			console.log('Sessions generated');
		});
} catch(err) {
	console.error('ERROR:', err);
}


