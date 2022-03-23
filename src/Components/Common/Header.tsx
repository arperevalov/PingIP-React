import React from 'react'
import logo from './../../images/logo.svg'

const Header = () => {
    return <header className='header'>
        <div className='header__inner'>
            <img src={logo} alt="" />
            <nav className='nav'>
                <ul className='menu'>
                    <li className='menu__item'>
                        <a href='#' className='link active'>Серверы</a>
                    </li>
                    <li className='menu__item'>
                        <a href='#' className='link'>Логи</a>
                    </li>
                </ul>
            </nav>
            <a href='#' className='logout link'>Выйти</a>
        </div>
    </header>
}

export default Header