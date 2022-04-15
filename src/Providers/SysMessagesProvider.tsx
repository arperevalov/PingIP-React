import React, { createContext, useState } from "react"
import SysMessage from "../Components/Common/SysMessage"
import { IMessage, MessageType } from "../Interfaces"

const SysMessagesContext = createContext(null)

const SysMessagesProvider = (props:any) => {
    const [messages, setMessages] = useState([{text: 'Random things happened someday and sometime', type: MessageType.regular}]),
    [displayMessage, setDisplayMessage] = useState(false)

    const notifyUser = (message: IMessage) => {
        setMessages([...messages, message])
        setTimeout(()=>{
            let newMessages = messages.slice(1, messages.length)
            setMessages(newMessages)
        }, 2000)
    } 

    return <SysMessagesContext.Provider value={{
        notifyUser: notifyUser
    }}>
        
        <div className="notifications">
            {messages.length > 0 ? messages.map((i, index) => {
                return <SysMessage key={index} text={i.text} type={i.type}/>
            }): ''}
        </div>

        {props.children}
    </SysMessagesContext.Provider>
}

export { SysMessagesContext }
export default SysMessagesProvider
