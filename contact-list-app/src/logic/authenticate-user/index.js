const CONTACT_API = process.env.CONTACT_API
const validate = require('contact-list-utils')
export default function (email, password) {
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    return (async () => {

        const response = await fetch(`${CONTACT_API}/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        
        if (response.status !== 200) {
            const {error} = await response.json()
            
            throw Error(error)
        }
        else {
            
            const {data:token} = await response.json()
            
            return token
            
        }

    })()
}