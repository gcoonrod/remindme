'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var actionheroPrototype = require('actionhero');
var actionhero = new actionheroPrototype();
var api;

describe('Initializer Tests: Reminders', function() {

    before(function(done) {
        actionhero.start(function(error, a) {
            api = a;
            done();
        })
    });

    after(function(done) {
        actionhero.stop(function(error) {
            done();
        });
    })

    describe('_parseRecurring unit tests', () => {
        it('should parse recurring objects correctly', done => {
            let recurring = {
                recurring: true,
                every: true,
                week: false,
                month: true,
                year: true,
                fuzzy: false
            };

            let parsedRecurring;

            try {
                parsedRecurring = api.reminders._parseRecurring(recurring);

                should(parsedRecurring).equal(recurring);
                done();
            } catch (error) {
                done(error);
            }

        });

        it('should throw and error if not called with a supported object type', done => {
            let recurring = 'every week on monday morning';

            let parsedRecurring;

            try {
                parsedRecurring = api.reminders._parseRecurring(recurring);


                next(new Error('Test should have failed!'));
            } catch (error) {
                should(error.message).equal('Unsupported recurring definition!');
                done();
            }
        })
    })

    describe('calculateNextReminder unit tests', () => {
        it('should calculate next week exactly', done => {
            let recurring = {
                recurring: true,
                every: true,
                week: true,
                month: false,
                year: false,
                fuzzy: false
            };

            let nextReminder;
            let now = new Date();
            let now2 = new Date();
            let nextWeek = now.setDate(now.getDate() + 7);
            nextWeek = Math.floor(nextWeek / 1000);

            try {
                nextReminder = api.reminders.calculateNextReminder(recurring, now2);

                should(nextReminder).be.approximately(nextWeek, 10);

                done()
            } catch (error) {
                done(error);
            }
        })

        it('should calculate next month exactly', done => {
            done();
        })
    })

});
