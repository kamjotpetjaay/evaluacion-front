import React, { useState } from 'react';
import Login from './components/Login';
import './App.css';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Usuarios from './components/Usuarios';
import NuevoUsuario from './components/NuevoUsuario';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/usuarios" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/usuarios"
          element={
            isAuthenticated ? <Usuarios /> : <Navigate to="/login" replace />
          }
        />
        <Route 
          path="/nuevo-usuario" 
          element={
            isAuthenticated ? <NuevoUsuario /* onUserCreated={() => {}} */ />: <Navigate to="/login" replace />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/usuarios" : "/login"} replace />}
        />
      </Routes>
  );
}

export default App;
