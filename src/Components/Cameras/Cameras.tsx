import React from 'react';
import ListItem from '../Common/ListItem';

const Cameras = (props:any) => {

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip}</span>Камеры</h1>
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
            {props.parent.children && props.parent.children.length > 0 ? props.parent.children.map((i:any) => {
                    return <li key={i.id}>
                        <div className='item'>
                            <ListItem
                                id={i.id}
                                name={i.name}
                                ip={i.ip}
                                lastPing={i.lastPing}
                                description={i.description ? i.description : false}
                                status={i.status}
                                getPing={()=>{}}
                            />
                        </div>
                    </li>
                    }) : 'Нет серверов'
                }
            </ul>
        </div>
    </main>

    
}

export default Cameras