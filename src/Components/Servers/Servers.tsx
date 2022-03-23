import React from 'react';
import ListItem from '../Common/ListItem';
import mark from './../../images/mark.svg'

const Servers = () => {
    return <main className='main'>
        <div>
            <h1>Серверы</h1>
            <div>
                <button className='button-1'>+ Добавить сервер</button>
                <button className='button-super'>Пингануть все серверы</button>
            </div>
        </div>

        <div>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>Последний пинг</span>
        </div>
        <ul>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
        </ul>
    </main>
}

export default Servers