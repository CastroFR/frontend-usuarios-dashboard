import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';
import './assets/styles/theme.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <DataProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </DataProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;