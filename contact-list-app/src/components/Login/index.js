import React from 'react'
import Feedback from '../Feedback'

export default function({ onLogin, error }) {
    return <section>
        <form onSubmit={event => {
            event.preventDefault()
            const checked = event.target.remember.checked
            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password, checked)
        }}>
            <h1>Login</h1>
            <input type="email" name="email" placeholder="e-mail" />
            <input type="password" name="password" placeholder="password" />
            <input type='checkbox' name='remember' value='yes'/><label>Remember me</label>
            <button>📨</button>
        </form>

        {error && <Feedback message={error} />}
    </section>
}