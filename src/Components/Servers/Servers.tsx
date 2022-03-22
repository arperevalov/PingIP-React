import React from 'react';
import mark from './../../images/mark.svg'

const Servers = () => {
    return <div>
        <div>
            <h1>Серверы</h1>
            <div>
                <button>+ Добавить сервер</button>
                <button>Пингануть все серверы</button>
            </div>
        </div>

        <div>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>Последний пинг</span>
        </div>
        <ul>
            <li>
                <span>Работает</span>
                <span><img src={mark}/>Объект №1</span>
                <span>109.226.233.16</span>
                <span>16:24 <span>19.03.2022</span></span>
                <div>
                    <button>Изменить</button>
                    <button>Пинг</button>
                </div>
            </li>
        </ul>
    </div>
}

export default Servers