import React, { useRef } from 'react';

interface AuthProps {
    hasBearer: boolean
    requestToken: CallableFunction
}

function Auth(props:AuthProps) {

    let loginInput = useRef(null),
    passwordInput = useRef(null)

    const formSubmit = (e:any) => {
        e.preventDefault()
        props.requestToken(loginInput.current.value, passwordInput.current.value)
    }

    return (<form onSubmit={formSubmit} >
        {props.hasBearer ? 'HAS BEARER!' : 'NO BEARER'}<br/>
        <input ref={loginInput} name='login' type='text' placeholder='VASHE IMYA'/><br/>
        <input ref={passwordInput} name='password' type='password' placeholder='VASH PAROL))))'/><br/>
        <button type='submit'>Войти в систему</button>
        </form>);
}

export default Auth;