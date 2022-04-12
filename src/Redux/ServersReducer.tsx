export enum ServerStatus {
    working,
    pending,
    notworking
}

export interface IServers {
    id: number
    name: string
    ip: string
    description?: string
    status: ServerStatus
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
            status: ServerStatus.working
        },
        {
            id: 2,
            name: "Node 2",
            ip: "192.168.1.1",
            status: ServerStatus.pending
        }
    ]
}

const ServersReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
            break;
    }
}


export default ServersReducer