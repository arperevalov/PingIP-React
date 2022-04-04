import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import Servers from './Servers/Servers';
import Server from './Servers/Server';
import AuthContainer from './Auth/AuthContainer';

function App() {

    const [logged, setLogged] = useState(false)

    return (<div>
            <Header/>
            <Routes>
                <Route path="/" element={logged ? <Navigate replace to="/servers"/> : <AuthContainer/>}/>
                <Route path='/servers' element={<Servers/>}/>
                <Route path='/servers/:id' element={<Server/>}/>
            </Routes>
        </div>);
}

export default App;