import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from '../Login';
import authenticateUser from '../../logic/authenticate-user'


export default withRouter(class extends Component {
    
    constructor() {
        super()
        this.state = { error: undefined }

        this.handleLogin = this.handleLogin.bind(this)

    }

    UNSAFE_componentWillMount(){
        const { history } = this.props;

        const { id, token } = sessionStorage;
        if(id && token){

        }else{
            history.push('/login');
        }
    }

    handleLogin(email, password) {
        try {
            authenticateUser(email, password)
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token
                })
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const { handleLogin } = this
        return <>
            <Route path='/login' component={Login} onLogin={handleLogin} />
            {/* <Route path= '/home' render={()=>{}}/> */}
        </>
    }

})
