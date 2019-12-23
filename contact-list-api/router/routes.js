const authenticateUser = require('../logic/authenticate-user')
const retrieveContacts = require('../logic/retrieve-contact-list')
const retrieveUser = require('../logic/retrieve-user')
/**
 * Create routes for router
 * 
 * @param {string} method GET, POST...
 * @param {string} endPoint
 * @param {Function} handler function to apply
 * @param {Boolean} secured indicate if need verify
 * 
 * @returns {Promise}
 */
class EndPoints {
    constructor(method, endPoint, handler, secured){
        this.method = method;
        this.endPoint = endPoint;
        this.handler = handler;
        this.secured = secured;
    };
};
module.exports = [
    new EndPoints('GET', 'contacts', retrieveContacts, true),
    new EndPoints('GET', 'users', retrieveUser, true),
    new EndPoints ('POST', 'login', authenticateUser)
]