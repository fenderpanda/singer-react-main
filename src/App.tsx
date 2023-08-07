import React from 'react';
import './App.css';
import {toRelativeUrl} from "@okta/okta-auth-js";
import {Route, Routes, useNavigate} from "react-router-dom";
import {LoginCallback, Security} from "@okta/okta-react";
import oktaAuth from "./security/OktaService";
import HomePage from "./layouts/HomePage/HomePage";
import AdminPage from "./layouts/AdminPage/AdminPage";
import Header from "./layouts/Header/Header";
import ErrorPage from "./layouts/ErrorPage/ErrorPage";

function App() {
    const navigate = useNavigate();
    const restoreOriginalUri = (_oktaAuth: any, originalUri: any) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return(
        <div className='d-flex flex-column'>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/error" element={<ErrorPage/>} />
                    <Route path="/admin" element={<AdminPage/>} />
                    <Route path="/login/callback" element={<LoginCallback />} />
                </Routes>
            </Security>
        </div>
    )
}

export default App;
