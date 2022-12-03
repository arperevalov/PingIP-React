import React from "react";
import CustomLink from "../CustomLink";
import { IServers, ListType } from "../Interfaces";
import List from "./List";

interface ListCotnainerProps {
    type: ListType
    getPing: CallableFunction
    parentID?: number
    setPopup: CallableFunction
    parent?: IServers | boolean
    servers?: IServers[]
    cameras?: IServers[]
}

const ListCotnainer = (props: ListCotnainerProps) => {

    const {
        type,
        getPing,
        parentID,
        setPopup,
        parent,
        servers,
        cameras
    } = props;


    if(!parent && type === ListType.Servers) return <>
        <div className='list__legend'>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>MAC</span>
            <span>Последний пинг</span>
        </div>
        <ul className='list__items'>
            {servers ? servers
            .sort((a,b) => { return a.id - b.id})
            .map((i:IServers) => {
                return <li className='list__itemsWrapper' key={i.id}>
                    <CustomLink activeClassName="" href={'/servers/'+i.id} className='item'>
                        <List
                            id={i.id}
                            name={i.name}
                            ip_address={i.ip_address}
                            last_ping={i.last_ping}
                            description={i.description ? i.description : ""}
                            status={i.status}
                            getPing={getPing}
                            setPopup={setPopup}
                            mac_address={i.mac_address}
                            type="server"
                        />
                    </CustomLink>
                </li>
                }) : ''
            }
        </ul>
    </>

    if(type === ListType.Cameras) return <>
        <div className='list__legend'>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>MAC</span>
            <span>Последний пинг</span>
        </div>
        <ul className='list__items'>
        { parent.children && parent.children.length > 0 ? parent.children
            .sort((a,b) => { return a.id - b.id})
            .map((i:IServers) => {
                return <li className='list__itemsWrapper' key={i.id}>
                    <div className='item'>
                        <List
                            id={i.id}
                            name={i.name}
                            ip_address={i.ip_address}
                            last_ping={i.last_ping}
                            description={i.description ? i.description : ''}
                            status={i.status}
                            getPing={getPing}
                            parentID={parent.id}
                            setPopup={setPopup}
                            mac_address={i.mac_address}
                            type="string"
                        />
                    </div>
                </li>
                }) : ''
            }
        </ul>
    </>

    return <></>
    
}

export default ListCotnainer