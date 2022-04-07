import { connect } from "react-redux"
import App from "./App"
import { logOut } from "../Redux/AuthReducer"
import { setDisplayPopup } from "../Redux/AppReducer"

const mapStateToProps = (state:any) => {
    return {
        hasBearer: state.AuthPage.hasBearer
    }
}

const AppContainer = connect(mapStateToProps, {
    logOut,
    setDisplayPopup
})(App)

export default AppContainer