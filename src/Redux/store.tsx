import { combineReducers, createStore } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    AuthPage: AuthReducer,
    AppPage: AppReducer
})

const store = createStore(reducers)

export default store