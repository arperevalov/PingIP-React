import React from "react"
import { connect } from "react-redux"
import { APIRouter, APIRouterActions } from "../../API/APIRouter"
import { setUser } from "../../Redux/AuthReducer"
import Auth from "./Auth"

interface IAuthAPI {
    setUser: CallableFunction
}

const AuthAPI = (props:IAuthAPI) => {

    const requestToken = (login:string, password: string) => {
        APIRouter(APIRouterActions.getAuth, {
            login,
            password
        }).then(r => {
            props.setUser(r)
        })
    }

    return <Auth {...props} requestToken={requestToken}/>
}

const mapStateToProps = (state:any) => {
    return {
    }
}

const AuthContainer = connect(mapStateToProps,{
    setUser
})(AuthAPI)

export default AuthContainer