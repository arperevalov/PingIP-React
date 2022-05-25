import React, { createContext, useState } from "react"
import { connect } from "react-redux"
import Popup from "../Components/Common/Popup"
import { IPopup, PopupType } from "../Interfaces"

const PopupContext = createContext(null)

const PopupProviderAPI = (props:any) => {

    const [popupData, setPopupData] = useState({
        type: PopupType.default
    })

    const setPopup = (popup: IPopup) => {
        setPopupData({...popup})
    } 

    if (popupData.type !== PopupType.default) {
        return <PopupContext.Provider value={{
            setPopup: setPopup
        }}>
            <Popup {...popupData}/>
            {props.children}
        </PopupContext.Provider>
    }

    return <PopupContext.Provider value={{
        setPopup: setPopup
    }}>
        {props.children}
    </PopupContext.Provider>
}

const mapStateToProps = (store:any) => {
    return {
        Popup: store.AppPage.Popup
    }
}

const PopupProvider = connect(mapStateToProps, {
})(PopupProviderAPI)

export { PopupContext }
export default PopupProvider

