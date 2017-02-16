'use strict'

const isObject = require('lodash').isObject;

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function(api, next) {
        api.reminders = {};

        api.reminders._parseRecurring = function(recurring) {
            if (isObject(recurring)) {
                return api.reminders._parseRecurringObject(recurring)
            }

            throw new Error('Unsupported recurring definition!');
        }

        api.reminders._parseRecurringObject = function(recurring) {
            return null;
        }

        api.reminders.calculateNextReminder = function(recurring, now) {

        }

        next()
    },
    start: function(api, next) {
        next()
    },
    stop: function(api, next) {
        next()
    }
}
