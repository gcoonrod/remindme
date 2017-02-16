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
            let recurring = {};

            let parsedRecurring;

            try {
                parsedRecurring = api.reminders._parseRecurring(recurring);

                should(parsedRecurring).be.ok;
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

});
