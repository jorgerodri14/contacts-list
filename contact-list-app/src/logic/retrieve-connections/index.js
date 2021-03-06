const validate = require('contact-list-utils')

/**
 * Retireve connections of user
 * 
 * @param {Object} user
 * @param {Array} contacts
 * 
 * @returns {Promise}
 */

export default function (user, contacts) {
    validate.string(user.name);
    validate.string.notVoid('name', user.name);
    validate.array(user.connections);
    validate.array(contacts);
    const connections = contacts.filter(({id})=>user.connections.includes(id));
    return {user:{name:user.name, avatar:user.avatar}, connections}
}
