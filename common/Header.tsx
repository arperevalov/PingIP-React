import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Actions } from '../Redux/AuthReducer'
import logo from './../public/images/logo.svg'
import CustomLink from './CustomLink'

const Header = () => {

    const dispatch = useDispatch()
    const logOutAction = () => {
        dispatch({type: Actions.LOG_OUT})
    }

    return <header className='header'>
        <div className='header__inner'>
            <CustomLink href='/' className=''><Image className='header__logo' src={logo} alt="" /></CustomLink>
            <nav className='nav'>
                <ul className='menu'>
                    <li className='menu__item'>
                        <CustomLink href="/servers"
                            className="link"
                            activeClassName="active">
                                Серверы
                        </CustomLink>
                    </li>
                    <li className='menu__item'>
                        <CustomLink href="/logs"
                            className="link"
                            activeClassName="active">
                                Логи
                        </CustomLink>
                    </li>
                </ul>
            </nav>
            <CustomLink href='/' className='logout link' onClick={(e)=>{
                e.preventDefault
                logOutAction()}}>Выйти</CustomLink>
        </div>
    </header>
}

export default Header