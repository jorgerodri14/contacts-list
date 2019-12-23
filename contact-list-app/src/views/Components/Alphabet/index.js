import React from 'react';
import alphabet from'../../../utils/alphabet'
import './index.sass'

export default function({onLetter}) {

    
    return <div className='abc'>
        <ul>
            {alphabet().map(letter=><li className='abc__li' key={letter}><button className='abc__btn' onClick={()=>onLetter(letter)}>{letter}</button></li>)}
        </ul>
    </div>
}
