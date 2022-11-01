import { AnyAction } from "redux"

enum Actions {
    SET_BEARER,
    LOG_OUT
}

interface AuthReducerState {
    hasBearer: boolean
    username: string | null
}

const defaultValues: AuthReducerState = {
    hasBearer: false,
    username: null
}

const AuthReducer = (state = defaultValues, action: AnyAction) => {
    switch (action.type) {
        case Actions.SET_BEARER:
            localStorage.setItem('Bearer', JSON.stringify(action.user.token))
            return {
                ...state,
                hasBearer: true,
                username: action.user.username
            }
            break;
        case Actions.LOG_OUT:
            localStorage.removeItem('Bearer')
            return {
                ...state,
                hasBearer: false,
                username: null
            }
            break;
    
        default:
            let hasBearerSession: boolean
            if(localStorage.getItem('Bearer')){
                hasBearerSession = true
            }
            return {
                ...state,
                hasBearer: hasBearerSession,
            }
            break;
    }
}

export const setUser = (user:object) => ({type: Actions.SET_BEARER, user})
export const logOut = () => ({type: Actions.LOG_OUT})

export default AuthReducer