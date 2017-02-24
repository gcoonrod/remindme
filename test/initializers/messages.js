'use strict';

process.env.NODE_ENV = 'test';

const should = require('should');

const actionheroPrototype = require('actionhero');
const actionhero = new actionheroPrototype();

let api;

describe('Initializer Tests: Messages', () => {
    before(done => {
        actionhero.start((error, a) => {
            api = a;
            done()
        })
    })

    after(done => {
        actionhero.stop(error => {
            done(error);
        })
    })

    it('should send a message successfully', done => {
        let message = {
            to: '+18002345678',
            from: '+15005550006',
            body: 'Test'
        };

        api.messages.send(message)
            .then(response => {
                should(response.sid).be.ok;
                done()
            })
            .catch(done)
    })

    it('should throw and error when message is invalid', done => {
        let message = {
            to: '+18005122004',
            from: '+15005550001',
            body: 'Test'
        };

        api.messages.send(message)
            .then(response => {
                done(new Error('Should not have been a successful message!'));
            })
            .catch(error => {
                should(error.status).equal(400);
                should(error.code).equal(21212);
                done();
            })
    })
})
