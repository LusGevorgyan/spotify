import Login from './pages/login/Login'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Albums from './pages/albums/Albums';
import Tracks from './pages/tracks/Tracks';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/albums/:id" element={<Albums/>} />
        <Route path="/tracks/:id" element={<Tracks />} />
      </Routes>
    </Router>
  );
}

export default App;
