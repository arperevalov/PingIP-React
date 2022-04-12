import React from 'react';
import { useParams } from 'react-router-dom';
import { ServerStatus } from '../../Redux/ServersReducer';
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
                <ListItem itemName='Объект 1' id={322} status={ServerStatus.working} description={description}/>
                <ListItem itemName='Объект 2' id={322} status={ServerStatus.pending}/>
                <ListItem itemName='Объект 3' id={322} status={ServerStatus.notworking} description={description}/>
            </ul>
        </div>
    </main>
}

export default Servers