const validate = require('contact-list-utils')
/**
 * Ordenate array of object
 * 
 * @param {string} prop
 * 
 * @returns {Promise}
 */
if (typeof Array.prototype.sortList !== 'function') {
    Array.prototype.sortList = function (prop) {
        validate.string(prop);
        this.sort((a, b) => {
            var n = a[prop].toLocaleLowerCase().localeCompare(b[prop].toLocaleLowerCase());
            return n === 0 && a[prop] !== b[prop] ? b[prop].localeCompare(a[prop]) : n;
        })

    }
}
