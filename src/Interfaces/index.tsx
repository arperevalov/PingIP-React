export enum MessageType {
    success,
    error,
    regular
}

export interface IServers {
    id: number
    name: string
    ip_address: string
    description?: string
    status: boolean
    lastPing?: Date
    children?:IServers[]
}

export interface IMessage {
    id?: number
    text: string
    type: MessageType
}

export interface IAPIResponse {
    ok: boolean
    body: string
}