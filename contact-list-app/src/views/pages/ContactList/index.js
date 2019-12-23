import React from 'react';
import usePage from '../../CustomHooks/usePage/usePage'
import '../../../utils/sortArray'
import Alphabet from '../../Components/Alphabet'
import Browser from '../../Components/Browser'
import mapLetter from '../../../utils/mapLetter'

export default function ({ contacts, onRetriveDetail }) {
    const { pageList, page, dispatch, setList, end } = usePage(50, contacts)
    function handleLetter(letter) {

        try {
            const _contacts = mapLetter(contacts, letter)
            setList(_contacts)
            onRetriveDetail(_contacts[0])
        } catch ({ message }) {
            console.error(message)
        }
    }

    return <>
        <Alphabet onLetter={handleLetter} />
        <Browser list={contacts} setList={setList} />
        {pageList.length !== 0 &&
            <ul>
                {pageList.map(contact => <li><a href='#' onClick={(event) => {
                    event.preventDefault()
                    onRetriveDetail(contact)
                }}>
                    <h3>{contact.name}</h3></a>
                </li>)}
                <section>{page < end &&
                    <button onClick={() =>
                        dispatch('+')
                    }>+</button>}
                    <p>{page}/{end}</p>{page > 1 &&
                        <button onClick={() =>
                            dispatch('-')
                        }>-</button>}
                </section>
            </ul> || <p>Users not found.</p>}
    </>
}
