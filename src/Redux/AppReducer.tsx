import { IMessage } from "../Interfaces";

enum Actions {
    setSysMessage = "SET_SYSMESSAGE",
    shiftMessage = "SHIFT_MESSAGE",
    setFetching = "SET_FETCHING"
}

interface AppReducerState {
    SysMessages:IMessage []
    SysIDCounter: number
    isFetching: boolean
}

const defaultValues: AppReducerState = {
    SysMessages: [],
    SysIDCounter: 0,
    isFetching: false
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

export default AppReducer