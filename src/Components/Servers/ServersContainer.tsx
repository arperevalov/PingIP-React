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

    const getPing = (id: number) => {
        APIRouter(APIRouterActions.pingServer, {
            id: id
        }).then(r => {
            props.setPing(id, r)
            message.notifyUser({
                type: MessageType.success,
                text: 'Чики-пуки '+id
            })
        }).catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: 'Что-то пошло не так'
            })
            throw new Error(e)
        })   
    }

    const getServers = () => {
        APIRouter(APIRouterActions.getServers,{})
        // .then((r) => {
        //     debugger
        //     props.setServers(r)})
        // .catch(e => {
        //     message.notifyUser({
        //         type: MessageType.error,
        //         text: e
        //     })
        //     throw new Error(e)
        // })
    }

    useEffect(()=>{
        getServers()
    }, [])

    return <Servers {...props} getPing={getPing} />
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