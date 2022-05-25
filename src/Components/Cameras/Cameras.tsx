import React from 'react';
import { NavLink } from 'react-router-dom';
import { IServers } from '../../Interfaces';
import ListItem from '../Common/ListItem';

const Cameras = (props:any) => {

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip}</span>Камеры</h1>
            <div className='buttonWrapper'>
                <button className='button button-1'>+ Добавить камеру</button>
                <button className='button button-super' onClick={()=>{props.pingAllCameras()}}>Пингануть все камеры</button>
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
                                ip_address={i.ip_address}
                                lastPing={i.lastPing}
                                description={i.description ? i.description : false}
                                status={i.status}
                                getPing={props.getPing}
                                parentID={props.parent.id}
                            />
                        </div>
                    </li>
                    }) : 'Нет камер'
                }
            </ul>
        </div>

        <div className='asideNav'>
            <h2 className='asideNav__name h2'>Серверы</h2>
            <ul className='asideNav__list'>
                {props.servers.map((i:IServers) => {
                    return <li className='item' key={i.id}>
                            <NavLink to={`/servers/${i.id}`}>
                                <span className={`item__status ${props.status === true ? ' works' : ' notWorks'}`} />
                                <span className='item__name'>{i.name}</span>
                            </NavLink>
                        </li>
                })}
            </ul>
        </div>
    </main>
    
}

export default Cameras