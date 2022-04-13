import React from "react";
import { connect } from "react-redux";
import { IServers } from "../../Interfaces";
import { setPing } from "../../Redux/ServersReducer";
import Servers from "./Servers";

interface IServersAPI {
    servers: IServers[],
    setPing: CallableFunction
}

const ServersAPI = (props: IServersAPI) => {

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

            // TESTING PURPOSES
                function getRandom() {
                    return Math.random() > 0.5 ? true : false
                }
            // TESTING PURPOSES
            
            // let respObj = await resp.json();
            let respObj = {
                // "id": 1,
                "id": id,
                // "status": true,
                "status": getRandom(),
                "ip_address": "192.168.1.1",
                // "last_ping": "2022-04-09 22:43:03"
                "last_ping": new Date()
            }
            props.setPing(id, respObj)
        }
        pingServer()

        
        
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