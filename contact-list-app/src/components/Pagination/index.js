import React, { useState, useReducer, useEffect } from 'react';
import logic from '../../logic'
import '../../utils/sortArray'

export default function Pagination({ onPage }) {

    const [num, dispatch] = useReducer(reducer,1);

    function reducer(state,type){
        switch (type) {
            case '+':
                state + 1;
                return onPage(state);
            case '-':
                state - 1;
                return onPage(state);
        }
    }
    return <>
        <section>
            <button onClick={() =>
                dispatch('+')
            }>+</button>
            <p>{num}</p>
            <button onClick={() =>
                dispatch('-')
            }>-</button>
        </section>
    </>
}