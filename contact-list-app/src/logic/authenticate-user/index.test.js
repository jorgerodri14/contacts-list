require('dotenv').config();
const { env: { PATH_TEST_USER: PATH, SECRET_KEY } } = process;
const fs = require('fs').promises;
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken')
import authenticateUser from '.';

describe('authenticate user', () => {

    let email, password, id

    beforeAll(async () => await fs.writeFile(PATH, JSON.stringify([], undefined, 4)))

    beforeEach(async () => {

        id = uuid().toString()
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        await fs.writeFile(PATH, JSON.stringify([{ id, email, password }], undefined, 4))


    })

    it('should succeed on correct data', async () => {
        const response = await authenticateUser(email, password)

        const { sub } = jwt.verify(response, SECRET_KEY)

        expect(response).toBeDefined()
        expect(sub).toBe(sub)
    })

    it('should fail on incorret email format', () => {
        const _email = `email-${Math.random()}domain.com`

        expect(() => authenticateUser(_email, password)).toThrow(`${_email} is not an e-mail`);
    })

    it('should fail on email empty', () => {
        const _email = ``

        expect(() => authenticateUser(_email, password)).toThrow(`${_email} is empty or blank`);
    })

    it('should fail on incorret email format', () => {
        const _email = Math.random()

        expect(() => authenticateUser(_email, password)).toThrow(`${_email} is not a string`);
    })

    it('should fail on incorret password type', () => {
        const _password = Math.random()

        expect(() => authenticateUser(email, _password)).toThrow(`${_password} is not a string`);
    })

    it('should fail on password empty', () => {
        const _password = ''
        
        expect(() => authenticateUser(email, _password)).toThrow(`${_password} is empty or blank`);
    })
})

