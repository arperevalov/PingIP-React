import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import AuthContainer from './Auth/AuthContainer';
import ServersContainer from './Servers/ServersContainer';
import CamerasContainer from './Cameras/CamerasContainer';
import SysMessagesProvider from '../Providers/SysMessagesProvider';
import PreloaderProvider from '../Providers/PreloaderProvider';
import PopupProvider from '../Providers/PopupProvider';
import Logs from './Logs/Logs';

interface AppProps {
    hasBearer: boolean
    logOut: any
}

function App(props:AppProps) {

    return (<SysMessagesProvider>
                <PopupProvider/>
                <PreloaderProvider/>
                {props.hasBearer ? <>
                    <Header logOut={props.logOut}/>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/servers"/>}/>
                        <Route path='/servers' element={<ServersContainer/>}/>
                        <Route path='/servers/:id' element={<CamerasContainer/>}/>
                        <Route path='/logs' element={<Logs/>}/>
                    </Routes>
                </> : 
                <Routes>
                    <Route path="/" element={<AuthContainer/>}/>
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>}
        </SysMessagesProvider>);
}

export default App;