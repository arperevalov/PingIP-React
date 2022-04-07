import React from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../Common/ListItem';

let description = 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач.'

const Servers = () => {

    const params:any = useParams();
    const prodId:number = params.id;

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'>Сервер {prodId}</h1>
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
                <ListItem id='322' status={true} description={description}/>
                <ListItem id='322' status={true}/>
                <ListItem id='322' status={false} description={description}/>
            </ul>
        </div>
    </main>
}

export default Servers