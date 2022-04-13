import React from 'react';
import { IServers } from '../../Redux/ServersReducer';
import ListItem from '../Common/ListItem';

interface ServersProps {
    servers: IServers[]
    getPing: CallableFunction
}

const Servers = (props: ServersProps) => {

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
                {props.servers ? props.servers.map((i:any) => {
                    return <ListItem
                        key={i.id}
                        id={i.id}
                        itemName={i.name}
                        ip={i.ip}
                        lastPing={i.lastPing}
                        description={i.description ? i.description : false}
                        status={i.status}
                        getPing={props.getPing}
                    />
                    }) : 'Нет серверов'
                }
            </ul>
        </div>
    </main>
}

export default Servers