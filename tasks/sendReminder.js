'use strict'

exports.task = {
    name: 'sendReminder',
    description: 'My Task',
    frequency: 0,
    queue: 'reminders',
    middleware: [],

    run: function(api, params, next) {

        api.log(['Sending Reminder to %s', params.to], 'info', params);

        const from = params.from || api.config.environment.twilio.from;

        let message = {
            to: params.to,
            from: from,
            body: params.body
        };

        api.messages.send(message)
            .then(response => {
                api.log(['Reminder sent successfully.'], 'info');
                api.log(['Message response.'], debug, response);
                if (params.recurring) {
                    let timestamp = api.reminders.calculateNextReminder(params.recurring, new Date());
                    api.tasks.enqueueAt(timestamp, 'sendReminder', params, (error, toRun) => {
                        if (error) {
                            next(error);
                        }

                        api.log(['Next Reminder queued at %s', timestamp], 'info');
                        next();
                    })
                } else {
                    next();
                }
            })
            .catch(error => {
                api.log(['Error sending reminder'], 'error', error);
                done(error);
            })
    }
};
