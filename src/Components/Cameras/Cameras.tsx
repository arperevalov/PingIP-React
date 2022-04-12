import React from 'react';
import { useParams } from 'react-router-dom';
import { Status } from '../../Redux/ServersReducer';
import ListItem from '../Common/ListItem';

let description = 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач.'

const Cameras = () => {

    const params:any = useParams();
    const prodId:number = params.id;

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'><span className='location'>Объект {prodId} — NEEDID</span>Камеры</h1>
            <div className='buttonWrapper'>
                <button className='button button-1'>+ Добавить камеру</button>
                <button className='button button-super'>Пингануть все камеры</button>
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
                <ListItem itemName='Объект 1' id={322} status={Status.working} description={description} getPing={()=>{}}/>
                <ListItem itemName='Объект 2' id={322} status={Status.pending} getPing={()=>{}}/>
                <ListItem itemName='Объект 3' id={322} status={Status.notworking} description={description} getPing={()=>{}}/>
            </ul>
        </div>
    </main>
}

export default Cameras