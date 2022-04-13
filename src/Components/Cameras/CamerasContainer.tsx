import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { IServers } from "../../Interfaces";
import { getServerChilren, setPing, Status } from "../../Redux/ServersReducer";
import Cameras from "./Cameras";

interface ICamerasAPI {
    servers: IServers[],
    setPing: CallableFunction,
    getServerChilren: CallableFunction
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
        const url = "https://example.com/auth/login"
        async function pingServer() {
            let resp = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
            
            // let respObj = await resp.json();
            let respObj = {
                "id": 1,
                "status": true,
                "ip_address": "192.168.1.1",
                "last_ping": "2022-04-09 22:43:03"
            }
            props.setPing(id, respObj)
        }
        pingServer()

        
        
    }

    useEffect(()=>{
        if(prodId) {
            let children = [{
                id: 22,
                name: "Node 77",
                ip: "192.168.1.1",
                description: "SomeText",
                status: Status.working
            },
            {
                    id: 24,
                    name: "Node 18",
                    ip: "192.168.1.1",
                    description: "SomeText",
                    status: Status.working
            }]
            props.getServerChilren(prodId, children)
        }
    },[])

    return <Cameras getPing={getPing} parent={parent}  />
}


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers
    }
}

const CamerasContainer = connect(MapStateToProps,{
    setPing,
    getServerChilren
})(CamerasAPI)

export default CamerasContainer