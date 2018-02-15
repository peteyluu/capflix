const pg = require('pg');
var conString = "pg://localhost:5432/capflix_monthly_viewed_minutes";
const pgClient = new pg.Client({
	connectionString: conString
});
pgClient.connect();

const cassandra = require('cassandra-driver');
var cassandraClient = new cassandra.Client({ contactPoints : ['127.0.0.1'] });
cassandraClient.connect(function(err, result) {
  console.log('cassandra connected');
});

//Gets all categories of content
let getCategories = (callback) => {
	const text = `select * from categories;`
	pgClient.query(text, (err, categories) => {
		if (err) {
			console.error('ERROR getting categories:', err);
		} else {
			console.log('categories successfully retrieved');
			callback(categories);
		}
	})
}

//Gets aggregate of viewed minutes in the previous day for a category of original or non-original content
let aggregatePartition = (category, isOriginal) => {
	let date = new Date();
	//get previous date to get aggregate of previous date
	date.setDate(date.getDate() - 1);
	let month = date.getMonth() + 1;
	let nextMonth = month + 1;
	let year = date.getFullYear();
	let yearOfNextMonth = date.getFullYear();
	if (nextMonth > 12) {
		nextMonth = 1
		yearOfNextMonth++;
	}
	const text = `SELECT SUM(viewed_minutes) FROM user_sessions.user_sessions where category='${category}' AND original_content=${isOriginal} AND date >= '${year}-${month}-1' AND date < '${yearOfNextMonth}-${nextMonth}-1' ALLOW FILTERING;`
	cassandraClient.execute(text, (err, response) => {
		if (err) {
			console.error('ERROR:', err);
		} else {
			console.log('aggregate:', JSON.parse(response.rows[0]['system.sum(viewed_minutes)']));
			let aggregate = JSON.parse(response.rows[0]['system.sum(viewed_minutes)']);
			insertAggregate(category, isOriginal, '2016-12', aggregate);
		}
	})
}

let insertAggregate = (category, isOriginal, date, aggregate) => {
	const text = `INSERT INTO monthly_viewed_minutes (date, category, original_content, viewed_minutes)\
								VALUES ('${date}', '${category}', ${isOriginal}, ${aggregate}) ON CONFLICT (date, category, original_content) \
								DO UPDATE SET viewed_minutes = ${aggregate};`
	pgClient.query(text, (err, update) => {
		if (err) {
			console.error('ERROR:', err);
		} else {
			console.log('' + date + ' ' + category + ' ' + isOriginal + ' successfully updated/inserted');
		}
	})
}

let aggregateAllData = () => {
	getCategories((categories) => {
		for (var i = 0; i < categories.rows.length; i++) {
			let category = categories.rows[i].category;
			aggregatePartition(category, true);
			aggregatePartition(category, false);
		}
	})
}



// aggregateAllData();







