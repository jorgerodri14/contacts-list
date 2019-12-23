import React, { useEffect } from 'react';
import usePage from '../../CustomHooks/usePage/usePage'
import '../../../utils/sortArray'
import Browser from '../../Components/Browser'
import Feedback from '../../Components/Feedback'
import '../../../utils/mapLetter'

export default function({error, connections: { name, connections } }) {
    
    const {pageList, page, dispatch, setList, end} = usePage(20, connections)

    useEffect(() => {
        setList(connections)
    }, [connections])

    return <>
        <Browser list={connections} setList={setList} />
        <h2>{name}</h2>
        {pageList.length !== 0 && <div>
            <ul>
                {pageList.map(contact => <li>
                    <h3>{contact.name}</h3>
                    <img src={contact.avatar} />
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
            </ul>
        </div>||<p>Users not found.</p>}
        {error && <Feedback message={error} />}
    </>
}
