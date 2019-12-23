import React, { useEffect, useState } from 'react';
import logic from '../../../logic'
import '../../../utils/sortArray'
import ContactList from '../ContactList'
import ContactDetails from '../ContactDetails'

export default function ({ history, credentials, error, setError }) {

    const [contacts, setContacts] = useState([])
    const [connections, setConnections] = useState([])

    useEffect(() => { !logic.__token__ && !credentials && history.push('/login') }, [])

    useEffect(() => {
        (async () => {
            if (credentials || logic.__token__) {
                try {
                    if (!credentials) credentials = logic.__token__
                    const contacts = await logic.retrieveContacts(credentials)
                    contacts.sortList('name')
                    setContacts(contacts)
                    const connections = logic.retrieveConnections(contacts[0], contacts)
                    setConnections(connections)
                    error && setError(undefined)
                } catch ({ message }) {
                    setError(message)
                }
            }
        })()
    }, [])

    function handleRetrieveDetail(user) {
        try {
            const connections = logic.retrieveConnections(user, contacts)
            setConnections(connections)
        } catch ({ message }) {
            console.error(message)
        }
    }

    return <>
        {contacts.length !== 0 && <ContactList contacts={contacts} onRetriveDetail={handleRetrieveDetail} />}
        {connections.length !== 0 && <ContactDetails connections={connections} error={error} />}
    </>
}
