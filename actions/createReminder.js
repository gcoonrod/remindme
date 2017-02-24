'use strict'
const uuid = require('uuid');

exports.action = {
    name: 'createReminder',
    description: 'My Action',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        to: {required: true},
        body: {required: true},
        recurring: {required: true}
    },

    run: function(api, data, next) {
        let error = null

        api.log(['Creating new reminder'], 'info');

        const from = api.config.environment.twilio.from;

        let reminder = {
            id: uuid.v4(),
            to: data.params.to,
            from: from,
            body: data.params.body,
            recurring: data.params.recurring
        }

        //TODO: Perform validation on inputs

        try {
            let timestamp = api.reminders.calculateNextReminder(reminder.recurring, new Date());

            if(timestamp){
                api.tasks.enqueueAt(timestamp, 'sendReminder', reminder, 'default', error => {
                    if(error){
                        api.log(['Unable to save reminder!'], 'error', error);
                        error.code = 'SERVER_ERROR'
                        next(error);
                    } else {
                        api.log(['Reminder %s created.', reminder.id], 'info')
                        data.response = reminder
                        next();
                    }
                })
            } else {
                api.log(['Recurring object is in a bad state'], 'error', reminder);
                error = new Error('Malformed recurring object!')
                error.code = 'BAD_REQUEST'
                next(error);
            }
        } catch (error) {
            api.log(['Error creating reminder'], 'error', error);
            error.code = 'SERVER_ERROR'
            next(error)
        }
    }
}
