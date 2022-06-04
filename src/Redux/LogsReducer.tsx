enum Actions {
    setLogs = "SET_LOGS",
}

interface LogsReducerState {
    logs: []
}

const defaultValues: LogsReducerState = {
    logs: []
}

const LogsReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case Actions.setLogs:

            return {
                ...state,
                ...action.logs
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setLogs = (logs:any) => ({type: Actions.setLogs, logs})

export default LogsReducer