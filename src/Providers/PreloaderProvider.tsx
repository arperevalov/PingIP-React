import React from "react"
import { connect } from "react-redux"
import { setFetching } from "../Redux/AppReducer"

const PreloaderProviderAPI = (props:any) => {

    if( props.isFetching ){
        return <div className="preloader"/>
    }

    return <></>
}

const mapStateToProps = (store:any) => {
    return {
        isFetching: store.AppPage.isFetching
    }
}

const PreloaderProvider = connect(mapStateToProps, {
    setFetching
})(PreloaderProviderAPI)

export default PreloaderProvider

