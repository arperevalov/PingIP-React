import React from "react";
import { connect } from "react-redux";
import { IServers, setPing } from "../../Redux/ServersReducer";
import Servers from "./Servers";

interface IServersAPI {
    servers:IServers[],
    setPing: CallableFunction
}

const ServersAPI = (props: IServersAPI) => {

    const getPing = (id: number) => {
        let mockObject = {
            "id": 1,
            "status": false,
            "ip_address": "192.168.1.1",
            "last_ping": "2022-04-09 22:43:03"
          }
        props.setPing(id, mockObject)
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