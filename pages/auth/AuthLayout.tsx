import Image from 'next/image';
import React, { FormEvent, useRef, useEffect } from 'react';
import Input from '../../common/Input';
import logo from './../../public/images/logo.svg'
import { useForm } from 'react-hook-form';

interface AuthProps {
    requestToken: CallableFunction
}

const AuthLayout = (props:AuthProps) => {

    const {register, handleSubmit} = useForm();

    const formSubmit = (formData: any) => {
        const { login, password } = formData;
        props.requestToken(login, password)
    }

    return <div className='authPage'>
    <Image src={logo} alt="logo" className='authPage__logo'/>
    <form onSubmit={handleSubmit(formSubmit)} className="authForm" >
        <label className="input">
            <input {...register("login")} className="input__input" type="text" required={true}/>
            <span className="input__label" >Логин</span>
        </label>
        <label className="input">
            <input {...register("password")} className="input__input" type="password" required={true}/>
            <span className="input__label" >Пароль</span>
        </label>
        <button className='button button-super' type='submit'>Войти</button>
    </form>
    </div>
}

export default AuthLayout;