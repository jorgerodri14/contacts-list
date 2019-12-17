require('dotenv').config()
const { env: {  PATH_USER: PATH, URL_CONTACT_LIST: CONTACTS } } = process
const https = require('https')
const getData = require('../../utils/get-data')
const tokenVerifier = require('../../utils/token-verifier')
const validate = require('../../utils/validate')
const fs = require('fs').promises

module.exports = async (token, path=PATH) => {
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.string(path)
    validate.string.notVoid('path', path)

    const id = tokenVerifier(token)
debugger
    const results = JSON.parse(await fs.readFile(path))

    const user = results.find(res => res.id === id)

    if (!user) throw Error('wrong credentials')

    return new Promise(resolve => https.get(CONTACTS, res => resolve(getData(res))))
}
