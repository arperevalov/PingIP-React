import React, { MouseEvent, useEffect, useState } from 'react';
import mark from './../../../static/images/mark.svg'
import markActive from './../../../static/images/mark-active.svg'
import Popup from './Popup';
import { Status } from '../../Redux/ServersReducer';
import { IServers } from '../../Interfaces';

interface ListItemProps extends IServers {
    getPing: CallableFunction
}

const ListItem = (props:ListItemProps) => {

    const [displayBlock, setDisplayBlock] = useState(false),
    [displayPopup, setDisplayPopup] = useState(false),
    [pingProgress, setPingProgress] = useState(0),
    [isPinging, setIsPinging] = useState(false)

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
        if (!displayPopup) {
            setDisplayPopup(true)
        } else {
            setDisplayPopup(false)
        }
    }

    const startPing = (e:MouseEvent):void => {
        e.preventDefault()
        props.getPing(props.id)
        setIsPinging(true)
        setPingProgress(0)
    }

    useEffect(()=>{
        if (isPinging) {
            if(pingProgress < 100) {
                setTimeout(()=>{
                    setPingProgress(pingProgress+10)
                }, 100)
            } else {
                setIsPinging(false)
            }
        }
    },[ isPinging, pingProgress])

    return <>
                    <span className={`item__status ${props.status === Status.pending ? '' : props.status === Status.working ? ' works' : ' notWorks'}`}>
                        {props.status === Status.pending ? 'Неизвестно' : props.status === Status.working ? 'Работает' : 'Не работает'}
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
                    <span>{props.ip}</span>
                    <span>{props.lastPing ? props.lastPing.toLocaleTimeString() : ''}
                        <span className='item__lastPingDate'>{props.lastPing ? ' ' + props.lastPing.toLocaleDateString() : ''}</span>
                    </span>
                    <div className='buttonWrapper'>
                        <button className='button button-3' onClick={togglePopup}>Изменить</button>   
                        <button className='button button-2' onClick={startPing}>
                            Пинг
                            <div className='progressBar' style={{width: `${pingProgress}%`}}>
                                <span className='progressBar__text'>Пинг</span>
                            </div>
                        </button>
                    </div>
                {displayPopup ? <Popup itemId={props.id} 
                                    setDisplayPopup={setDisplayPopup}
                                    popupName={props.name}/> : ''}
                </>

}

export default ListItem