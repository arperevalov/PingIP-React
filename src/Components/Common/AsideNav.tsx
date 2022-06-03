import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { IServers } from "../../Interfaces"


interface AsideNavProps {
    items: IServers[]
}

const AsideNav = (props:AsideNavProps) => {

    const [displayBlock, setDisplayBlock] = useState(false)


    return <aside style={displayBlock ? {right: '40px'} : {right: '-240px'}} className='asideNav'>
        <button type='button' className='asideNav__show-btn' onClick={ () => setDisplayBlock(!displayBlock) }></button>
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
    </aside>
}

export default AsideNav