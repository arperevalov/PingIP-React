import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import AuthContainer from './Auth/AuthContainer';
import ServersContainer from './Servers/ServersContainer';
import CamerasContainer from './Cameras/CamerasContainer';
import SysMessagesProvider from '../Providers/SysMessagesProvider';
import PreloaderProvider from '../Providers/PreloaderProvider';
import PopupProvider from '../Providers/PopupProvider';
import LogsPageContainer from './LogsPage/LogsPageContainer';

interface AppProps {
    hasBearer: boolean
    logOut: CallableFunction
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
                        <Route path='/logs' element={<LogsPageContainer/>}/>
                    </Routes>
                </> : 
                <Routes>
                    <Route path="/" element={<AuthContainer/>}/>
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>}
        </SysMessagesProvider>);
}

export default App;