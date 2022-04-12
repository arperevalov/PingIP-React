import { connect } from "react-redux";
import Servers from "./Servers";


const MapStateToProps = (store: any) => {
    return {
        servers: store.ServersPage.servers
    }
}

const ServersContainer = connect(MapStateToProps,{

})(Servers)

export default ServersContainer