enum EAuth {
    SET_BEARER,
    LOG_OUT
}

interface AuthReducerDefault {
    hasBearer: boolean
    username: string | null
}

const defaultValues: AuthReducerDefault = {
    hasBearer: false,
    username: null
}

const AuthReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case EAuth.SET_BEARER:
            localStorage.setItem('Bearer', JSON.stringify(action.user.token))
            return {
                ...state,
                hasBearer: true,
                username: action.user.username
            }
            break;
        case EAuth.LOG_OUT:
            localStorage.removeItem('Bearer')
            return {
                ...state,
                hasBearer: false,
                username: null
            }
            break;
    
        default:
            let hasBearerSession: boolean,
            token: string
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

export const setUser = (user:object) => ({type: EAuth.SET_BEARER, user})
export const logOut = () => ({type: EAuth.LOG_OUT})

export default AuthReducer