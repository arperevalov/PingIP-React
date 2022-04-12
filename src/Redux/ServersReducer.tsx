enum Actions {
    setPing = 'SET_PING'
}

export enum Status {
    working,
    pending,
    notworking
}

export interface IServers {
    id: number
    name: string
    ip: string
    description?: string
    status: Status
    lastPing?: string
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
            status: Status.working
        },
        {
            id: 2,
            name: "Node 2",
            ip: "192.168.1.1",
            status: Status.pending
        },
        {
            id: 3,
            name: "Node 2",
            ip: "192.168.1.1",
            status: Status.pending
        }
    ]
}

const ServersReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case Actions.setPing :

            const item:number = state.servers.findIndex(i => {
                return i.id === action.response.id
            })

            let newStatus: Status

            if (!action.response.status) {
                newStatus = Status.notworking
            } else if(action.response.status) {
                newStatus = Status.working
            }

            state.servers[item] = {
                id: action.response.id,
                name: state.servers[item].name,
                ip: action.response.ip,
                status: newStatus,
                lastPing: action.response.lastPing
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

export default ServersReducer