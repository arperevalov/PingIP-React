import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import AuthContainer from './Auth/AuthContainer';
import ServersContainer from './Servers/ServersContainer';
import Cameras from './Cameras/Cameras';

interface AppProps {
    hasBearer: boolean
    logOut: any
}

function App(props:AppProps) {

    return (<>
            {props.hasBearer ? <>
                <Header logOut={props.logOut}/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/servers"/>}/>
                    <Route path='/servers' element={<ServersContainer/>}/>
                    <Route path='/servers/:id' element={<Cameras/>}/>
                </Routes>
            </> : 
            <Routes>
                <Route path="/" element={<AuthContainer/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>}
        </>);
}

export default App;