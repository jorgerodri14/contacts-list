import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import logic from '../../logic';

export default function App() {

    const [error, setError] = useState(undefined);
    const [token, setToken] = useState(undefined)
    let history = useHistory()

    useEffect(() => {
        (() => {
            const token = logic.__token__;
            if (token) {
                history.push('/home');
            } else {
                history.push('/login');
            }
        })()
    }, [])


    function handleLogin(email, password, checked) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => {
                    if (checked) logic.__token__ = credentials;
                    setToken(credentials)
                    history.push('/home')
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return <>
        <Route path='/login' render={() => <Login onLogin={handleLogin} error={error} />} />
        <Route path='/home' render={() => <Home error={error} history={history} credentials={token}/>} />
    </>
}