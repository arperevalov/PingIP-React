import React, { Context, ContextType, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useMatch, useParams } from "react-router";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IServers, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setServerChilren, setCameraPing, setServers } from "../../../../Redux/ServersReducer";
import { setFetching } from "../../../../Redux/AppReducer";
import { setPopup } from "../../../../Redux/AppReducer";
import Cameras from "./Cameras";
import { RootState } from "../../../../Redux/store";

interface ICamerasAPI {
    servers: IServers[]
    updates: number
    setCameraPing: CallableFunction
    setServers: CallableFunction
    setServerChilren: CallableFunction
    setFetching: CallableFunction
    setPopup: CallableFunction
    isFetching: boolean
}

const CamerasAPI = (props: ICamerasAPI) => {
    const message = useContext(SysMessagesContext)

    let match = useMatch("/servers/:id");
    const prodId:number = parseInt(match.params.id);

    const getServerID = (id:number, servers:IServers[]) => {
        return servers.findIndex(i => {
            return i.id === id
        })
    }
    const parent:IServers|undefined = props.servers[getServerID(prodId, props.servers)]

    const getPing = (id: number) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.pingCamera, {id: id, parentID: parent.id})
        .then(r => {
            props.setCameraPing(id, r, parent.id)
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

    const pingAllCameras = () => {
        props.setFetching(true)
        APIRouter(APIRouterActions.pingAllCameras, {id: parent.id})
        .then(r => {
            props.setServerChilren(prodId, r)
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
        if(prodId) {
            if (props.servers.length < 1 && parent === undefined) {
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

            props.setFetching(true)
            APIRouter(APIRouterActions.getServerChildren, {id: prodId})
            .then(r => {
                props.setServerChilren(prodId, r)
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
    },[prodId, props.updates])

    return <Cameras 
                servers={props.servers} 
                getPing={getPing} 
                pingAllCameras={pingAllCameras} 
                parent={parent} 
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

const CamerasContainer = connect(MapStateToProps,{
    setCameraPing,
    setServers,
    setServerChilren,
    setFetching,
    setPopup
})(CamerasAPI)

export default CamerasContainer