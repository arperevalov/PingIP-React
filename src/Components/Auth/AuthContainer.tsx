import React from "react"
import { connect } from "react-redux"
import { setUser } from "../../Redux/AuthReducer"
import Auth from "./Auth"

interface IAuthAPI {
    setUser: CallableFunction
    hasBearer: boolean
}

const AuthAPI = (props:IAuthAPI) => {

    const requestToken = (login:string, password: string) => {
        const url = "https://json.org/example.html"
        async function signIn() {
            let resp = await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
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
        hasBearer: state.AuthPage.hasBearer
    }
}

const AuthContainer = connect(mapStateToProps,{
    setUser
})(AuthAPI)

export default AuthContainer