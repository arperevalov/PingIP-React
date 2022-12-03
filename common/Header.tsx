import Image from 'next/image'
import React from 'react'
import logo from './../public/images/logo.svg'
import CustomLink from './CustomLink'

interface HeaderProps {
    logOut: CallableFunction
}

const Header = (props:HeaderProps) => {
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
                props.logOut()}}>Выйти</CustomLink>
        </div>
    </header>
}

export default Header