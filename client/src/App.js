import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { Container } from '@mui/material';
import React from 'react';
import './App.css';
import './index.css';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/auth" element={<Auth />} /> */}
                    <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<Home />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
