import React, { createContext, useEffect, useState } from "react"
import { connect, MapStateToProps } from "react-redux"
import SysMessage from "../Components/Common/SysMessage"
import { IMessage } from "../Interfaces"
import { setSysMessage, shiftMessage } from "../Redux/AppReducer"

const SysMessagesContext = createContext(null)

const SysMessagesProviderAPI = (props:any) => {


    const notifyUser = (message: IMessage) => {
        props.setSysMessage(message)
        setTimeout(()=>{
            props.shiftMessage()
        }, 2000)
    } 

    return <SysMessagesContext.Provider value={{
        notifyUser: notifyUser
    }}>
        
        <div className="notifications">
            {props.sysMessages.length > 0 ? props.sysMessages.map((i:any) => {
                return <SysMessage text={i.text} type={i.type}/>
            }): ''}
        </div>

        {props.children}
    </SysMessagesContext.Provider>
}

const mapStateToProps = (store:any) => {
    return {
        sysMessages: store.AppPage.SysMessages
    }
}

const SysMessagesProvider = connect(mapStateToProps, {
    setSysMessage,
    shiftMessage
})(SysMessagesProviderAPI)

export { SysMessagesContext }
export default SysMessagesProvider

