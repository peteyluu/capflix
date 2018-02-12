const newrelic = require('newrelic');
const express = require('express');
const postgres = require('../databases/postgres');
const bodyParser  = require('body-parser');
const cassandra = require('../databases/cassandra');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });


const app = express();

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json());

app.get('/login',(req, res) => {
	postgres.selectUserByEmail(req.body.email, (err, data) => {
		if (err) {
			console.error('ERROR:', err);
		} else {
			console.log('data:', data);
			res.send(200, data);
		}
	})
});

app.post('/signup', (req, res) => {
	let userInfo = {email: req.body.email, password: req.body.password, geolocation: req.body.geolocation};
	postgres.addUser(userInfo, (err, data) => {
		if (err) { 
			console.error('ERROR:', err);
			res.send(400, err);
		} else {
			console.log(data);
			res.send(301, data);
		}
	})
})

app.get('/', (req, res) => {
	res.send(201);
})

// app.get('/login/:email/:password', (req, res) => {
// 	postgres.selectUserByEmail(req.params.email, (err, data) => {
// 		if (err) {
// 			console.error('ERROR:', err);
// 		} else {
// 			console.log(data);
// 			res.send();
// 		}
// 	})
// });

// app.get('/test', (req, res) => {
// 	cassandra.selectUserSession((err, data) => {
// 		if (err) {
// 			console.error('ERROR:', err);
// 		} else {
// 			console.log(data.rows[0])
// 			res.send(data.rows[0]);
// 		}
// 	})
// });
if (!module.parent) {
	app.listen(app.get('port'), function() {
	  console.log('server listen on port ' + app.get('port'));
	});
}