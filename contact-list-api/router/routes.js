const authenticateUser = require('../logic/authenticate-user')
const retrieveContacts = require('../logic/retrieve-contact-list')

class EndPoints {
    constructor(method, path, handler, secured){
        this.method = method;
        this.path = path;
        this.handler = handler;
        this.secured = secured
    };
};
module.exports = [
    new EndPoints('GET', 'contacts', retrieveContacts, true),
    new EndPoints ('POST', 'login', authenticateUser, false)
]