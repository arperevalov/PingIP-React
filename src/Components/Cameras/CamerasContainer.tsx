import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { APIRouter, APIRouterActions } from "../../API/APIRouter";
import { IServers } from "../../Interfaces";
import { setServerChilren, setCameraPing } from "../../Redux/ServersReducer";
import Cameras from "./Cameras";

interface ICamerasAPI {
    servers: IServers[],
    setCameraPing: CallableFunction,
    setServerChilren: CallableFunction
}

const CamerasAPI = (props: ICamerasAPI) => {

    const params:any = useParams();
    const prodId:number = parseInt(params.id);

    const getServerID = (id:number, servers:IServers[]) => {
        return servers.findIndex(i => {
            return i.id === id
        })
    }
    const parent = props.servers[getServerID(prodId, props.servers)]

    const getPing = (id: number) => {
        APIRouter(APIRouterActions.pingCamera, {id: id, parentID: parent.id})
        .then(r => {
            props.setCameraPing(id, r, parent.id)
        })
        
    }

    useEffect(()=>{
        if(prodId) {
            APIRouter(APIRouterActions.getServerChildren, {id: prodId})
            .then(r => {
                props.setServerChilren(prodId, r)
            })
        }
    },[])

    return <Cameras getPing={getPing} parent={parent} />
}


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers
    }
}

const CamerasContainer = connect(MapStateToProps,{
    setCameraPing,
    setServerChilren
})(CamerasAPI)

export default CamerasContainer