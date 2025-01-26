import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import NavBar from './Navbar'
import Home from './Home'
import FormPage from './Form'
import Footer from './Footer'

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/form" element={<FormPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer/>
        </>
    );
}

export default App;

