require('dotenv').config()
const getData = require('../utils/get-data')
const tokenVerifier = require('../utils/token-verifier')
const helpers = require('../helper');

module.exports = async (req, res, routes) => {

    const route = routes.find(route => route.method === req.method && req.url.split('/')[2] === route.endPoint)
    
    try {

        if (!route) helpers.error(res, 'wrong request', 400)

        let body;

        if (route.secured) {
            
            body = tokenVerifier(req)

            !body && new Error('token verification error')
            
        }

        if (route.method === 'POST') {

            body = await getData(req)

        }

        const results = await route.handler(body)

        helpers.success(res, results)

    } catch ({ message }) {

        helpers.error(res, message, 401)

    }
}