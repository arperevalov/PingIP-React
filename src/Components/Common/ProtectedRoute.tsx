import React from "react"
import { Navigate } from "react-router-dom"

interface IProtectedRoute {
    hasBearer: boolean
    children: any
}


const ProtectedRoute = (props:IProtectedRoute) => {
    if(props.hasBearer) {
        return <>
        {props.children}
        </>
    } else {
        return <Navigate replace to="/"/>
    }
}

export default ProtectedRoute