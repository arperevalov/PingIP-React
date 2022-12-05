import { useRouter } from "next/router"
import React, { useContext } from "react"
import { connect } from "react-redux"
import { APIRouter, APIRouterActions } from "../../common/API/APIRouter"
import withAuth from "../../common/HOC/withAuth"
import { SysMessagesContext } from "../../common/Providers/SysMessagesProvider"
import { setUser } from "../../Redux/AuthReducer"
import { RootState } from "../../Redux/store"
import AuthLayout from "./AuthLayout"

interface IAuthAPI {
    setUser: CallableFunction
}

const AuthAPI = (props:IAuthAPI) => {

    const message = useContext(SysMessagesContext)

    const requestToken = (login:string, password: string) => {
        APIRouter(APIRouterActions.getAuth, {
            login,
            password
        }).then((r) => {
            props.setUser(r)
            const router = useRouter();
            router.push('/servers')
        })
        .catch(e => {
            message.notifyUser({
                type: MessageType.error,
                text: e
            })
            throw new Error(e)
        })
    }

    return <AuthLayout {...props} requestToken={requestToken}/>
}

const mapStateToProps = (state: RootState) => {
    return {
    }
}

const AuthContainer = connect(mapStateToProps,{
    setUser
})(AuthAPI)

export default withAuth(AuthContainer)