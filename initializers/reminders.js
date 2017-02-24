'use strict'

const isObject = require('lodash').isObject;
const dateUtils = require('../utils/dateUtils');

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
            return recurring;
        }

        api.reminders.calculateNextReminder = function(recurring, now) {
            let parsedRecurring = api.reminders._parseRecurring(recurring);
            let nextDate;

            if(parsedRecurring.recurring){
                if(parsedRecurring.every){
                    if(parsedRecurring.week){
                        nextDate = dateUtils.nextWeek(now);
                        return dateUtils.getTimestamp(nextDate);
                    }
                }
            }

            return null;
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
