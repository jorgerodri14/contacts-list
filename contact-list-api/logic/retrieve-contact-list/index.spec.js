require('dotenv').config()
const { env: { URL_CONTACT_LIST: CONTACTS, PATH_TEST_USER: PATH, SECRET_KEY } } = process
const { expect } = require('chai')
const https = require('https')
const fs = require('fs').promises
const getData = require('../../utils/get-data')
const retrieveContacts = require('.')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')


describe('logic - retrieve contacts', () => {
    let email, password, id, _contacts, token
    before(async () => {
        await fs.writeFile(PATH, JSON.stringify([], undefined, 4))
        return new Promise(resolve => https.get(CONTACTS, async (res) => resolve(getData(res))))
        .then(res => _contacts = res)
    })
    beforeEach(async () => {

        id = uuid()
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await fs.writeFile(PATH, JSON.stringify([{ id: id, email: email, password: password }], undefined, 4))

        token = jwt.sign({ sub: id }, SECRET_KEY)

    })

    it('should succeed on correct credentials', async () => {
        const contacts = await retrieveContacts(token)

        expect(contacts).to.exist
        expect(contacts[0].id).to.equal(_contacts[0].id)

        contacts.forEach(contact =>{
            
            expect(contact.id).to.exist
            expect(contact.id).to.be.a('number')
            expect(contact.connections).to.be.an.instanceOf(Array)
            expect(contact.description).to.exist
            expect(contact.description).to.be.a('string')
            expect(contact.name).to.exist
            expect(contact.name).to.be.a('string')

        })
    })

})