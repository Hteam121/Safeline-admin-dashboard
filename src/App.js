// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Parents from './components/Parents';
import Students from './components/Students';
import Guests from './components/Guests';
import Settings from './components/Settings';
import Contact from './components/Contact';
import styled from 'styled-components';
import Login from './components/Login';
import Logout from './components/Logout';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  color: #000000;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px; /* Matches the width of the sidebar */
  overflow-y: auto;
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/students" element={<Students />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
