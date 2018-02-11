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

// var addUserSession = (callback) => {
// 	var addUserSessionString = "INSERT INTO user_sessions.users_sessions \
// 															(id,user_id,content_id,category,original_content, \
// 															viewed_minutes,geolocation,date) VALUES \
// 															(?, ?, ?, ?, ?, ?, ?, ?)" 
// 	client.execute(addUserSessionString, [10000001, 111, 111, 'comedies', false, 20.22, {'lat':-48.1225, 'lng':-178.9008}, '2018-01-01'], (err, result) => {
// 		if (err) {
// 			callback(err, null);
// 		} else {
// 			callback(null, result);
// 		}
// 	})
// }


module.exports = {
	selectUserSession
}
