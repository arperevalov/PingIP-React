import React from 'react';
import { Link } from 'react-router-dom';
import { IServers } from '../../Interfaces';
import ListItem from '../Common/ListItem';

interface ServersProps {
    servers: IServers[]
    getPing: CallableFunction
    pingAllServers: CallableFunction
}

const Servers = (props: ServersProps) => {

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'>Серверы</h1>
            <div className='buttonWrapper'>
                <button className='button button-1'>+ Добавить сервер</button>
                <button className='button button-super' onClick={()=>{props.pingAllServers()}}>Пингануть все серверы</button>
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
                    return <li key={i.id}>
                        <Link to={'/servers/'+i.id} className='item'>
                            <ListItem
                                id={i.id}
                                name={i.name}
                                ip_address={i.ip_address}
                                lastPing={i.lastPing}
                                description={i.description ? i.description : false}
                                status={i.status}
                                getPing={props.getPing}
                            />
                        </Link>
                    </li>
                    }) : 'Нет серверов'
                }
            </ul>
        </div>
    </main>
}

export default Servers