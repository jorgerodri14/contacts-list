import React from 'react';
import usePage from '../../CustomHooks/usePage/usePage'
import '../../../utils/sortArray'
import Alphabet from '../../Components/Alphabet'
import Browser from '../../Components/Browser'
import mapLetter from '../../../utils/mapLetter'
import './index.sass'

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

    return <div className='list'>
        <Browser list={contacts} setList={setList} />
        <div className='list__comb'>
            <Alphabet onLetter={handleLetter} />
            <div className='list__contact'>
                {pageList.length !== 0 &&
                    <ul className='list__ul'>
                        {pageList.map(contact => <li className='list__person' key={contact.id.toString()}><a className='list__a' href='#' onClick={(event) => {
                            event.preventDefault()
                            onRetriveDetail(contact)
                        }}>
                            <h3>{contact.name}</h3></a>
                        </li>)}
                    </ul> || <p>Users not found.</p>}
                <section className='list__section'>{page > 1 &&
                    <button className='list__btn' onClick={() =>
                        dispatch('-')
                    }>-</button>}
                    <p className='list__p'>{page}/{end}</p>{page < end &&
                        <button className='list__btn' onClick={() =>
                            dispatch('+')
                        }>+</button>}
                </section>
            </div>
        </div>
    </div>
}
