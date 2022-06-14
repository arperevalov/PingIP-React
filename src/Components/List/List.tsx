import React, { MouseEvent } from 'react';
import { IServers, PopupType } from '../../Interfaces';
import ListDescription from './ListDescription';

interface ListProps extends IServers {
    getPing: CallableFunction
    parentID?: number
    setPopup: CallableFunction
    type: string
}

const List = (props:ListProps) => {

    const togglePopupServer = (e:MouseEvent):void => {
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

    const togglePopupCamera = (e:MouseEvent):void => {
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
        <span className='item__descriptionMobile'>{props.description}</span>
        <div className='item__dataWrap'>
            <span className='item__data'> <span className='item__meaning'>IP</span> {props.ip_address}</span>
            {/* <span className='item__data'> <span className='item__meaning'>MAC</span> {props.mac}</span> */}
            <span className='item__data'> <span className='item__meaning'>MAC</span> 123.123.123.123</span>
            <span className='item__data'>
                <span className='item__meaning'>Последний пинг</span>
                {props.last_ping ? new Date(props.last_ping.replace(" ", "T")).toLocaleTimeString() : ''}
                <span className='item__lastPingDate'>{props.last_ping ? ' ' + new Date(props.last_ping.replace(" ", "T")).toLocaleDateString() : ''}</span>
            </span>
        </div>
        <div className='buttonWrapper'>
            <button className='button button-3 button-list button-change' onClick={props.type === 'server' ? togglePopupServer : togglePopupCamera}>
                Изменить
            </button>   
            <button className='button button-2 button-list button-ping' onClick={startPing}>
                Пинг
            </button>
        </div>
    </>

}

export default List