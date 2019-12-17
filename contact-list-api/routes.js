const authenticateUser = require('./logic/authenticate-user')
const retrieveContacts = require('./logic/retrieve-contact-list')

module.exports = [
    {
        method: 'GET',
        path: 'contacts',
        handler: retrieveContacts
    },
    {
        method: 'POST',
        path: 'login',
        handler: authenticateUser
    }
]