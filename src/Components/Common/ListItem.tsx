import React, { useEffect, useState } from 'react';
import mark from './../../images/mark.svg'
import markActive from './../../images/mark-active.svg'
import { Link } from 'react-router-dom';

const ListItem = (props:any) => {

    const [displayBlock, setDisplayBlock] = useState(false)

    const toggleDescription = (e:any) => {
        e.preventDefault()
        console.log(displayBlock)
        if (!displayBlock) {
            setDisplayBlock(true)
        } else {
            setDisplayBlock(false)
        }
        console.log(displayBlock)
    }

    return <li>
                <Link to={'/servers/'+props.id} className='item'>
                    <span className={`item__status ${props.status === undefined ? '' : props.status ? ' works' : ' notWorks'}`}>
                        {props.status === undefined ? 'Неизвестно' : props.status ? 'Работает' : 'Не работает'}
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
                        Объект №1
                    </span>
                    <span>109.226.233.16</span>
                    <span>16:24 <span className='item__lastPingDate'>19.03.2022</span></span>
                    <div className='buttonWrapper'>
                        <button className='button button-3'>Изменить</button>
                        <button className='button button-2'>Пинг</button>
                    </div>
                </Link>
            </li>
}

export default ListItem