import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout from '../components/layout/Layout';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Dashboard from '../views/Dashboard/Dashboard';
import UserList from '../views/Users/UserList';
import UserForm from '../views/Users/UserForm';
import Statistics from '../views/Statistics/Statistics';
import NotFound from '../views/NotFound/NotFound';
import Profile from '../views/Profile/Profile';
import Settings from '../views/Settings/Settings';
import Notifications from '../views/Notifications/Notifications';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Rutas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Layout>
              <UserList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users/new"
        element={
          <PrivateRoute>
            <Layout>
              <UserForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users/:id/edit"
        element={
          <PrivateRoute>
            <Layout>
              <UserForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <PrivateRoute>
            <Layout>
              <Statistics />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Layout>
              <Settings />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Layout>
              <Notifications />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;