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
            document.cookie = `Bearer = ${action.user.token}`
            return {
                ...state,
                hasBearer: true,
                token: action.user.token,
                username: action.user.username
            }
            break;
        case EAuth.LOG_OUT:
            document.cookie = 'Bearer =; expires=Thu, 01 Jan 1970 00:00:01 GMT'
            return {
                ...state,
                hasBearer: false,
                token: null,
                username: null
            }
            break;
    
        default:
            let hasBearerCookie: boolean
            if(!state.hasBearer) {
                let cookies:string = document.cookie
                let array = cookies.split('; ')
                for (let a = 0; a < array.length; a++) {
                    let value = array[a].split('=')
                    value[0] === 'Bearer' ? hasBearerCookie = true : void(0)
                }
            }
            return {
                ...state,
                hasBearer: hasBearerCookie
            }
            break;
    }
}

export const setUser = (user:object) => ({type: EAuth.SET_BEARER, user})
export const logOut = () => ({type: EAuth.LOG_OUT})

export default AuthReducer