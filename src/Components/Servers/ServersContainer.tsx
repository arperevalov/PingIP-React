import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IServers, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setPing, setServers } from "../../Redux/ServersReducer";
import { setFetching } from "../../Redux/AppReducer";
import { setPopup } from "../../Redux/AppReducer";
import Servers from "./Servers";

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

    const getServers = () => {
        props.setFetching(true)
        APIRouter(APIRouterActions.getServers, {})
        .then(r => {
            props.setServers(r)
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

    return <Servers 
                {...props} 
                getPing={getPing} 
                pingAllServers={pingAllServers} 
                setPopup={props.setPopup}
                isFetching={props.isFetching}
            />
}


const MapStateToProps = (store: any) => {
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

export default ServersContainer