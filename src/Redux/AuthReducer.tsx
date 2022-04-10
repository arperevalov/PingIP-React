enum EAuth {
    SET_BEARER,
    LOG_OUT
}

interface AuthReducerDefault {
    hasBearer: boolean
}

const defaultValues: AuthReducerDefault = {
    hasBearer: false
}

const AuthReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case EAuth.SET_BEARER:
            return {
                ...state,
                hasBearer: true
            }
            break;
        case EAuth.LOG_OUT:
            return {
                ...state,
                hasBearer: false
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setBearerToken = (token:string) => ({type: EAuth.SET_BEARER, token})
export const logOut = () => ({type: EAuth.LOG_OUT})

export default AuthReducer