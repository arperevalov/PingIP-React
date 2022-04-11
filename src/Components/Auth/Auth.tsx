import React, { useRef } from 'react';
import Input from '../Common/Input';

interface AuthProps {
    requestToken: CallableFunction
}

function Auth(props:AuthProps) {

    let loginInput = useRef(null),
    passwordInput = useRef(null)

    const formSubmit = (e:any) => {
        e.preventDefault()
        props.requestToken(loginInput.current.value, passwordInput.current.value)
    }

    return (<form onSubmit={formSubmit} className="authForm" >
        <Input reference={loginInput} placeholder=" " label="Логин" type="text"/>
        <Input reference={passwordInput} placeholder=" " label="Пароль" type="password"/>
        <button className='button button-super' type='submit'>Войти</button>
        </form>);
}

export default Auth;