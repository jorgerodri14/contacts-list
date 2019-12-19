require('dotenv').config();
const { env: { PATH_TEST_USER:PATH } } = process;
const fs =  require('fs').promises;
const uuid = require('uuid/v4');
import authenticateUser from '.';
debugger
describe('authenticate user', () => {

    let email, password, id

    beforeAll(async()=> await fs.writeFile('test.json', JSON.stringify([], undefined, 4)))

    beforeEach(async () => {

        id = uuid()
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        await fs.writeFile('test.json', JSON.stringify([{ id: id, email: email, password: password }], undefined, 4))
debugger
        
    })

    it('should succeed on correct data', async () => {
        const response = await authenticateUser(email, password)
        // There is response from fetch
        expect(response).toBeDefined()

        // Validate if contents of response are the expected
        expect(response.data).toBeDefined()
        expect(response.data.id).toBe(listName)
        expect(response.data.additional_images).toBeDefined()
        expect(response.data.category).toBeDefined()
        expect(response.data.content_type).toBeDefined()
        expect(response.data.is_b2b).toBeDefined()
        expect(response.data.is_recommendation).toBeDefined()
        expect(response.data.kind).toBeDefined()
        expect(response.data.name).toBeDefined()
        expect(response.data.numerical_id).toBeDefined()
        expect(response.data.only_coupon).toBeDefined()
        expect(response.data.short_name).toBeDefined()
        expect(response.data.type).toBeDefined()
        expect(response.data.contents.data.length).toBeTruthy()
        expect(response.data.contents.data[0].classification).toBeDefined()
        expect(response.data.contents.data[0].duration).toBeDefined()
        expect(response.data.contents.data[0].highlighted_score).toBeDefined()
        expect(response.data.contents.data[0].classification).toBeDefined()
        expect(response.data.contents.data[0].year).toBeDefined()
        expect(response.data.contents.data[0].images).toBeDefined()
    })

})

