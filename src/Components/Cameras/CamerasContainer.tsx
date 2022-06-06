import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IServers, MessageType } from "../../Interfaces";
import { SysMessagesContext } from "../../Providers/SysMessagesProvider";
import { setServerChilren, setCameraPing } from "../../Redux/ServersReducer";
import { setFetching } from "../../Redux/AppReducer";
import { setPopup } from "../../Redux/AppReducer";
import Cameras from "./Cameras";

interface ICamerasAPI {
    servers: IServers[]
    updates: number
    setCameraPing: CallableFunction
    setServerChilren: CallableFunction
    setFetching: CallableFunction
    setPopup: CallableFunction
    isFetching: boolean
}

const CamerasAPI = (props: ICamerasAPI) => {
    const message = useContext(SysMessagesContext)

    const params:any = useParams();
    const prodId:number = parseInt(params.id);

    const getServerID = (id:number, servers:IServers[]) => {
        return servers.findIndex(i => {
            return i.id === id
        })
    }
    const parent = props.servers[getServerID(prodId, props.servers)]

    const getPing = (id: number) => {
        props.setFetching(true)
        APIRouter(APIRouterActions.pingCamera, {id: id, parentID: parent.id})
        .then(r => {
            props.setCameraPing(id, r, parent.id)
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.success,
                text: 'Успешно пинганулась камера ' + id
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось пингануть камеру'
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
            message.notifyUser({
                type: MessageType.success,
                text: 'Все камеры пинганулись'
            })
        }).catch(e => {
            props.setFetching(false)
            message.notifyUser({
                type: MessageType.error,
                text: 'Не удалось пингануть все камеры'
            })
            throw new Error(e)
        })  
    }

    useEffect(()=>{
        if(prodId) {
            props.setFetching(true)
            APIRouter(APIRouterActions.getServerChildren, {id: prodId})
            .then(r => {
                props.setServerChilren(prodId, r)
                props.setFetching(false)
                message.notifyUser({
                    type: MessageType.success,
                    text: 'Камеры успешно загрузились'
                })
            }).catch(e => {
                props.setFetching(false)
                message.notifyUser({
                    type: MessageType.error,
                    text: 'Не удалось загрузить камеры'
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


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers,
        updates: store.ServersPage.updates,
        isFetching: store.AppPage.isFetching
    }
}

const CamerasContainer = connect(MapStateToProps,{
    setCameraPing,
    setServerChilren,
    setFetching,
    setPopup
})(CamerasAPI)

export default CamerasContainer