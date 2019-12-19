const CONTACT_API = process.env.CONTACT_API
export default function (email, password) {

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