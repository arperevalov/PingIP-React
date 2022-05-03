import { IMessage } from "../Interfaces";

enum Actions {
    setSysMessage = "SET_SYSMESSAGE",
    shiftMessage = "SHIFT_MESSAGE"
}

interface AppReducerState {
    SysMessages:IMessage []
}

const defaultValues: AppReducerState = {
    SysMessages: []
}

const AppReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case Actions.setSysMessage:
            let newMessage = {
                type: action.message.type,
                text: action.message.text.toString()
            }

            return {
                ...state,
                SysMessages: [...state.SysMessages,
                    newMessage]
            }
            break;
        
        case Actions.shiftMessage:
            state.SysMessages.shift()
            return {
                ...state,
                SysMessages: [...state.SysMessages]
            }
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setSysMessage = (message: IMessage) => ({type: Actions.setSysMessage, message})
export const shiftMessage = () => ({type: Actions.shiftMessage})

export default AppReducer