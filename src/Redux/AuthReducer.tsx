const SET_BEARER = 'SET_BEARER',
LOG_OUT = 'LOG_OUT'

const defaultValues = {
    hasBearer: false
}

const AuthReducer = (state = defaultValues, action:any) => {
    switch (action.type) {
        case SET_BEARER:
            return {
                ...state,
                hasBearer: true
            }
            break;
        case LOG_OUT:
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

export const setBearerToken = (token:string) => ({type: SET_BEARER, token})
export const logOut = () => ({type: LOG_OUT})

export default AuthReducer