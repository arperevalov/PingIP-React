import React from "react"
import { connect } from "react-redux"
import { setUser } from "../../Redux/AuthReducer"
import Auth from "./Auth"

interface IAuthAPI {
    setUser: CallableFunction
}

const AuthAPI = (props:IAuthAPI) => {

    const requestToken = (login:string, password: string) => {
        const url = "https://example.com/auth/login"
        async function signIn() {
            let resp = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: login,
                    password
                })
            })
            
            // let respObj = await resp.json();
            let respObj = {
                username: "admin",
                token: "sdfDF$sdfg$452gGSDf5svsfsds"
              }

            props.setUser(respObj)
        }
        signIn()
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