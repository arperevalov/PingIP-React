import { IServers, ListType, PopupType } from "../../_OLD/src/Interfaces"
import Empty from "../../common/Empty"
import ListCotnainer from "../../common/List/ListContainer"

interface ServersProps {
    servers: IServers[]
    getPing: CallableFunction
    pingAllServers: CallableFunction
    setPopup: CallableFunction
    isFetching: boolean
}

const ServersLayout = (props: ServersProps) => {
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
                servers={props.servers}
                parent={false}/>
        </div>
    </main>

    return <></>
}

export default ServersLayout