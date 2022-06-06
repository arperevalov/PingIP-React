import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IServers, PopupType } from '../../Interfaces';
// import { PopupContext } from '../../Providers/PopupProvider';
import ServerItem from './ServerItem';

interface ServersProps {
    servers: IServers[]
    getPing: CallableFunction
    pingAllServers: CallableFunction
    setPopup: CallableFunction
}

const Servers = (props: ServersProps) => {
    const togglePopup = () => {
        props.setPopup({
            type: PopupType.createServer
        })
    }

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'>Серверы</h1>
            <div className='buttonWrapper'>
                <button className='button button-1' onClick={togglePopup}>+ Добавить сервер</button>
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
                {props.servers ? props.servers
                .sort((a,b) => { return a.id - b.id})
                .map((i:any) => {
                    return <li key={i.id}>
                        <Link to={'/servers/'+i.id} className='item'>
                            <ServerItem
                                id={i.id}
                                name={i.name}
                                ip_address={i.ip_address}
                                last_ping={i.last_ping}
                                description={i.description ? i.description : false}
                                status={i.status}
                                getPing={props.getPing}
                                setPopup={props.setPopup}
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