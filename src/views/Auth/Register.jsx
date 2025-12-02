import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { validators } from '../../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { formData, errors, touched, handleChange, handleBlur, validateForm } = useForm(
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    {
      name: validators.required('El nombre es requerido'),
      email: validators.email,
      password: validators.password,
      password_confirmation: (value, formData) => {
        if (!value) return 'La confirmación de contraseña es requerida';
        if (value !== formData.password) return 'Las contraseñas no coinciden';
        return null;
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/login', { 
          state: { 
            message: '¡Registro exitoso! Por favor inicia sesión.' 
          } 
        });
      } else {
        setMessage(result.error?.message || 'Error al registrarse');
        
        if (result.error?.errors) {
          const backendErrors = Object.values(result.error.errors).flat();
          setMessage(backendErrors[0] || 'Error al registrarse');
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
            Crear cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Únete a {import.meta.env.VITE_APP_NAME || 'Dashboard'}
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {(message || authError) && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{message || authError}</p>
              </div>
            )}

            <Input
              label="Nombre completo"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="Juan Pérez"
              required
              autoComplete="name"
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

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
              autoComplete="new-password"
              helperText="Mínimo 6 caracteres"
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Input
              label="Confirmar contraseña"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password_confirmation}
              touched={touched.password_confirmation}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              leftIcon={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Acepto los{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  términos y condiciones
                </Link>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
              >
                Crear cuenta
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
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" fullWidth>
                  Iniciar sesión
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

export default Register;