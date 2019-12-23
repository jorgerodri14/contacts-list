const uuid = require('uuid/v4');
import retrieveConnections from '.';

describe('retrieve connections', () => {

    let user, contacts = []

    beforeEach(async () => {

        user = {
            name: `name${Math.random()}`,
            id: uuid(),
            connections: []
        }
        contacts
        for (let i = 0; i < 10; i++) {
            let id = uuid()
            contacts.push(
                {
                    name: `name${Math.random()}`,
                    id: id,
                    avatar: `avatar${Math.random()}`
                }
            )
            if (i % 2 === 0) user.connections.push(id)
        }


    })

    it('should succeed on correct data', (done) => {
        const response = retrieveConnections(user, contacts)

        expect(response.name).toBe(user.name)
        expect(response.connections).toBeInstanceOf(Array)
        expect(response.connections[0].id).toBe(user.connections[0])
        done()
    })

    it('should fail on incorret type name', (done) => {
        user.name = Math.random()
        expect(() => retrieveConnections(user, contacts)).toThrow(`${user.name} is not a string`);
        done()
    })

    it('should fail on incorret name empty', (done) => {
        user.name = ''
        expect(() => retrieveConnections(user, contacts)).toThrow(`name is empty or blank`);
        done()
    })

    it('should fail on incorret type connections', (done) => {
        user.connections = Math.random()
        expect(() => retrieveConnections(user, contacts)).toThrow(`${user.connections} is not a Array`);
        done()
    })

    it('should fail on incorret type contacts', (done) => {
        contacts = Math.random()
        expect(() => retrieveConnections(user, contacts)).toThrow(`${contacts} is not a Array`);
        done()
    })
})

