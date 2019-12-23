import React from 'react'
import Feedback from '../../Components/Feedback'
import login from '../../../styles/img/login-img.png'
import './index.sass'
export default function ({ onLogin, error }) {
    return <section className='login'>
        <img src={login} />
        <form className='login__form' onSubmit={event => {
            event.preventDefault()
            const checked = event.target.remember.checked
            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password, checked)
        }}>
            <h1 className='login__h1'>Login</h1>
            <input className='login__input' type="email" name="email" placeholder="e-mail" />
            <input className='login__input' type="password" name="password" placeholder="password" />
            <div className='login__checkbox checkbox'>
                <label className='checkbox__label'>Remember me
                <input className='checkbox__input' id='top' type='checkbox' name='remember' value='yes' /></label>
            </div>
            <button className='login__btn'>📨</button>
        </form>

        {error && <Feedback message={error} />}
    </section>
}