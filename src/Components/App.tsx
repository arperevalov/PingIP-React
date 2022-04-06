import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import Servers from './Servers/Servers';
import Server from './Servers/Server';
import AuthContainer from './Auth/AuthContainer';
import Popup from './Common/Popup';

function App(props:any) {

    return (<div>
            <Header/>
            <Routes>
                <Route path="/" element={props.hasBearer ? <Navigate replace to="/servers"/> : <AuthContainer/>}/>
                <Route path='/servers' element={<Servers/>}/>
                <Route path='/servers/:id' element={<Server/>}/>
            </Routes>
            {props.displayPopup ? <Popup/> : ''}
        </div>);
}

export default App;