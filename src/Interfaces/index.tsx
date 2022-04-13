import { Status } from "../Redux/ServersReducer"

export interface IServers {
    id: number
    name: string
    ip: string
    description?: string
    status: Status
    lastPing?: Date
    children?:IServers[]
}