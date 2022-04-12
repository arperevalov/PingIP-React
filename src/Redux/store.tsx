import { combineReducers, createStore } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import ServersReducer from "./ServersReducer";

const reducers = combineReducers({
    AuthPage: AuthReducer,
    ServersPage: ServersReducer,
    AppPage: AppReducer
})

const store = createStore(reducers)

export default store