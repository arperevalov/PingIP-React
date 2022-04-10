enum EAuth {
    SET_BEARER,
    LOG_OUT
}

interface AuthReducerDefault {
    hasBearer: boolean
    token: string | null,
    username: string | null
}

const defaultValues: AuthReducerDefault = {
    hasBearer: false,
    token: null,
    username: null
}

const AuthReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case EAuth.SET_BEARER:
            return {
                ...state,
                hasBearer: true,
                token: action.token,
                username: action.username
            }
            break;
        case EAuth.LOG_OUT:
            return {
                ...state,
                hasBearer: false,
                token: null,
                username: null
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setUser = (user:object) => ({type: EAuth.SET_BEARER, user})
export const logOut = () => ({type: EAuth.LOG_OUT})

export default AuthReducer