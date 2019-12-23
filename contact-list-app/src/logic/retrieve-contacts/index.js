const CONTACT_API = process.env.CONTACT_API
const validate = require('contact-list-utils')
/**
 * Retrieve contacts list
 * 
 * @param {string} token
 * 
 * @returns {Promise}
 */
export default function (token) {
    validate.string(token);
    validate.string.notVoid('token', token);

    return (async () => {
        const response = await fetch(`${CONTACT_API}/contacts`, {
            method: 'GET',
            headers: { authorization: `bearer ${token}`}
        })
        
        if (response.status !== 200) {
            const {error} = await response.json()
            
            throw Error(error)
        }
        else {
            
            const { data } = await response.json()
            return data
            
        }

    })()
}