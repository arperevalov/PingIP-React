var _ = require('lodash');
import { IServers } from "../Interfaces"

enum Actions {
    setPing = 'SET_PING',
    setCameraPing = 'SET_CAMERA_PING',
    setServerChilren = 'SET_SERVER_CHILDREN',
    setServers = 'SET_SERVERS'
}

export enum Status {
    working,
    pending,
    notworking
}

interface ServersReducerState {
    servers:IServers[]
}

const defaultValues: ServersReducerState = {
    // servers: [
    //     {
    //         id: 1,
    //         name: "Node 1",
    //         ip: "192.168.1.1",
    //         description: "SomeText",
    //         status: Status.working,
    //         children: [{
    //                 id: 22,
    //                 name: "Node 22",
    //                 ip: "192.168.1.1",
    //                 description: "SomeText",
    //                 status: Status.working
    //             },
    //             {
    //                     id: 24,
    //                     name: "Node 24",
    //                     ip: "192.168.1.1",
    //                     description: "SomeText",
    //                     status: Status.working
    //             }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "Node 2",
    //         ip: "192.168.1.1",
    //         status: Status.pending
    //     },
    //     {
    //         id: 3,
    //         name: "Node 3",
    //         ip: "192.168.1.1",
    //         status: Status.notworking
    //     }
    // ]

    servers: []
}

const ServersReducer = (state = defaultValues, action: any) => {

    let item: number

    const getServerID = (id:number, servers:IServers[]) => {
        return servers.findIndex(i => {
            return i.id === id
        })
    }


    switch (action.type) {

        case Actions.setServers:
            return {
                ...state,
                servers: [action.servers]
            }
            break;

        case Actions.setServerChilren:
            item = getServerID(action.id, state.servers)

            state.servers[item].children = [...action.children]

            return _.cloneDeep(state)
            break;

        case Actions.setPing:

            item = getServerID(action.id, state.servers)

            let newStatus: Status

            if (action.response.status) {
                newStatus = Status.working
            } else {
                newStatus = Status.notworking
            }

            state.servers[item] = {
                id: action.response.id,
                name: state.servers[item].name,
                ip: action.response.ip_address,
                status: newStatus,
                lastPing: new Date(action.response.last_ping)
            }

            return {
                ...state,
                servers: [...state.servers],
            }
            break;

        case Actions.setCameraPing:
            let parentServerID = getServerID(action.parentID, state.servers),
            parentServer = state.servers[parentServerID],
            childID = getServerID(action.id, parentServer.children)

            if (action.response.status) {
                newStatus = Status.working
            } else {
                newStatus = Status.notworking
            }

            parentServer.children[childID] = {
                id: action.response.id,
                name: parentServer.children[childID].name,
                ip: action.response.ip_address,
                status: newStatus,
                lastPing: new Date(action.response.last_ping)
            }

            return _.cloneDeep(state)
            break;

        default:
            return {
                ...state
            }
            break;
    }
}

export const setPing = (id:number, response: object) => ({type: Actions.setPing, id, response})
export const setCameraPing = (id:number, response: object, parentID: number) => ({type: Actions.setCameraPing, id, response, parentID})
export const setServerChilren = (id:number, children:IServers[]) => ({type: Actions.setServerChilren, id, children})
export const setServers = (servers:IServers[]) => ({type: Actions.setServerChilren, servers})

export default ServersReducer