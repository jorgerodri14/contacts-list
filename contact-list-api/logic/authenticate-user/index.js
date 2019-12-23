require('dotenv').config()
const { env: { PATH_TEST_USER: PATH, SECRET_KEY } } = process
const validate = require('contact-list-utils')
const fs = require('fs').promises
const jwt = require('jsonwebtoken')

/**
 * Authenticate user
 * 
 * @param {string} email  
 * @param {string} password  
 * @param {string} path
 * 
 * @returns {Promise}
 */

module.exports = ({email, password}, path=PATH) => {
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(path)

    return (async () => {

        const results = JSON.parse(await fs.readFile(path))
        
        const user = results.find(res => res.email === email && res.password === password)
    
        if(!user) throw Error('wrong credentials')
    
        const token = jwt.sign({ sub: user.id }, SECRET_KEY)

        return token
        
    })()
} 