'use strict';

process.env.NODE_ENV = 'test';

const should = require('should');
const sinon = require('sinon');
const Promise = require('bluebird');

const actionheroPrototype = require('actionhero');
const actionhero = new actionheroPrototype();
let api;

describe('Task Tests: sendReminder', function() {
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

    it('should not enqueue another instance if no next reminder', done => {
        sinon.stub(api.messages, 'send');
        let enqueuAtMock = sinon.mock(api.tasks).expects('enqueueAt').never();

        api.messages.send.returns(Promise.resolve({}));

        let params = {
            to: '+15558675309',
            from: '+15552345678',
            body: 'Jenny, Jenny, who can I turn to?'
        }

        api.specHelper.runTask('sendReminder', params, (error) => {
            enqueuAtMock.verify();
            api.messages.send.restore();
            api.tasks.enqueueAt.restore();
            done(error);
        })
    })

    it('should enqueue another instance if there is a next reminder', done => {
        sinon.stub(api.messages, 'send');
        sinon.stub(api.tasks, 'enqueueAt').callsArg(4);

        api.messages.send.returns(Promise.resolve({}));

        let params = {
            to: '+15558675309',
            from: '+15552345678',
            body: 'Jenny, Jenny, who can I turn to?',
            recurring: {
                recurring: true,
                every: true,
                week: false,
                month: true,
                year: true,
                fuzzy: false
            }
        }

        api.specHelper.runTask('sendReminder', params, (error) => {

            should(api.tasks.enqueueAt.calledOnce).be.ok;

            api.messages.send.restore();
            api.tasks.enqueueAt.restore();
            done(error);
        })

    })
})
