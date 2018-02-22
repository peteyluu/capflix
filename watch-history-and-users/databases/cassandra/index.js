const cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints : ['127.0.0.1'] });

client.connect(function(err, result) {
  console.log('cassandra connected');
});


var selectUserSession = (callback) => {
	var selectUserSessionString = "SELECT * FROM user_sessions.users_sessions where id = 8945343";
	client.execute(selectUserSessionString, [], (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	})	
}

var addUserSession = (sessionData, callback) => {
	var addData = [sessionData.session_id, sessionData.user_id, sessionData.content_id, sessionData.category, sessionData.original_content, sessionData.viewed_minutes, sessionData.geolocation, sessionData.date];
	var addUserSessionString = "INSERT INTO user_sessions.user_sessions \
															(id,user_id,content_id,category,original_content, \
															viewed_minutes,geolocation,date) VALUES \
															(?, ?, ?, ?, ?, ?, ?, ?);" 

	client.execute(addUserSessionString, addData, {prepare: true}, (err, result) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	})
}


module.exports = {
	selectUserSession,
	addUserSession
}
