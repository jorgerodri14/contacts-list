require('dotenv').config()
const { env: { PATH_USER: PATH } } = process
const validate = require('contact-list-utils')
const fs = require('fs').promises

/**
 * Retrieve User
 * 
 * @param {string} path
 * @param {string} id
 * 
 * @returns {Promise}
 */

module.exports = (id, path=PATH) => {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(path)

    return (async () => {

        const results = JSON.parse(await fs.readFile(path))
        
        const user = results.find(res => res.id === id)
    
        if(!user) throw Error('user not found')

        return {name: user.name, email: user.email}
        
    })()
} 