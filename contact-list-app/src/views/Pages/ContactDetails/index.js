import React, { useEffect } from 'react';
import usePage from '../../CustomHooks/usePage/usePage'
import '../../../utils/sortArray'
import Browser from '../../Components/Browser'
import Feedback from '../../Components/Feedback'
import '../../../utils/mapLetter'
import './index.sass'

export default function ({ error, connections: { user, connections } }) {

    const { pageList, page, dispatch, setList, end } = usePage(20, connections)

    useEffect(() => {
        setList(connections)
    }, [connections])

    return <div className='details'>
        <header className='details__header'>
            <div className='details__name'>
                <img className='details__img' src={user.avatar} />
                <h2 className='details__h2'>{user.name}</h2>
            </div>
            <div className='details__search'>
                <Browser list={connections} setList={setList} />
            </div>
        </header>
        <div >
            {pageList.length !== 0 &&
                <ul className='details__ul'>
                    {pageList.map(contact => <li className='details__li' key={contact.id.toString()}>
                        <img className='details__avatar' src={contact.avatar} alt='Not image' />
                        <h4 className='details__h4' >{contact.name}</h4>
                    </li>)}
                </ul> || <p>Users not found.</p>}
            <section className='details__section'>{page > 1 &&
                <button className='details__btn' onClick={() =>
                    dispatch('-')
                }>-</button>}
                <p className='details__p'>{page}/{end}</p>{page < end &&
                    <button className='details__btn' onClick={() =>
                        dispatch('+')
                    }>+</button>}
            </section>
        </div>
        {error && <Feedback message={error} />}
    </div>
}
