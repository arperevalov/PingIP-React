var _ = require('lodash');
import { AnyAction } from "redux";
import { IServers } from "../Interfaces"

enum Actions {
    setPing = 'SET_PING',
    setCameraPing = 'SET_CAMERA_PING',
    setServerChilren = 'SET_SERVER_CHILDREN',
    setServers = 'SET_SERVERS',
    setUpdates = 'SET_UPDATES'
}

interface ServersReducerState {
    servers:IServers[]
    updates: number
}

const defaultValues: ServersReducerState = {
    servers: [],
    updates: 0
}

const ServersReducer = (state = defaultValues, action: AnyAction) => {

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
                servers: [...action.servers]
            }
            break;

        case Actions.setServerChilren:
            item = getServerID(action.id, state.servers)

            state.servers[item].children = [...action.children]

            return _.cloneDeep(state)
            break;

        case Actions.setPing:
            item = getServerID(action.response.id, state.servers)

            state.servers[item] = {
                ...state.servers[item],
                id: action.response.id,
                name: state.servers[item].name,
                ip_address: action.response.ip_address,
                status: action.response.status,
                mac: '123',
                last_ping: action.response.last_ping
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

            parentServer.children[childID] = {
                ...parentServer.children[childID],
                id: action.response.id,
                name: parentServer.children[childID].name,
                ip_address: action.response.ip_address,
                status: action.response.status,
                mac: '123',
                last_ping: action.response.last_ping
            }

            return _.cloneDeep(state)
            break;
        
        case Actions.setUpdates:
            return {
                ...state,
                updates: state.updates+1
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}

export const setPing = (response: object) => ({type: Actions.setPing, response})
export const setCameraPing = (id:number, response: object, parentID: number) => ({type: Actions.setCameraPing, id, response, parentID})
export const setServerChilren = (id:number, children:IServers[]) => ({type: Actions.setServerChilren, id, children})
export const setServers = (servers:IServers[]) => ({type: Actions.setServers, servers})
export const setUpdates = () => ({type: Actions.setUpdates})

export default ServersReducer