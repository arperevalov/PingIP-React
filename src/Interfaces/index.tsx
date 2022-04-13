import { ServerStatus } from "../Redux/ServersReducer"

export interface IServers {
    id: number
    name: string
    ip: string
    description?: string
    status: ServerStatus
}