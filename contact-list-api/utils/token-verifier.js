const extractToken = require('./extract-token')
const jwt = require('jsonwebtoken')

module.exports = function (secret) {

        if (!token) return res.status(401).json({ message: 'no token provided' })

        try {
            const { sub: id } = jwt.verify(token, secret)

            req.id = id

        } catch ({ message }) {
            res.status(401).end({ message })
        }
    }