const validate = require('contact-list-utils')

export default function (user, contacts) {
    validate.string(user.name);
    validate.string.notVoid('name', user.name);
    validate.array(user.connections);
    validate.array(contacts);
    const connections = contacts.filter(({id})=>user.connections.includes(id));
    return {user:{name:user.name, avatar:user.avatar}, connections}
}
