import { combineReducers, createStore } from "redux";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    AuthPage: AuthReducer
})

const store = createStore(reducers)

export default store