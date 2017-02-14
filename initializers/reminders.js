'use strict'

const reduce = require('lodash').reduce;

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function(api, next) {
        api.reminders = {};

        api.reminders._parseRecurring = function(recurring) {
            let parts = recurring.split(' ');
            return reduce(parts, (result, value, index) => {
                //if every?
            }, {});
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
