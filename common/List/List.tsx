import React, { MouseEvent } from 'react';
import { IServers, PopupType } from '../Interfaces';
import ListDescription from './ListDescription';

interface ListProps extends IServers {
    getPing: CallableFunction
    parentID?: number
    setPopup: CallableFunction
    type: string
}

const List = (props:ListProps) => {

    const {
        getPing,
        parentID,
        setPopup,
        type,
        description,
        id,
        name,
        ip_address,
        mac_address,
        status,
        last_ping
    } = props;

    const togglePopupServer = (e:MouseEvent):void => {
        e.preventDefault()
        setPopup({
            type: PopupType.updateServer,
            id: id,
            name: name,
            ip_address: ip_address,
            mac_address: mac_address,
            description: description,
            parentID: parentID
        })
    }

    const togglePopupCamera = (e:MouseEvent):void => {
        e.preventDefault()
        setPopup({
            type: PopupType.updateCamera,
            id: id,
            name: name,
            ip_address: ip_address,
            mac_address: mac_address,
            description: description,
            parentID: parentID
        })
    }

    const startPing = (e:MouseEvent):void => {
        e.preventDefault()
        getPing(id)
    }

    return <>
        <span className={`item__status ${status === true ? 'works' : 'notWorks'}`}>
            {status === true ? 'Работает' : 'Не работает'}
        </span>
        <span className='item__name'>
            <ListDescription description={description}/>
            {name}
        </span>
        <span className='item__descriptionMobile'>{description}</span>
        <div className='item__dataWrap'>
            <span className='item__data'> <span className='item__meaning'>IP</span> {ip_address}</span>
            <span className='item__data'> <span className='item__meaning'>MAC</span> {mac_address} </span>
            <span className='item__data'>
                <span className='item__meaning'>Последний пинг</span>
                {last_ping ? new Date(last_ping.replace(" ", "T")).toLocaleTimeString() : ''}
                <span className='item__lastPingDate'>{last_ping ? ' ' + new Date(last_ping.replace(" ", "T")).toLocaleDateString() : ''}</span>
            </span>
        </div>
        <div className='buttonWrapper'>
            <button className='button button-3 button-list button-change' onClick={type === 'server' ? togglePopupServer : togglePopupCamera}>
                Изменить
            </button>   
            <button className='button button-2 button-list button-ping' onClick={startPing}>
                Пинг
            </button>
        </div>
    </>

}

export default List