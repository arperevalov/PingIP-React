import React, { createContext } from "react"
import { connect } from "react-redux"
import SysMessage from "../Components/Common/SysMessage"
import { IMessage } from "../Interfaces"
import { setSysMessage, shiftMessage } from "../Redux/AppReducer"
import { RootState } from "../Redux/store"

const SysMessagesContext = createContext(null)

interface SysMessagesProviderAPIProps {
    sysMessages: IMessage[]
    setSysMessage: CallableFunction
    shiftMessage: CallableFunction
    children: any
}

const SysMessagesProviderAPI = (props: SysMessagesProviderAPIProps) => {


    const notifyUser = (message: IMessage) => {
        props.setSysMessage(message)
        setTimeout(()=>{
            props.shiftMessage()
        }, 3000)
    } 

    return <SysMessagesContext.Provider value={{
        notifyUser: notifyUser
    }}>
        
        <div className="notifications">
            {props.sysMessages.length > 0 ? props.sysMessages.map((i:IMessage) => {
                return <SysMessage text={i.text} type={i.type} key={i.id}/>
            }): ''}
        </div>

        {props.children}
    </SysMessagesContext.Provider>
}

const mapStateToProps = (store: RootState) => {
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

