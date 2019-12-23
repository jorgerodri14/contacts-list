const uuid = require('uuid/v4');
import retrieveContactsLetter from '.';

describe('retrieve contacts for query', () => {

    let users = []

    beforeEach(async () => {
        users =[]
        for (let i = 0; i < 10; i++) {
            users.push(
                {
                    name: `name${Math.random()}`,
                    id: uuid(),
                    avatar: `avatar${Math.random()}`
                }
            )
        }


    })

    it('should succeed on correct data', (done) => {
        const response = retrieveContactsLetter(users, 'name')

        expect(response).toBeInstanceOf(Array)
        expect(response[0].name.id).toBe(users[0].name.id)
        done()
    })

    it('should fail on incorret type users', (done) => {
        users = Math.random()
        expect(() => retrieveContactsLetter(users, 'name')).toThrow(`${users} is not a Array`);
        done()
    })

    it('should fail on letter empty', (done) => {
        const letters = ''
        expect(() => retrieveContactsLetter(users, letters)).toThrow(`letters is empty or blank`);
        done()
    })

    it('should fail on incorret type connections', (done) => {
        const letters = Math.random()
        expect(() => retrieveContactsLetter(users, letters)).toThrow(`${letters} is not a string`);
        done()
    })
})

