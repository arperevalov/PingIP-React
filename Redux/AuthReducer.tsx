import { AnyAction } from "redux"

export enum Actions {
    SET_BEARER,
    LOG_OUT
}

interface AuthReducerState {
    hasBearer: boolean
}

const defaultValues: AuthReducerState = {
    hasBearer: false,
}

const AuthReducer = (state = defaultValues, action: AnyAction) => {
    if (typeof window === 'undefined') return ''
    switch (action.type) {
        case Actions.SET_BEARER:
            localStorage.setItem('Bearer', JSON.stringify(action.user.token))
            return {
                ...state,
                hasBearer: true,
            }
            break;
        case Actions.LOG_OUT:
            localStorage.removeItem('Bearer')
            return {
                ...state,
                hasBearer: false,
            }
            break;
    
        default:
            let hasBearerSession = false;
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