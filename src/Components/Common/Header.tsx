import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './../../images/logo.svg'

const Header = () => {
    return <header className='header'>
        <div className='header__inner'>
            <Link to='/'><img src={logo} alt="" /></Link>
            <nav className='nav'>
                <ul className='menu'>
                    <li className='menu__item'>
                        <NavLink to="/servers"
                            className={({ isActive }) => 
                                (isActive ? "link active" : "link")}>
                                Серверы
                        </NavLink>
                    </li>
                    <li className='menu__item'>
                        <NavLink to="/logs"
                            className={({ isActive }) => 
                                (isActive ? "link active" : "link")}>
                                Логи
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <a href='#' className='logout link'>Выйти</a>
        </div>
    </header>
}

export default Header