import { combineReducers, createStore } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import LogsReducer from "./LogsReducer";
import ServersReducer from "./ServersReducer";

const reducers = combineReducers({
    AuthPage: AuthReducer,
    ServersPage: ServersReducer,
    AppPage: AppReducer,
    LogsPage: LogsReducer
})

const store = createStore(reducers)

export default store