'use strict'

exports['default'] = {
    environment: function (api) {
        return {
            twilio: {
                account_sid: process.env.ACCOUNT_SID || '',
                auth_token: process.env.AUTH_TOKEN || '',
                from: process.env.FROM || ''
            }
        }
    }
}

exports.test = {
    environment: function (api) {
        return {
            twilio: {
                account_sid: process.env.ACCOUNT_SID || 'account_sid',
                auth_token: process.env.AUTH_TOKEN || 'auth_token',
                from: process.env.FROM || '+15005550006'
            }
        }
    }
}
