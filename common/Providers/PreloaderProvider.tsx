import React from "react"
import { connect } from "react-redux"
import { RootState } from "../../Redux/store"

interface PreloaderProviderAPIProps {
    isFetching: boolean
}

const PreloaderProviderAPI = (props: PreloaderProviderAPIProps) => {

    if( props.isFetching ){
        return <div className="preloader"/>
    }

    return <></>
}

const mapStateToProps = (store: RootState) => {
    return {
        isFetching: store.AppPage.isFetching
    }
}

const PreloaderProvider = connect(mapStateToProps, {
})(PreloaderProviderAPI)

export default PreloaderProvider

