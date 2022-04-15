import React, { useContext } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IServers, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setPing } from "../../Redux/ServersReducer";
import Servers from "./Servers";

interface IServersAPI {
    servers: IServers[],
    setPing: CallableFunction
}

const ServersAPI = (props: IServersAPI) => {
    const message = useContext(SysMessagesContext)

    const getPing = (id: number) => {
        APIRouter(APIRouterActions.pingServer, {
            id: id
        }).then(r => {
            props.setPing(id, r)
        })
        message.notifyUser({
            type: MessageType.success,
            text: 'Что-то пошло не так'
        })
    }

    return <Servers {...props} getPing={getPing} />
}


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers
    }
}

const ServersContainer = connect(MapStateToProps,{
    setPing
})(ServersAPI)

export default ServersContainer