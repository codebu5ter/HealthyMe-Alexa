'use strict';
var Alexa = require("alexa-sdk");
var storage = require("./storage");

exports.handler = function (event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.APP_ID = 'amzn1.ask.skill.03bc3597-4bf4-4beb-b687-5b507585a3da';
	alexa.registerHandlers(handlers);
	alexa.execute();

};

const handlers = {
	'LaunchRequest': function () {
		var welcomeMessage = 'Hello! How are you feeling today?';
		this.emit(':ask', welcomeMessage, 'Try again.');
	},

	'SetSleep': function() {
		var sleep = this.event.request.intent.slots.sleep.value;
		var response = '';

		storage.saveSleep(sleep, this.event.session, (sleep) => {
			response = 'Ok, you had ' + sleep + ' hours of sleep yesterday. I got it.';
			this.emit(':ask', response);
		});
	},

	'GetSleep': function() {
		var sleep = this.event.request.intent.slots.sleep.value;
		var response = '';

		storage.getSleep(this.event.session, (sleep) => {
			response = 'You had' + sleep + ' hours of sleep yesterday.';
			this.emit(':ask', response);
		});
	},
	
	'SetWater': function() {
		var water = this.event.request.intent.slots.water.value;
		var response = '';

		storage.saveWater(water, this.event.session, (water) => {
			response = 'Ok, you had ' + water + ' glasses of water yesterday. I got it.';
			this.emit(':ask', response);
		});
	},

	'GetWater': function() {
		var water = this.event.request.intent.slots.water.value;
		var response = '';

		storage.getWater(this.event.session, (water) => {
			response = 'You had' + water + ' glasses of water yesterday.';
			this.emit(':ask', response);
		});
	},
	
	'SetWeight': function() {
		var weight = this.event.request.intent.slots.weight.value;
		var response = '';

		storage.saveWeight(weight, this.event.session, (weight) => {
			response = 'Ok, you weighed ' + weight + ' kilograms yesterday. I got it.';
			this.emit(':ask', response);
		});
	},

	'GetWeight': function() {
		var weight = this.event.request.intent.slots.weight.value;
		var response = '';

		storage.getWeight(this.event.session, (weight) => {
			response = 'You weighed' + weight + ' kilograms yesterday.';
			this.emit(':ask', response);
		});
	},

	'Unhandled': function() {
		this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
	},

	'AMAZON.HelpIntent': function () {
		this.emit(':ask', 'Tell me how much water you drank today, how many hours you slept yesterday and how much do you weigh currently.', 'try again');
	},

	'AMAZON.StopIntent': function () {
		var say = 'Goodbye. Have a healthy day.';

		this.emit(':tell', say );
	}

}
