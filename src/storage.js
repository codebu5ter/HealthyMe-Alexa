'use strict'
var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var storage = (function() {
	var dynamodb = new AWS.DynamoDB.DocumentClient();
	return {
		saveSleep: function(sleep, date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key:{
					'UserId': session.user.userId,
					'Date': date
				},
				UpdateExpression: "set Sleep = :s",
				ExpressionAttributeValues:{
					":s":sleep
				},
				ReturnValues:"UPDATED_NEW"
			};
			dynamodb.update(params, function(err, data) {
				if (err) {
					console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
					callback(sleep);
				}
			})
		},
		getSleep: function(date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				KeyConditionExpression: "#usr = :user and #dt = :date",
				ExpressionAttributeNames: {
					'#usr': 'UserId',
					'#dt': 'Date'
				},
				ExpressionAttributeValues: {
					':user': session.user.userId,
					':date': date
				}
			};
			dynamodb.query(params, function(err, data) {
				var sleep = '';
				if (err) {
					console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
				} else {
					console.log("Query succeeded.");
					data.Items.forEach(function(item) {
						sleep = item.Sleep;
					});
				}
				callback(sleep);
			});
		},
		saveWater: function(water, date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key:{
					'UserId': session.user.userId,
					'Date': date
				},
				UpdateExpression: "set Water = :w",
				ExpressionAttributeValues:{
					":w":water
				},
				ReturnValues:"UPDATED_NEW"
			};
			dynamodb.update(params, function(err, data) {
				if (err) {
					console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
					callback(water);
				}
			})
		},
		getWater: function(date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				KeyConditionExpression: "#usr = :user and #dt = :date",
				ExpressionAttributeNames: {
					'#usr': 'UserId',
					'#dt': 'Date'
				},
				ExpressionAttributeValues: {
					':user': session.user.userId,
					':date': date
				}
			};
			dynamodb.query(params, function(err, data) {
				var water = '';
				if (err) {
					console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
				} else {
					console.log("Query succeeded.");
					data.Items.forEach(function(item) {
						water = item.Water;
					});
				}
				callback(water);
			});
		},
		saveWeight: function(weight, date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				Key:{
					'UserId': session.user.userId,
					'Date': date
				},
				UpdateExpression: "set Weight = :w",
				ExpressionAttributeValues:{
					":w":weight
				},
				ReturnValues:"UPDATED_NEW"
			};
			dynamodb.update(params, function(err, data) {
				if (err) {
					console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
					callback(weight);
				}
			})
		},
		getWeight: function(date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				KeyConditionExpression: "#usr = :user and #dt = :date",
				ExpressionAttributeNames: {
					'#usr': 'UserId',
					'#dt': 'Date'
				},
				ExpressionAttributeValues: {
					':user': session.user.userId,
					':date': date
				}
			};
			dynamodb.query(params, function(err, data) {
				var weight = '';
				if (err) {
					console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
				} else {
					console.log("Query succeeded.");
					data.Items.forEach(function(item) {
						weight = item.Weight;
					});
				}
				callback(weight);
			});
		},
		getDailySummary: function(date, session, callback) {
			var params = {
				TableName: 'HealthyMe',
				KeyConditionExpression: "#usr = :user and #dt = :date",
				ExpressionAttributeNames: {
					'#usr': 'UserId',
					'#dt': 'Date'
				},
				ExpressionAttributeValues: {
					':user': session.user.userId,
					':date': date
				}
			};
			dynamodb.query(params, function(err, data) {
				var weight = '';
				var sleep = '';
				var water = '';
				if (err) {
					console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
				} else {
					console.log("Query succeeded.");
					data.Items.forEach(function(item) {
						weight = item.Weight;
						sleep = item.Sleep;
						water = item.Water;
					});
				}
				callback(sleep, water, weight);
			});
		},
	}
})();

module.exports = storage;
