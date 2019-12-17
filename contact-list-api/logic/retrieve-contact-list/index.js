require('dotenv').config()
const { env: { URL_CONTACT_LIST: CONTACTS } } = process
const https = require('https')
const getData = require('../../utils/get-data')

module.exports = () => new Promise(resolve => https.get(CONTACTS, res => resolve(getData(res))))