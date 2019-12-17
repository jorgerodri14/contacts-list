require('dotenv').config()
const { env: { SECRET_KEY } } = process
const getData = require('./utils/get-data')
const state = require('./utils/state-res')
const jwt = require('jsonwebtoken')
const tokenVerifier = require('./utils/token-verifier')
const extracToken = require('./utils/extrac-token')
const helpers = require('./helper');

module.exports = async (req, res, routes) => {
    const route = routes.find(route => route.method === req.method && req.url.split('/')[2] === route.path)
    if (!route) res.end(state(400, 'endpoint not found'))

    switch (route.method) {
        case 'POST':

            const { email, password } = await getData(req)

            try {

                const id = await route.handler(email, password)

                const token = jwt.sign({ sub: id }, SECRET_KEY)

                helpers.success(res, token)

            } catch ({ message }) {

                helpers.error(res, message, 401)

            }
            break;

        case 'GET':

            try {

                const token = extracToken(req)

                tokenVerifier(token)

                const results = await route.handler()
                
                helpers.success(res, results)

            } catch ({ message }) {

                helpers.error(res, message, 401)

            }
            break;
    }
}