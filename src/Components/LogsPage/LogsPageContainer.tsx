import { connect } from "react-redux";
import LogsPage from "./LogsPage";

const mapStateToProps = (store: any) => {
    return {

    }
}

const LogsPageContainer = connect(mapStateToProps,{})(LogsPage)

export default LogsPageContainer