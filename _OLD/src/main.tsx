import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppContainer from './Components/AppContainer';
import store from "../../Redux/store";

import './../static/sass/index.sass'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));