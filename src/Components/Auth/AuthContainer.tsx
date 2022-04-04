import { connect } from "react-redux"
import { setBearerToken } from "../../Redux/AuthReducer"
import Auth from "./Auth"

const mapStateToProps = (state:any) => {
    return {
        hasBearer: state.AuthPage.hasBearer
    }
}

const AuthContainer = connect(mapStateToProps,{
    setBearerToken
})(Auth)

export default AuthContainer