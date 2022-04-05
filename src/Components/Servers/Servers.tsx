import React from 'react';
import ListItem from '../Common/ListItem';

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
                <ListItem id='123' status={true} description={description}/>
                <ListItem id='12' status={true}/>
                <ListItem id='42' status={false} description={description}/>
                <ListItem id='15623'/>
                <ListItem id='45'/>
            </ul>
        </div>
    </main>
}

export default Servers