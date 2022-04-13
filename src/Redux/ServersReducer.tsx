import { IServers } from "../Interfaces"

enum Actions {
    setPing = 'SET_PING',
    getServerChilren = 'GET_SERVER_CHILDREN'
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
    servers: [
        {
            id: 1,
            name: "Node 1",
            ip: "192.168.1.1",
            description: "SomeText",
            status: Status.working,
            children: [{
                    id: 22,
                    name: "Node 22",
                    ip: "192.168.1.1",
                    description: "SomeText",
                    status: Status.working
                },
                {
                        id: 24,
                        name: "Node 24",
                        ip: "192.168.1.1",
                        description: "SomeText",
                        status: Status.working
                }
            ]
        },
        {
            id: 2,
            name: "Node 2",
            ip: "192.168.1.1",
            status: Status.pending
        },
        {
            id: 3,
            name: "Node 3",
            ip: "192.168.1.1",
            status: Status.notworking
        }
    ]
}

const ServersReducer = (state = defaultValues, action:any) => {

    let item: number

    const getServerID = (id:number, servers:IServers[]) => {
        return servers.findIndex(i => {
            return i.id === id
        })
    }


    switch (action.type) {

        case Actions.getServerChilren :
        
            item = getServerID(action.id, state.servers)

            state.servers[item].children = [...action.children]

            return {
                ...state,
                servers: [...state.servers]
            }
            break;
        case Actions.setPing :

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

        default:
            return {
                ...state
            }
            break;
    }
}

export const setPing = (id:number, response: object) => ({type: Actions.setPing, id, response})
export const getServerChilren = (id:number, children:IServers[]) => ({type: Actions.getServerChilren, id, children})

export default ServersReducer