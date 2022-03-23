import React from 'react';
import ListItem from '../Common/ListItem';
import mark from './../../images/mark.svg'

let description = 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач.'

const Servers = () => {
    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'>Серверы</h1>
            <div className='buttonWrapper'>
                <button className='button button-1'>+ Добавить сервер</button>
                <button className='button button-super'>Пингануть все серверы</button>
            </div>
        </div>

        <div className='list'>
            <div className='list__legend'>
                <span>Статус</span>
                <span>Имя</span>
                <span>IP</span>
                <span>Последний пинг</span>
            </div>
            <ul className='list__items'>
                <ListItem status={true} description={description}/>
                <ListItem status={true}/>
                <ListItem status={false} description={description}/>
                <ListItem/>
                <ListItem/>
            </ul>
        </div>
    </main>
}

export default Servers