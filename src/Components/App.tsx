import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import Server from './Server/Server';
import AuthContainer from './Auth/AuthContainer';
import ServersContainer from './Servers/ServersContainer';

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
                    <Route path='/servers' element={<ServersContainer/>}/>
                    <Route path='/servers/:id' element={<Server/>}/>
                </Routes>
            </> : 
            <Routes>
                <Route path="/" element={<AuthContainer/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>}
        </div>);
}

export default App;