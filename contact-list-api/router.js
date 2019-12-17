require('dotenv').config()
const getData = require('./utils/get-data')
const extracToken = require('./utils/extrac-token')
const helpers = require('./helper');

module.exports = async (req, res, routes) => {
    const route = routes.find(route => route.method === req.method && req.url.split('/')[2] === route.path)
    if (!route) helpers.error(res, 'endpoint not found', 400)

    switch (route.method) {
        case 'POST':

            const { email, password } = await getData(req)

            try {

                const results = await route.handler(email, password)

                helpers.success(res, results)

            } catch ({ message }) {

                helpers.error(res, message, 401)

            }
            break;

        case 'GET':

            try {
                const token = extracToken(req)
                const results = await route.handler(token)
                
                helpers.success(res, results)

            } catch ({ message }) {

                helpers.error(res, message, 401)

            }
            break;
    }
}