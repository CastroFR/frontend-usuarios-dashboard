import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { validators } from '../../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [apiHealth, setApiHealth] = useState(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const { formData, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: validators.email,
      password: validators.required('La contraseña es requerida'),
    }
  );

  useEffect(() => {
    // Verificar salud de la API al cargar
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
      const data = await response.json();
      setApiHealth(data);
    } catch (error) {
      console.error('Error checking API health:', error);
      setApiHealth({ status: 'unreachable', message: 'No se puede conectar con el servidor' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        console.log('Login exitoso, verificando estado...');
        console.log('Token en localStorage:', localStorage.getItem('token'));
        console.log('User en localStorage:', localStorage.getItem('user'));
        
        // Pequeña pausa para asegurar que el estado se actualice
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 100);
      } else {
        setMessage(result.error?.message || 'Error al iniciar sesión');
        
        if (result.error?.errors) {
          const backendErrors = Object.values(result.error.errors).flat();
          setMessage(backendErrors[0] || 'Error al iniciar sesión');
        }
      }
    } catch (err) {
      setMessage('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl mb-4">
            {import.meta.env.VITE_APP_NAME?.charAt(0) || 'D'}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {import.meta.env.VITE_APP_NAME || 'Dashboard'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Inicia sesión para acceder al panel de administración
          </p>
        </div>

        {apiHealth && apiHealth.status === 'unreachable' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  No se puede conectar con el servidor. Verifica que la API esté ejecutándose.
                </p>
              </div>
            </div>
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {(message || authError) && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{message || authError}</p>
              </div>
            )}

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="correo@ejemplo.com"
              required
              autoComplete="email"
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                disabled={apiHealth?.status === 'unreachable'}
              >
                Iniciar sesión
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  ¿No tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button variant="outline" fullWidth>
                  Crear una cuenta nueva
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME || 'Dashboard'}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;