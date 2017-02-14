'use strict'

const twilio = require('twilio')
const Promise = require('bluebird')

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function (api, next) {
    const accountSid = api.config.environment.twilio.account_sid;
    const authToken = api.config.environment.twilio.auth_token;
    const client = twilio(accountSid, authToken);

    const sendMessage = Promise.promisify(client.sendMessage, { context: client});


    api.messages = {};

    api.messages.send = function (message) {
      api.log(['Sending message from %s, to %s', message.from, message.to], 'info');
      return sendMessage(message)
          .then(response => {
            api.log(['Message sent successfuly.'], 'info', response);
            return response
          })
          .catch(error => {
            api.log(['Message failed to send.'], 'error', error);
            throw error;
          });
    }

    next()
  },
  start: function (api, next) {
    next()
  },
  stop: function (api, next) {
    next()
  }
}
