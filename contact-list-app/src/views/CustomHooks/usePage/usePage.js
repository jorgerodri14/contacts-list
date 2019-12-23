import { useState, useReducer, useEffect } from 'react'

export default function (pivot, _list) {

    const [list, setList] = useState(_list)
    const [pageList, setPageList] = useState([])
    const [page, dispatch] = useReducer(reducer, 0)
    let end = Math.ceil(list.length/pivot)

    function reducer(state, type) {

        if (type === '+' && list.length / pivot > state) {

            handlePage(++state);

            return state
        }

        if (type === '-' && state > 0) {

            handlePage(--state);
            return state
        }

        if (type === '') {
        
            state = 1
            handlePage(state);
            return state
        }
    }

    function handlePage(page) {
    

        if (list.length / pivot < page) page = Math.ceil(list.length / pivot)

        const indexOfLastTodo = page * pivot;
        const indexOfFirstTodo = indexOfLastTodo - pivot;
        setPageList(list.slice(indexOfFirstTodo, indexOfLastTodo));

    }

    useEffect(() => dispatch(''), [list])

    return {pageList, page, dispatch, setList, end}
}