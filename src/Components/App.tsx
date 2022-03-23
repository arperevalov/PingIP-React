import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import Servers from './Servers/Servers';
import Server from './Servers/Server';
import Auth from './Auth';

function App() {

    const [logged, setLogged] = useState(true)

    return (<div>
            <Header/>
            <Routes>
                <Route path="/" element={logged ? <Navigate replace to="/servers"/> : <Auth/>}/>
                <Route path='/servers' element={<Servers/>}/>
                <Route path='/servers/:id' element={<Server/>}/>
            </Routes>
        </div>);
}

export default App;