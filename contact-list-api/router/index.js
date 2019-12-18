require('dotenv').config()
const getData = require('../utils/get-data')
const tokenVerifier = require('../utils/token-verifier')
const helpers = require('../helper');

module.exports = async (req, res, routes) => {debugger
    const route = routes.find(route => route.method === req.method && req.url.split('/')[2] === route.path)
    debugger
    try {

        if (!route) helpers.error(res, 'wrong request', 400)
        
        if (route.secured) {
            
            !tokenVerifier(req) && new Error('token verification error')
            
        }

        let body;

        if (route.method === 'POST') {

            body = await getData(req)

        }

        const results = await route.handler(body)

        helpers.success(res, results)

    } catch ({ message }) {

        helpers.error(res, message, 401)

    }
}