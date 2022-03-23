import React from 'react'
import logo from './../../images/logo.svg'

const Header = () => {
    return <header className='header'>
        <div className='header__inner'>
            <img src={logo} alt="" />
            <nav>
                <ul>
                    <li>
                        <a href='#'>Серверы</a>
                    </li>
                    <li>
                        <a href='#'>Логи</a>
                    </li>
                </ul>
            </nav>
            <a href='#'>Выйти</a>
        </div>
    </header>
}

export default Header