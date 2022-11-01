import { connect } from "react-redux"
import App from "./App"
import { logOut } from "../Redux/AuthReducer"
import { RootState } from "../Redux/store"

const mapStateToProps = (state: RootState) => {
    return {
        hasBearer: state.AuthPage.hasBearer
    }
}

const AppContainer = connect(mapStateToProps, {
    logOut,
})(App)

export default AppContainer