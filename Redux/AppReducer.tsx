import { AnyAction } from "redux";
import { IMessage, IPopup, PopupType } from "../common/Interfaces";

enum Actions {
    setSysMessage = "SET_SYSMESSAGE",
    shiftMessage = "SHIFT_MESSAGE",
    setFetching = "SET_FETCHING",
    setPopup = "SET_POPUP"
}

interface AppReducerState {
    SysMessages:IMessage []
    SysIDCounter: number
    SysMessagesQueue: number[]
    isFetching: boolean
    popupItem: IPopup
}

const defaultValues: AppReducerState = {
    SysMessages: [],
    SysMessagesQueue: [],
    SysIDCounter: 0,
    isFetching: false,
    popupItem: {
        type: PopupType.default
    }
}

const AppReducer = (state = defaultValues, action: AnyAction) => {
    switch (action.type) {
        case Actions.setSysMessage:
            let messages = [];

            for (let key in action.message.text) {
                messages.push({
                    id: state.SysIDCounter++,
                    type: action.message.type,
                    text: action.message.text[key]
                })
            }

            return {
                ...state,
                SysMessages: [...state.SysMessages,
                    ...messages],
                SysIDCounter: state.SysIDCounter + messages.length,
                SysMessagesQueue: [...state.SysMessagesQueue, messages.length]
            }
            break;
        
        case Actions.shiftMessage:
            state.SysMessages.splice(0, state.SysMessagesQueue[0])
            state.SysMessagesQueue.shift()
            return {
                ...state,
                SysMessages: [...state.SysMessages],
                SysMessagesQueue: [...state.SysMessagesQueue]
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