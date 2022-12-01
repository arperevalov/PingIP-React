import React from "react";
// import { Link } from "react-router-dom";
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


    if(!props.parent && props.type === ListType.Servers) return <>
        <div className='list__legend'>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>MAC</span>
            <span>Последний пинг</span>
        </div>
        <ul className='list__items'>
            {props.servers ? props.servers
            .sort((a,b) => { return a.id - b.id})
            .map((i:IServers) => {
                return <li className='list__itemsWrapper' key={i.id}>
                    {/* <Link to={'/servers/'+i.id} className='item'> */}
                        <List
                            id={i.id}
                            name={i.name}
                            ip_address={i.ip_address}
                            last_ping={i.last_ping}
                            description={i.description ? i.description : false}
                            status={i.status}
                            getPing={props.getPing}
                            setPopup={props.setPopup}
                            mac_address={i.mac_address}
                            type="server"
                        />
                    {/* </Link> */}
                </li>
                }) : ''
            }
        </ul>
    </>

    if(props.type === ListType.Cameras) return <>
        <div className='list__legend'>
            <span>Статус</span>
            <span>Имя</span>
            <span>IP</span>
            <span>MAC</span>
            <span>Последний пинг</span>
        </div>
        <ul className='list__items'>
        { props.parent.children && props.parent.children.length > 0 ? props.parent.children
            .sort((a,b) => { return a.id - b.id})
            .map((i:IServers) => {
                return <li className='list__itemsWrapper' key={i.id}>
                    <div className='item'>
                        <List
                            id={i.id}
                            name={i.name}
                            ip_address={i.ip_address}
                            last_ping={i.last_ping}
                            description={i.description ? i.description : false}
                            status={i.status}
                            getPing={props.getPing}
                            parentID={props.parent.id}
                            setPopup={props.setPopup}
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