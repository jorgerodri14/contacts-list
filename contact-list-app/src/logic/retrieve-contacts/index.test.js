require('dotenv').config();
const { env: { PATH_TEST_USER: PATH, SECRET_KEY } } = process;
const fs = require('fs').promises;
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken')
import retrieveContacts from '.';

describe('retrieve contacts', () => {

    let email, password, id, token

    beforeAll(async () => await fs.writeFile(PATH, JSON.stringify([], undefined, 4)))

    beforeEach(async () => {

        id = uuid().toString()
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        token = jwt.sign({sub: id}, SECRET_KEY)

        await fs.writeFile(PATH, JSON.stringify([{ id, email, password }], undefined, 4))


    })

    it('should succeed on correct data', async () => {
        const contacts = await retrieveContacts(token)

        expect(contacts).toBeDefined()

        contacts.forEach(contact =>{
            
            expect(contact.id).toBeDefined
            expect(typeof contact.id).toBe('number')
            expect(contact.connections).toBeInstanceOf(Array)
            expect(contact.description).toBeDefined
            expect(typeof contact.description).toBe('string')
            expect(contact.name).toBeDefined()
            expect(typeof contact.name).toBe('string')

        })
    })

    it('should succeed on correct data', () => {

        expect(() => retrieveContacts()).toThrow(`undefined is not a string`);
    })

})

