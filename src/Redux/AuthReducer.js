const SET_BEARER = 'SET_BEARER'

const defaultValues = {
    hasBearer: false
}

const AuthReducer = (state = defaultValues, action) => {
    switch (action.type) {
        case SET_BEARER:
            return {
                ...state,
                hasBearer: true
            }
            break;
    
        default:
            return {
                ...state
            }
            break;
    }
}

export const setBearerToken = token => ({type: SET_BEARER, token})

export default AuthReducer