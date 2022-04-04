import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../Common/Header';

function Auth(props:any) {

    const formSubmit = (e:any) => {
        e.preventDefault()
        props.setBearerToken()
        debugger
    }

    return (<form onSubmit={formSubmit} >
        {props.hasBearer ? 'HAS BEARER!' : 'NO BEARER'}<br/>
        <input name='login' type='text' placeholder='VASHE IMYA'/><br/>
        <input name='password' type='password' placeholder='VASH PAROL))))'/><br/>
        <button type='submit'>Войти в систему</button>
        </form>);
}

export default Auth;