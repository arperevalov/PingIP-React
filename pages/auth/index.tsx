import React, { useContext } from "react"
import { connect } from "react-redux"
import { SysMessagesContext } from "./../../Providers/SysMessagesProvider"
import { setUser } from "./../../Redux/AuthReducer"
import { RootState } from "./../../Redux/store"
import Auth from "./Auth"

interface IAuthAPI {
    setUser: CallableFunction
}

const AuthAPI = (props:IAuthAPI) => {

    // const message = useContext(SysMessagesContext)

    const requestToken = (login:string, password: string) => {
        // APIRouter(APIRouterActions.getAuth, {
        //     login,
        //     password
        // }).then((r) => {
        //     props.setUser(r)})
        // .catch(e => {
        //     message.notifyUser({
        //         type: MessageType.error,
        //         text: e
        //     })
        //     throw new Error(e)
        // })
    }

    return <Auth {...props} requestToken={requestToken}/>
}

const mapStateToProps = (state: RootState) => {
    return {
    }
}

const AuthContainer = connect(mapStateToProps,{
    setUser
})(AuthAPI)

export default AuthContainer