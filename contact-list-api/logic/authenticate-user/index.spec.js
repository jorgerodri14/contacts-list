require('dotenv').config()
const { env: { PATH_TEST_USER: PATH } } = process
const { expect } = require('chai')
const fs = require('fs').promises
const authenticateUser = require('.')
const uuid = require('uuid/v4')

describe('logic - authenticate user', () => {
    let email, password, id
    before(async () => {

        await fs.writeFile(PATH, JSON.stringify([], undefined, 4))
        
    })

    beforeEach(async () => {

        id = uuid()
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await fs.writeFile(PATH, JSON.stringify([{ id: id, email: email, password: password }], undefined, 4))

    })

    it('should succeed on correct credentials', async () => {

        const _id = await authenticateUser(email, password, PATH)
        
        expect(_id).to.equal(id)

    })
    
    it('should fail on wrong password', async () => {

        const pass = `password-${Math.random()}`
        
        try {
        
            await authenticateUser(email, pass, PATH)
        
        }catch({message}){

            expect(message).to.equal(`wrong credentials`)
        }
    })
    it('should fail on wrong username', async () => {
        const email = `email-${Math.random()}@mail.com`
        try {
            await authenticateUser(email, password, PATH)
        }catch({message}){

            expect(message).to.equal(`wrong credentials`)
        }
    })
})