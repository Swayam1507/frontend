import './App.css';
import LoginPage from './pages/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './LoginPage';
// import SignupPage from './SignupPage';
import SignupPage from './pages/SignupPage';
import MainChat from './layout/MainChat'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/chat-screen" element={<MainChat />} />
      </Routes>
    </Router>
  );
}

export default App;
