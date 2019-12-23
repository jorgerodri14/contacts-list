const validate = require('contact-list-utils')

export default function(arr, letter){
    validate.string(letter);
    let res = []

    const init = arr.findIndex(obj=> obj.name[0].toLowerCase()===letter.toLowerCase())
    const fin = arr.map(obj=> obj.name[0]).lastIndexOf(letter)

    if(init===-1 || fin ===-1)throw new Error('Contacts not found')
    for(let i=init; i<=fin; i++){
        res.push(arr[i])
    }
    return res
}
