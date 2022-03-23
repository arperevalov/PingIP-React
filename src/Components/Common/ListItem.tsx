import React, { useEffect, useState } from 'react';
import mark from './../../images/mark.svg'

const ListItem = (props:any) => {

    const [displayBlock, setDisplayBlock] = useState(false)

    const toggleDescription = (e:any) => {
        e.stopPropagation()
        console.log(displayBlock)
        if (!displayBlock) {
            setDisplayBlock(true)
        } else {
            setDisplayBlock(false)
        }
        console.log(displayBlock)
    }

    return <li>
                <a href='#' className='item'>
                    <span className={`item__status ${props.status === undefined ? '' : props.status ? ' works' : ' notWorks'}`}>
                        {props.status === undefined ? 'Неизвестно' : props.status ? 'Работает' : 'Не работает'}
                    </span>
                    <span className='item__name'>
                        <div className={`item__descriptionButton ${props.description ? '' : ' inactive'}`} onClick={toggleDescription}>
                            <img src={mark}/>
                            <div className={`item__descriptionText ${displayBlock ? '' : ' inactive'}`}>
                                <p>
                                    {props.description}
                                </p>
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
                </a>
            </li>
}

export default ListItem