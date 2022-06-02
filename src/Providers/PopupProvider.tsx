import React from "react"
import { connect } from "react-redux"
import PopupCreateCamera from "../Components/Popup/PopupCreateCamera"
import PopupCreateServer from "../Components/Popup/PopupCreateServer"
import PopupUpdateCamera from "../Components/Popup/PopupUpdateCamera"
import PopupUpdateServer from "../Components/Popup/PopupUpdateServer"
import { setPopup } from "../Redux/AppReducer"
import { PopupType } from "../Interfaces"
import { setUpdates } from "../Redux/ServersReducer"

const PopupProviderAPI = (props:any) => {

    switch (props.popupData.type) {
        case PopupType.createServer:
            return <PopupCreateServer {...props.popupData} setPopup={props.setPopup} setUpdates={props.setUpdates}/>
        break;

        case PopupType.updateServer:
            return <PopupUpdateServer {...props.popupData} setPopup={props.setPopup} setUpdates={props.setUpdates}/>
        break;

        case PopupType.createCamera:
            return <PopupCreateCamera {...props.popupData} setPopup={props.setPopup} setUpdates={props.setUpdates}/>
        break;

        case PopupType.updateCamera:
            return <PopupUpdateCamera {...props.popupData} setPopup={props.setPopup} setUpdates={props.setUpdates}/>
        break;

        default:
            return <></>
        break;
    }
}

const MapStateToProps = (store:any) => {
    return {
        popupData: store.AppPage.popupItem
    }
}

const PopupProvider = connect(MapStateToProps,{
    setPopup,
    setUpdates
})(PopupProviderAPI)

export default PopupProvider

