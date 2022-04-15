import { connect } from "react-redux"
import App from "./App"
import { logOut } from "../Redux/AuthReducer"

const mapStateToProps = (state:any) => {
    return {
        hasBearer: state.AuthPage.hasBearer
    }
}

const AppContainer = connect(mapStateToProps, {
    logOut,
})(App)

export default AppContainer