import React, { createContext, useState } from "react"
import PopupCreateCamera from "../Components/Popup/PopupCreateCamera"
import PopupCreateServer from "../Components/Popup/PopupCreateServer"
import PopupUpdateCamera from "../Components/Popup/PopupUpdateCamera"
import PopupUpdateServer from "../Components/Popup/PopupUpdateServer"
import { IPopup, PopupType } from "../Interfaces"

const PopupContext = createContext(null)

const PopupProvider = (props:any) => {

    const [popupData, setPopupData] = useState({
        type: PopupType.default
    })

    const setPopup = (popup: IPopup) => {
        setPopupData({...popup})
    } 

    switch (popupData.type) {
        case PopupType.createServer:
            return <PopupContext.Provider value={{setPopup: setPopup}}>
                <PopupCreateServer {...popupData}/>
                {props.children}
            </PopupContext.Provider>
        break;

        case PopupType.updateServer:
            return <PopupContext.Provider value={{setPopup: setPopup}}>
                <PopupUpdateServer {...popupData}/>
                {props.children}
            </PopupContext.Provider>
        break;

        case PopupType.createCamera:
            return <PopupContext.Provider value={{setPopup: setPopup}}>
                <PopupCreateCamera {...popupData}/>
                {props.children}
            </PopupContext.Provider>
        break;

        case PopupType.updateCamera:
            return <PopupContext.Provider value={{setPopup: setPopup}}>
                <PopupUpdateCamera {...popupData}/>
                {props.children}
            </PopupContext.Provider>
        break;

        default:
            return <PopupContext.Provider value={{setPopup: setPopup}}>
                {props.children}
            </PopupContext.Provider>
        break;
    }
}

export { PopupContext }
export default PopupProvider

