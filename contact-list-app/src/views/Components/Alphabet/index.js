import React from 'react';
import alphabet from'../../../utils/alphabet'

export default function({onLetter}) {

    
    return <>
        <ul>
            {alphabet().map(letter=><li><button onClick={()=>onLetter(letter)}>{letter}</button></li>)}
        </ul>
    </>
}
