const pg = require('pg');
var conString = "pg://localhost:5432/capflix_users";
const client = new pg.Client({
	connectionString: conString //change to connectionString: process.env.DATABASE_URL when deployed to Heroku
   // ssl: true
});

client.connect();

let selectUserById = (id, callback) => {
	const text = `select * from users where id = ($1)`;
	client.query(text,[id] , (err, res) => {
	  if (err) {
	  	callback(err.stack, null);
	  } else {
	  	// if (res.rows.length === 0) {
	  	// 	client.query(text, ['Burgers'], (err, resTwo)=>{
	  	// 		if(!err) {
	  	// 			callback(null, resTwo.rows)
	  	// 		}
	  	// 	})
	  	// } else {
	  		callback(null, res.rows);	
	  	//}
	  }
    })
}

let selectUserByEmail = (email, callback) => {
	const text = `select id from users where email = ($1)`;
	client.query(text, [email], (err, res) => {
		if (err) {
			callback(err.stack, null);
		} else {
			console.log('RESPONSE:' , res);
			callback(null, res.rows);
		}
	})
}

let addUser = (userInfo, callback) => {
	const text = `INSERT INTO users (email, password, geolocation) VALUES ($1, $2, $3)`
	client.query(text, [userInfo.email, userInfo.password, JSON.stringify(userInfo.geolocation)], (err, res) => {
		if (err) {
			callback(err.stack, null);
		} else {
			callback(null, res.rows[0]);
		}
	})
}

module.exports = {
	selectUserById,
	addUser,
	selectUserByEmail
}