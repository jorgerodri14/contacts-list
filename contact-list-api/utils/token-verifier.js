require('dotenv').config()
const { env: { SECRET_KEY } } = process
const jwt = require('jsonwebtoken')
const fs = require('fs').promises

module.exports = (token) => {

    try {
        jwt.verify(token, SECRET_KEY)
    } catch ({ message }) {
        if (message) throw Error(message)
    }
}