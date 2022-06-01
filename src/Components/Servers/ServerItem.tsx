import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import mark from './../../../static/images/mark.svg'
import markActive from './../../../static/images/mark-active.svg'
import { IServers, PopupType } from '../../Interfaces';
import { PopupContext } from '../../Providers/PopupProvider';

interface ServerItemProps extends IServers {
    getPing: CallableFunction
    parentID?: number
}

const ServerItem = (props:ServerItemProps) => {

    const [displayBlock, setDisplayBlock] = useState(false),
        popup = useContext(PopupContext)

    const toggleDescription = (e:MouseEvent):void => {
        e.preventDefault()
        if (!displayBlock) {
            setDisplayBlock(true)
        } else {
            setDisplayBlock(false)
        }
    }

    const togglePopup = (e:MouseEvent):void => {
        e.preventDefault()
        popup.setPopup({
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
            <div className={`item__descriptionButton ${props.description ? '' : ' inactive'}`} onClick={toggleDescription}>
                <img src={displayBlock ? markActive : mark}/>
                <div className={`item__descriptionTextWrapper ${displayBlock ? '' : ' inactive'}`}>
                    <svg className='item__descriptionCorner' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 0H0L24 24V0Z" fill="#f5f5f5"/>
                    </svg>
                    <div className='item__descriptionText'>
                        <p>
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
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

export default ServerItem