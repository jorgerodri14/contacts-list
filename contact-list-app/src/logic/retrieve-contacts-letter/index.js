const validate = require('contact-list-utils')

export default function (list, letters){
    validate.array(list);
    validate.string(letters);
    if(!letters.length)return list
    return list.filter(li => !li.name.toLowerCase().indexOf(letters.toLowerCase()));
}