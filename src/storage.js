'use strict'
var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var storage = (function() {
	var dynamodb = new AWS.DynamoDB.DocumentClient();
	return {
		saveSleep: function(sleep, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Item: {
					UserId: session.user.userId,
					Sleep: sleep
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(sleep);
			})
		},
		getSleep: function(session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key: {
					UserId: session.user.userId,
				}
			};
			dynamodb.get(params, function(err, data) {
				callback(data.Item.Sleep);
			});
		},
		saveWater: function(water, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Item: {
					UserId: session.user.userId,
					Water: water
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(water);
			})
		},
		getWater: function(session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key: {
					UserId: session.user.userId,
				}
			};
			dynamodb.get(params, function(err, data) {
				callback(data.Item.Water);
			});
		},
		saveWeight: function(weight, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Item: {
					UserId: session.user.userId,
					Weight: weight
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(weight);
			})
		},
		getWeight: function(session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key: {
					UserId: session.user.userId,
				}
			};
			dynamodb.get(params, function(err, data) {
				callback(data.Item.Weight);
			});
		}
	}
})();

module.exports = storage;
