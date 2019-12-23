import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import logic from '../logic';
import './App.sass'

export default function() {

    const [error, setError] = useState(undefined);
    const [token, setToken] = useState(undefined)
    let history = useHistory()

    useEffect(() => {
        (() => {
            const token = logic.__token__;
            if (token) {
                setToken(token)
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
                    setError(undefined)
                    history.push('/home')
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return <div className='app'>
        <Route path='/login' render={() => <Login onLogin={handleLogin} error={error} />} />
        <Route path='/home' render={() => <Home error={error} setError={setError} history={history} credentials={token}/>} />
    </div>
}