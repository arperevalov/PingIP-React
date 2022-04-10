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
            <Header logOut={props.logOut}/>
            <Routes>
                <Route path="/" element={props.hasBearer ? <Navigate replace to="/servers"/> : <AuthContainer/>}/>
                <Route path='/servers' element={<ProtectedRoute hasBearer={props.hasBearer}> <Servers/></ProtectedRoute>}/>
                <Route path='/servers/:id' element={<ProtectedRoute hasBearer={props.hasBearer}> <Server/></ProtectedRoute>}/>
                {/* <Route hasBearer={props.hasBearer} path='/servers/:id' element={<Server/>}/> */}
                {/* <Route path='/servers' element={<Servers/>}/>
                <Route path='/servers/:id' element={<Server/>}/> */}
            </Routes>
        </div>);
}

export default App;