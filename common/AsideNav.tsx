import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import CustomLink from "./CustomLink"
import { IServers } from "./Interfaces"


interface AsideNavProps {
    items: IServers[]
}

const AsideNav = (props:AsideNavProps) => {

    const [displayBlock, setDisplayBlock] = useState(false)
    const showNavButton = useRef<HTMLButtonElement | null>(null)

    const handleOutsideClick = (event: Event) => {
        if (event.target !== showNavButton.current) {
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
                {props.items
                .sort((a,b) => { return a.id - b.id})
                .map((i:IServers) => {
                    return <li className='item' key={i.id}>
                            <CustomLink href={`/servers/${i.id}`}
                                className="asideNav__link"
                                activeClassName="active"
                            >
                                <span className={`item__status ${i.status === true ? ' works' : ' notWorks'}`} />
                                <span className='item__name'>{i.name}</span>
                            </CustomLink>
                        </li>
                })}
            </ul>
        </div>
    </aside>
}

export default AsideNav