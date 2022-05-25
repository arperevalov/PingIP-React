export enum MessageType {
    success,
    error,
    regular
}

export enum PopupType {
    default,
    create,
    update,
    delete
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

export interface IPopup {
    type: PopupType
    name?: string
    id?: number
    ip_address?: string
    description?: string
    parentID?: number
}

export interface IAPIResponse {
    ok: boolean
    body: string
}