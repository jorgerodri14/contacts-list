import React from 'react';
import retrieveContactsLetter from '../../../logic/retrieve-contacts-letter'
import './index.sass'

export default function ({ list, setList }) {

    function handleSearchQuery(event) {
        const { value: letters } = event.target
        const _contacts = retrieveContactsLetter(list, letters)
        setList(_contacts)
    }
    return <div className='search'>
        <form onChange={handleSearchQuery}>
            <input className='search__input' type='text' name='search' placeholder='🔎 search' />
        </form>
    </div>
}
