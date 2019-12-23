const validate = require('contact-list-utils')
/**
 * Retrieve list for query
 * 
 * @param {Array} list
 * @param {string} letters
 * 
 * @returns {Promise}
 */
export default function (list, letters){
    validate.array(list);
    validate.string(letters);
    if(!letters.length)return list
    return list.filter(li => !li.name.toLowerCase().indexOf(letters.toLowerCase()));
}