import React from 'react';
import { IServers, ListType, PopupType } from '../../Interfaces';
import Empty from '../Common/Empty';
import ListCotnainer from '../../../../pages/common/List/ListContainer';

interface ServersProps {
    servers: IServers[]
    getPing: CallableFunction
    pingAllServers: CallableFunction
    setPopup: CallableFunction
    isFetching: boolean
}

const Servers = (props: ServersProps) => {
    const togglePopup = () => {
        props.setPopup({
            type: PopupType.createServer
        })
    }

    if(props.servers.length < 1 && !props.isFetching) {
        return <main className='main'>
            <div className='main__top'>
                <h1 className='h1'>Серверы</h1>
            </div>
            <Empty action={togglePopup}/>
        </main> 
    }

    return <main className='main'>
        <div className='main__top'>
            <h1 className='h1'>Серверы</h1>
            <div className='buttonWrapper'>
                <button className='button button-1' onClick={togglePopup}>+ Добавить сервер</button>
                <button className='button button-super' onClick={()=>{props.pingAllServers()}}>Пингануть все серверы</button>
            </div>
        </div>

        <div className='list'>
            <ListCotnainer 
                getPing={props.getPing}
                setPopup={props.setPopup}
                type={ListType.Servers}
                servers={props.servers}/>
        </div>
    </main>
}

export default Servers