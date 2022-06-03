import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { IServers, PopupType } from '../../Interfaces';
import ListDescription from '../Common/ListDescription';

interface CameraItemProps extends IServers {
    getPing: CallableFunction
    parentID?: number
    setPopup: CallableFunction
}

const CameraItem = (props:CameraItemProps) => {

    const togglePopup = (e:MouseEvent):void => {
        e.preventDefault()
        props.setPopup({
            type: PopupType.updateCamera,
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
        <span>{props.lastPing ? props.lastPing.toLocaleTimeString() : ''}
            <span className='item__lastPingDate'>{props.lastPing ? ' ' + props.lastPing.toLocaleDateString() : ''}</span>
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

export default CameraItem