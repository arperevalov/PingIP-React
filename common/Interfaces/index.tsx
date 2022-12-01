export enum MessageType {
    success,
    error,
    regular
}

export enum PopupType {
    default,
    createServer,
    updateServer,
    updateCamera,
    createCamera,
}

export enum ListType {
    Servers= 'ase',
    Cameras = 'sdsa'
}

export interface IServers {
    id: number
    name: string
    ip_address: string
    description?: string | boolean
    status: boolean
    last_ping?: string
    mac_address: string
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

export interface ILogs {
    date: string
    id: number
    path: string
}