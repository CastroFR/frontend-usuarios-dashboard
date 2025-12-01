import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import Loader from './components/common/Loader/Loader';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import './assets/styles/global.css';
import './assets/styles/theme.css';

// Lazy load components that are not needed immediately
const ToastProvider = lazy(() => import('./contexts/ToastContext'));

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Fallback para lazy loading
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="large" />
  </div>
);

// Componente principal de la aplicación
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ThemeProvider>
            <AuthProvider>
              <Suspense fallback={<LoadingFallback />}>
                <ToastProvider>
                  <Layout>
                    <AppRoutes />
                  </Layout>
                </ToastProvider>
              </Suspense>
            </AuthProvider>
          </ThemeProvider>
        </Router>
        
        {/* DevTools para desarrollo */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools 
            initialIsOpen={false} 
            position="bottom-right" 
          />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;