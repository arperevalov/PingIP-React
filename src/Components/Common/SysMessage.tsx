import React from "react"
import { IMessage, MessageType } from "../../Interfaces"


const SysMessage = (props:IMessage) => {
    return <div className={`notification notification${props.type === MessageType.error ? '__error': props.type === MessageType.success ? '__success': '__regular'}`}>
        <p className="notification__description">{props.text}</p>
    </div>
}

export default SysMessage