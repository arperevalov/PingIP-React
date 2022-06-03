import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IServers, PopupType } from '../../Interfaces';
import AsideNav from '../Common/AsideNav';
import CameraItem from './CameraItem';

interface CamerasProps {
    setPopup: CallableFunction
    pingAllCameras: CallableFunction
    getPing: CallableFunction
    servers: IServers[]
    parent: IServers
}

const Cameras = (props:CamerasProps) => {

    const togglePopup = () => {
        props.setPopup({
            type: PopupType.createCamera,
            parentID: props.parent.id
        })
    }

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip_address}</span>Камеры</h1>
            <div className='buttonWrapper'>
                <button className='button button-1' onClick={togglePopup}>+ Добавить камеру</button>
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
                            <CameraItem
                                id={i.id}
                                name={i.name}
                                ip_address={i.ip_address}
                                lastPing={i.lastPing}
                                description={i.description ? i.description : false}
                                status={i.status}
                                getPing={props.getPing}
                                parentID={props.parent.id}
                                setPopup={props.setPopup}
                            />
                        </div>
                    </li>
                    }) : 'Нет камер'
                }
            </ul>
        </div>

        <AsideNav items={props.servers}/>
    </main>
    
}

export default Cameras