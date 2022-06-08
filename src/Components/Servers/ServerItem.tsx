import React, { MouseEvent } from 'react';
import { IServers, PopupType } from '../../Interfaces';
import ListDescription from '../Common/ListDescription';

interface ServerItemProps extends IServers {
    getPing: CallableFunction
    parentID?: number
    setPopup: CallableFunction
}

const ServerItem = (props:ServerItemProps) => {

    const togglePopup = (e:MouseEvent):void => {
        e.preventDefault()
        props.setPopup({
            type: PopupType.updateServer,
            id: props.id,
            name: props.name,
            ip_address: props.ip_address,
            description: props.description,
            parentID: props.parentID
        })
    }

    const startPing = (e:MouseEvent):void => {
        e.preventDefault()
        props.getPing(props.id)
    }

    return <>
        <span className={`item__status ${props.status === true ? 'works' : 'notWorks'}`}>
            {props.status === true ? 'Работает' : 'Не работает'}
        </span>
        <span className='item__name'>
            <ListDescription description={props.description}/>
            {props.name}
        </span>
        <span>{props.ip_address}</span>
        <span>
            {props.last_ping ? new Date(props.last_ping.replace(" ", "T")).toLocaleTimeString() : ''}
            <span className='item__lastPingDate'>{props.last_ping ? ' ' + new Date(props.last_ping.replace(" ", "T")).toLocaleDateString() : ''}</span>
        </span>
        <div className='buttonWrapper'>
            <button className='button button-3 button-list' onClick={togglePopup}>
                Изменить
            </button>   
            <button className='button button-2 button-list' onClick={startPing}>
                Пинг
            </button>
        </div>
    </>

}

export default ServerItem