import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy loading para mejor performance
const Login = lazy(() => import('../views/Auth/Login'));
const Register = lazy(() => import('../views/Auth/Register'));
const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const UserList = lazy(() => import('../views/Users/UserList'));

// Loader para suspenso
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={
          <PublicRoute restricted>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute restricted>
            <Register />
          </PublicRoute>
        } />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/users" element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        } />

        {/* Ruta por defecto */}
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        {/* Ruta 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-700">404 - Página no encontrada</h1>
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;