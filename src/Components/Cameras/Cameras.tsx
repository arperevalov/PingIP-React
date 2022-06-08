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
    isFetching: boolean
}

const Cameras = (props:CamerasProps) => {

    const togglePopup = () => {
        props.setPopup({
            type: PopupType.createCamera,
            parentID: props.parent.id
        })
    }

    if(props.parent.children && props.parent.children.length < 1 && !props.isFetching) {
        return <main className='main'>
            <div className='main__top'>
                <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip_address}</span>Камеры</h1>
            </div>
            <div className='empty'>
                <h2 className='h2'>Мы не нашли добавленных камер</h2>
                <p className='empty__text'>
                    Если вы уверены, что они должны быть, обратитесь к разработчикам сайта.
                </p>
                <button className='button button-super empty__button' onClick={togglePopup}>+ Добавить камеру</button>
            </div>

            <AsideNav items={props.servers}/>
        </main> 
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
            {props.parent.children && props.parent.children.length > 0 ? props.parent.children
            .sort((a,b) => { return a.id - b.id})
            .map((i:IServers) => {
                    return <li key={i.id}>
                        <div className='item'>
                            <CameraItem
                                id={i.id}
                                name={i.name}
                                ip_address={i.ip_address}
                                last_ping={i.last_ping}
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