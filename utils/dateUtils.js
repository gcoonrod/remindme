'use strict';

require('date-utils');

module.exports = {
    tomorrow: function(date) {
        return Date.tomorrow();
    },
    nextWeek: function(date) {
        let _date = date.clone();
        return _date.add({days: 7});
    },
    getTimestamp: function(date) {
        return Math.round(date.getTime() / 1000);
    }
}
