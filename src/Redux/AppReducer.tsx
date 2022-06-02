import { IMessage, IPopup, PopupType } from "../Interfaces";

enum Actions {
    setSysMessage = "SET_SYSMESSAGE",
    shiftMessage = "SHIFT_MESSAGE",
    setFetching = "SET_FETCHING",
    setPopup = "SET_POPUP"
}

interface AppReducerState {
    SysMessages:IMessage []
    SysIDCounter: number
    isFetching: boolean
    popupItem: IPopup
}

const defaultValues: AppReducerState = {
    SysMessages: [],
    SysIDCounter: 0,
    isFetching: false,
    popupItem: {
        type: PopupType.default
    }
}

const AppReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case Actions.setSysMessage:
            let newMessage = {
                id: state.SysIDCounter++,
                type: action.message.type,
                text: action.message.text.toString()
            }

            return {
                ...state,
                SysMessages: [...state.SysMessages,
                    newMessage],
                SysIDCounter: state.SysIDCounter++
            }
            break;
        
        case Actions.shiftMessage:
            state.SysMessages.shift()
            return {
                ...state,
                SysMessages: [...state.SysMessages]
            }
            break

        case Actions.setFetching:
            return {
                ...state,
                isFetching: action.fetching
            }
            break

        case Actions.setPopup:
            return {
                ...state,
                popupItem: action.popup
            }
            break
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setSysMessage = (message: IMessage) => ({type: Actions.setSysMessage, message})
export const shiftMessage = () => ({type: Actions.shiftMessage})
export const setFetching = (fetching: boolean) => ({type: Actions.setFetching, fetching})
export const setPopup = (popup: IPopup) => ({type: Actions.setPopup, popup})

export default AppReducer