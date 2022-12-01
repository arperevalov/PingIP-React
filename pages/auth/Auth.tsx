import React, { FormEvent, useRef } from 'react';
import Input from './../../common/Input';
import logo from './../../public/images/logo.svg'

interface AuthProps {
    requestToken: CallableFunction
}

function Auth(props:AuthProps) {

    let loginInput = useRef(null),
    passwordInput = useRef(null)

    const formSubmit = (e:FormEvent) => {
        e.preventDefault()
        props.requestToken(loginInput.current.value, passwordInput.current.value)
    }

    return <div className='authPage'>
    <img src={logo} alt="logo" className='authPage__logo'/>
    <form onSubmit={formSubmit} className="authForm" >
        <Input reference={loginInput} placeholder=" " label="Логин" type="text" isRequired={true}/>
        <Input reference={passwordInput} placeholder=" " label="Пароль" type="password" isRequired={true}/>
        <button className='button button-super' type='submit'>Войти</button>
    </form>
    </div>
}

export default Auth;