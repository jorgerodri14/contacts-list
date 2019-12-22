import authenticateUser from './authenticate-user'
import retrieveContacts from './retrieve-contacts'

export default {
    set __token__(token) {
        localStorage.setItem('token',token)
    },

    get __token__() {
        return localStorage.getItem('token')
    },
    set __contacts__(contacts) {
        sessionStorage.contacts = contacts
    },

    get __contacts__() {
        return sessionStorage.contacts
    },
    authenticateUser,
    retrieveContacts

}