import { useEffect, useContext } from "react"
import { IServers, MessageType } from "../../common/Interfaces"
import { RootState } from "../../Redux/store"
import ServersLayout from "./ServersLayout"
import { connect } from "react-redux"
import { setPing, setServers } from "../../Redux/ServersReducer"
import { setFetching, setPopup } from "../../Redux/AppReducer"
import { APIRouter, APIRouterActions } from "../../common/API/APIRouter"
import withAuth from "../../common/HOC/withAuth"
import { SysMessagesContext } from "../../common/Providers/SysMessagesProvider"

interface IServersAPI {
    servers: IServers[]
    updates: number
    isFetching: boolean
    setPing: CallableFunction
    setServers: CallableFunction
    setFetching: CallableFunction
    setPopup: CallableFunction
}

const ServersAPI = (props: IServersAPI) => {

    const message = useContext(SysMessagesContext)

    const getServers = async () => {
        
        props.setFetching(true)
        APIRouter(APIRouterActions.getServers, {})
        .then( async r => {
            const data = r
            props.setServers(data)
            props.setFetching(false)
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: e
            })
            throw new Error(e)
        })  

    }

    const pingAllServers = () => {
        props.setFetching(true)
        APIRouter(APIRouterActions.pingAllServers, {})
        .then(r => {
            props.setFetching(false)
            props.setServers(r)
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: e
            })
            throw new Error(e)
        })   
    }

    const getPing = (id: number) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.pingServer, {
            id: id
        }).then(r => {
            props.setPing(r)
            props.setFetching(false)
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: e
            })
            throw new Error(e)
        })   
    }

    useEffect(()=>{
        getServers()
    }, [props.updates])

    return <ServersLayout 
                {...props} 
                getPing={getPing} 
                pingAllServers={pingAllServers} 
                setPopup={props.setPopup}
                isFetching={props.isFetching}
            />
}


const MapStateToProps = (store: RootState) => {
    return {
        servers: store.ServersPage.servers,
        updates: store.ServersPage.updates,
        isFetching: store.AppPage.isFetching
    }
}

const ServersContainer = connect(MapStateToProps,{
    setPing,
    setServers,
    setFetching,
    setPopup
})(ServersAPI)

export default withAuth(ServersContainer)