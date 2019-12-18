require('dotenv').config()
const { env: { PATH_USER: PATH, URL_CONTACT_LIST: CONTACTS } } = process
const https = require('https')
const getData = require('../../utils/get-data')
const tokenVerifier = require('../../utils/token-verifier')
const validate = require('../../utils/validate')
const fs = require('fs').promises

module.exports = async (path = PATH) => {
    validate.string(path)
    validate.string.notVoid('path', path)

    return new Promise((resolve, reject) => {

        try {
            https.get(CONTACTS, res => {
                res.on('error', error => reject(error));
                let body = '';
                res.on('data', chunk => {
                    body += chunk.toString();
                });
                res.on('end', () => {
                    if (!body.length) reject(new Error('response empty'));

                    resolve(JSON.parse(body));
                });
            });

        } catch (error) {
            reject(error);
        }

    });
}
