import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import AuthContainer from './Auth';
import ServersContainer from './Servers/ServersContainer';
import CamerasContainer from './Cameras/CamerasContainer';
import SysMessagesProvider from '../../../common/Providers/SysMessagesProvider';
import PreloaderProvider from '../../../common/Providers/PreloaderProvider';
import PopupProvider from '../../../common/Providers/PopupProvider';
import LogsPageContainer from './LogsPage/LogsPageContainer';
import Page404 from './Common/Page404';

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
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </> : 
                <Routes>
                    <Route path="/" element={<AuthContainer/>}/>
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>}
        </SysMessagesProvider>);
}

export default App;