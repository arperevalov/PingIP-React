import React from 'react';
import mark from './../../images/mark.svg'

const ListItem = () => {
    return <li className='list__item'>
                <span>Работает</span>
                <span><img src={mark}/>Объект №1</span>
                <span>109.226.233.16</span>
                <span>16:24 <span>19.03.2022</span></span>
                <div>
                    <button className='button-3'>Изменить</button>
                    <button className='button-2'>Пинг</button>
                </div>
            </li>
}

export default ListItem