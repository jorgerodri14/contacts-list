require('dotenv').config()
const { env: { PATH_TEST_USER: PATH } } = process
const { expect } = require('chai')
const fs = require('fs').promises
const retrieveUser = require('.')
const uuid = require('uuid/v4')

describe('logic - retrieve user', () => {
    let _email, password, id, _name
    before(async () => {

        await fs.writeFile(PATH, JSON.stringify([], undefined, 4))
        
    })

    beforeEach(async () => {

        id = uuid()
        _name = `name-${Math.random()}`
        _email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await fs.writeFile(PATH, JSON.stringify([{ id: id, name: _name, email: _email, password: password }], undefined, 4))

    })

    it('should succeed on correct user', async () => {

        const {name, email} = await retrieveUser(id, PATH)
        
        expect(name).to.exist
        expect(email).to.exist
        expect(name).to.equal(_name)
        expect(email).to.equal(_email)

    })

    it('should fail on wrong id', async () => {
        
        const id = uuid();

        try {
            await retrieveUser(id, PATH)
        } catch ({message}) {
            expect(message).to.equal('user not found')
        }
    })
})