import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import Servers from './Servers/Servers';
import Server from './Servers/Server';
import AuthContainer from './Auth/AuthContainer';
import ProtectedRoute from './Common/ProtectedRoute';

interface AppProps {
    hasBearer: boolean
    logOut: any
}

function App(props:AppProps) {

    return (<div>
            {props.hasBearer ? <>
                <Header logOut={props.logOut}/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/servers"/>}/>
                    <Route path='/servers' element={<Servers/>}/>
                    <Route path='/servers/:id' element={<Server/>}/>
                </Routes>
            </> : 
            <Routes>
                <Route path="/" element={<AuthContainer/>}/>
            </Routes>}
        </div>);
}

export default App;