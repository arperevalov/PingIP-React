import React from 'react';
import { IServers, ListType, PopupType } from '../../common/Interfaces';
import AsideNav from '../../common/AsideNav';
import Empty from '../../common/Empty';
import ListCotnainer from '../../common/List/ListContainer';

interface CamerasProps {
    setPopup: CallableFunction
    pingAllCameras: CallableFunction
    getPing: CallableFunction
    servers: IServers[]
    parent: IServers
    isFetching: boolean
}

const CamerasLayout = (props:CamerasProps) => {

    const togglePopup = () => {
        props.setPopup({
            type: PopupType.createCamera,
            parentID: props.parent.id
        })
    }

    if(props.parent === undefined) return <></>

    if(props.parent.children && props.parent.children.length < 1 && !props.isFetching) {
        return <main className='main'>
            <div className='main__top'>
                <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip_address}</span>Камеры</h1>
            </div>
            <Empty action={togglePopup}/>

            <AsideNav items={props.servers}/>
        </main> 
    }

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'><span className='location'>{props.parent.name} — {props.parent.ip_address}</span>Камеры</h1>
            <div className='buttonWrapper'>
                <button className='button button-1' onClick={togglePopup}>+ Добавить камеру</button>
                <button className='button button-super' onClick={()=>{props.pingAllCameras()}}>Пингануть все камеры</button>
            </div>
        </div>

        <div className='list'>
            <ListCotnainer 
                getPing={props.getPing}
                setPopup={props.setPopup}
                type={ListType.Cameras}
                parent={props.parent}/>
        </div>

        <AsideNav items={props.servers}/>
    </main>
    
}

export default CamerasLayout