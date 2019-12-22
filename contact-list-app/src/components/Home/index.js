import React, { useState, useReducer, useEffect } from 'react';
import logic from '../../logic'
import Pagination from '../Pagination'
import '../../utils/sortArray'

export default function Home({ history, credentials }) {

    const [contacts, setContacts] = useState([])
    const [contactsAlph, setContactsAlph] = useState([])
    const [num, dispatch] = useReducer(reducer, 0)
    let end = {
        size: contacts.length,
        pivot: 50
    };

    function reducer(state, type) {
        
        if (type.cond === '+' && type.len > state) {
            
            handlePage(++state);
            
            return state
        }

        if (type.cond === '-' && state > 0) {
            
            handlePage(--state);
            return state
        }
    }

    function handlePage(page, pivot = 50) {
        
        if (contacts.length / pivot < page) page = contacts.length / pivot

        const indexOfLastTodo = page * pivot;
        const indexOfFirstTodo = indexOfLastTodo - pivot;
        setContactsAlph(contacts.slice(indexOfFirstTodo, indexOfLastTodo));

    }


    useEffect(() => { !logic.__token__ && history.push('/login') }, [])

    useEffect(() => {
        (async () => {
            if (credentials || logic.__token__) {
                if (!credentials) credentials = logic.__token__
                const contacts = await logic.retrieveContacts(credentials)
                contacts.sortList('name')
                end.size = contacts.length
                debugger
                setContacts(contacts)
                dispatch({ cond: '+', len:end.size/end.pivot})
            }
        })()
    }, [])


    return <>{contactsAlph.length !== 0 &&
        <ul>
            {contactsAlph.map(contact => <li>{contact.name}</li>)}
            <section>{num<20&&
                <button onClick={() =>
                    dispatch({ cond: '+', len:end.size/end.pivot})
                }>+</button>}
                <p>{num}/20</p>{num>1&&
                <button onClick={() =>
                    dispatch({ cond: '-', len:end.size/end.pivot})
                }>-</button>}
            </section>
        </ul>}
    </>
}
