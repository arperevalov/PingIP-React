import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IAPIResponse, IServers, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setPing, setServers } from "../../Redux/ServersReducer";
import Servers from "./Servers";

interface IServersAPI {
    servers: IServers[],
    setPing: CallableFunction,
    setServers: CallableFunction
}

const ServersAPI = (props: IServersAPI) => {
    const message = useContext(SysMessagesContext)

    const pingAllServers = () => {
        APIRouter(APIRouterActions.pingAllServers, {})
        .then(r => {
            props.setServers(r)
            message.notifyUser({
                type: MessageType.success,
                text: 'Все сервера пинганулись'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось пингануть все сервера'
            })
            throw new Error(e)
        })   
    }

    const getPing = (id: number) => {
        APIRouter(APIRouterActions.pingServer, {
            id: id
        }).then(r => {
            props.setPing(r)
            message.notifyUser({
                type: MessageType.success,
                text: 'Чики-пуки ' + id
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось пингануть сервер ' + id
            })
            throw new Error(e)
        })   
    }

    const getServers = () => {
        APIRouter(APIRouterActions.getServers, {})
        .then(r => {
            props.setServers(r)
            message.notifyUser({
                type: MessageType.success,
                text: 'Серверы успешно загрузились'
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось загрузить серверы'
            })
            throw new Error(e)
        })  
    }

    useEffect(()=>{
        getServers()
    }, [])

    return <Servers {...props} getPing={getPing} pingAllServers={pingAllServers} />
}


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers
    }
}

const ServersContainer = connect(MapStateToProps,{
    setPing,
    setServers
})(ServersAPI)

export default ServersContainer