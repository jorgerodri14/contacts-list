require('dotenv').config()
const { env: { SECRET_KEY } } = process
const jwt = require('jsonwebtoken')

module.exports = (req) => {debugger
    const { headers: { authorization } } = req;
    
    let token = undefined

    authorization && ([, token] = authorization.split(' '));
    
    if (!token) throw new Error('no token provided')

    try {
        
        const {sub} = jwt.verify(token, SECRET_KEY)

        return sub
        
    } catch ({ message }) {

        if (message) throw Error(message)

    }
}