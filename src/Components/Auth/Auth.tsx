import React from 'react';

interface AuthProps {
    setBearerToken: CallableFunction
    hasBearer: boolean
}

function Auth(props:AuthProps) {

    const formSubmit = (e:any) => {
        e.preventDefault()
        props.setBearerToken()
    }

    return (<form onSubmit={formSubmit} >
        {props.hasBearer ? 'HAS BEARER!' : 'NO BEARER'}<br/>
        <input name='login' type='text' placeholder='VASHE IMYA'/><br/>
        <input name='password' type='password' placeholder='VASH PAROL))))'/><br/>
        <button type='submit'>Войти в систему</button>
        </form>);
}

export default Auth;