const newrelic = require('newrelic');
const express = require('express');
const postgres = require('../databases/postgres');
const bodyParser  = require('body-parser');
const cassandra = require('../databases/cassandra');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.aws_access_key_id, secretAccessKey: process.env.aws_secret_access_key, region: 'us-west-1'});
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

var recieveMessageParams = {
	QueueUrl: 'https://sqs.us-west-1.amazonaws.com/567607828756/test_user_sessions_standard_queue',
	MaxNumberOfMessages: 1,
	MessageAttributeNames: [
		'All'
	]
}

setInterval(() => {
	sqs.receiveMessage(recieveMessageParams, (err, data) => {
		if (err) console.log(err, err.stack);
		else {
			if (data.Messages) {
				for (var i = 0; i < data.Messages.length; i++) {
					var receiptHandle = data.Messages[i].ReceiptHandle;
					var messageAttribute = data.Messages[i].MessageAttributes;
					var sessionInfo = {session_id: messageAttribute.session_id.StringValue,
														 user_id: JSON.parse(messageAttribute.user_id.StringValue),
														 content_id: JSON.parse(messageAttribute.content_id.StringValue),
														 category: messageAttribute.category.StringValue,
														 original_content: JSON.parse(messageAttribute.original_content.StringValue),
														 viewed_minutes: JSON.parse(messageAttribute.viewed_minutes.StringValue),
														 geolocation: JSON.parse(messageAttribute.geolocation.StringValue), 
														 date: messageAttribute.date.StringValue
														};
					cassandra.addUserSession(sessionInfo, (err, data) => {
						if (err) {
							console.error('ERROR', err);
						} else {
							console.log('Data successfully added to database');
							var deleteParams = {
								QueueUrl: 'https://sqs.us-west-1.amazonaws.com/567607828756/test_user_sessions_standard_queue',
								ReceiptHandle: receiptHandle
							}
							sqs.deleteMessage(deleteParams, (err, deleteData) => {
								if (err) console.log(err, err.stack);
								else {
									console.log('Data removed from queue', deleteData);
								}
							})
						}
					})
				}
			}
		}
	});
}, 2000);


app.get('/', (req, res) => {
	res.send(201);
})


if (!module.parent) {
	app.listen(app.get('port'), function() {
	  console.log('server listen on port ' + app.get('port'));
	});
}