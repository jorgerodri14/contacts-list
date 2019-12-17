require('dotenv').config()
const { env: { SECRET_KEY } } = process
const jwt = require('jsonwebtoken')

module.exports = (token) => {

    try {
        
        const {sub} = jwt.verify(token, SECRET_KEY)

        return sub
        
    } catch ({ message }) {

        if (message) throw Error(message)

    }
}