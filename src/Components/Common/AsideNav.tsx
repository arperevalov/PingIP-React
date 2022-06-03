import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { IServers } from "../../Interfaces"


interface AsideNavProps {
    items: IServers[]
}

const AsideNav = (props:AsideNavProps) => {

    const [displayBlock, setDisplayBlock] = useState(false),
    showNavButton = useRef(null)

    const handleOutsideClick = (event: Event) => {
        if (showNavButton && !showNavButton.current.contains(event.target)){
            setDisplayBlock(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click', handleOutsideClick);
    },[])


    return <aside className={`asideNav ${displayBlock ? 'shown': ''}`}>
        <div className="asideNav__show-btn-container">
            <button ref={showNavButton} type='button' className='asideNav__show-btn' onClick={ () => setDisplayBlock(!displayBlock) }>Серверы</button>
        </div>
        <div className="asideNav__content">
            <h2 className='asideNav__name h2'>Серверы</h2>
            <ul className='asideNav__list'>
                {props.items.map((i:IServers) => {
                    return <li className='item' key={i.id}>
                            <NavLink to={`/servers/${i.id}`}>
                                <span className={`item__status ${i.status === true ? ' works' : ' notWorks'}`} />
                                <span className='item__name'>{i.name}</span>
                            </NavLink>
                        </li>
                })}
            </ul>
        </div>
    </aside>
}

export default AsideNav