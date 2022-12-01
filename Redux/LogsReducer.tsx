import { AnyAction } from "redux";
import { ILogs } from "../common/Interfaces";

enum Actions {
    setLogs = "SET_LOGS",
}

interface LogsReducerState {
    logs: []
}

const defaultValues: LogsReducerState = {
    logs: []
}

const LogsReducer = (state = defaultValues, action: AnyAction) => {
    switch (action.type) {
        case Actions.setLogs:

            return {
                ...state,
                logs: [...action.logs]
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setLogs = (logs:ILogs) => ({type: Actions.setLogs, logs})

export default LogsReducer