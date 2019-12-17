require('dotenv').config()
const { env: { PATH_USER: PATH } } = process
const validate = require('../../utils/validate')
const fs = require('fs').promises


module.exports = (email, password, path=PATH) =>{
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(PATH)

    return (async () => {

        const results = JSON.parse(await fs.readFile(path))
        
        const user = results.find(res => res.email === email && res.password === password)
    
        if(!user) throw Error('wrong credentials')
    
        return user.id
    })()
} 