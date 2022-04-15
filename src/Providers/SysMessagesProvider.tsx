import React, { createContext, useEffect, useState } from "react"
import SysMessage from "../Components/Common/SysMessage"
import { IMessage } from "../Interfaces"

const SysMessagesContext = createContext(null)

const SysMessagesProvider = (props:any) => {
    const [messages, setMessages] = useState([]),
    [indexes, setIndexes] = useState([])

    const shiftMessage = () =>{
        setTimeout(()=>{
            let newMessages = messages.slice(1)
            setMessages(newMessages)
        }, 2000)
    }

    const notifyUser = (message: IMessage) => {
        message.id = indexes.length
        setIndexes([...indexes, indexes.length+1])
        setMessages([...messages, message])
    } 

    useEffect(()=>{
        if (messages.length > 0) {       
            shiftMessage()
        }
    },[messages])

    return <SysMessagesContext.Provider value={{
        notifyUser: notifyUser
    }}>
        
        <div className="notifications">
            {messages.length > 0 ? messages.map((i) => {
                return <SysMessage key={i.id} text={i.text} type={i.type}/>
            }): ''}
        </div>

        {props.children}
    </SysMessagesContext.Provider>
}

export { SysMessagesContext }
export default SysMessagesProvider
