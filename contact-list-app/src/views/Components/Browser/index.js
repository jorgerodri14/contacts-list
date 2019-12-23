import React from 'react';
import retrieveContactsLetter from '../../../logic/retrieve-contacts-letter'

export default function ({ list, setList }) {

    function handleSearchQuery(event) {
        
        const { value: letters } = event.target
        const _contacts = retrieveContactsLetter(list, letters)
        setList(_contacts)
    }
    return <>
        <form onChange={handleSearchQuery}>
            <label>🔎</label> <input type='text' name='search' placeholder='Search' />
        </form>
    </>
}
