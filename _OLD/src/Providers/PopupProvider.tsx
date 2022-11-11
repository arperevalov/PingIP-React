import React, { useEffect } from "react"
import { connect } from "react-redux"
import PopupCreateCamera from "../Components/Popup/PopupCreateCamera"
import PopupCreateServer from "../Components/Popup/PopupCreateServer"
import PopupUpdateCamera from "../Components/Popup/PopupUpdateCamera"
import PopupUpdateServer from "../Components/Popup/PopupUpdateServer"
import { setPopup, setFetching } from "../../../Redux/AppReducer"
import { PopupType } from "../Interfaces"
import { setUpdates } from "../../../Redux/ServersReducer"
import { RootState } from "../../../Redux/store"

const PopupProviderAPI = (props: any) => {

    useEffect(()=>{
        window.addEventListener("keydown", function (event) {
            if (event.key === 'Escape') {
              props.setPopup(PopupType.default)
            }
        })
    },[])

    switch (props.popupData.type) {
        case PopupType.createServer:
            return <PopupCreateServer 
                {...props.popupData} 
                setPopup={props.setPopup} 
                setUpdates={props.setUpdates}
                setFetching={props.setFetching}/>
        break;

        case PopupType.updateServer:
            return <PopupUpdateServer 
                {...props.popupData} 
                setPopup={props.setPopup} 
                setUpdates={props.setUpdates}
                setFetching={props.setFetching}/>
        break;

        case PopupType.createCamera:
            return <PopupCreateCamera 
                {...props.popupData} 
                setPopup={props.setPopup} 
                setUpdates={props.setUpdates}
                setFetching={props.setFetching}/>
        break;

        case PopupType.updateCamera:
            return <PopupUpdateCamera 
                {...props.popupData} 
                setPopup={props.setPopup} 
                setUpdates={props.setUpdates}
                setFetching={props.setFetching}/>
        break;

        default:
            return <></>
        break;
    }
}

const MapStateToProps = (store: RootState) => {
    return {
        popupData: store.AppPage.popupItem
    }
}

const PopupProvider = connect(MapStateToProps,{
    setPopup,
    setUpdates,
    setFetching
})(PopupProviderAPI)

export default PopupProvider

