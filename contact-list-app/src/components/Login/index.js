import React from 'react'
import { withRouter} from 'react-router-dom';
import Feedback from '../Feedback'

export default withRouter(function({ onLogin, error }) {
    return <section>
        <form onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password)
        }}>
            <h1>Login</h1>
            <input type="email" name="email" placeholder="e-mail" />
            <input type="password" name="password" placeholder="password" />
            <button>📨</button>
        </form>

        {error && <Feedback message={error} />}
    </section>
})