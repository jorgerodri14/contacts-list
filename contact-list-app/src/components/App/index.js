import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import authenticateUser from '../../logic/authenticate-user';


export default withRouter(class extends Component {
    
    constructor() {
        super()
        this.state = { error: undefined, credentials: undefined }

        this.handleLogin = this.handleLogin.bind(this)

    }

    UNSAFE_componentWillMount(){
        const { history } = this.props;

        const token = localStorage.getItem('token');
        if(token){
            this.setState({credentials:token})
        }else{
            history.push('/login');
        }
    }

    handleLogin(email, password, checked) {
        try {
            authenticateUser(email, password)
                .then(token => {
                    checked && localStorage.setItem('token', token)
                    this.setState({credentials:token})
                })
                .catch(({ message }) =>  this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const { state:{ error }, handleLogin } = this
        return <>
            <Route path='/login' render={()=> <Login onLogin={handleLogin} error={error} /> } />
            <Route path= '/home' render={()=>{ <Home credentials={credentials} />} }/>
        </>
    }

})
