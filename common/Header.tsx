import Link from 'next/link'
import React from 'react'
import logo from './../public/images/logo.svg'

interface HeaderProps {
    logOut: CallableFunction
}

const Header = (props:HeaderProps) => {
    return <header className='header'>
        <div className='header__inner'>
            <Link href='/'><img className='header__logo' src={logo} alt="" /></Link>
            <nav className='nav'>
                <ul className='menu'>
                    <li className='menu__item'>
                        <Link href="/servers"
                            className={({ isActive }) => 
                                (isActive ? "link active" : "link")}>
                                Серверы
                        </Link>
                    </li>
                    <li className='menu__item'>
                        <Link href="/logs"
                            className={({ isActive }) => 
                                (isActive ? "link active" : "link")}>
                                Логи
                        </Link>
                    </li>
                </ul>
            </nav>
            <a href='/' className='logout link' onClick={(e)=>{
                e.preventDefault
                props.logOut()}}>Выйти</a>
        </div>
    </header>
}

export default Header