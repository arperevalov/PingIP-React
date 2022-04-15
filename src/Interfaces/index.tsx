import { Status } from "../Redux/ServersReducer"

export enum MessageType {
    success,
    error,
    regular
}

export interface IServers {
    id: number
    name: string
    ip: string
    description?: string
    status: Status
    lastPing?: Date
    children?:IServers[]
}

export interface IMessage {
    text: string
    type: MessageType
}